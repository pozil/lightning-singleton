({
    injectSingleton : function(component) {
        const newName = component.get('v.name');
        console.log('Adding singleton with name='+ newName);
        const singletonChild = {
            type: 'c:Child',
            attributes: {
                name: newName
            }
        };
        $A.createComponents(
            [
                ['lightning:layoutItem', {class: 'slds-box slds-m-around_small'}],
                ['c:Singleton', {
                    name: newName,
                    childComponent: singletonChild
                }]
            ],
            function(components, status, errorMessage) {
                if (status === 'SUCCESS') {
                    const layoutItem = components[0];
                    const singleton = components[1];
                    
                    layoutItem.set('v.body', singleton);

                    const container = component.find('container');
                    const body = container.get('v.body');
                    body.push(layoutItem);
                    container.set('v.body', body);
                }
                else if (status === 'INCOMPLETE') {
                    console.error('No response from server or client is offline.')
                }
                else if (status === 'ERROR') {
                    console.error(errorMessage);
                }
            }
        );
    }
})
