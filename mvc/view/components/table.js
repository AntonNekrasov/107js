/**
 * Created by Anton.Nekrasov on 5/25/2015.
 */
h107.view.components.Table = function (settings) {
    'use strict';
    // todo: check wtf is happening with dom component;
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

    var build = h107.DomProcessor.buildElement;
    var table = build('table', this.settings);
    var thead = build('thead');
    var th = build('th');
    var td = build('td', {}, 'test'); // todo: remove;

    th.appendChild(td); // todo: remove;
    thead.appendChild(th);
    table.appendChild(thead);

    return table;
};