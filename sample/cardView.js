h107.define('cardView', {
    component: 'cardview',
    id: 'cardView',
    url: 'cardview',
    controller: 'cardViewController',
    attributes: {
        style: {
            border: '1px solid'
        }
    },
    components: [{
        component: 'view1',
        active: true,
        attributes: {
            'data-ololo' : 'text'
        }
    }, {
        component: 'view2'
    }, {
        component: 'view3'
    }]
});