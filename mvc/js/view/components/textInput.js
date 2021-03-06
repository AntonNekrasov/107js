/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.TextInput = function (settings) {
    'use strict';

    var defaults = {
        attributes: {
            placeholder: ''
        }
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.TextInput.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.TextInput, h107.view.components.base.BaseInput);
h107.aliasMap.text = h107.view.components.TextInput;

h107.view.components.TextInput.prototype.assemble = function () {
    'use strict';

    var attributes = this.settings.attributes;
    attributes.type = 'text';
    attributes.name = this.settings.name;

    var input = h107.DomProcessor.buildElement('input', attributes);
    return h107.view.components.TextInput.superclass.assemble.call(this, input);
};