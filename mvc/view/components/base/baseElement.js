/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.components.base.BaseElement = function (settings) {
    'use strict';

    var ID_MAX_LENGTH = 10;
    var ID_MIN_LENGTH = 5;
    var defaults = {
        attributes: {
            id: h107.generateId(ID_MIN_LENGTH, ID_MAX_LENGTH)
        }
    };

    this.settings = h107.mergeObjects(defaults, settings);
    this.html = this.assemble();
};

h107.view.components.base.BaseElement.prototype = {
    constructor: h107.view.components.base.BaseElement,
    assemble: function () {

    }
};