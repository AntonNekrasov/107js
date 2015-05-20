/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
var h107 = (function () {
    'use strict';
    /**
     * merges all the properties of two objects
     *
     * @param target - target object, to be extended
     * @param extending - object, which extends target. Properties of extending will override those matching in target
     */
    function mergeObjects(target, extending) {
        var aggregate = {};
        var property;

        if (!extending) {
            return target;
        }

        for (property in target) {
            if (target.hasOwnProperty(property)) {
                aggregate[property] = extending[property] ? extending[property] : target[property];
            }
        }

        for (property in extending) {
            if (extending.hasOwnProperty(property) && !target[property]) {
                aggregate[property] = extending[property];
            }
        }

        return aggregate;
    }

    /**
     * provides inheritance
     *
     * @param child - inheritor
     * @param parent - parent object
     */
    function extend(child, parent) {
        var F = function () { };
        F.prototype = parent.prototype;

        child.prototype = new F();
        child.prototype.constructor = child;
        child.superclass = parent.prototype;
    }

    return {
        mergeObjects: mergeObjects,
        extend: extend
    };

})();

h107.view = {};
h107.view.component = {};
h107.controller = {};
h107.model = {};

h107.callback = function Callback(fn, scope, parameters) {
    'use strict';
    this.fn = fn;
    this.scope = scope;
    this.parameters = parameters;
};
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.DomProcessor = (function () {
    'use strict';
    /**
     * generates random id
     *
     * @param minLength - minimum id length
     * @param maxLength - maximum id length
     */
    function generateId(minLength, maxLength) {
        var text = '';
        var length = getRandomInt(minLength, maxLength);
        var range = 'abcdefghijklmnopqrstuvwxyz';
        var i;

        for (i = 0; i < length; i++) {
            text += range.charAt(Math.floor(Math.random() * range.length));
        }

        return text;
    }

    /**
     * generates random integer
     *
     * @param min - minimum value
     * @param max - maximum value
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * constructs Node element
     *
     * @param nodeType - the type of node (e.g. div, span etc);
     * @param attributes - key value associative array, containing all the list of attributes, to be applied.
     *      Value can be either string, or array of strings (e.g. {class: ['first', 'second']})
     * @param innerText - innerText to be put into the node, if needed
     */
    function buildElement(nodeType, attributes, innerText) {
        var ID_MAX_LENGTH = 10;
        var ID_MIN_LENGTH = 5;
        var defaults = {
            id: generateId(ID_MIN_LENGTH, ID_MAX_LENGTH)
        };
        var allAttributes = h107.mergeObjects(defaults, attributes);
        var elt = document.createElement(nodeType);
        var property;

        for (property in allAttributes) {
            if (allAttributes.hasOwnProperty(property)) {
                applyAttribute(elt, property, allAttributes[property]);
            }
        }

        if (innerText) {
            elt.innerText = innerText;
            elt.textContent = innerText;
        }

        return elt;
    }

    /**
     * sets attributes of any kind (strings, arrays, objects etc)
     *
     * @param elt - element to get attributes
     * @param name - the name of attribute
     * @param value - the value of attribute
     */
    function applyAttribute(elt, name, value) {
        if (Object.prototype.toString.call(value) === '[object Object]') {
            var attrValue = '';
            var subProperty;

            for (subProperty in value) {
                if (value.hasOwnProperty(subProperty)) {
                    attrValue += subProperty + ':' + value[subProperty] + ';';
                }
            }
            elt.setAttribute(name, attrValue);
        } else {
            elt.setAttribute(name, value);
        }
    }

    /**
     * checks, if element contains the given class
     *
     * @param elt - element to be checked
     * @param className - class name to be found
     */
    function hasClassName(elt, className) {
        return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elt.className);
    }

    /**
     * adds class to the given element
     *
     * @param elt - element to be updated
     * @param className - class name to be added
     */
    function addClassName(elt, className) {
        if (!hasClassName(elt, className)) {
            elt.className = elt.className ? [elt.className, className].join(' ') : className;
        }
    }

    /**
     * removes class from the given element
     *
     * @param elt - element to be updated
     * @param className - class name to be removed
     */
    function removeClassName(elt, className) {
        if (hasClassName(elt, className)) {
            var c = elt.className;
            elt.className = c.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), '');
        }
    }

    return {
        buildElement: buildElement,
        applyAttribute: applyAttribute,
        hasClassName: hasClassName,
        addClassName: addClassName,
        removeClassName: removeClassName
    };

})();
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.BaseElement = function () {
    'use strict';



};

h107.view.BaseElement.prototype = {
    constructor: h107.BaseElement,
    assemble: function () {

    }
};
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.BaseInput = function (settings) {
    'use strict';

    var defaults = {
        name: '', // todo: think over it;
        label: {
            attributes: [],
            text: ''
        },
        container: {
            attributes: []
        }
    };
    this.settings = h107.mergeObjects(defaults, settings);
    this.html = this.assemble();
};

h107.extend(h107.view.component.BaseInput, h107.view.BaseElement);

h107.view.component.BaseInput.prototype.validate = function () {
    'use strict';
    // TODO: update;
};

h107.view.component.BaseInput.prototype.assemble = function (input) {
    'use strict';

    if (!input) {
        throw 'BaseInput: no input defined';
    }
    var build = h107.DomProcessor.buildElement;
    var container = build('div');
    var labelAttributes = this.settings.label.attributes;

    labelAttributes.for = input.id;
    var label = build('label', labelAttributes, this.settings.label.text);

    container.appendChild(label);
    container.appendChild(input);

    return container;
};


/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.TextInput = function () {
    'use strict';
    // todo: add defaults;
    h107.view.component.TextInput.superclass.constructor.call(this);
};

h107.extend(h107.view.component.TextInput, h107.view.component.BaseInput);

h107.view.component.TextInput.prototype.assemble = function () {
    'use strict';

    var input = h107.DomProcessor.buildElement('input', {
        type: 'text'
    });
    return h107.view.component.TextInput.superclass.assemble.call(this, input);
};
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.HiddenInput = function () {
    'use strict';
    h107.view.component.HiddenInput.superclass.constructor.call(this);
};

h107.extend(h107.view.component.HiddenInput, h107.view.component.BaseInput);

h107.view.component.HiddenInput.prototype.assemble = function () {
    'use strict';
    var hidden = h107.DomProcessor.buildElement('input', {
        type: 'hidden'
    });
    return hidden;
};
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.Textarea = function () {
    'use strict';
    // todo: add defaults;
    h107.view.component.Textarea.superclass.constructor.call(this);
};

h107.extend(h107.view.component.Textarea, h107.view.component.BaseInput);

h107.view.component.Textarea.prototype.assemble = function () {
    'use strict';

    var input = h107.DomProcessor.buildElement('textarea');
    return h107.view.component.Textarea.superclass.assemble.call(this, input);
};
h107.view.component.Button = function () {
    'use strict';

    // var defaults = {
    //    id: '',
    //    text : '',
    //    class: 'rp-button', // todo: update;
    //    placeholder : ''
    // };

    // rpApp.view.components.form.Button.superclass.constructor.call(this, settings);
};

h107.extend(h107.view.component.Button, h107.view.BaseElement);

// rpApp.view.components.form.Button.prototype.render = function() {
//     "use strict";

// var self = this,
// formElement = rpApp.view.components.form.Button.superclass.render.call(this),
// button = document.createElement("div"),
// id = self.settings.id;

// button.addClassName(self.settings.class);
// button.setAttribute("class", self.settings.class);
// button.id = id;

// button.innerText = self.settings.text;
// button.textContent = self.settings.text;

// formElement.appendChild(button);

// self.html = formElement;

// return formElement;
// };
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.BaseView = function (settings) {
    'use strict';
    var defaults = {
        attributes: ''
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    var elt = h107.DomProcessor.buildElement('div', applySettings.attributes);

    return elt;
};

h107.extend(h107.view.BaseView, h107.view.BaseElement);

h107.view.BaseView.prototype.createChildren = function () {
    'use strict';


};
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.ajax = function (settings) {
    'use strict';

    var self = this;
    var defaults = {
        type: 'GET',
        url: '',
        data: {},
        dataType: 'text',
        success: null,
        error: null,
        always: null,
        reply: 'reply',
        cached: true
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

    xmlHttp.onreadystatechange = function () {
        var response;
        var params = {};
        var OK = 200;
        var FINISHED = 4;

        if (xmlHttp.readyState === FINISHED && xmlHttp.status === OK && applySettings.success) {
            response = applySettings.success;
        } else if (applySettings.error) {
            response = applySettings.error;
        }

        if (response) {
            params = response.parameters;
            if (xmlHttp.response) {
                params[response.reply] = xmlHttp.response;
            }
            response.fn.apply(response.scope ? response.scope : self, [params]);
        }

        if (applySettings.always) {
            params = applySettings.always.parameters;
            if (xmlHttp.response) {
                params[response.reply] = xmlHttp.response;
            }
            applySettings.always.fn.apply(applySettings.always.scope ? applySettings.always.scope : self, [params]);
        }

    };

    xmlHttp.open(applySettings.type,
        applySettings.cached ? applySettings.url : applySettings.url + '?_c=' + Math.random(),
        true);

    xmlHttp.responseType = applySettings.type;
    xmlHttp.send();

};