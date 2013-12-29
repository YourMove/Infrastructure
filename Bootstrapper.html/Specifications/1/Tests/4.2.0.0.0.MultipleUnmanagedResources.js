// Bootstrapper.html / Tests/4.2.0.0.0 - Multiple unmanaged resources
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines many resources to be loaded with no management

console.log('YMI: Running unit test 4.2.0.0.0..');

var Resources = [
	{ URL: '../Specifications/1/Tests/Resources/TestVar.js' },
	{ URL: '../Specifications/1/Tests/Resources/TestVar2.js' }
];

setTimeout(function () { console.log('YMI: Running unit test 4.2.0.0.0.. Complete. Result: ', TestVar, TestVar2); }, 10000);

// - YourMove Infrastructure