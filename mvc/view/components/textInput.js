/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.TextInput = function (settings) {
    'use strict';

    var defaults = {
        text: {
            name: '',
            attributes: {
                placeholder: ''
            },
            text: ''
        }
    };

    var applySettings = h107.mergeObjects(defaults, settings);

    if (!applySettings.text.name) {
        throw 'TextInput: name is not defined';
    }

    h107.view.components.TextInput.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.TextInput, h107.view.components.base.BaseInput);

h107.view.components.TextInput.prototype.assemble = function () {
    'use strict';

    // todo: attributes ????
    var input = h107.DomProcessor.buildElement('input', {
        type: 'text',
        name: this.settings.text.name
    });
    return h107.view.components.TextInput.superclass.assemble.call(this, input);
};