// Bootstrapper.html / Tests/18.2.2.2.1 - Multiple Complex Managed Resources With Multiple Callbacks And Single Abstract
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines many resources with many Where conditionals, triggering many callbacks and then an abstract.

console.log('YMI: Running unit test 18.2.2.2.1..');

var Resources = [
	{ 
		URL: ['../Specifications/1/Tests/Resources/TestVar.js', '../Specifications/1/Tests/Resources/TestVar2.js'],
		Where: ['TestVar', 'TestVar2'],
		Callback: [
			function () { console.log('*\t YMI: Unit test callback 1'); },
			function () { console.log('*\t YMI: Unit test callback 2'); }
		]
	},
	function () { console.log('*\t YMI: Unit test abstract 1'); }
];

setTimeout(function () { console.log('YMI: Running unit test 18.2.2.2.1.. Complete.'); }, 10000);

// - YourMove Infrastructure