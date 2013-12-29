### <Project> / Results.md - Functional Testing Summary
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published <Publish date, Day/MM/Year>
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Test, many>

## Field Format

    <TestNumber(Int)>.<URL(Int)>-<When(Int)>-<Callback(Int)>-<Abstract Logic(Int)>.<Keywords>

## Version milestone: 0.2 **ACHIEVED**

3. 1.0.0.0.		Single Unmanaged Resource
4. 2.0.0.0.		Multiple Unmanaged Resources
5. 1.1.0.0.		Single Basic Managed Resource
6. 2.1.0.0.		Multiple Basic Managed Resources 
7. 1.2.0.0.		Single Complex Managed Resource
8. 2.2.0.0.		Multiple Complex Managed Resources

## Glossary

* "Unmanaged Resource" - Has no defined Where conditionals or Callbacks, only one or more URL's.
* "Basic Managed Resource" - Presents one conditional for one or more URL's.
* "Complex Managed Resource" - Presents more than one conditional for one or more URL's.
* "Abstracts" are functions to be run as part of the chain without any resource.

## Tests

3. Single resource

### Expected..
Bootloader will load a single file with no management at all.

### Results..
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. [Object]
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:6		 Resources normalized into array Bootstrapper.html:21
Bootstrapper.html/Specification.md:7		 Begin iterating resources Bootstrapper.html:24
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.1	 Normalize the URL param into an array Bootstrapper.html:40
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.1.6	 Warning: No conditionals. No management of load process possible. Bootstrapper.html:118
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12,13,14	 Warning: No requests to monitor.. Bootstrapper.html:146
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138

### **Success**

4. Multiple resources with no management

### Expected..
Bootloader will load a single file with no management (Where orat all.

### Results..
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
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.1.6	 Warning: No conditionals. No management of load process possible. Bootstrapper.html:118
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.1	 Normalize the URL param into an array Bootstrapper.html:40
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.1.6	 Warning: No conditionals. No management of load process possible. Bootstrapper.html:118
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12,13,14	 Warning: No requests to monitor.. Bootstrapper.html:146
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
YMI: Running unit test 4.2.0.0.0.. Complete. Result:  true true 4.2.0.0.0.MultipleUnmanagedResources.js:19

### **Success**

5. Single resource with basic (single Where) management (no callbacks).

### Expected..
A single resource will be loaded, and by defining a variable - we will know it is loaded and then halt.

### Results..
YMI: Running unit test 5.1.1.0.0.. 5.1.1.0.0.SingleBasicManagedResource.js:9
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
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
YMI: Running unit test 5.1.1.0.0.. Complete. 5.1.1.0.0.SingleBasicManagedResource.js:15

### **Success**

6. Multiple Basic Managed Resources

### Expected..
Load all resources and then unlock ready for reuse.

### Results..

YMI: Running unit test 6.2.1.0.0.. 6.2.1.0.0.MultipleBasicManagedResources.js:9
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
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
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
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
YMI: Running unit test 6.2.1.0.0.. Complete. 6.2.1.0.0.MultipleBasicManagedResources.js:16

### **Success**

7. Single Complex Managed Resource

### Expected..
Load a single file and complete the load process only when its TWO Where conditionals are met.

### Results..
YMI: Running unit test 7.1.2.0.0.. 7.1.2.0.0.SingleComplexManagedResource.js:9
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
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
YMI: Running unit test 7.1.2.0.0.. Complete. 7.1.2.0.0.SingleComplexManagedResource.js:15

### **Success**

8. Multiple Complex Managed Resources

### Expected.. 
Loads multiple files with multiple conditions for each, and no callbacks.

### Results..
YMI: Running unit test 8.2.2.0.0.. 8.2.2.0.0.MultipleComplexManagedResources.js:9
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
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:8		 Begin constructing RequestObject Bootstrapper.html:27
Bootstrapper.html/Specification.md:9		 Logic fork Bootstrapper.html:33
Bootstrapper.html/Specification.md:9.1		 Resource record is an object Bootstrapper.html:36
Bootstrapper.html/Specification.md:9.1.1	 Normalize the URL param into an array Bootstrapper.html:40
Bootstrapper.html/Specification.md:9.1.2	 Construct and configure a script element for each URL Bootstrapper.html:45
Bootstrapper.html/Specification.md:9.1.3	 Normalize conditionals Bootstrapper.html:62
Bootstrapper.html/Specification.md:9.1.4	 Process conditionals array.. Bootstrapper.html:74
Bootstrapper.html/Specification.md:9.1.4.1	 Convert string to function Bootstrapper.html:79
Bootstrapper.html/Specification.md:9.1.5	 Normalize callbacks Bootstrapper.html:98
Bootstrapper.html/Specification.md:9.1.6	 If valid conditionals exist - monitor for completion Bootstrapper.html:116
Bootstrapper.html/Specification.md:9.4		 Add constructed request to InitQueue Bootstrapper.html:130
Bootstrapper.html/Specification.md:10		 Watch for completion of all conditionals Bootstrapper.html:135
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
Bootstrapper.html/Specification.md:11		 Load all resources Bootstrapper.html:138
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:12		 Remove to avoid a lot of duplicate checking Bootstrapper.html:153
*	Bootstrapper.html/Specification.md:13		 Remove from Monitoring Bootstrapper.html:159
*	Bootstrapper.html/Specification.md:14		 All callbacks are run from the InitQueue Bootstrapper.html:169
*	Bootstrapper.html/Specification.md:15		 Bootstrapper is now complete, and is unlocked ready for reuse Bootstrapper.html:179
YMI: Running unit test 8.2.2.0.0.. Complete. 8.2.2.0.0.MultipleComplexManagedResources.js:16

#### - YourMove Infrastructure