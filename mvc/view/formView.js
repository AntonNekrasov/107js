/**
 * Created by Anton.Nekrasov on 5/22/2015.
 */
h107.view.FormView = function () {
    'use strict';
    // todo: add defaults;
    h107.view.FormView.superclass.constructor.call(this);
};

h107.extend(h107.view.FormView, h107.view.BaseView);

h107.view.FormView.prototype.assemble = function () {
    'use strict';

    var input = h107.DomProcessor.buildElement('form');
    // return h107.view.FormView.superclass.assemble.call(this, input);
};