({
    synchronizeInstances : function(component) {
        const instanceId = component.get('v.instanceId');
        const otherInstances = component.get('v.otherInstances');
        // Save sync time
        component.set('v.syncTime', new Date().getTime());
        // Abort if we already have an active instance
        const activeIndex = otherInstances.indexOf(function(syncEvent) {
            return syncEvent.isActive;
        });
        if (activeIndex !== -1 || otherInstances.length === 0) {
            return;
        }
        // Figure out minimum instanceId
        let minInstanceId = otherInstances[0].instanceId;
        otherInstances.forEach(function(syncEvent) {
            if (syncEvent.instanceId < minInstanceId) {
                minInstanceId = syncEvent.instanceId;
            }
        });
        // Activate this component if it has minimum instanceId
        const isActive = (instanceId === minInstanceId);
        component.set('v.isActive', isActive);
        if (isActive) {
            this.injectChildComponent(component);
        }
    },

    injectChildComponent : function(component) {
        const childConfig = component.get('v.childComponent');
        if (!childConfig) {
            return;
        }
        if (!childConfig.type) {
            throw new Error('Missing singleton child type');
        }
        if (!childConfig.attributes) {
            childConfig.attributes = [];
        }
        $A.createComponent(childConfig.type, childConfig.attributes, function(child, status, errorMessage) {
            if (status === "SUCCESS") {
                const body = component.get("v.body");
                body.push(child);
                component.set("v.body", body);
            }
            else if (status === "INCOMPLETE") {
                console.error("No response from server or client is offline.");
            }
            else if (status === "ERROR") {
                console.error("Error: " + errorMessage);
            }
        });
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
