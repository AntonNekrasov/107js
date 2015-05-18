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
            allAttributes = mergeObjects(defaults, attributes),
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