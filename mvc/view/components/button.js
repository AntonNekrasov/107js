h107.view.components.Button = function (settings) {
    'use strict';

    var defaults = {
        id: '',
        text : ''
    };

    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.Button.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.Button, h107.view.components.base.BaseElement);

// rpApp.view.components.form.Button.prototype.render = function() {
//     "use strict";

// var self = this,
// formElement = rpApp.view.components.form.Button.superclass.render.call(this),
// button = document.createElement("div"),
// id = self.settings.id;

// button.addClassName(self.settings.class);
// button.setAttribute("class", self.settings.class);
// button.id = id;

// button.innerText = self.settings.text;
// button.textContent = self.settings.text;

// formElement.appendChild(button);

// self.html = formElement;

// return formElement;
// };