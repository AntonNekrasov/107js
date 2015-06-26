/**
 * Created by Anton.Nekrasov on 5/20/2015.
 */
h107.History = (function () {
    'use strict';
    window.onpopstate = function (e) {
        // var state = e.state;
        // var event = new Event(h107.defaults.ACTIVATION_EVENT, {
        //     url: e.newUrl
        // });
        // var controller = h107.controllerMap[state.controller];
        // controller.dispatchEvent(event);
        // todo: replace event with direct method call;
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
                    console.log(result);
                    // history.replaceState({page: 3}, "title 3", "?page=3");
                    // if (result) {
                    //     // result.getController().onactive(result.id);
                    // }
                }
            }
        }, 0);
    }

    return {
        changeRoute: changeRoute,
        navigateToRoute: navigateToRoute
    }
}) ();