/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.components.base.BaseElement = function (settings) {
    'use strict';
    var defaults = {
        attributes: {
            id: settings.id || h107.generateId(h107.defaults.ID_MIN_LENGTH,
                h107.defaults.ID_MAX_LENGTH)
        }
    };
    this.settings = h107.mergeObjects(defaults, settings);
    this.html = this.assemble();
};

h107.view.components.base.BaseElement.prototype = {
    constructor: h107.view.components.base.BaseElement,
    assemble: function () {
        'use strict';
        throw 'method hasn\'t been specified';
    },
    hide: function (callback) {
        'use strict';
        h107.DomProcessor.addClassName(this.html, 'h107-hidden');
        if (callback) {
            callback.fn.apply(callback.scope, callback.parameters);
        }
    },
    show: function (callback) {
        'use strict';
        h107.DomProcessor.removeClassName(this.html, 'h107-hidden');
        if (callback) {
            callback.fn.apply(callback.scope, callback.parameters);
        }
    },
    fadeOut: function (duration, callback) {
        'use strict';
        var self = this;
        var elt = self.html;
        var fadeOutAnimation = setInterval(function () {
            var opacity = parseFloat(elt.style.opacity);
            if (opacity > 0) {
                self.html.style.opacity = opacity - 0.1;
            } else {
                clearInterval(fadeOutAnimation);
                self.hide();
                if (callback) {
                    callback.fn.apply(callback.scope, callback.parameters)
                }
            }
        }, duration || h107.defaults.ANIMATE_DURATION);
    },
    fadeIn: function (duration, callback) {
        'use strict';
        var self = this;
        var fadeInAnimation;
        var elt = self.html;
        self.show();
        fadeInAnimation = setInterval(function () {
            var opacity = parseFloat(elt.style.opacity);
            if (opacity >= 1) {
                clearInterval(fadeInAnimation);
                if (callback) {
                    callback.fn.apply(callback.scope, callback.parameters)
                }
            } else {
                elt.style.opacity = opacity + 0.1;
            }
        }, duration || h107.defaults.ANIMATE_DURATION);
    }
};