/**
 * Created by Anton.Nekrasov on 5/22/2015.
 */
h107.view.components.CustomElement = function (settings) {
    'use strict';

    var alias = 'custom';
    var defaults = {
        html: '<div></div>'
    };

    var applySettings = h107.mergeObjects(defaults, settings);

    if (!applySettings.text.name) {
        throw 'CustomElement: name is not defined';
    }

    h107.view.components.CustomElement.superclass.constructor.call(this, applySettings);
    h107.aliasMap[alias] = h107.view.components.custom;
};

h107.extend(h107.view.components.CustomElement, h107.view.components.base.BaseElement);

h107.view.components.CustomElement.prototype.assemble = function () {
    'use strict';
    // todo: attributes ????
    // var input = h107.DomProcessor.buildElement('input', {
    //    type: 'text',
    //    name: this.settings.text.name
    // });
    // return h107.view.components.CustomElement.superclass.assemble.call(this, input);
    throw 'not implemented yet';
};