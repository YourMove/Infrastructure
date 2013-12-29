### <Project> / Results.md - Functional Testing Summary
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published <Publish date, Day/MM/Year>
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Test, many>

## Field Format

    <TestNumber(Int)>.<URL(Int)>-<When(Int)>-<Callback(Int)>-<Abstract Logic(Int)>.<Keywords>

## Version milestone: 0.3

9. 1.1.1.0.		Single Basic Managed Resource
10. 2.1.1.0.	Multiple Basic Managed Resources With Single Callback [*]
11. 2.2.1.0.	Multiple Complex Managed Resources With Single Callback [*]
12. 1.1.2.0.	Single Basic Managed Resource With Multiple Callbacks [*]
13. 2.1.2.0.	Multiple Basic Managed Resources With Multiple Callbacks [*]
14. 2.2.2.0.	Multiple Complex Managed Resources With Multiple Callbacks [*]

## Glossary

* "Unmanaged Resource" - Has no defined Where conditionals or Callbacks, only one or more URL's.
* "Basic Managed Resource" - Presents one conditional for one or more URL's.
* "Complex Managed Resource" - Presents more than one conditional for one or more URL's.
* "Abstracts" are functions to be run as part of the chain without any resource.

## Tests

9. Single Basic Managed Resource With Single Callback

### Expected..
Loads a single resource, with a single Where conditional, and a single example callback.

### Results..
YMI: Running unit test 9.1.1.1.0.. 9.1.1.1.0.SingleBasicManagedResourceWithSingleCallback.js:9
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. 
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:6		 Resources normalized into array Bootstrapper.html:21
Bootstrapper.html/Specification.md:7		 Begin iterating resources Bootstrapper.html:24
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.1	 Normalize the URL param into an array Bootstrapper.html:40
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.3.1	 Normalize into array Bootstrapper.html:65
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.5.1	 Normalize into array Bootstrapper.html:101
Bootstrapper.html/Specification.md:9.1.5.2	 Ignore non-functions Bootstrapper.html:112
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	 YMI: Unit test callback 1 9.1.1.1.0.SingleBasicManagedResourceWithSingleCallback.js:12
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
YMI: Running unit test 9.1.1.1.0.. Complete. 9.1.1.1.0.SingleBasicManagedResourceWithSingleCallback.js:15

### **Success**

10. Multiple Basic Managed Resources With Single Callback

### Expected..
Loads the files and will wait until at least one of the vars is set and then run the callback once. One potential issue is obviously if the callback requires both the resources already be loaded - this could be handled internally with a check and setTimeout, or simply add a second conditional (see Tests/10.2.2.1.0). I will also aim to break this in Tests/FailureCases/.

### Results..
YMI: Running unit test 10.2.1.1.0.. 10.2.1.1.0.MultipleBasicManagedResourcesWithSingleCallback.js:9
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. 
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:6		 Resources normalized into array Bootstrapper.html:21
Bootstrapper.html/Specification.md:7		 Begin iterating resources Bootstrapper.html:24
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.3.1	 Normalize into array Bootstrapper.html:65
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.5.1	 Normalize into array Bootstrapper.html:101
Bootstrapper.html/Specification.md:9.1.5.2	 Ignore non-functions Bootstrapper.html:112
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	 YMI: Unit test callback 1 10.2.1.1.0.MultipleBasicManagedResourcesWithSingleCallback.js:12
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
YMI: Running unit test 10.2.1.1.0.. Complete. 10.2.1.1.0.MultipleBasicManagedResourcesWithSingleCallback.js:15

### **Success**

11. Multiple Complex Managed Resources With Single Callback

### Expected..
Loads multiple resources, waits until each is loaded, runs a single callback once.

### Results..
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. 
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:6		 Resources normalized into array Bootstrapper.html:21
Bootstrapper.html/Specification.md:7		 Begin iterating resources Bootstrapper.html:24
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.5.1	 Normalize into array Bootstrapper.html:101
Bootstrapper.html/Specification.md:9.1.5.2	 Ignore non-functions Bootstrapper.html:112
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	 YMI: Unit test callback 1 11.2.2.1.0.MultipleComplexManagedResourcesWithSingleCallback.js:15
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
YMI: Running unit test 11.2.2.1.0.. Complete. 11.2.2.1.0.MultipleComplexManagedResourcesWithSingleCallback.js:19

### **Success**

12. Single Basic Managed Resource With Multiple Callbacks

### Expected..
A single resource will be loaded with a single When conditional, and trigger multiple callbacks.

### Results..
YMI: Running unit test 12.1.1.2.0.. 12.1.1.2.0.SingleBasicManagedResourceWithMultipleCallbacks.js:9
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. 
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:6		 Resources normalized into array Bootstrapper.html:21
Bootstrapper.html/Specification.md:7		 Begin iterating resources Bootstrapper.html:24
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.1	 Normalize the URL param into an array Bootstrapper.html:40
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.3.1	 Normalize into array Bootstrapper.html:65
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.5.2	 Ignore non-functions Bootstrapper.html:112
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	 YMI: Unit test callback 1 12.1.1.2.0.SingleBasicManagedResourceWithMultipleCallbacks.js:16
*	 YMI: Unit test callback 2 12.1.1.2.0.SingleBasicManagedResourceWithMultipleCallbacks.js:17
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
YMI: Running unit test 12.1.1.2.0.. Complete. 12.1.1.2.0.SingleBasicManagedResourceWithMultipleCallbacks.js:22

### **Success**

13. Multiple Basic Managed Resources With Multiple Callbacks

### Expected..
Defines many resources to be loaded with a single conditional, and multiple callbacks triggered.

As with test #10 in the set:
One potential issue is obviously if the callback requires both the resources already be loaded - this could be handled internally with a check and setTimeout, or simply add a second conditional (see Tests/10.2.2.1.0). I will also aim to break this in Tests/FailureCases/.

### Results..
YMI: Running unit test 13.2.1.2.0.. 13.2.1.2.0.MultipleBasicManagedResourcesWithMultipleCallbacks.js:14
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. 
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:6		 Resources normalized into array Bootstrapper.html:21
Bootstrapper.html/Specification.md:7		 Begin iterating resources Bootstrapper.html:24
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.3.1	 Normalize into array Bootstrapper.html:65
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.5.2	 Ignore non-functions Bootstrapper.html:112
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	 YMI: Unit test callback 1 13.2.1.2.0.MultipleBasicManagedResourcesWithMultipleCallbacks.js:21
*	 YMI: Unit test callback 2 13.2.1.2.0.MultipleBasicManagedResourcesWithMultipleCallbacks.js:22
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
YMI: Running unit test 13.2.1.2.0.. Complete. 13.2.1.2.0.MultipleBasicManagedResourcesWithMultipleCallbacks.js:27

### **Success**, Extract:
*	 YMI: Unit test callback 1 13.2.1.2.0.MultipleBasicManagedResourcesWithMultipleCallbacks.js:21
*	 YMI: Unit test callback 2 13.2.1.2.0.MultipleBasicManagedResourcesWithMultipleCallbacks.js:22
...
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179

14. Multiple Complex Managed Resources With Multiple Callbacks

### Expected..
Loads multiple resources with multiple Where conditionals and multiple callbacks.

### Results..
YMI: Running unit test 14.2.2.2.0.. 14.2.2.2.0.MultipleComplexManagedResourcesWithMultipleCallbacks.js:9
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. 
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:6		 Resources normalized into array Bootstrapper.html:21
Bootstrapper.html/Specification.md:7		 Begin iterating resources Bootstrapper.html:24
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.5.2	 Ignore non-functions Bootstrapper.html:112
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	 YMI: Unit test callback 1 14.2.2.2.0.MultipleComplexManagedResourcesWithMultipleCallbacks.js:16
*	 YMI: Unit test callback 2 14.2.2.2.0.MultipleComplexManagedResourcesWithMultipleCallbacks.js:17
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
YMI: Running unit test 14.2.2.2.0.. Complete. 14.2.2.2.0.MultipleComplexManagedResourcesWithMultipleCallbacks.js:22


#### - YourMove Infrastructure