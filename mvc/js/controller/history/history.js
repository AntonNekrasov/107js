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

    function navigateToRoute(route) {
        var containsHash = route.indexOf('#') === 0;
        if (containsHash) {
            route = route.substring(1);
        }
        setTimeout(function () {
            for (var key in h107.controllerMap) {
                if (h107.controllerMap.hasOwnProperty(key)) {
                    var controller = h107.controllerMap[key];
                    var result = controller.getViewByUrl(route);
                    if (result) {
                        result.getController()
                    }
                }
            }
        }, 0);
    }

    return {
        changeRoute: changeRoute,
        navigateToRoute: navigateToRoute
    }
}) ();