/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.BaseController = function () {
    'use strict';
    this.__views = [];
    this.__subscriptions = [];
};

h107.BaseController.prototype.registerView = function (view) {
    'use strict';
    var mandatorySettings = ['url', 'controller'];
    mandatorySettings.map(function (property) {
        if (!view.settings[property]) {
            throw property + ' field is mandatory for controllable View';
        }
    });
    this.__views.push(view);
    this.__subscriptions.map(function (listener) {
        listener(view.html);
    });
}

h107.BaseController.prototype.navigate = function (view) { // todo: implement;
    'use strict';
    console.log(view);
};

h107.BaseController.prototype.getController = function (controller) {
    'use strict';
    return h107.controllerMap[controller];
};

h107.BaseController.prototype.getView = function (id) {
    'use strict';
    var result;
    this.__views.map(function (view) {
        if (view.settings.id === id) {
            result = view;
        }
    });
    return result;
};

h107.BaseController.prototype.subscribe = function (selector) {
    'use strict';
    var self = this;
    return {
        on: function (event, callback) {
            var subscription = function (view) {
                var elements = view.querySelectorAll(selector);
                h107.BaseController.addListener(elements, event, callback);
            };
            self.__subscriptions.push(subscription);
        }
    }
};

h107.BaseController.addListener = function (elements, event, callback) {
    'use strict';
    var forEach = Array.prototype.forEach;
    forEach.call(elements, function (elt) {
        elt.addEventListener(event, function () {
            callback.apply(elt);
        }, false);
    });
};


// h107.BaseController.prototype.subscribe = function (selector) {
//     'use strict';
//     var self = this;
//     var forEach = Array.prototype.forEach;
//     return {
//         on: function (event, callback) {
//             self.__subscriptions.push(function (view) {
//                 var elements = view.querySelectorAll(selector);
//                 forEach.call(elements, function (elt) {
//                     elt.addEventListener(event, function () {
//                         callback.apply(elt);
//                     }, false);
//                 });
//             });
//         }
//     }
// };