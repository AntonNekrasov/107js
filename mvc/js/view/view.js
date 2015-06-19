/**
 * Created by Anton.Nekrasov on 5/26/2015.
 */
h107.view.View = function (settings) {
    'use strict';
    var defaults = {
        'class': 'h107-hidden',
        attributes: {
            style: {
                opacity: 0
            }
        }
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.View.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.View, h107.view.components.base.Controllable);
h107.aliasMap.view = h107.view.View;

h107.view.View.prototype.assemble = function () {
    'use strict';
    var viewSettings = this.settings.attributes;
    var view = h107.DomProcessor.buildElement('div', viewSettings);
    return h107.view.View.superclass.assemble.call(this, view);
};

h107.view.View.prototype.isActive = function () {
    'use strict';
    return !!this.settings.active;
};

h107.view.View.prototype.desActivate = function (duration, callback) {
    'use strict';
    this.settings.active = false;
    if (duration === 0) {
        this.hide(callback);
    } else {
        this.fadeOut(duration, callback);
    }
};

h107.view.View.prototype.activate = function (duration, callback) {
    'use strict';
    var settings = this.settings;
    settings.active = true;
    h107.History.changeRoute(settings.id, settings.name, settings.url);
    if (duration === 0) {
        this.show(callback);
    } else {
        this.fadeIn(duration, callback);
    }
};