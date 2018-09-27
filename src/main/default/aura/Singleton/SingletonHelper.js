({
    synchronizeInstances : function(component) {
        const instanceId = component.get('v.instanceId');
        const otherInstances = component.get('v.otherInstances');
        // Save sync time
        component.set('v.syncTime', new Date().getTime());
        // Abort if we already have an active instance
        const activeIndex = otherInstances.indexOf(syncEvent => syncEvent.isActive);
        if (activeIndex !== -1 || otherInstances.length === 0) {
            return;
        }
        // Figure out minimum instanceId
        let minInstanceId = otherInstances[0].instanceId;
        otherInstances.forEach(syncEvent => {
            if (syncEvent.instanceId < minInstanceId) {
                minInstanceId = syncEvent.instanceId;
            }
        });
        // Activate this component if it has minimum instanceId
        const isActive = (instanceId === minInstanceId);
        component.set('v.isActive', isActive);
    },

    fireSyncEvent : function(component) {
        const syncEvent = $A.get('e.c:SingletonSyncEvent');
        const params = {
            name: component.get('v.name'),
            instanceId: component.get('v.instanceId'),
            isActive: component.get('v.isActive')
        };
        syncEvent.setParams(params);
        syncEvent.fire();
    }
})
