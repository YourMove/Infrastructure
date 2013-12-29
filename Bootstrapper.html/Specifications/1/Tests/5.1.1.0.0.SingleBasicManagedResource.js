// Bootstrapper.html / Tests/5.1.1.0.0 - Single Basic Managed Resource
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines a singular resource to be loaded - and we will be aware when it has loaded, and then take no action (no Callback)

console.log('YMI: Running unit test 5.1.1.0.0..');

var Resources = [
	{ URL: '../Specifications/1/Tests/Resources/TestVar.js', Where: 'TestVar' }
];

setTimeout(function () { console.log('YMI: Running unit test 5.1.1.0.0.. Complete.'); }, 10000);

// - YourMove Infrastructure