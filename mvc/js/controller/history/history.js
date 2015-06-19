/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.History = (function () {
    'use strict';
    window.onpopstate = function (e) {
        console.log(e);
    };

    function changeRoute(state, name, route) {
        history.pushState(state, name, '#' + route);
    }

    return {
        changeRoute: changeRoute
    }
}) ();