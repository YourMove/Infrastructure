// Bootstrapper.html / Tests/9.1.1.1.0 - Single Basic Managed Resource with callback
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines

console.log('YMI: Running unit test 9.1.1.1.0..');

var Resources = [
	{
		URL: '../Specifications/1/Tests/Resources/TestVar.js',
		Where: 'TestVar',
		Callback: function () { console.log('*\t YMI: Unit test callback 1'); }
	}
];

setTimeout(function () { console.log('YMI: Running unit test 9.1.1.1.0.. Complete.'); }, 10000);

// - YourMove Infrastructure