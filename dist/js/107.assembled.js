/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
var h107 = (function () {
    'use strict';

    /**
     * adds new component to the component set
     *
     * @param alias - is a new alias which will be identifying new component
     * @param newComponent - is a new component to be registered. It should contain component property
     */
    function define(alias, newComponent) {
        if (!alias || h107.aliasMap[alias]) {
            throw 'alias ' + alias + ' is either already in use or not specified correctly';
        }

        h107.aliasMap[alias] = function (settings) {
            var applySettings = mergeObjects(newComponent, settings);
            var Component = identifyObjectByAlias(newComponent.component);
            return new Component(applySettings);
        };
    }

    /**
     * defines new controller
     *
     * @param alias - is a new alias which will be identifying new component
     * @param controller - is a new controller to be registered
     */
    function controller(alias, ctrl) {
        var Controller = function () {
            this.name = alias;
            Object.getPrototypeOf(this).constructor.superclass.constructor.call(this);
            ctrl.apply(this);
        };
        extend(Controller, h107.BaseController);
        h107.controllerMap[alias] = new Controller();
    }

    /**
     * returns function-constructor by it's alias
     *
     * @param alias - given alias
     */
    function identifyObjectByAlias(alias) {
        var constructor = h107.aliasMap[alias];
        if (!constructor) {
            throw 'identifyObjectByAlias: no match found for alias ' + alias;
        }
        return h107.aliasMap[alias];
    }

    /**
     * creates an instance of component by given alias
     *
     * @param settings - a set of arguments for constructor
     */
    function create(settings) {
        var Component = identifyObjectByAlias(settings.component);
        return new Component(settings);
    }

    /**
     * merges all the properties of two objects.
     * If values are of primitive type or arrays, then property of target is replaced with property of extending
     * If values are objects, then property of target is merged with property of extending
     *
     * @param target - target object, to be extended
     * @param extending - object, which extends target. Properties of extending will override those matching in target
     */
    function mergeObjects(target, extending) {

        function checkIfBothObjects(object1, object2) {
            return isObject(object1) && isObject(object2);
        }

        var aggregate = {};
        var property;

        if (!extending) {
            return target;
        }

        for (property in target) {
            if (target.hasOwnProperty(property)) {
                if (checkIfBothObjects(extending[property], target[property])) {
                    aggregate[property] = mergeObjects(extending[property], target[property]);
                } else {
                    aggregate[property] = extending[property] ? extending[property] : target[property];
                }

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
        var F = function () {
        };
        F.prototype = parent.prototype;

        child.prototype = new F();
        child.prototype.constructor = child;
        child.superclass = parent.prototype;
    }

    /**
     * checks if given argument is object
     *
     * @param arg - argument to be checked
     */
    function isObject(arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    }

    /**
     * checks if given argument is array
     *
     * @param arg - argument to be checked
     */
    function isArray(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }

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

    return {
        define: define,
        controller: controller,
        create: create,
        identifyObjectByAlias: identifyObjectByAlias,
        mergeObjects: mergeObjects,
        extend: extend,
        generateId: generateId,
        isObject: isObject,
        isArray: isArray
    };

})();

h107.view = {};
h107.view.components = {};
h107.view.components.base = {};

h107.aliasMap = {};
h107.controllerMap = {};
// h107.routes = {};

h107.defaults = {
    DURATION: 15,
    ANIMATE_DURATION: 30,
    ID_MAX_LENGTH: 10,
    ID_MIN_LENGTH: 5,
    ACTIVATION_EVENT: 'onviewactivate'
}

h107.Callback = function (fn, scope, parameters) {
    'use strict';
    this.fn = fn;
    this.scope = scope;
    this.parameters = parameters;
};
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.History = (function () {
    'use strict';
    window.onpopstate = function (e) {
        var state = e.state;
        var event = new Event(h107.defaults.ACTIVATION_EVENT, {
            url: e.newUrl
        });
        var controller = h107.controllerMap[state.controller];
        controller.dispatchEvent(event);
    };

    function changeRoute(state, name, route) {
        history.pushState(state, name, '#' + route);
    }

    function navigateToRoute(route) {
        var containsHash = route.indexOf('#') === 0;
        if (containsHash) {
            route = route.substring(1);
        }
        setTimeout(function () {
            for (var key in h107.controllerMap) {
                if (h107.controllerMap.hasOwnProperty(key)) {
                    var controller = h107.controllerMap[key];
                    var result = controller.getViewByUrl(route);
                    console.log(result);
                    // history.replaceState({page: 3}, "title 3", "?page=3");
                    // if (result) {
                    //     // result.getController().onactive(result.id);
                    // }
                }
            }
        }, 0);
    }

    return {
        changeRoute: changeRoute,
        navigateToRoute: navigateToRoute
    }
}) ();
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.DomProcessor = (function () {
    'use strict';

    /**
     * constructs Node element
     *
     * @param nodeType - the type of node (e.g. div, span etc);
     * @param attributes - key value associative array, containing all the list of attributes, to be applied.
     *      Value can be either string, or array of strings (e.g. {class: ['first', 'second']})
     * @param innerText - innerText to be put into the node, if needed
     */
    function buildElement(nodeType, attributes, innerText) {
        var elt = document.createElement(nodeType);
        var property;

        for (property in attributes) {
            if (attributes.hasOwnProperty(property)) {
                applyAttribute(elt, property, attributes[property]);
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
        if (h107.isObject(value)) {
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
h107.view.components.base.BaseElement = function (settings) {
    'use strict';
    var defaults = {
        attributes: {
            id: settings.id || h107.generateId(h107.defaults.ID_MIN_LENGTH,
                h107.defaults.ID_MAX_LENGTH)
        }
    };
    this.settings = h107.mergeObjects(defaults, settings);
    this.html = this.assemble();
};

h107.view.components.base.BaseElement.prototype = {
    constructor: h107.view.components.base.BaseElement,
    assemble: function () {
        'use strict';
        throw 'method hasn\'t been specified';
    },
    hide: function (callback) {
        'use strict';
        h107.DomProcessor.addClassName(this.html, 'h107-hidden');
        if (callback) {
            callback.fn.apply(callback.scope, callback.parameters);
        }
    },
    show: function (callback) {
        'use strict';
        h107.DomProcessor.removeClassName(this.html, 'h107-hidden');
        if (callback) {
            callback.fn.apply(callback.scope, callback.parameters);
        }
    },
    fadeOut: function (duration, callback) {
        'use strict';
        var self = this;
        var elt = self.html;
        var fadeOutAnimation = setInterval(function () {
            var opacity = parseFloat(elt.style.opacity);
            if (opacity > 0) {
                self.html.style.opacity = opacity - 0.1;
            } else {
                clearInterval(fadeOutAnimation);
                self.hide();
                if (callback) {
                    callback.fn.apply(callback.scope, callback.parameters)
                }
            }
        }, duration || h107.defaults.ANIMATE_DURATION);
    },
    fadeIn: function (duration, callback) {
        'use strict';
        var self = this;
        var fadeInAnimation;
        var elt = self.html;
        self.show();
        fadeInAnimation = setInterval(function () {
            var opacity = parseFloat(elt.style.opacity);
            if (opacity >= 1) {
                clearInterval(fadeInAnimation);
                if (callback) {
                    callback.fn.apply(callback.scope, callback.parameters)
                }
            } else {
                elt.style.opacity = opacity + 0.1;
            }
        }, duration || h107.defaults.ANIMATE_DURATION);
    }
};
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.base.BaseInput = function (settings) {
    'use strict';

    var defaults = {
        name: '',
        label: {
            attributes: {},
            text: ''
        },
        container: {
            attributes: {}
        }
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    if (!applySettings.name) {
        throw 'Input element: name is not defined';
    }
    h107.view.components.base.BaseInput.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.base.BaseInput, h107.view.components.base.BaseElement);

h107.view.components.base.BaseInput.prototype.validate = function () {
    'use strict';
    // TODO: update;
};

h107.view.components.base.BaseInput.prototype.assemble = function (input) {
    'use strict';

    if (!input) {
        throw 'BaseInput: no input defined';
    }

    var build = h107.DomProcessor.buildElement;
    var containerSettings = this.settings.container;
    var container = build('div', containerSettings.attributes);
    var labelSettings = this.settings.label;
    labelSettings.attributes.for = input.id;
    var label = build('label', labelSettings.attributes, labelSettings.text);

    container.appendChild(label);
    container.appendChild(input);

    return container;
};
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.components.base.BaseContainer = function (settings) {
    'use strict';
    var defaults = {
        attributes: {
        },
        components: []
    };

    this.components = {};
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.base.BaseContainer.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.base.BaseContainer, h107.view.components.base.BaseElement);

h107.view.components.base.BaseContainer.prototype.assemble = function (container) {
    'use strict';
    var self = this;
    var components = self.settings.components;
    components.map(function (current) {
        var component = h107.create(current);
        self.append(container, component);
    });
    return container;
};

h107.view.components.base.BaseContainer.prototype.append = function (container, component) {
    'use strict';
    this.components[component.settings.attributes.id] = component;
    container.appendChild(component.html);
};
/**
 * Created by Anton.Nekrasov on 6/10/2015.
 */
h107.view.components.base.Controllable = function (settings) {
    'use strict';
    h107.view.components.base.Controllable.superclass.constructor.call(this, settings);
    h107.controllerMap[settings.controller].registerView(this);
};

h107.extend(h107.view.components.base.Controllable, h107.view.components.base.BaseContainer);

h107.view.components.base.Controllable.prototype.assemble = function (container) {
    'use strict';
    return h107.view.components.base.Controllable.superclass.assemble.call(this, container);
};

h107.view.components.base.Controllable.prototype.getController = function () {
    'use strict';
    return h107.controllerMap[this.settings.controller];
};
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.TextInput = function (settings) {
    'use strict';

    var defaults = {
        attributes: {
            placeholder: ''
        }
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.TextInput.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.TextInput, h107.view.components.base.BaseInput);
h107.aliasMap.text = h107.view.components.TextInput;

h107.view.components.TextInput.prototype.assemble = function () {
    'use strict';

    var attributes = this.settings.attributes;
    attributes.type = 'text';
    attributes.name = this.settings.name;

    var input = h107.DomProcessor.buildElement('input', attributes);
    return h107.view.components.TextInput.superclass.assemble.call(this, input);
};
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.HiddenInput = function (settings) {
    'use strict';
    h107.view.components.HiddenInput.superclass.constructor.call(this, settings);
};

h107.extend(h107.view.components.HiddenInput, h107.view.components.base.BaseInput);
h107.aliasMap.hidden = h107.view.components.HiddenInput;

h107.view.components.HiddenInput.prototype.assemble = function () {
    'use strict';

    var attributes = this.settings.attributes;
    attributes.type = 'hidden';
    attributes.name = this.settings.name;

    var hidden = h107.DomProcessor.buildElement('input', attributes);
    return hidden;
    // return h107.view.components.TextInput.superclass.assemble.call(this, input);
};
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.Textarea = function (settings) {
    'use strict';

    var defaults = {
        attributes: {
            placeholder: '',
            style: {
                resize: 'vertical'
            }
        }
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.Textarea.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.Textarea, h107.view.components.base.BaseInput);
h107.aliasMap.textarea = h107.view.components.Textarea;

h107.view.components.Textarea.prototype.assemble = function () {
    'use strict';
    var attributes = this.settings.attributes;
    attributes.name = this.settings.name;

    var input = h107.DomProcessor.buildElement('textarea', attributes);
    return h107.view.components.Textarea.superclass.assemble.call(this, input);
};
/**
 * Created by Anton.Nekrasov on 5/25/2015.
 */
h107.view.components.Table = function (settings) {
    'use strict';

    // todo: check wtf is happening with dom component;
    var defaults = {
        name: '',
        attributes: {
            placeholder: ''
        }
    };

    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.Table.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.Table, h107.view.components.base.BaseElement);
h107.aliasMap.table = h107.view.components.Table;

h107.view.components.Table.prototype.assemble = function () {
    'use strict';

    var build = h107.DomProcessor.buildElement;
    var table = build('table', this.settings);
    var thead = build('thead');
    var th = build('th');
    var td = build('td', {}, 'test'); // todo: remove;

    th.appendChild(td); // todo: remove;
    thead.appendChild(th);
    table.appendChild(thead);

    return table;
};
h107.view.components.Button = function (settings) {
    'use strict';

    var defaults = {
        id: '',
        text : ''
    };

    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.Button.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.Button, h107.view.components.base.BaseElement);

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
 * Created by Anton.Nekrasov on 5/25/2015.
 */
h107.view.components.Section = function (settings) {
    'use strict';

    var defaults = {
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.Section.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.Section, h107.view.components.base.BaseContainer);
h107.aliasMap.section = h107.view.components.Section;

h107.view.components.Section.prototype.assemble = function () {
    'use strict';

    var sectionSettings = this.settings.attributes;
    var section = h107.DomProcessor.buildElement('div', sectionSettings);

    return h107.view.components.Section.superclass.assemble.call(this, section);
};
/**
 * Created by Anton.Nekrasov on 5/26/2015.
 */
h107.view.View = function (settings) {
    'use strict';
    var defaults = {
        'class': 'h107-hidden',
        attributes: {
            style: {
                opacity: 0
            }
        }
    };

    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.View.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.View, h107.view.components.base.Controllable);
h107.aliasMap.view = h107.view.View;

h107.view.View.prototype.assemble = function () {
    'use strict';
    var viewSettings = this.settings.attributes;
    var view = h107.DomProcessor.buildElement('div', viewSettings);
    return h107.view.View.superclass.assemble.call(this, view);
};

h107.view.View.prototype.isActive = function () {
    'use strict';
    return !!this.settings.active;
};

h107.view.View.prototype.desActivate = function (duration, callback) {
    'use strict';
    this.settings.active = false;
    if (duration === 0) {
        this.hide(callback);
    } else {
        this.fadeOut(duration, callback);
    }
};

h107.view.View.prototype.activate = function (duration, callback) {
    'use strict';
    var settings = this.settings;
    settings.active = true;
    var state = {
        view: settings.id,
        controller: this.getController().name
    }
    h107.History.changeRoute(state, settings.name, settings.url);
    if (duration === 0) {
        this.show(callback);
    } else {
        this.fadeIn(duration, callback);
    }
};
/**
 * Created by Anton.Nekrasov on 5/26/2015.
 */
h107.view.CardView = function (settings) {
    'use strict';
    var defaults = {
        components: [],
        attributes: {
            style: {
                position: 'relative'
            }
        }
    };

    // this.components = {};
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.CardView.superclass.constructor.call(this, applySettings);
    var activeView = this.getActiveView();
    if (activeView) {
        this.setActive(activeView.settings.id);
    }
};

h107.extend(h107.view.CardView, h107.view.components.base.Controllable);
h107.aliasMap.cardview = h107.view.CardView;

h107.view.CardView.prototype.assemble = function () {
    'use strict';
    var self = this;
    var cardView = h107.DomProcessor.buildElement('div', this.settings.attributes);
    var viewList = self.settings.components;
    viewList.map(function (current) {
        var view = h107.create(current);
        if (!(view instanceof h107.view.View)) {
            throw 'CardView can only accept h107.view.View object types';
        }
        self.append(view);
    });
    return cardView;
};

h107.view.CardView.prototype.append = function (component) {
    'use strict';
    this.components[component.settings.attributes.id] = component;
};

h107.view.CardView.prototype.getActiveView = function () {
    'use strict';
    for (var id in this.components) {
        if (this.components.hasOwnProperty(id) && this.components[id].isActive()) {
            return this.components[id];
        }
    }
};

h107.view.CardView.prototype.setActive = function (id, duration) {
    'use strict';
    var currentView = this.getActiveView();
    var newView = this.components[id];
    this.html.innerHTML = '';
    this.html.appendChild(newView.html);
    if (currentView) {
        currentView.desActivate(duration || h107.defaults.DURATION, new h107.Callback(
            newView.activate,
            newView,
            [duration || h107.defaults.DURATION]
        ));
    } else {
        newView.activate(duration || h107.defaults.DURATION);
    }
};
/**
 * Created by Anton.Nekrasov on 5/22/2015.
 */
h107.view.FormView = function (settings) { // todo: make it extending view ?
    'use strict';

    var defaults = {
        action: '',
        method: 'POST'
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.FormView.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.FormView, h107.view.components.base.Controllable);
h107.aliasMap.form = h107.view.FormView;

h107.view.FormView.prototype.assemble = function () {
    'use strict';

    var formSettings = this.settings.attributes;
    formSettings.action = this.settings.action;
    formSettings.method = this.settings.method;
    var form = h107.DomProcessor.buildElement('form', formSettings);
    return h107.view.FormView.superclass.assemble.call(this, form);
};

h107.view.FormView.prototype.isDirty = function () {
    'use strict';
    // todo: implement;
};

h107.view.FormView.prototype.validate = function () {
    'use strict';
    // todo: implement;
};

h107.view.FormView.prototype.submit = function () {
    'use strict';
    // todo: implement;
};

h107.view.FormView.prototype.loadRecord = function (record) {
    'use strict';
    console.log(record);
    // todo: implement;
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
/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.BaseController = function () {
    'use strict';
    this.__views = [];
    this.__subscriptions = [];
};

h107.BaseController.prototype.registerView = function (view) {
    'use strict';
    var mandatorySettings = ['id', 'url', 'controller'];
    mandatorySettings.map(function (property) {
        if (!view.settings[property]) {
            throw property + ' field is mandatory for controllable View';
        }
    });
    this.__views.push(view);
    this.__subscriptions.map(function (listener) {
        listener(view.html);
    });
}

h107.BaseController.prototype.navigate = function (viewId, callback, duration) { // todo: implement;
    'use strict';
    var view = this.getView(viewId);
    if (!view) {
        for (var controller in h107.controllerMap) {
            if (h107.controllerMap.hasOwnProperty(controller) && h107.controllerMap[controller] !== this) {
                var check = h107.controllerMap[controller].getView(viewId);
                if (check) {
                    view = check; // todo : optimize this shit;
                }
            }
        }
    }
    view.activate(duration || h107.defaults.DURATION, callback);
};

h107.BaseController.prototype.getController = function (controller) {
    'use strict';
    return h107.controllerMap[controller];
};

h107.BaseController.prototype.getView = function (id) { // todo: review the code;
    'use strict';
    var result;
    this.__views.map(function (view) {
        if (view.settings.id === id) {
            result = view;
        }
    });
    return result;
};

// h107.BaseController.prototype.getViewByUrl = function (url) {
//     'use strict';
//     var result;
//     this.__views.map(function (view) {
//         if (view.settings.url === url) {
//             result = view;
//         }
//     });
//     return result;
// };

h107.BaseController.prototype.addEventListener = function () {
    'use strict';
    return document.addEventListener || document.attachEvent
}

h107.BaseController.prototype.view = function (id) {
    'use strict'
    var self = this;
    return {
        onactive: function (fn) {
            self.addEventListener(h107.defaults.ACTIVATION_EVENT, function () {
                self.__views.filter(function (elt) {
                    if (id) {
                        return elt.settings.id === id
                    }
                    return true;
                }).map(function (view) {
                    fn.apply(view);
                });
            });
        }
    }
}

h107.BaseController.prototype.subscribe = function (selector) { // todo : check how we can subscribe dynamically added components
    'use strict';
    var self = this;
    return {
        on: function (event, callback) {
            var subscription = function (view) {
                var elements = view.querySelectorAll(selector);
                h107.BaseController.addListener(elements, event, callback);
            };
            self.__subscriptions.push(subscription);
        }
    }
};

h107.BaseController.addListener = function (elements, event, callback) {
    'use strict';
    var forEach = Array.prototype.forEach;
    forEach.call(elements, function (elt) {
        elt.addEventListener(event, function () {
            callback.apply(elt);
        }, false);
    });
};
h107.App = (function () {
    'use strict';

    function launch(landing) {
        var cardview = h107.create({
            component: landing
        });

        if (!(cardview instanceof h107.view.CardView)) {
            throw 'landing view can only be of type h107.view.CardView';
        }
        document.body.appendChild(cardview.html);
    }

    return {
        launch: launch
    }

}) ();