/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.Textarea = function () {
    'use strict';
    // todo: add defaults;
    h107.view.components.Textarea.superclass.constructor.call(this);
};

h107.extend(h107.view.components.Textarea, h107.view.components.base.BaseInput);

h107.view.components.Textarea.prototype.assemble = function () {
    'use strict';
    // todo: attributes;
    var input = h107.DomProcessor.buildElement('textarea');
    return h107.view.components.Textarea.superclass.assemble.call(this, input);
};