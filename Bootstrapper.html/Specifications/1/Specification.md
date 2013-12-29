### Bootstrapper.html / Specification.md - Technical Resource
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 24/12/2013
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Tests, many>, <Assets, many>

## Architecture

### Locked->LoadQueue->Loading+Monitoring->Loaded-Monitoring->InitQueue->Unlocked

## Flow

Note: An [*] on the end indicates not yet implemented.

1. Bootstrapper defined
2. Watcher added to Bootstrapper

3. Defining resources.
	3.1. Waiting until window.Resources is defined. This can be internally or through an external include. Using an external include will slow initial loading by whatever your clients current round trip latency to the resource is.
	3.2. Bootstrapper is run with Resources
4. Bootstrapper internal storage is cleared, locked from accepting new requests until current is complete.

5. Specified Resources normalized into array
6. Begin iterating resources
7. Begin constructing RequestObject for each Resource

8. Logic fork..
	8.1. If the Resource record is an object..
		8.1.1. Normalize the URL param into an array
		8.1.2. Construct and configure a script element for each URL

		8.1.3. Normalize conditionals - these must all end up as an array of functions that returns truthy or falsy values
			8.1.3.1. If a function is given, this is normalized into an array
		8.1.4. Process conditionals array..
			8.1.4.1. If the value of an index is a string, this is converted to a function that checks if a variable of the same name exists within the window (global) scope
			8.1.4.2 If valid conditionals exist - monitor for completion

		8.1.5. Normalize callbacks - these must all end up as an array of functions.
			8.1.5.1. If a function is given, this is normalized into an array
			8.1.5.2. If an array is given, it must only contain functions. Anything that isn't a function will be ignored

		8.1.6. If valid conditionals exist - monitor for completion

	8.2. If the Resource record is a function, it will simply be added directly to the init queue
	8.3. Any other resource type (String, Number, Function) - it is invalid and will be ignored
	8.4. Add constructed request to InitQueue.

9. Start watching for completion of all conditionals. Note, this happens async - and as such may happen out of flow. These will be marked in the console with lines starting with an asterisk, and an extra tab of indent.
10. Append all script tags to start loading all Resources

11. When a conditional return truthy, it is removed to avoid a lot of duplicate checking. Later a persistance might be added to allow ongoing checks which may produce unreliable results

12. Once no more conditionals exist for the Resource - it is removed from Monitoring
13. Once no more Resources are under Monitoring - all callbacks are run from the InitQueue

14. The Bootstrapper is now complete, and is unlocked ready for reuse

## Specification Compliance

* Version Milestone 0.1 **ACHIEVED**

1. 0.0.0.0.	No Resources Variable
2. 0.0.0.0.	Empty Resources

* Version Milestone 0.2 **ACHIEVED*

3. 1.0.0.0.		Single Unmanaged Resource
4. 2.0.0.0.		Multiple Unmanaged Resources
5. 1.1.0.0.		Single Basic Managed Resource
6. 2.1.0.0.		Multiple Basic Managed Resources 
7. 1.2.0.0.		Single Complex Managed Resource
8. 2.2.0.0.		Multiple Complex Managed Resources

* Version Milestone 0.3 **ACHIEVED**

9. 1.1.1.0.		Single Basic Managed Resource
10. 2.1.1.0.	Multiple Basic Managed Resources With Single Callback
11. 2.2.1.0.	Multiple Complex Managed Resources With Single Callback
12. 1.1.2.0.	Single Basic Managed Resource With Multiple Callbacks
13. 2.1.2.0.	Multiple Basic Managed Resources With Multiple Callbacks
14. 2.2.2.0.	Multiple Complex Managed Resources With Multiple Callbacks

* Version Milestone 0.4 **ACHIEVED**

15. 1.1.1.1.	Single Basic Managed Resource With Single Callback And Single Abstract
16. 2.1.1.1.	Multiple Basic Managed Resources With Single Callback And Single Abstract
17. 2.2.1.1.	Multiple Complex Managed Resources With Single Callback And Single Abstract
18. 2.2.2.1.	Multiple Complex Managed Resources With Multiple Callbacks And Single Abstract
19. 3.3.3.3.	Multiple Complex Managed Resources With Multiple Callbacks And Multiple Abstracts

* Version Milestone 0.5

20. 3.3-3-3-3.		Performs a combination of all tests 100,000 times without error. (SPECIFICATION COMPLETE) [*]

#### - YourMove Infrastructure