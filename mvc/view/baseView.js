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