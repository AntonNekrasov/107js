h107.App = (function () {
    'use strict';

    function launch(landing) {
        var cardview = h107.create({
            component: landing
        });

        if (!(cardview instanceof h107.view.CardView)) {
            throw 'landing view can only be of type h107.view.CardView';
        }
        document.body.appendChild(cardview.html);
    }

    return {
        launch: launch
    }

}) ();