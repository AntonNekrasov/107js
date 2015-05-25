/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.HiddenInput = function () {
    'use strict';
    h107.view.components.HiddenInput.superclass.constructor.call(this);
};

h107.extend(h107.view.components.HiddenInput, h107.view.components.base.BaseInput);

h107.view.components.HiddenInput.prototype.assemble = function () {
    'use strict';
    var hidden = h107.DomProcessor.buildElement('input', {
        type: 'hidden'
    });
    return hidden;
};