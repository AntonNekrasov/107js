/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.BaseView = function (settings) {
    "use strict";

    var defaults = {
            "class": ""
        },
        applySettings = h107.mergeObjects(defaults, settings),
        elt = h107.NodeConstructor.buildElement("div", applySettings);

    return elt;
};

h107.extend(h107.BaseView, h107.BaseElement);

h107.BaseView.prototype.createChildren = function (reason, message) {
    "use strict";


};