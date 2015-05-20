/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.HiddenInput = function () {
    'use strict';
    h107.view.component.HiddenInput.superclass.constructor.call(this);
};

h107.extend(h107.view.component.HiddenInput, h107.view.component.BaseInput);

h107.view.component.HiddenInput.prototype.assemble = function () {
    'use strict';
    var hidden = h107.DomProcessor.buildElement('input', {
        type: 'hidden'
    });
    return hidden;
};