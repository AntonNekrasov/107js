/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.BaseController = function (settings) {
    'use strict';
};

h107.BaseController.prototype.navigate = function (url) { // todo: implement;
    'use strict';
};

h107.BaseController.prototype.getController = function () { // todo: implement;
    'use strict';
};

h107.BaseController.prototype.getView = function (id) { // todo: implement;
    'use strict';
    this.__views.map(function(view) {
    	console.log(view);
    });
};

h107.BaseController.prototype._registerView = function (view) { // todo: implement;
    'use strict';
    if (!this.__views) {
    	this.__views = [];
    }
    this.__views.push(view);
};