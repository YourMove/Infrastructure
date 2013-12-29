// Bootstrapper.html / Tests/19.2.2.2.2 - Multiple Complex Managed Resources With Multiple Callbacks And Multiple Abstracts
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines many resources with many Where conditionals, triggering an abstract, many callbacks and then another abstract.

console.log('YMI: Running unit test 19.2.2.2.2..');

var Resources = [
	function () { console.log('*\t YMI: Unit test abstract 1'); },
	{ 
		URL: ['../Specifications/1/Tests/Resources/TestVar.js', '../Specifications/1/Tests/Resources/TestVar2.js'],
		Where: ['TestVar', 'TestVar2'],
		Callback: [
			function () { console.log('*\t YMI: Unit test callback 1'); },
			function () { console.log('*\t YMI: Unit test callback 2'); }
		]
	},
	function () { console.log('*\t YMI: Unit test abstract 2'); }
];

setTimeout(function () { console.log('YMI: Running unit test 19.2.2.2.2.. Complete.'); }, 10000);

// - YourMove Infrastructure