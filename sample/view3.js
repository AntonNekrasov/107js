h107.define('view3', {
	id: 'view3',
    component: 'view',
    controller: 'view2Controller',
    attributes: {
        style: {
            border: '1px solid red'
        }
    },
    components: [{
        component: 'text',
        name: 'bookTitle',
        attributes: {
            style: {
                height: '20px',
                width: '200px'
            }
        },
        label: {
            text: 'Text label'
        },
        container: {
            attributes: {
                style: {
                    border: '1px solid orange'
                }
            }
        }
    }]
});