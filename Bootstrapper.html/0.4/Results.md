### <Project> / Results.md - Functional Testing Summary
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published <Publish date, Day/MM/Year>
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Test, many>

## Field Format

    <TestNumber(Int)>.<URL(Int)>-<When(Int)>-<Callback(Int)>-<Abstract Logic(Int)>.<Keywords>

## Version milestone: 0.4

15. 1.1.1.1.	Single Basic Managed Resource With Single Callback And Single Abstract [*]
16. 2.1.1.1.	Multiple Basic Managed Resources With Single Callback And Single Abstract [*]
17. 2.2.1.1.	Multiple Complex Managed Resources With Single Callback And Single Abstract [*]
18. 2.2.2.1.	Multiple Complex Managed Resources With Multiple Callbacks And Single Abstract [*]
19. 2.2.2.2.	Multiple Complex Managed Resources With Multiple Callbacks And Multiple Abstracts [*]

## Glossary

* "Unmanaged Resource" - Has no defined Where conditionals or Callbacks, only one or more URL's.
* "Basic Managed Resource" - Presents one conditional for one or more URL's.
* "Complex Managed Resource" - Presents more than one conditional for one or more URL's.
* "Abstracts" are functions to be run as part of the chain without any resource.

## Tests

15. Single Basic Managed Resource With Single Callback And Single Abstract

### Expected..
Defines a single resource with a single Where conditional, triggering a single callback and then an abstract.

### Results..
YMI: Running unit test 15.1.1.1.1.. 15.1.1.1.1.SingleBasicManagedResourceWithSingleCallbackAndSingleAbstract.js:9
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
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.3		 Resource record is a function Bootstrapper.html:125
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:136
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:154
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:160
*	Bootstrapper.html/Specification.md:14		 Run all callbacks from the InitQueue
*	 YMI: Unit test callback 1 15.1.1.1.1.SingleBasicManagedResourceWithSingleCallbackAndSingleAbstract.js:15
*	 YMI: Unit test abstract 1 15.1.1.1.1.SingleBasicManagedResourceWithSingleCallbackAndSingleAbstract.js:17
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:178
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:139
YMI: Running unit test 15.1.1.1.1.. Complete. 15.1.1.1.1.SingleBasicManagedResourceWithSingleCallbackAndSingleAbstract.js:20

### **Success**

16. Multiple Basic Managed Resources With Single Callback And Single Abstract

### Expected..
Defines many resources with a single Where conditional, triggering a single callback and then an abstract.

### Results..
YMI: Running unit test 16.2.1.1.1.. 16.2.1.1.1.MultipleBasicManagedResourcesWithSingleCallbackAndSingleAbstract.js:14
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
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.3		 Resource record is a function Bootstrapper.html:125
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:136
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:154
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:160
*	Bootstrapper.html/Specification.md:14		 Run all callbacks from the InitQueue 
*	 YMI: Unit test callback 1 16.2.1.1.1.MultipleBasicManagedResourcesWithSingleCallbackAndSingleAbstract.js:20
*	 YMI: Unit test abstract 1 16.2.1.1.1.MultipleBasicManagedResourcesWithSingleCallbackAndSingleAbstract.js:22
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:178
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:139
YMI: Running unit test 16.2.1.1.1.. Complete. 16.2.1.1.1.MultipleBasicManagedResourcesWithSingleCallbackAndSingleAbstract.js:25

### **Success**

17. Multiple Complex Managed Resources With Single Callback And Single Abstract

### Expected..
Defines many resources with many Where conditionals, triggering a single callback and then an abstract.

### Results..
YMI: Running unit test 17.2.2.1.1.. 17.2.2.1.1.MultipleComplexManagedResourcesWithSingleCallbackAndSingleAbstract.js:9
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
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.3		 Resource record is a function Bootstrapper.html:125
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:136
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:154
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:139
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:154
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:160
*	Bootstrapper.html/Specification.md:14		 Run all callbacks from the InitQueue 
*	 YMI: Unit test callback 1 17.2.2.1.1.MultipleComplexManagedResourcesWithSingleCallbackAndSingleAbstract.js:15
*	 YMI: Unit test abstract 1 17.2.2.1.1.MultipleComplexManagedResourcesWithSingleCallbackAndSingleAbstract.js:17
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:178
YMI: Running unit test 17.2.2.1.1.. Complete. 17.2.2.1.1.MultipleComplexManagedResourcesWithSingleCallbackAndSingleAbstract.js:20

### **Success**

18. Multiple Complex Managed Resources With Multiple Callbacks And Single Abstract

### Expected..
Defines many resources with many Where conditionals, triggering many callbacks and then an abstract.

### Results..
YMI: Running unit test 18.2.2.2.1.. 18.2.2.2.1.MultipleComplexManagedResourcesWithMultipleCallbacksAndSingleAbstract.js:9
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
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.3		 Resource record is a function Bootstrapper.html:125
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:136
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:154
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:139
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:154
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:160
*	Bootstrapper.html/Specification.md:14		 Run all callbacks from the InitQueue 
*	 YMI: Unit test callback 1 18.2.2.2.1.MultipleComplexManagedResourcesWithMultipleCallbacksAndSingleAbstract.js:16
*	 YMI: Unit test callback 2 18.2.2.2.1.MultipleComplexManagedResourcesWithMultipleCallbacksAndSingleAbstract.js:17
*	 YMI: Unit test abstract 1 18.2.2.2.1.MultipleComplexManagedResourcesWithMultipleCallbacksAndSingleAbstract.js:20
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:178
YMI: Running unit test 18.2.2.2.1.. Complete. 18.2.2.2.1.MultipleComplexManagedResourcesWithMultipleCallbacksAndSingleAbstract.js:23

### **Success**

19. Multiple Complex Managed Resources With Multiple Callbacks And Multiple Abstracts

### Expected..
Defines many resources with many Where conditionals, triggering an abstract, many callbacks and then another abstract.

### Results..
YMI: Running unit test 19.2.2.2.2.. 19.2.2.2.2.MultipleComplexManagedResourcesWithMultipleCallbacksAndMultipleAbstracts.js:9
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. 
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:6		 Resources normalized into array Bootstrapper.html:21
Bootstrapper.html/Specification.md:7		 Begin iterating resources Bootstrapper.html:24
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.3		 Resource record is a function Bootstrapper.html:125
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.3		 Resource record is a function Bootstrapper.html:125
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:136
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:154
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:139
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:154
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:160
*	Bootstrapper.html/Specification.md:14		 Run all callbacks from the InitQueue 
*	 YMI: Unit test abstract 1 19.2.2.2.2.MultipleComplexManagedResourcesWithMultipleCallbacksAndMultipleAbstracts.js:12
*	 YMI: Unit test callback 1 19.2.2.2.2.MultipleComplexManagedResourcesWithMultipleCallbacksAndMultipleAbstracts.js:17
*	 YMI: Unit test callback 2 19.2.2.2.2.MultipleComplexManagedResourcesWithMultipleCallbacksAndMultipleAbstracts.js:18
*	 YMI: Unit test abstract 2 19.2.2.2.2.MultipleComplexManagedResourcesWithMultipleCallbacksAndMultipleAbstracts.js:21
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:178
YMI: Running unit test 19.2.2.2.2.. Complete. 19.2.2.2.2.MultipleComplexManagedResourcesWithMultipleCallbacksAndMultipleAbstracts.js:24

### **Success**

#### - YourMove Infrastructure