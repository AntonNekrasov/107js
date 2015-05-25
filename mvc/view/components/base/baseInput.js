/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.components.base.BaseInput = function (settings) {
    'use strict';

    var defaults = {
        name: '',
        label: {
            attributes: {},
            text: ''
        },
        container: {
            attributes: {}
        }
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.base.BaseInput.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.base.BaseInput, h107.view.components.base.BaseElement);

h107.view.components.base.BaseInput.prototype.validate = function () {
    'use strict';
    // TODO: update;
};

h107.view.components.base.BaseInput.prototype.assemble = function (input) {
    'use strict';

    if (!input) {
        throw 'BaseInput: no input defined';
    }

    var build = h107.DomProcessor.buildElement;
    var containerSettings = this.settings.container;
    var container = build('div', containerSettings.attributes);
    var labelSettings = this.settings.label;
    labelSettings.attributes.for = input.id;
    var label = build('label', labelSettings.attributes, labelSettings.text);

    container.appendChild(label);
    container.appendChild(input);

    return container;
};