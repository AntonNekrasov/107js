h107.controller('view1Controller', function (settings) {
    'use strict';

    this.subscribe('input').on('click', function () {
    	alert('clicked!!!!');
    });

});