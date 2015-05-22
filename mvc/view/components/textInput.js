/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.TextInput = function (settings) {
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

    h107.view.component.TextInput.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.component.TextInput, h107.view.component.base.BaseInput);

h107.view.component.TextInput.prototype.assemble = function () {
    'use strict';
    // todo: attributes ????
    var input = h107.DomProcessor.buildElement('input', {
        type: 'text',
        name: this.settings.text.name
    });
    return h107.view.component.TextInput.superclass.assemble.call(this, input);
};