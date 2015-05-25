/**
 * Created by Anton.Nekrasov on 5/18/2015.
 */
h107.view.components.base.BaseContainer = function (settings) {
    'use strict';
    var defaults = {
        attributes: '',
        components: []
    };

    this.components = {};
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.base.BaseContainer.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.base.BaseContainer, h107.view.components.base.BaseElement);


h107.view.components.base.BaseContainer.prototype.assemble = function (container) {
    'use strict';
    var components = this.settings.components;
    for (var i = 0, length = components.length; i < length; i++) {
        var component = h107.create(components[i].component);
        this.append(container, component);
    }

    return container;
};

h107.view.components.base.BaseContainer.prototype.append = function (container, component) {
    'use strict';
    // this.components[component.id]
};