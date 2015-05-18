/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
var h107 = (function(){
    "use strict";

    /**
     * merges all the properties of two objects
     *
     * @param target - target object, to be extended
     * @param extending - object, which extends target. Properties of extending will override those matching in target
     */
    function mergeObjects(target, extending) {
        var aggregate = {},
            property;

        if(!extending) {
            return target;
        }

        for (property in target) {
            if (target.hasOwnProperty(property)) {
                aggregate[property] = extending[property] ? extending[property] : target[property];
            }
        }

        for (property in extending) {
            if(extending.hasOwnProperty(property) && !target[property]) {
                aggregate[property] = extending[property];
            }
        }

        return aggregate;
    }

    function extend(Child, Parent) {
        var F = function () { };
        F.prototype = Parent.prototype;

        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;
    }

    return {
        mergeObjects: mergeObjects,
        extend: extend
    };

})();

h107.view = {};
h107.controller = {};
h107.model = {};
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.NodeConstructor = (function () {
    "use strict";
    /**
     * constructs Node element
     *
     * @param nodeType - the type of node (e.g. div, span etc);
     * @param attributes - key value associative array, containing all the list of attributes, to be applied.
     *      Value can be either string, or array of strings (e.g. {class: ['first', 'second']})
     * @param innerText - innerText to be put into the node, if needed
     */
    function buildElement(nodeType, attributes, innerText) {
        var ID_MAX_LENGTH = 10,
            defaults = {
                "id": generateId(ID_MAX_LENGTH)
            },
            allAttributes = h107.mergeObjects(defaults, attributes),
            elt = document.createElement(nodeType),
            property;

        for (property in allAttributes) {
            if (allAttributes.hasOwnProperty(property)) {
                applyAttribute(property, allAttributes[property]);
            }
        }

        if (innerText) {
            elt.innerText = innerText;
            elt.textContent = innerText;
        }

        /**
         * auxiliary function, which set attributes of any kind (strings, arrays, objects etc)
         *
         * @param name - the name of attribute
         * @param value - the value of attribute
         */
        function applyAttribute(name, value) {
            if (Object.prototype.toString.call(value) === "[object Object]") {
                var attrValue = "",
                    subProperty;
                for (subProperty in value) {
                    if (value.hasOwnProperty(subProperty)) {
                        attrValue += subProperty + ":" + value[subProperty] + ";";
                    }
                }
                elt.setAttribute(name, attrValue);
            } else {
                elt.setAttribute(name, value);
            }
        }

        return elt;
    }

    /**
     * generates random id
     *
     * @param maxLength - maximum id length
     */
    function generateId(maxLength) {
        var text = "",
            length = getRandomInt(1, maxLength),
            range = "abcdefghijklmnopqrstuvwxyz",
            i;

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
        buildElement: buildElement
    };
})();
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.BaseElement = function () {
    "use strict";
};

h107.view.BaseElement.prototype = {
    constructor: h107.BaseElement,
    render: function(){

    }
};
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.BaseView = function (settings) {
    "use strict";

    var defaults = {
            attributes: ""
        },
        applySettings = h107.mergeObjects(defaults, settings),
        elt = h107.NodeConstructor.buildElement("div", applySettings.attributes);

    return elt;
};

h107.extend(h107.view.BaseView, h107.view.BaseElement);

h107.view.BaseView.prototype.createChildren = function (reason, message) {
    "use strict";


};
/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */

h107.ajax = function(settings) {
    "use strict";

    var self = this,
        defaults = {
            "type": "GET",
            "url": "",
            "data": {},
            "dataType": "text",
            "success": null,
            "error": null,
            "always": null,
            "reply": "reply",
            "cached": true
        },
        applySettings = rpApp.mergeLeft(defaults, settings),
        xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");

    xmlHttp.onreadystatechange = function() {
        var s,
            params = {};

        if (xmlHttp.readyState === 4 && xmlHttp.status === 200 && applySettings.success) {
            s = applySettings.success;
        } else if(applySettings.error) {
            s = applySettings.error;
        }

        if(s) {
            params = s.parameters;
            if(xmlHttp.response) {
                params[s.reply] = xmlHttp.response;
            }
            s.fn.apply(s.scope ? s.scope : self, [params]);
        }

        if(applySettings.always) {
            params = applySettings.always.parameters;
            if(xmlHttp.response) {
                params[s.reply] = xmlHttp.response;
            }
            applySettings.always.fn.apply(applySettings.always.scope ? applySettings.always.scope : self, [params]);
        }

    };

    xmlHttp.open(applySettings.type,
        applySettings.cached ? applySettings.url : applySettings.url + "?_c=" + Math.random(),
        true);

    xmlHttp.responseType = applySettings.type;
    xmlHttp.send();

};