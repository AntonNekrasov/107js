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