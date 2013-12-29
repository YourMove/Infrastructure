// Bootstrapper.html / Tests/6.2.1.0.0 - Multiple Basic Managed Resources
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines many resources to be loaded - and we will be aware when it has loaded, and then take no action (no Callback)

console.log('YMI: Running unit test 6.2.1.0.0..');

var Resources = [
	{ URL: '../Specifications/1/Tests/Resources/TestVar.js', Where: 'TestVar' },
	{ URL: '../Specifications/1/Tests/Resources/TestVar2.js', Where: 'TestVar2' }
];

setTimeout(function () { console.log('YMI: Running unit test 6.2.1.0.0.. Complete.'); }, 10000);

// - YourMove Infrastructure