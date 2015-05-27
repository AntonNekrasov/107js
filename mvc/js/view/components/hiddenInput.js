/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.HiddenInput = function (settings) {
    'use strict';
    h107.view.components.HiddenInput.superclass.constructor.call(this, settings);
};

h107.extend(h107.view.components.HiddenInput, h107.view.components.base.BaseInput);
h107.aliasMap.hidden = h107.view.components.HiddenInput;

h107.view.components.HiddenInput.prototype.assemble = function () {
    'use strict';

    var attributes = this.settings.attributes;
    attributes.type = 'hidden';
    attributes.name = this.settings.name;

    var hidden = h107.DomProcessor.buildElement('input', attributes);
    return hidden;
    // return h107.view.components.TextInput.superclass.assemble.call(this, input);
};