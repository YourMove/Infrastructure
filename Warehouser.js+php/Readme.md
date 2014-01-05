### Warehouser / Readme.md - Up To Date Library Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 05/01/2013
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Forward Content>, <Getting Started Content>, <Other Topics>, <Example Content>

## Forward

**Warehouser** is an incredibly light weight single purpose library for storing and retrieving data. Unlike most data warehouses, no dedicated database server is needed, without sacrificing any data security. We ensure this through an iterative data model, which maintains data as discrete, unique writes.

It also offers an respectable indexer library (Warehouser.Indexer) which provides an abstract queryable interface. You can even search within records from the index (if the schema allows, discussed below). This Indexing functionality can be configured to run in varying methods - from every request, a percentage of requests, a manually configured acron/Windows Scheduler job every X seconds/minutes, or manually via direct link (only updates when accessed, with password support [and later SSL certs]).

Data is stored in regular folder structures, with an end node constituting a folder containing only folders (no files), with each folder inside ONLY containing files (no folders). Each file in this end node folder is itself a discrete record. Individual records are stored in JSON format, and thus have compatability with a vast array of languages and libraries.

It is filesystem agnostic - meaning it does not rely on any abstract features of any one filesystem. Use whatever filesystem you prefer! It also does not rely on filesystem meta-data for data integrity purposes (creation/modification times) - which means it is safe to copy these files to remote servers directly without risking meta-data loss.

## Requires

* A HTTP webserver (Apache, etc) 
* Capability of executing PHP scripts

## Getting Started

1. Download the backend processor - "Warehouser.php".
2. Copy/move this within your webservers document root.
3. Create a folder to be used as your Warehouse Location (See "Warehouse Security" below for advice/tips).
4. Open "Warehouser.php" in a text editor.
5. Find the configuration section near the top and change WarehouseLocation to reflect the location of the folder you just created. This can be absolute ("/var/Warehouses/") or relative ("../../Warehouses/").

- The backend is now ready for use, but has no Warehouses. Please see "Warehouse Structure" below for a full guide -

6. For the front end library you can either:

* Save the library from the link above, and link to it locally. With this method, you can edit "Warehouser.js", find the configuration section and set window.WarehouserSource.
* (Recommended) Load Warehouser.js with Bootstrapper.html (<insert link here>) using the following resource line:

    { URL: '<insert link here>', When: 'Warehouser', Callback: function () { Warehouser.Source = 'http://Example.Site/WarehouseLocation/'; } }

- The frontend is now ready for use -

## Warehouse Structure

One of the advantages of the open file structure of Warehouser is that you can manipulate warehouses directly within your filesystem. Because of this, one of the first things you should consider is what users/groups are allowed what level of access within your Warehouse storage location.

### Designing Your Warehouses

Warehouses should be structured in such a way as to divide data sets using a vectoring methodology of layered subfolders.

    /<Warehouse Name>/<Set Name>/<Incremental Record ID>/
    /Examples/Set1/0/ - Record 0 in Set1, contains all revisions

A full record revision filename takes the format of:

    /<Incremental Record ID>/<Incremental Revision ID>.<Creation Timestamp>.<Creators UUID>.json
    /Set1/0/0.1388919393.MJCD.json - Revision 0 (original) of Record 0, in Set1
    /Set1/53/29.1388919393.MJCD.json - Revision 29 of Record 53, in Set1

This relatively simple structure is fine for small or static (see below) Warehouses - however you will want to scale your complexity with increasing business requirements. By far the easiest way, and an ISO data storage standard compliant way, is to add chronological vectoring to whatever sensitivity works best for your needs.

Ideally, no individual vector end node should contain more than 1000 records to maintain performance (this is discussed further in the Performance section below). With that in mind, consider these in terms of "< 1000 Records created/modified within X timeframe" required for your business case when deciding what level of chronological vectoring to use..

    /<Warehouse Name>/<Set Name>/<Year>/<Incremental Record ID 0-999>
    /<Warehouse Name>/<Set Name>/<Year>/<Month>/<Incremental Record ID 0-999>
    /<Warehouse Name>/<Set Name>/<Year>/<Month>/<Day>/<Incremental Record ID 0-999>
    /<Warehouse Name>/<Set Name>/<Year>/<Month>/<Day>/<Hour>/<Incremental Record ID 0-999>
    /<Warehouse Name>/<Set Name>/<Year>/<Month>/<Day>/<Hour>/<Minute>/<Incremental Record ID 0-999>
    /<Warehouse Name>/<Set Name>/<Year>/<Month>/<Day>/<Hour>/<Minute>/<Second>/<Incremental Record ID 0-999>

You are also in no way required to use chronological vectoring. An example would be giving a user 10 balls of different colours - red green and blue. You need these sorted into separate "buckets". An example vectoring for that Warehouse would be..

    /<Warehouse Name>/<Set Name>/<Sub type>
    /Sorting/Balls/Red/
    /Sorting/Balls/Green/
    /Sorting/Balls/Blue/

Or more complex still, you have a bucket of balls any combination of: two black halves, two white halves, or one of each..

    /<Warehouse Name>/<Set Name>/<Sub Type 1>/<Sub Type 2>/
    /Sorting/Balls/White/White/
    /Sorting/Balls/White/Black/
    /Sorting/Balls/Black/White/
    /Sorting/Balls/Black/Black/

## Building a new Warehouse

Starting a new Warehouse is as simple as creating a new folder within your defined Warehouse Location and more within for the vectoring described above on a case by case basis. Once this is done, it is technically ready for use.

## Making a request

Ok! So we've got our Warehouse designed how we want it, we have our Warehouser.php location configured in Warehouser.js which has been loaded into our browser through our HTML document. We're ready to start using it!

Warehouser.js provides it's functionality through static functionality held within window.Warehouser.

### Warehouser.Write

    Syntax: Warehouser.Write('<Vector>', <JSON Data>);

    Examples:

        // Writes a new record to Set1
        Warehouser.Write('/WarehouseName/Set1', { hello: 2 });

        // Writes a Revision to Record 1 in Set1
        Warehouser.Write('/WarehouseName/Set1/1', { hello: 1 });

### Warehouser.Read

    Syntax: Warehouser.Read('<Vector>');

    Examples:

        // Reads the latest Revision of Record 1 in Set1
        var RawData = Warehouser.Read('/WarehouseName/Set1/1');

        // Reads Revision 2 from Record 1 in Set1
        var RawData = Warehouser.Read('/WarehouseName/Set1/1/2');

## Warehouse Security

Because of its flat-file structure - for security sake, it is recommended you place your Warehouse Location folder outside your webserver's documents folder, and allow your PHP user access to that folder only. You should also disable write AND file creation access for ALL unauthorized users. I will post a guide on how to do this for Windows (NTFS) and Unix (Ext3) at a later date.

### Warehouse Schema's

By default, your new schema will act in the most basic of capacities. Providing universal, discrete operations. Additional functionality can be added using a Schema flags file. Each Warehouse can have one Warehouse.Schema.json file directly inside the Warehouse Location folder. The following options are available for use:

* "Static" Warehouses (& "Flatten")

Once a warehouse has Static added to it's schema - it can no longer have new revisions created. Optionally at this time, the record can be flattened to the latest revision for speed (especially for Incremental Revisions (see below)) - however obviously data loss will occur. This operation is triggered by the Indexer (as the index also needs to be 'flattened') on the next processing cycle. Not in active development yet.

* "Indexed Content" Warehouses

Schema's using content indexing will have their contents become searchable via the Indexer. Not in active development yet.

* "Slave", "To" Warehouses

Slave warehouses are replication points that can be chained. They simply read changes from one source, not from any client input. Also requires the "To" property set to an accessible URL. Setting "To" without "Slave" will push changes as they occur, rather than having a slave that pulls changes. Both combinations should not be used at the same time, as this will lead to wasted sync processing. Not in active development yet.

#### Incremental Revisions

Schemas using incremental revisions will only save the differences between the current commit and the last revision. This saves space, but creates inter-dependance of records. This vastly increases risk, as if one record down the chain suffers data corruption, all subsiquent revisions will do so too. It can also vastly increase access times due to computation times. Will develop this at some point - but for now, storage is cheap and plentiful. Not in active development yet.

#### Referenced Records

Schema's using referenced records will have all their data stored in folders with a maximum of 1000 records in each, and a reference to this record will instead be placed inside the vectors being used. This can have some serious performance impacts currently, since to remain filesystem agnostic - we cannot use symlinks. The main purpose for this is that you can have records that exist in multiple vectors. Not in active development yet.

#### Redactable

Allows entire records to be redacted (entirely deleted). Much later in development, when Indexed Content is completed, strings will be able to be redacted while keeping all revisions otherwise intact. This would be useful for removing data such as people's names. Not in active development yet.

#### Encrypt

Encryption will be able to be applied to allow either single users, many users, or whole access groups limited readability to any given vector. Not in active development yet.

## Optional: Server Indexing

You can use indexing for arbitrary data requests (mainly useful for analysis queries) in many ways. A single warehouse

1. Have the indexer run for every request. This is fine for small data sets, or highly vectored
2. Trigger the indexer for a certain percentage of all read requests. This will not delay the client from continuing, the main side effect is that it can be uncertain how old the index data is
2. You can schedule an acron job, either through SSH or through systems like cpanel to run the indexer at fixed intervals
3. Manually trigger updates (with a simple password)

## Performance

### Storage

Under the assumption that request throughput will rarely maximize a SATA 3 GbitTraditional platter hard drives will limit throughput to a maximum of about 75-150 input/output operations per drive, per second. By far the easiest way to avoid this becoming a significant issue is to mount each warehouse as a separate drive, within the same folder. This will allow for instantaneous processing of up to 100 requests per second, per Warehouse.

Considering this is a warehousing system, not a realtime transactional system - it would be very rare that 100 users would make 100 requests within 60 seconds, meaning it would be capable of handling..

    (Drive IOPS * Average Handling Time) users, eg, with a 5 second user handling time per request..
    100 * 5 = 500 users per drive.

The server won't drop requests after this point however - all requests over this will simply become slightly slower for every fraction over you go.

If this were to become an issue, the easiest solution would be to add additional drives mounted as parallel Warehouses, using the same Schema (discussed below) or, alternatively - to upgrade any traditional platter-based SATA storage drives for higher performance SSD based storage - with many models being capable of SUSTAINED 200,000 IOPS. This, obviously, **DRASTICALLY** alters the performance figures estimated above for platter-based drives. This number becomes..

    200,000 * 5 = 1,000,000 users PER DRIVE/WAREHOUSE.

As also noted above- ideally, no individual vector end node should contain more than 1000 records to maintain performance. Vector complexity should be created in such a way as to limit this.

We can calculate the 'best' chronological vectoring to use like so.. Assuming from the figures above, 500 users are creating a new record or new revision every 5 seconds..

   (3600 (an hour in seconds) / Average Handling Time) records per hour, so for our example handling time above..
   3600 / 5 = 720 records/revisions per hour.

As this is nearly 1/4th under our maximum records per vector end node, hours (/<Set Name>/<Year>/<Month>/<Day>/<Hour>/) would be an ideal vector end node point, while leaving adequate room for future growth.

Meanwhile with a much lower creation rate, such as say, a blog that aims to do 500 or so articles a year, then Year (/<Set Name>/<Year>/) is going to provide that same room for growth, without over complicating the data set.

Once again as with drive IOPS, going over this will not cause errors - but it will cause performance degredation to one degree or another, depending on the file system in use.

###Other performance concerns will be addressed after writing and unit testing can be completed.
### CPU
### Memory
### Real benchmark scores

## In the future..

Eventually, these data sets and their indexes will be able to be distributed for offline use, which will auto-update when a designated update source is available on the network, or as another local set.

#### - YourMove Infrastructure