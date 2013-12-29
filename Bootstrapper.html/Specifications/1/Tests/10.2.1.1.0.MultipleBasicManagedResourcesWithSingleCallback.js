// Bootstrapper.html / Tests/10.2.1.1.0 - Multiple Basic Managed Resources with callback
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines multiple resources for loading, with a single Where conditional and a common callback (run once)

console.log('YMI: Running unit test 10.2.1.1.0..');

var Resources = [
	{
		URL: ['../Specifications/1/Tests/Resources/TestVar.js', '../Specifications/1/Tests/Resources/TestVar2.js'],
		Where: 'TestVar',
		Callback: function () { console.log('*\t YMI: Unit test callback 1'); }
	}
];

setTimeout(function () { console.log('YMI: Running unit test 10.2.1.1.0.. Complete.'); }, 10000);

// - YourMove Infrastructure