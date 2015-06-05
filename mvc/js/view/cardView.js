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
    var assembled = h107.view.CardView.superclass.assemble.call(this, card);
    for (var id in this.components) { // use map & arrow function
        //console.log(id);
        //console.log(this.components[id].html);
        if (this.components.hasOwnProperty(id) && !(this.components[id] instanceof h107.view.View)) {
            throw 'CardView can only accept h107.view.View object types';
        }
    }
    return assembled;
};

h107.view.CardView.prototype.getActiveView = function () {
    'use strict';
    for (var id in this.components) {
        if (this.components.hasOwnProperty(id) && this.components[id].isActive()) {
            return this.components[id];
        }
    }
};

h107.view.CardView.prototype.setActive = function (id, duration) {
    'use strict';
    var currentView = this.getActiveView();
    var DEFAULT_DURATION = 15;
    var newView = this.components[id];
    currentView.desActivate(duration || DEFAULT_DURATION, new h107.Callback(
        newView.activate,
        newView,
        [duration || DEFAULT_DURATION]
    ));
};

h107.view.CardView.prototype.__transformViewsIntoCards = function () {
    'use strict';
    var components = this.settings.components;
    var updatedComponents = [];
    var settings = {
        attributes: {
            'class': 'h107-hidden',
            style: {
                opacity: 0
            }
        }
    };
    var activeSettings = {
        attributes: {
            style: {
                opacity: 1
            }
        }
    };

    components.map(function (component) {
        if (component.active) {
            component = h107.mergeObjects(component, activeSettings);
        } else {
            component = h107.mergeObjects(component, settings);
        }
        updatedComponents.push(component);
    });

    this.settings.components = updatedComponents;
};