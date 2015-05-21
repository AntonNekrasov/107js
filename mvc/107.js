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

    /**
     * checks if given argument is object
     *
     * @param arg - argument to be checked
     */
    function isObject(arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    }

    return {
        mergeObjects: mergeObjects,
        extend: extend,
        isObject: isObject
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