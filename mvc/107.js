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
    FADEOUT_DURATION: 30,
    ID_MAX_LENGTH: 10,
    ID_MIN_LENGTH: 5
}

h107.Callback = function (fn, scope, parameters) {
    'use strict';
    this.fn = fn;
    this.scope = scope;
    this.parameters = parameters;
};