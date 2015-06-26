h107.controller('view2Controller', function (settings) {
    'use strict';

    this.view('view2').onactive(function (views) {
        console.log(views);
    });

});