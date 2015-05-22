/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.BaseView = function (settings) {
    'use strict';
    var defaults = {
        attributes: '',
        content : [{
            'name' : 'bookTitleSection',
            'bordered' : false,
            //'type': 'smth', view/modal/form/section // todo: update this;
            'class' : '',
            'id' : 'bookTitleSection',
            'items' : [{
                'type' : 'Text',
                'label' : 'Name',
                'class' : '',
                'placeholder' : 'type authors name here...',
                'validation' : {} // todo: update;
            }]
        }, {
            'items' : [{
                'type' : 'Table'
            }]
        }]

    };

    var applySettings = h107.mergeObjects(defaults, settings);
    var elt = h107.DomProcessor.buildElement('div', applySettings.attributes);

    return elt;
};

h107.extend(h107.view.BaseView, h107.view.BaseElement);

//h107.view.BaseView.prototype.createChildren = function () {
//    'use strict';
//
//
//};

h107.view.BaseView.prototype.assemble = function () {
    'use strict';

};