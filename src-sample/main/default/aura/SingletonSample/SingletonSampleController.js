({
    onAddOneInstance : function(component, event, helper) {
        helper.injectSingleton(component);
    },

    onAddFiveInstances : function(component, event, helper) {
        for (let i=0; i<5; i++) {
            helper.injectSingleton(component);
        }
    },

    updateName : function(component, event, helper) {
        component.set('v.name', event.target.value);
    }
})
