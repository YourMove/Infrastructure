// Bootstrapper.html / Tests/15.1.1.1.1 - Single Basic Managed Resource With Single Callback And Single Abstract
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines a single resource with a single Where conditional, triggering a single callback and then an abstract.

console.log('YMI: Running unit test 15.1.1.1.1..');

var Resources = [
	{ 
		URL: '../Specifications/1/Tests/Resources/TestVar.js',
		Where: 'TestVar',
		Callback: function () { console.log('*\t YMI: Unit test callback 1'); }
	},
	function () { console.log('*\t YMI: Unit test abstract 1'); }
];

setTimeout(function () { console.log('YMI: Running unit test 15.1.1.1.1.. Complete.'); }, 10000);

// - YourMove Infrastructure