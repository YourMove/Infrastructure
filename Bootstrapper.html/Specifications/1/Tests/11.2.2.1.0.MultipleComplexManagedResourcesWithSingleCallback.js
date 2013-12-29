// Bootstrapper.html / Tests/11.2.2.1.0 - Multiple Complex Managed Resources With Single Callback
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines multiple resources for loading, with many Where conditionals and a common callback (run once)

console.log('YMI: Running unit test 11.2.2.1.0..');

var Resources = [
	{ 
		URL: ['../Specifications/1/Tests/Resources/TestVar.js', '../Specifications/1/Tests/Resources/TestVar2.js'],
		Where: ['TestVar', 'TestVar2'],
		Callback: function () { console.log('*\t YMI: Unit test callback 1'); } 
	}
];

setTimeout(function () { console.log('YMI: Running unit test 11.2.2.1.0.. Complete.'); }, 10000);

// - YourMove Infrastructure