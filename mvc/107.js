/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
var h107 = (function () {
    'use strict';

    function aliasMap() {
        return {
            text: h107.view.components.TextInput,
            textarea: h107.view.components.Textarea,
            hidden: h107.view.components.HiddenInput,
            custom: h107.view.components.CustomElement,
            section: h107.view.components.Section,
            table: h107.view.components.Table,
            form: h107.view.FormView
        };
    }

    /**
     * adds new component to the component set
     *
     * @param component to be added
     */
    function define(component) {
        // todo: define alias, do validation etc;
        // add extension, where it is needed;
        if (aliasMap()[component.alias]) {
            throw 'alias ' + component.alias + ' is already in use by other component';
        }
    }

    /**
     * returns function-constructor by it's alias
     *
     * @param alias - given alias
     */
    function identifyObjectByAlias(alias) {
        var _aliasMap = aliasMap();
        var constructor = _aliasMap[alias];
        if (!constructor) {
            throw 'identifyObjectByAlias: no match found for alias ' + alias;
        }
        return _aliasMap[alias];
    }

    /**
     * creates an instance of component by given alias
     *
     * @param alias - alias
     * @param settings - a set of arguments for constructor
     */
    function create(alias, settings) {
        var Component = identifyObjectByAlias(alias);
        return new Component(settings);
    }

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
        create: create,
        mergeObjects: mergeObjects,
        extend: extend,
        generateId: generateId,
        isObject: isObject
    };

})();

h107.view = {};
h107.view.components = {};
h107.view.components.base = {};
h107.controller = {};
h107.model = {};

h107.callback = function Callback(fn, scope, parameters) {
    'use strict';
    this.fn = fn;
    this.scope = scope;
    this.parameters = parameters;
};