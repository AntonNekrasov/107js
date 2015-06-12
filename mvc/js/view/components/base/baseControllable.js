/**
 * Created by Anton.Nekrasov on 6/10/2015.
 */
h107.view.components.base.Controllable = function (settings) {
    'use strict';

    if (!settings.id) {
        throw 'id field is mandatory for controllable View';
    }

    if (!settings.url) {
        throw 'url field is mandatory for controllable View';
    }

    var applySettings = h107.mergeObjects(defaults, settings);
    applySettings.id = settings.id;
    h107.view.components.base.Controllable.superclass.constructor.call(this, applySettings);
    // this.bindController(settings.controller);
};

h107.extend(h107.view.components.base.Controllable, h107.view.components.base.BaseContainer);

h107.view.components.base.Controllable.prototype.assemble = function (container) {
    'use strict';
    return h107.view.components.base.Controllable.superclass.assemble.call(this, container);
};

h107.view.components.base.Controllable.prototype.getController = function () {
    'use strict';
    // todo: implement;
};

// h107.view.components.base.Controllable.prototype.bindController = function (id) {
//     'use strict';
//     var controller = h107.controllerMap[id];
//     if (!controller) {
//         throw 'no controller found';
//     }
//     this.controller = controller;
//     controller._registerView(this);
// };