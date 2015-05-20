/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.view.component.BaseInput = function (settings) {
    'use strict';

    var defaults = {
        name: '', // todo: think over it;
        label: {
            attributes: [],
            text: ''
        },
        container: {
            attributes: []
        }
    };
    this.settings = h107.mergeObjects(defaults, settings);
    this.html = this.assemble();
};

h107.extend(h107.view.component.BaseInput, h107.view.BaseElement);

h107.view.component.BaseInput.prototype.validate = function () {
    'use strict';
    // TODO: update;
};

h107.view.component.BaseInput.prototype.assemble = function (input) {
    'use strict';

    if (!input) {
        throw 'BaseInput: no input defined';
    }
    var build = h107.DomProcessor.buildElement;
    var container = build('div');
    var labelAttributes = this.settings.label.attributes;

    labelAttributes.for = input.id;
    var label = build('label', labelAttributes, this.settings.label.text);

    container.appendChild(label);
    container.appendChild(input);

    return container;
};

