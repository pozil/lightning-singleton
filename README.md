# Salesforce Lightning Singleton Component

## About
The Singleton component enforces a singleton pattern: there can only be one active instance with a given name in a Lightning page context.<br/>
This is useful when using libraries that must be loaded only once per page and when we have no control over the rest of the page.

The singeton uses a built-in synchronization mechanism based on application events and unique hashes in order to ensure that there is only one active instance per unique name.

Note that Singleton acts as a wrapper component so it has no user interface of its own.

Singleton guarantees the following:

- only one randomly selected instance is activated and loads its encapsulated content.
- all existing other instances are deactivated without loading their encapsulated content.
- if other instances are added later in the same page, they will be instantly deactivated.


## Installation

Deploy the component and the sample application with Salesforce DX by clicking on this button:

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com)


## Documentation
The component is documented using Aura documentation. Access it from this URL (replace the domain):<br/>
https://<b>&lt;YOUR_DOMAIN&gt;</b>.lightning.force.com/docs/component-library/bundle/c:Singleton

### Example 1

Use the singleton by giving it a unique name and embedding some content in it:
```xml
<c:Singleton name="mySingleton">

    <!-- Insert your unique content here... -->

    <!-- ... it can be basic HTML -->
    <p>Anything placed in here is garanteed to be instanciated only once in the context of a Lightning page.</p>

    <!-- ... or a third party JS library -->
    <ltng:require scripts="{!$Resource.jsLibraries + '/jsLibOne.js'}" afterScriptsLoaded="{!c.scriptsLoaded}"/>

    <!-- ... or a lightning component -->
    <c:someComponent/>

</c:Singleton>
```

If you create a page that contains 100 times the above code:

- the embedded paragraph will only appear once
- the `jsLibOne.js` library will only be loaded once and the `c.scriptsLoaded` function will be called only once
- `c:someComponent` will only be loaded once and its `init` handler will only be triggered once

This holds true even if other instances are dynamically added to the page later.

### Example 2

If a page contains the following code:

```xml
<c:Singleton name="singletonA">
	<c:componentA/>
</c:Singleton>
<c:Singleton name="singletonA">
	<c:componentA/>
</c:Singleton>

<c:Singleton name="singletonB">
	<c:componentB/>
</c:Singleton>
<c:Singleton name="singletonB">
	<c:componentB/>
</c:Singleton>

<c:Singleton name="singletonC">
	<c:componentB/>
</c:Singleton>
```

The page will contain one instance of `c:componentA`, `c:componentB` and `c:componentC`.


## Sample application
The default installation includes the Singleton component and a sample application available under this URL (replace the domain):<br/>
https://<b>&lt;YOUR_DOMAIN&gt;</b>.lightning.force.com/c/SampleSingletonApp.app

If you wish to install manually the project without the sample app, edit `sfdx-project.json` and remove the `src-sample` path.

<img src="gfx/sample-app-screenshot.png" width="900" align="center" alt="Sample app screenshot"/>