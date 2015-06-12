/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.BaseController = function () {
    'use strict';
    this.__views = [];
};

h107.BaseController.prototype.navigate = function (view) { // todo: implement;
    'use strict';
    console.log(view);
};

h107.BaseController.prototype.getController = function () { // todo: implement;
    'use strict';
};

h107.BaseController.prototype.getView = function (id) { // todo: implement;
    'use strict';
    return this.__views.map(function (view) {
        if (view.id === id) {
            return view;
        }
    });
};

h107.BaseController.prototype._registerView = function (view) { // todo: implement;
    'use strict';
    this.__views.push(view);
};