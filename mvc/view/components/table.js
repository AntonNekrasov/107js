/**
 * Created by Anton.Nekrasov on 5/25/2015.
 */
h107.view.components.Table = function (settings) {
    'use strict';

    var defaults = {
        name: '',
        attributes: {
            placeholder: ''
        }
    };

    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.Table.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.Table, h107.view.components.base.BaseElement);

h107.view.components.Table.prototype.assemble = function () {
    'use strict';
    // todo: attributes ????
    // var input = h107.DomProcessor.buildElement('input', {
    //    type: 'text',
    //    name: this.settings.text.name
    // });
    // return h107.view.components.Table.superclass.assemble.call(this, input);
    return h107.DomProcessor.buildElement('table');
};