// Bootstrapper.html / Tests/3.1.0.0.0 - No resources
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Defines a single resource URL to load.

// Desired outcome:
// TestVar should become defined before the end of the test (10 seconds)

console.log('YMI: Running unit test 3.1.0.0.0..');

var Resources = [
	{ URL: '../Specifications/1/Tests/Resources/TestVar.js' }
];

setTimeout(function () { console.log('YMI: Running unit test 3.1.0.0.0.. Complete. Result: ', TestVar); }, 10000);

// - YourMove Infrastructure