/**
 * Created by Anton.Nekrasov on 5/26/2015.
 */
h107.view.CardView = function (settings) {
    'use strict';

    var defaults = {
        attributes: {
            style: {
                position: 'relative'
            }
        }
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.CardView.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.CardView, h107.view.components.base.BaseContainer);

h107.view.CardView.prototype.assemble = function () {
    'use strict';
    var cardSettings = this.settings.attributes;
    var card = h107.DomProcessor.buildElement('form', cardSettings);
    return h107.view.CardView.superclass.assemble.call(this, card);
};