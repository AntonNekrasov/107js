/**
 * Created by Anton.Nekrasov on 5/26/2015.
 */
h107.view.CardView = function (settings) {
    'use strict';
    var defaults = {
        components: [],
        attributes: {
            style: {
                position: 'relative'
            }
        }
    };

    // this.components = {};
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.CardView.superclass.constructor.call(this, applySettings);
    var activeView = this.getActiveView();
    if (activeView) {
        this.setActive(activeView.settings.id);
    }
};

h107.extend(h107.view.CardView, h107.view.components.base.Controllable);
h107.aliasMap.cardview = h107.view.CardView;

h107.view.CardView.prototype.assemble = function () {
    'use strict';
    var self = this;
    var cardView = h107.DomProcessor.buildElement('div', this.settings.attributes);
    var viewList = self.settings.components;
    viewList.map(function (current) {
        var view = h107.create(current);
        if (!(view instanceof h107.view.View)) {
            throw 'CardView can only accept h107.view.View object types';
        }
        self.append(view);
    });
    return cardView;
};

h107.view.CardView.prototype.append = function (component) {
    'use strict';
    this.components[component.settings.attributes.id] = component;
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
    var newView = this.components[id];
    this.html.innerHTML = '';
    this.html.appendChild(newView.html);
    if (currentView) {
        currentView.desActivate(duration || h107.defaults.DURATION, new h107.Callback(
            newView.activate,
            newView,
            [duration || h107.defaults.DURATION]
        ));
    } else {
        newView.activate(duration || h107.defaults.DURATION);
    }
};