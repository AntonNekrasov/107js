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
h107.aliasMap.cardview = h107.view.CardView;

h107.view.CardView.prototype.assemble = function () {
    'use strict';

    this.__transformViewsIntoCards();
    var cardSettings = this.settings.attributes;
    var card = h107.DomProcessor.buildElement('div', cardSettings);

    return h107.view.CardView.superclass.assemble.call(this, card);
};

h107.view.CardView.prototype.getActiveView = function () {
    console.log(this.components);
};

// todo: add check for view components allowed;
h107.view.CardView.prototype.__transformViewsIntoCards = function () {
    'use strict';

    var components = this.settings.components;
    var updatedComponents = [];
    var append = {
        attributes: {
            'class': 'h107-hidden'
        }
    };
    for (var i = 0, length = components.length; i < length; i++) {
        var component = components[i];
        if (!component.active) {
            component = h107.mergeObjects(component, append);
        }
        updatedComponents.push(component);
    }
    this.settings.components = updatedComponents;
};