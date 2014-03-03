### Warehouser / Specification.md - Technical Resource
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 05/01/2013
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Tests, many>, <Assets, many>, <Architecture Breadcrumb>, <Your Specification>

## Architecture

### Client | Global Schema->Vector Schema->Record Set->Record->Revision ([Microtime].[Random].json)

## Client Flow

Note: An [*] on the end indicates not yet implemented.

1. Define Warehouser class

2. Provide some configuration 
2.1 Provide a string to set the HTTP-accessible API url (Warehouser.php by default)
2.2 Provide a keychain (empty by default)

2.3 Provide many connection options for different connection types
2.3.1 AJAX (default) - best for event based workloads
2.3.2 COMET/longpolling - best for realtime and ongoing transactions

2.4 Configurable connection tolerance (timeout, request limiting, retry attempts)
2.4.1 Connection timeout in seconds.
2.4.2 Retry failed requests X times.
2.4.3 Limit to this many requests (...)
2.4.4(...) window period in seconds.

2.5 Configurable request batching (saves HTTP overhead and server instancing)
2.5.1 Bundle limit in request count.
2.5.2 Bundle timeout in seconds - will send in this time even if not full.
2.5.3 Allow empty - will submit timed out bundles even if empty. Good if you don't know if there is data you need or not.

2.6 Configurable request monitoring
2.6.1 Allow request monitoring to start immediately, or triggered by the user at their request.
2.6.2 Configurable monitoring window to avoid wasting cycles

3. Preconfigure runtime storage

4. Provide functionality to start the monitoring function
4.1 Do not take any action if already started.

5. Provide functionality to stop monitoring
5.1 Do not take any action if not running.

6. Provide a common send structure for reads AND writes
6.1 Send should lock Warehouser - but does not need to check if locked as this is daemon's job to trigger this

6.2 Start building request object ready for adding other data into.
6.2.1 Add request start time
6.2.2 Add sent status and sent time
6.2.3 Add count of all requests contained
6.2.4 Add storage for request objects

6.3 Process all items from the queue into the new construct.
6.3.1 Fill in any missing data
6.3.1.1 If no Operation type - assume 'Read'.
6.3.1.2 If no Data - use empty object.

6.3.2 Push into storage
6.3.3 Clear the queue once processed

6.4 JSON encode the entire construct ready for transmission

6.5 Fork for connection type (case insensitive)

6.5.1 AJAX
6.5.1.1 Construct object (cross-browser)
6.5.1.1.1 Will not continue if this fails

6.5.1.2 Add callback
6.5.1.2.1 Check request is complete or not
6.5.1.2.2 Check request success or not
6.5.1.2.3 JSON decode return construct

6.5.1.2.4 Run "Callback" from each request construct (if any).
6.5.1.2.4.1 Note: Return data specific to this request will be available as first/only argument to Callback.

6.5.1.3 Finalise and send (transmit) request through newly created object

6.5.2 COMET [*]
6.5.2.1 Finalise and send (transmit) request through existing/stored object [*]

6.6. Start the monitoring daemon to wait for completion

7. Define read logic for API

7.1 Start formatting new request construct
7.1.1 Add request type to new construct.
7.1.2 If no vector is given default to falsy value.

7.2 Add the Record ID to the construct (if any)
7.2.1 If there IS a Record ID, add the Revision ID (if any).
7.2.1.1 If there is none, fill revision with falsy value.
7.2.2 If there is no Record ID, fill both Record and Revision with falsy values.

7.3 Push request construct to processing queue

8. Define write logic for API

8.1 Start formatting new request construct
8.1.1 Add request type to new construct.
8.1.2 If no vector is given, use falsy value.

8.2 Fork for different types of Data
8.2.1 If Data is an object, JSON encode
8.2.2 Otherwise, Use value as is (if any, otherwise default: Empty String)

8.3 Add the Record ID to the construct (if any)
8.3.1 If none, use falsy value.

8.4 Push request construct to processing queue

9. Check if monitoring/runtime should start immediately

## Server Flow

* Start the session with error supression. This simply makes the transparent third party auth support (described later) easier to handle consistently.

1. Define Warehouser class

2. Provide some configuration
2.1 Allow definition of the main warehouse storage root

2.2 Allow disabling of performance monitoring and associated schema's for ultra light use cases
2.3 Performance monitoring options

2.3.1 Maximum total unique users (by IP or by "user profile") [*]
2.3.1.1 Configurable handling of max (defer to another server perhaps or ask client to wait, or to try much later) [*]

2.3.2.1 Maximum requests per IP GLOBALLY [*]

2.3.2.3 Maximum requests per SUB-PATH / SUB-VECTOR [*]
2.3.2.3.1 By "IP" [*]
2.3.2.3.2 By "Profile" [*]

2.3.2.4 Allow configurable window - from fractions of a second to forever (limit 1 request ever) for all [*]

3. Allow definition of a global schema
3.1 This must be within the main Warehouser.php file to save a file read 
3.2 By default, this will be applied OVER any local schema - meaning these values cannot be overwritten
3.3 You can enable the global schema "Iterative Schema" (see documentation [here]) to allow overwriting, and also apply schemas iteratively through ALL subvectors. In this configuration, the local schema overwrites all.

4. Define a path validity and consistency function that can also be used for finding the last record or revision in a path

4.1 Check that the path exists and is readable
4.1 Search the path (vector) for all files/folders
4.2 Naturally sort - this means 1-11 rather than 1, 11, 2-9
4.3 Check if there are any nodes found
4.4 If there is a Limit of 1, just return last straight away
4.5 Otherwise, keep getting records from the end until the limit and return all

5. Define the read function of the API

5.1 If no Record ID given, use search function to get the last record in the path/vector
5.1.1 If no Record at all found, this is a fatal error.
5.1.2 Otherwise, filter into vector.

5.2 If no Revision ID given, use search function to get the last revision in the complete path/vector
5.2.1 If no revisions at all, this is a fatal error.

5.3 Read now complete path/vector/record/revision out to the browser immediately

6. Define the write function of the API

6.1 Sanitize data provided
6.2 Error check provided vector to ensure it is valid and writable. If not, this is a fatal error.
6.3 Check if Record ID provided
6.4 If not, create new record as the current microtime with a random fragment appended to avoid already unlikely collisions. If this cannot be created this is a fatal error.
6.5 Otherwise, filter in vector string and check it is valid. If not, this is a fatal error.

6.6 Add new revision ID. This cannot be defined by input now, but later will be able to with the "Named Revisions" schema.
6.7 Like with our record ID's we append some random data to prevent the already unlikely collisions with certainty.
6.8 Perform atomic write operation.

7. Check for any HTTP requests
8. Process request data from designated variable
9. Only process if there's requests within.

10. Process each request
10.1 If there is no Operation type, assume 'Read'
10.2 We use the first letter of the operation and case-insensitive ('r' or 'w')
10.3 If there is no Vector type, use empty string (base of storage)

10.4 Fork for read/write

10.4.1 Handle Read operation
10.4.1.1 If there is no Revision ID, use falsy value
10.4.1.2 Commit read operation to queue

11. Prepare results storage
12. Perform all queued writes first (if any)
13. Perform all queued reads second
14. Encode return construct and write to browser atomically

## Specification Compliance

### Architecture: [Test Number].[A or C for connection type][R for read or W for write or C for combination].[Testing Level].[Global Schemas].[Local Schemas]

* Version Milestone 0.1

0 - No request, just load Warehouser.js without error, and link Warehouser.php through iframe. Success if no parse errors.

* Version Milestone 0.2

1.AR.0 - Blank request - No Vector, Record or Revision. Success if returns latest revision of record in root vector of warehouse storage.
2.AR.1 - With Vector, but no Record or Revision. Success if returns latest revision of record in alternate vector.
3.AR.2 - With Vector and Record but no Revision. Success if returns latest revision of specific record in vector.
4.AR.3 - With Vector, Record AND Revision. Success if returns specific revision from specific record in vector.

* Version Milestone 0.3

5.AW.0 - Blank request - No vector, Record or Data. Success if returns [???]
6.AW.1 - With Vector, but no Record and empty Data. Success if creates new record in alternate vector.
7.AW.2 - With Vector and Record, but empty Data. Success if writes a new revision to specific record in vector.
7.AW.3 - With Vector, Record, and string-based Data. Success if writes a new revision with Data.
8.AW.4 - With Vector, Record, and object-based Data. Success if JSON encodes object and writes as new revision.

* Version Milestone 0.4

9.AC.0 - 2 Blank requests - a read and a write.
10.AC.1 - Blank write request - read request without Vector, Record, or Revision
11.AC.2 - Blank write request - read request without Vector, Record, but with Revision
12.AC.3 - Blank write request - read request without Vector, but with Record and Revision
13.AC.4 - Blank write request - read request with Vector, Record and Revision

14.AC+BM.0 - 1 complete read and write, repeated twice. Both as manual batches rather than using monitoring
15.AC+BA.1 - 1 complete read and write, repeated twice. Both batches sent automatically using configuration bundle size of 2
16.AC+BA.2 - Queue's 1 request and waits for the batching window to elapse, where it should complete.
17.AC+BA.3 - Submits empty requests every second for 3 seconds
18.AC+BA.4 - Submits an empty request every second for 5 seconds, and submits one request inside of this.

19.AC+BA+SEC.0 - Performs basic session based authentication
20.AC+BA+SEC.1 - 

* Version Milestone 0.5

19.AC.10 - Perform a random combination of all tests above 500,000 times without error.

* Version Milestone 0.6 - 0.9

Patches, revisions and design flaws only. Not less than 1 month of active use.

* Version Milestone 1

Spec complete. Begin development of Spec 2.

#### - YourMove Infrastructure