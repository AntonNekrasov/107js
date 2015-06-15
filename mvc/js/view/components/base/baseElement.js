/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.components.base.BaseElement = function (settings) {
    'use strict';

    var ID_MAX_LENGTH = 10;
    var ID_MIN_LENGTH = 5;

    var defaults = {
        attributes: {
            id: settings.id || h107.generateId(ID_MIN_LENGTH, ID_MAX_LENGTH)
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
    hide: function () {
        'use strict';
        h107.DomProcessor.addClassName(this.html, 'h107-hidden');

    },
    show: function () {
        'use strict';
        h107.DomProcessor.removeClassName(this.html, 'h107-hidden');
    },
    fadeOut: function (duration, callback) {
        'use strict';
        var self = this;
        var DEFAULT_DURATION = 30;
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
        }, duration || DEFAULT_DURATION);
    },
    fadeIn: function (duration, callback) {
        'use strict';
        var self = this;
        var fadeInAnimation;
        var elt = self.html;
        var DEFAULT_DURATION = 30;
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
        }, duration || DEFAULT_DURATION);
    }
};