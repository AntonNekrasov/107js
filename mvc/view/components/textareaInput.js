/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.Textarea = function () {
    'use strict';
    // todo: add defaults;
    h107.view.component.Textarea.superclass.constructor.call(this);
};

h107.extend(h107.view.component.Textarea, h107.view.component.BaseInput);

h107.view.component.Textarea.prototype.assemble = function () {
    'use strict';

    var input = h107.DomProcessor.buildElement('textarea');
    return h107.view.component.Textarea.superclass.assemble.call(this, input);
};