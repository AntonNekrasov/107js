h107.controller('view1Controller', function (settings) {
    'use strict';

    this.subscribe('input').on('click', function () {
    	alert('clicked!!!!');
    });

    this.view().onactive(function (views) {
        console.log("123213213213213")



    });

});