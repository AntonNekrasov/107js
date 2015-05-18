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