// Bootstrapper.html / Tests/12.1.1.2.0 - Single Basic Managed Resource With Multiple Callbacks
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines a single resource to be loaded, with a single Where conditional, and multiple callbacks.

console.log('YMI: Running unit test 12.1.1.2.0..');

var Resources = [
	{ 
		URL: '../Specifications/1/Tests/Resources/TestVar.js',
		Where: 'TestVar',
		Callback: [
			function () { console.log('*\t YMI: Unit test callback 1'); },
			function () { console.log('*\t YMI: Unit test callback 2'); }
		]
	}
];

setTimeout(function () { console.log('YMI: Running unit test 12.1.1.2.0.. Complete.'); }, 10000);

// - YourMove Infrastructure