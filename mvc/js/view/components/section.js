/**
 * Created by Anton.Nekrasov on 5/25/2015.
 */
h107.view.components.Section = function (settings) {
    'use strict';

    var defaults = {
    };
    var applySettings = h107.mergeObjects(defaults, settings);
    h107.view.components.Section.superclass.constructor.call(this, applySettings);
};

h107.extend(h107.view.components.Section, h107.view.components.base.BaseContainer);
h107.aliasMap.section = h107.view.components.Section;

h107.view.components.Section.prototype.assemble = function () {
    'use strict';

    var sectionSettings = this.settings.attributes;
    var section = h107.DomProcessor.buildElement('div', sectionSettings);

    return h107.view.components.Section.superclass.assemble.call(this, section);
};