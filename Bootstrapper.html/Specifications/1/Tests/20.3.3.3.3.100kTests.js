// Bootstrapper.html / Tests/20.3.3.3.3 - Multiple Complex Managed Resources With Multiple Callbacks And Multiple Abstracts
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/12/2013
//   All rights reserved.

// Summary:
// Runs 100 thousand assorted tests

var Tests = [
	'1.0.0.0.0.NoResources.js',
	'2.0.0.0.0.EmptyResources.js',
	'3.1.0.0.0.SingleUnmanagedResource.js',
	'4.2.0.0.0.MultipleUnmanagedResources.js',
	'5.1.1.0.0.SingleBasicManagedResource.js',
	'6.2.1.0.0.MultipleBasicManagedResources.js',
	'7.1.2.0.0.SingleComplexManagedResource.js',
	'8.2.2.0.0.MultipleComplexManagedResources.js',
	'9.1.1.1.0.SingleBasicManagedResourceWithSingleCallback.js',
	'10.2.1.1.0.MultipleBasicManagedResourcesWithSingleCallback.js',
	'11.2.2.1.0.MultipleComplexManagedResourcesWithSingleCallback.js',
	'12.1.1.2.0.SingleBasicManagedResourceWithMultipleCallbacks.js',
	'13.2.1.2.0.MultipleBasicManagedResourcesWithMultipleCallbacks.js',
	'14.2.2.2.0.MultipleComplexManagedResourcesWithMultipleCallbacks.js',
	'15.1.1.1.1.SingleBasicManagedResourceWithSingleCallbackAndSingleAbstract.js',
	'16.2.1.1.1.MultipleBasicManagedResourcesWithSingleCallbackAndSingleAbstract.js',
	'17.2.2.1.1.MultipleComplexManagedResourcesWithSingleCallbackAndSingleAbstract.js',
	'18.2.2.2.1.MultipleComplexManagedResourcesWithMultipleCallbacksAndSingleAbstract.js',
	'19.2.2.2.2.MultipleComplexManagedResourcesWithMultipleCallbacksAndMultipleAbstracts.js'
];

var Tester = function () {
	if (Bootstrapper.Running !== true) {
		if (Tester.LoadQueue.length < 1) Tester.LoadQueue();
		if (Tester.TotalRun >= 100000000) return console.log('YMI: Completed in..');

		var Test = Tester.Queue.splice(0,1);
		console.log('YMI: Running sub-unit test - '+Test);

		var Script = document.createElement('script');
		Script.type = 'text/javascript';
		Script.src = '../Specifications/1/Tests/'+Test;

		Bootstrapper_WaitingForResourcesArray();
		document.head.appendChild(Script);

		Tester.TotalRun++;
	}
	setTimeout(Tester, 500);
};
Tester.TotalRun = 0;
Tester.Queue = [];
Tester.LoadQueue = function () { Tests.forEach(function (Test) { Tester.Queue.push(Test); }); };

console.log('YMI: Running unit test 20.3.3.3.3..');

Tester();

setTimeout(function () { console.log('YMI: Running unit test 20.3.3.3.3.. Complete.'); }, 1000000);

// - YourMove Infrastructure