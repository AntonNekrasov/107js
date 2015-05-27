/**
 * Created by Anton.Nekrasov on 5/22/2015.
 */
h107.view.FormView = function (settings) {
    'use strict';

    var defaults = {
        action: '',
        method: 'POST'
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.FormView.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.FormView, h107.view.components.base.BaseContainer);
h107.aliasMap.form = h107.view.FormView;

h107.view.FormView.prototype.assemble = function () {
    'use strict';

    var formSettings = this.settings.attributes;
    formSettings.action = this.settings.action;
    formSettings.method = this.settings.method;
    var form = h107.DomProcessor.buildElement('form', formSettings);
    return h107.view.FormView.superclass.assemble.call(this, form);
};

h107.view.FormView.prototype.isDirty = function () {
    'use strict';
    // todo: implement;
};

h107.view.FormView.prototype.validate = function () {
    'use strict';
    // todo: implement;
};

h107.view.FormView.prototype.submit = function () {
    'use strict';
    // todo: implement;
};

h107.view.FormView.prototype.loadRecord = function (record) {
    'use strict';
    console.log(record);
    // todo: implement;
};