h107.define('view2', {
	id: 'view2',
    url: 'view2',
    component: 'view',
    controller: 'view2Controller',
    attributes: {
        style: {
            border: '1px solid blue'
        }
    },
    components: [{
        component: 'textarea',
        name: 'textarea',
        attributes: {
            placeholder: 'test placeholder'
        },
        label: {
            text: 'Textarea'
        }
    }]
});