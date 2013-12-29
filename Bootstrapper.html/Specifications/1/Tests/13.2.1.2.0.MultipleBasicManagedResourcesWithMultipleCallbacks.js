// Bootstrapper.html / Tests/13.2.1.2.0 - Multiple Basic Managed Resources With Multiple Callbacks
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines many resources to be loaded with a single conditional, and multiple callbacks triggered.

// As with test #10 in the set:
// One potential issue is obviously if the callback requires both the resources already be loaded -
// this could be handled internally with a check and setTimeout, or simply add a second conditional (see Tests/10.2.2.1.0).
// I will also aim to break this in Tests/FailureCases/.

console.log('YMI: Running unit test 13.2.1.2.0..');

var Resources = [
	{ 
		URL: ['../Specifications/1/Tests/Resources/TestVar.js', '../Specifications/1/Tests/Resources/TestVar2.js'],
		Where: 'TestVar',
		Callback: [
			function () { console.log('*\t YMI: Unit test callback 1'); },
			function () { console.log('*\t YMI: Unit test callback 2'); }
		]
	}
];

setTimeout(function () { console.log('YMI: Running unit test 13.2.1.2.0.. Complete.'); }, 10000);

// - YourMove Infrastructure