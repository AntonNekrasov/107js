/**
 * Created by Anton.Nekrasov on 6/10/2015.
 */
h107.view.components.base.Controllable = function (settings) {
    'use strict';
    h107.view.components.base.Controllable.superclass.constructor.call(this, settings);
    h107.controllerMap[settings.controller].registerView(this);
    
};

h107.extend(h107.view.components.base.Controllable, h107.view.components.base.BaseContainer);

h107.view.components.base.Controllable.prototype.assemble = function (container) {
    'use strict';
    return h107.view.components.base.Controllable.superclass.assemble.call(this, container);
};

h107.view.components.base.Controllable.prototype.getController = function () {
    'use strict';
    return h107.controllerMap[this.settings.controller];
};