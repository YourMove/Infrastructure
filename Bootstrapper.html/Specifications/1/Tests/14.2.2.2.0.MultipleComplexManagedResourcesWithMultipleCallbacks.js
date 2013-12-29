// Bootstrapper.html / Tests/14.2.2.2.0 - Multiple Complex Managed Resources With Multiple Callbacks
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines many resources to be loaded with many conditionals, and multiple callbacks triggered.

console.log('YMI: Running unit test 14.2.2.2.0..');

var Resources = [
	{ 
		URL: ['../Specifications/1/Tests/Resources/TestVar.js', '../Specifications/1/Tests/Resources/TestVar2.js'],
		Where: ['TestVar', 'TestVar2'],
		Callback: [
			function () { console.log('*\t YMI: Unit test callback 1'); },
			function () { console.log('*\t YMI: Unit test callback 2'); }
		]
	}
];

setTimeout(function () { console.log('YMI: Running unit test 14.2.2.2.0.. Complete.'); }, 10000);

// - YourMove Infrastructure