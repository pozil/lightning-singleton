({
    onInit : function(component, event, helper) {
        // Generate component instance id
        component.set('v.instanceId', Math.random());
        component.set('v.isActive', null);
        // Wait for all components to load and fire sync event
        setTimeout($A.getCallback(() => {
            helper.fireSyncEvent(component);
        }), 500);
        // Process all sync events to determine active instance
        setTimeout($A.getCallback(() => {
            if (component.get('v.isActive') === null) {
                helper.synchronizeInstances(component);
            }
        }), 1000);
    },

    onSyncEvent : function(component, event, helper) {
        const thisInstance = {
            name : component.get('v.name'),
            instanceId : component.get('v.instanceId'),
            isActive : component.get('v.isActive')
        }
        const otherInstance = {
            name : event.getParam('name'),
            instanceId : event.getParam('instanceId'),
            isActive : event.getParam('isActive')
        };
        // Ignore this event if instance is inactive
        if (thisInstance.isActive === false) {
            return;
        }
        // Ignore other singleton names
        if (thisInstance.name !== otherInstance.name) {
            return;
        }
        // Reply to sync event if this instance is active
        if (thisInstance.isActive === true) {
            const syncTime = component.get('v.syncTime');
            component.set('v.syncTime', new Date().getTime());
            if (new Date().getTime() - syncTime > 100) {
                helper.fireSyncEvent(component);
            }            
            return;
        }
        // Deactivate this instance if we found another active one
        if (otherInstance.isActive && otherInstance.instanceId !== thisInstance.instanceId) {
            component.set('v.isActive', false);
            component.set('v.syncTime', new Date().getTime());
            return;
        }
        // Store event for sync
        const otherInstances = component.get('v.otherInstances');
        otherInstances.push(otherInstance);
        component.set('v.otherInstances', otherInstances);
    }
})
