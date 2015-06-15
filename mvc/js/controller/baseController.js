/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.BaseController = function (viewAliases) {
    'use strict';
    var self = this;
    this.__views = [];
    if (h107.isArray(viewAliases)) {
        viewAliases.map(function (viewAlias) {
            self.registerView(viewAlias);
        });
    } else {
        self.registerView(viewAliases);
    }
};

h107.BaseController.prototype.registerView = function (viewAlias) {
	 var view = h107.routes[viewAlias];
	// if (!view) {
	// 	view = h107.create({component: viewAlias}); // todo: what if it has already been created?
	// }
    this.__views.push(viewAlias);
}

h107.BaseController.prototype.navigate = function (view) { // todo: implement;
    'use strict';
    console.log(view);
};

h107.BaseController.prototype.getController = function () { // todo: implement;
    'use strict';
};

h107.BaseController.prototype.getView = function (id) { // todo: implement;
    'use strict';
    var result;
    this.__views.map(function (view) {
        if (view.settings.id === id) {
            result = view;
        }
    });
    return result;
};