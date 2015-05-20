/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.TextInput = function () {
    'use strict';
    // todo: add defaults;
    h107.view.component.TextInput.superclass.constructor.call(this);
};

h107.extend(h107.view.component.TextInput, h107.view.component.BaseInput);

h107.view.component.TextInput.prototype.assemble = function () {
    'use strict';

    var input = h107.DomProcessor.buildElement('input', {
        type: 'text'
    });
    return h107.view.component.TextInput.superclass.assemble.call(this, input);
};