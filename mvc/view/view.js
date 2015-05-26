/**
 * Created by Anton.Nekrasov on 5/26/2015.
 */
h107.view.View = function (settings) {
    'use strict';

    this.url = '';

    var defaults = {
    };

    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.View.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.View, h107.view.components.base.BaseContainer);

h107.view.View.prototype.assemble = function () {
    'use strict';

    var viewSettings = this.settings.attributes;
    var view = h107.DomProcessor.buildElement('div', viewSettings);
    return h107.view.View.superclass.assemble.call(this, view);
};