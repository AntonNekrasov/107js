/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.TextInput = function (settings) {
    'use strict';

    var defaults = {
        name: '',
        attributes: {
            placeholder: ''
        },
        text: ''
    };

    var applySettings = h107.mergeObjects(defaults, settings);

    if (!applySettings.name) {
        throw 'TextInput: name is not defined';
    }

    h107.view.components.TextInput.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.TextInput, h107.view.components.base.BaseInput);

h107.view.components.TextInput.prototype.assemble = function () {
    'use strict';
    console.log(this.settings);
    var attributes = this.settings.attributes;
    attributes.type = 'text';
    attributes.name = this.settings.name;

    var input = h107.DomProcessor.buildElement('input', attributes);
    return h107.view.components.TextInput.superclass.assemble.call(this, input);
};