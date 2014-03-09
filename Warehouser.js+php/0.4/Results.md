### Warehouser / 0.4/Results.md - Functional Testing Summary
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 15/02/2014
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.

## Field Format

    [Test Number].[A or C for connection type, +B for batching, M for manual, A for auto][R for read or W for write or C for combination].[Testing Level].[Global Schemas].[Local Schemas]

## Index

* Version Milestone 0.1 **ACHIEVED**

0 - No request, just load Warehouser.js without error, and link Warehouser.php through iframe. Success if no parse errors.

* Version Milestone 0.2 **ACHIEVED**

1.AR.0 - Blank request - No Vector, Record or Revision. Success if returns latest revision of record in root vector of warehouse storage.
2.AR.1 - With Vector, but no Record or Revision. Success if returns latest revision of record in alternate vector.
3.AR.2 - With Vector and Record but no Revision. Success if returns latest revision of specific record in vector.
4.AR.3 - With Vector, Record AND Revision. Success if returns specific revision from specific record in vector.

* Version Milestone 0.3 **ACHIEVED**

5.AW.0 - Blank request - No vector, Record or Data. Success if returns created records complete vector.
6.AW.1 - With Vector, but no Record and empty Data. Success if creates new record in alternate vector.
7.AW.2 - With Vector and Record, but empty Data. Success if writes a new revision to specific record in vector.
8.AW.3 - With Vector, Record, and string-based Data. Success if writes a new revision with Data.
9.AW.4 - With Vector, Record, and object-based Data. Success if JSON encodes object and writes as new revision.

* Version Milestone 0.4

10.AC.0 - 2 Blank requests - a read and a write.
11.AC.1 - 1 read and 1 write with vector only
12.AC.2 - 1 read and 1 write with vector and record only
13.AC.3 - 1 read and 1 write with vector, record. For the read, also with revision. For the write, also with object data.

14.AC+BM.0 - 1 complete read and write, repeated twice. Both as manual batches rather than using monitoring
15.AC+BA.1 - 1 complete read and write, repeated twice. Both batches sent automatically using configuration bundle size of 2
16.AC+BA.2 - 1 read request is made with a bundling size of 2 set. Then, performs same test again for reusability. Then does 2 requests instantly submitting.
17.AC+BA.3 - a 1 second window with no reads and no writes. Should read default record every second.

18.AC+RL.0 - Attempts to make 10 requests in one go with limit set to 5. Library should lock and requests deferred until a given time window.
19.AC+DL.0 - With deferrals disabled and the server artificially (sleep(10)) delayed returning, another request will be made which should hard fail.
20.AC+RL+DL.0 - 1 deferral limit and request limiting set to 1 with artificial delay - third request should hard fail.

21.AC+RL+DL+CIS.0 - This method keeps track of clients deployed by the server after issuing them an ID up front. These ID's are not transferrable between IP addresses unlike cookies and sessions, however the server may or may not allow reissuing new ID's upon request if the old ID is given and still valid (within a timeframe).

22.AC+RL+DL+CIS.1 - Uses an existing session variable for security on the server. It performs 2 tests - 1 will fail, a session variable will be set, and then another test made which will succeed.

It can either be a variable like 'isAuthd'=>1 or =>TRUE, or like 'Username'=>'MJCD' with the latter being far more secure. It can also be a timestamp that the user logged in. If not a string, a random number will be postfixed to make sure its unique.

23.AC+RL+DL+CIS.2 - Uses an existing session variable, as well as triggering IP security through hard request count limiting on the server.

24.AC+BM+BA+DL+CIS.0 - Makes 3 pass read write combo's with automatic and manual batching, request limiting, deferral limiting and client id security.

* Version Milestone 0.5 - Ready for general consumption. [*]

* Version Milestone 0.6 - 0.9 [*]

Patches, revisions and design flaws only. Not less than 1 month of active use.

* Version Milestone 1

[Insert test number].AC.10 - Perform a random combination of all tests above 1,000,000 times without error.

Spec complete. Begin development of Spec 2.

## Tests

### Methodology

All these tests are run using the Examples warehouse on my server, which is how Warehouser comes configured out of the box so as to be instantly functional at least for tests, as well as eventually these will be able to run on the GitHub page.

If your backend processor ("Warehouser.php") location or your Warehouse location, please change these. Tests must be run within the root of your Warehouse location/path, and must be as provided from the site. Please feel free to submit your own tests through a PR.

### 0. Syntax check

* No Vector, Record or Revision. Success if returns latest revision of record in root vector of warehouse storage.

#### Expected..

No syntax errors.

#### Results..

* PHP...

    Testing PHP syntax..
    
    ^ OK if no error

* JS...

    YMI: Performing no tests, success if no console output 0.php:13
    YMI: Loading Warehouser.js 0.php:14
    YMI: Test complete 

#### **Success**

## Version Milestone - 0.1 Achieved - 16/02/2014

### 1.AR.0 - Basic AJAX read

Blank request - No Vector, Record or Revision. Success if returns latest revision of first record in root vector of warehouse storage.

#### Expected..

Record 1 (first), Revision 6 (latest) data read and returned.

#### Results..

    Read: [Revision 6 of record 1]

#### **Success**

### 2.AR.1

With Vector, but no Record or Revision. Success if returns latest revision of first record in alternate vector.

#### Expected..

Record 1 (first), revision 6 (latest) within vector "VectorPart"

#### Results..

    Read: [Revision 1 of record 1 in subvector]

#### **Success**

### 3.AR.2

With Vector and Record but no Revision. Success if returns latest revision of specific record in vector.

#### Expected..

Record 4 (specified in test), revision 6 (latest) in vector.

#### Results..

    Read: [Revision 6 of record 4 in vector]

#### **Success**

### 4.AR.3

With Vector, Record AND Revision (complete). Success if returns specific revision from specific record in vector.

#### Expected..

Record 5 (specified), revision 3 (specified) in vector.

#### Results..

    Read: [Revision 3 of record 5 in vector]

#### **Success**

## Version Milestone - 0.2 Achieved - 16/02/2014

### 5.AW.0

Blank request - No vector, Record or Data. Success if creates record, revision, and returns full complete vector.

#### Expected..

    Write: [../Specifications/1/Tests/_TestWarehouse/[unique id]/[unique id].json]

#### Results..

    Write: [../Specifications/1/Tests/_TestWarehouse//13925492447869617035/13925492447892586670.json]

#### **Success**

### 6.AW.1

With Vector, but no Record and empty Data. Success if creates new record in alternate vector.

#### Expected..

    Write: [../Specifications/1/Tests/_TestWarehouse/VectorPart/[unique id]/[unique id].json]

#### Results..

    Write: [../Specifications/1/Tests/_TestWarehouse//VectorPart/13925529919928711823/13925529919932637268.json]

#### **Success**

### 7.AW.2

With Vector and Record, but empty Data. Success if writes a new revision to specific record in vector.

#### Expected..

    Write: [../Specifications/1/Tests/_TestWarehouse/VectorPart/4/[unique id].json]

#### Results..

    Write: [../Specifications/1/Tests/_TestWarehouse//VectorPart/4/139255328587807709.json]

### 8.AW.3

With Vector, Record, and string-based Data. Success if writes a new revision with Data.

#### Expected..

    Write: [../Specifications/1/Tests/_TestWarehouse/VectorPart/2/[unique id].json]
    Unique ID file contains "Test Test"

#### Results..

    Write: [../Specifications/1/Tests/_TestWarehouse//VectorPart/5/13925534238465948761.json]
    Unique ID file contains "Test Test"

### 9.AW.4

With Vector, Record, and object-based Data. Success if JSON encodes object and writes as new revision.

#### Expected..

    Write: [../Specifications/1/Tests/_TestWarehouse/VectorPart/1/[unique id].json]
    Unique ID file contains JSON object data

#### Results..

    Write: [../Specifications/1/Tests/_TestWarehouse//VectorPart/1/13925538519442745117.json]
    Unique ID file contains '{"Var1":"Test Test"}'

#### **Success**

## Version Milestone - 0.3 Achieved - 16/02/2014

### 10.AC.0

2 Blank requests - a read and a write.

#### Expected..

    Read: [Revision 6 of record 1]
    Write: [../Specifications/1/Tests/_TestWarehouse/[unique id]/[unique id].json]

#### Results..

    Read: [Revision 6 of record 1]
    Write: [../Specifications/1/Tests/_TestWarehouse///13925543086973651062/13925543086981748749.json]

#### **Success**

### 11.AC.1

1 read and 1 write with vector only.

#### Expected..

    Read: [Revision 6 of record 1 in subvector]
    Write: [../Specifications/1/Tests/_TestWarehouse/VectorPart/[unique id].json]

#### Results..

    Read: [Revision 6 of record 1 in subvector]
    Write: [../Specifications/1/Tests/_TestWarehouse//VectorPart/13925567845754913025/13925567845782177704.json]

#### **Success**

### 12.AC.2

1 read and 1 write with vector and record only.

#### Expected..

    Read: [Revision 6 of record 2]
    Write: [../Specifications/1/Tests/_TestWarehouse/VectorPart/2/[unique id].json]

#### Results..

    Read: [Revision 6 of record 2]
    Write: [../Specifications/1/Tests/_TestWarehouse//VectorPart/2/139255710103257141.json]

#### **Success**

### 13.AC.3

1 read and 1 write with vector, record. For the read, also with revision. For the write, also with object data.

#### Expected..

    Read: [Revision 4 of record 2]
    Write: [../Specifications/1/Tests/_TestWarehouse/VectorPart/2/[unique id].json]

#### Results..

Read: [Revision 4 of record 2]
Write: [../Specifications/1/Tests/_TestWarehouse//VectorPart/2/13925573533863748871.json]

### 14.AC+BM.0

1 complete read and write, repeated twice. Both as manual batches rather than using monitoring


#### - YourMove Infrastructure