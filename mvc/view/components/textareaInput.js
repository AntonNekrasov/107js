/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.Textarea = function (settings) {
    'use strict';
    var defaults = {
        attributes: {
            placeholder: '',
            style: {
                resize: 'vertical'
            }
        }
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.Textarea.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.Textarea, h107.view.components.base.BaseInput);

h107.view.components.Textarea.prototype.assemble = function () {
    'use strict';
    var attributes = this.settings.attributes;
    attributes.name = this.settings.name;

    var input = h107.DomProcessor.buildElement('textarea', attributes);
    return h107.view.components.Textarea.superclass.assemble.call(this, input);
};