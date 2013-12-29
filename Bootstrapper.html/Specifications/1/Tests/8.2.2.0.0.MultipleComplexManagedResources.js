// Bootstrapper.html / Tests/8.2.2.0.0 - Multiple Complex Managed Resources
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines many resources to be loaded, together with multiple When conditionals, and no callbacks.

console.log('YMI: Running unit test 8.2.2.0.0..');

var Resources = [
	{ URL: '../Specifications/1/Tests/Resources/ComplexVars.js', Where: ['ComplexVar1', 'ComplexVar2'] },
	{ URL: '../Specifications/1/Tests/Resources/ComplexVars2.js', Where: ['ComplexVar3', 'ComplexVar4'] }
];

setTimeout(function () { console.log('YMI: Running unit test 8.2.2.0.0.. Complete.'); }, 10000);

// - YourMove Infrastructure