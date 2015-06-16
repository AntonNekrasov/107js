h107.define('view1', {
	id: 'view1',
    url: 'view1',
    component: 'view',
    controller: 'view1Controller',
    attributes: {
        style: {
            border: '1px solid green'
        }
    },
    components: [{
           component: 'section',
           name: 'bookTitleSection',
           class: '',
           id: 'bookTitleSection',
           components: [{
               component: 'text',
               name: 'bookTitle',
               settings: {
                   attributes: {
                       css: {
                           height: '20px',
                           width: '200px'
                       }
                   },
                   label: {
                       text: 'Text label'
                   },
                   container: {
                       attributes: {
                           css: {
                               border: '1px solid blue'
                           }
                       }
                   }
               }
           }]
       }, {
           component: 'table'
       }]
});