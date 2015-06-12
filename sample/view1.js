h107.define('view1', {
	id: 'view1',
    component: 'view',
    controller: 'view1Controller',
    attributes: {
        style: {
            border: '1px solid green'
        }
    },
    components: [{
        component: 'table'
    }]

});
