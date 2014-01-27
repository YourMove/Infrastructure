### Warehouser / Readme.md - Up To Date Library Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 05/01/2013
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Forward Content>, <Getting Started Content>, <Other Topics>, <Example Content>

## Forward

**Warehouser** is an incredibly light weight single purpose library for storing and retrieving data. Unlike most data warehouses, no dedicated database server is needed, without sacrificing any data security. We ensure this through an iterative data model, which maintains data as discrete, unique writes.

### Light core, Plug and play tools

To keep Warehouser light weight, and custom built to your applications needs without sacrificing functionality - there are numerous additional tools able to be used simply by putting them in the same folder.

#### Resource

## Core Features

* Responsive - low transactional latency
* Iterative, document centric model
* Easy to set up, no dedicated server!

## Requirements

* A HTTP webserver (Apache, etc) 
* Capability of executing PHP scripts for write capabilities

(later possibly supporting more common server-side languages, such as Node.js, python, perl)..

## Getting Started

1. Download the backend processor - "Warehouser.php" above.

2. Copy/move this within it's own folder somewhere inside your webservers documents folder. 

It is recommended to use "<Document Root>/Warehouser/Warehouser.php", as you may end up wanting to use the extra tools, and this will keep it all together.

3. Edit Warehouser.php with your favourite editor (I like/use Sublime Text) - within the configuration section at the top, set where your Warehouses are to be stored (folder must exist).

4. Set up relevant permissions depending on your webserver and/or configuration. 

A .htaccess file has been created for Apache to protect this folder for you. Later, session-based, cookie-based, SSL-based and HTTP-based methods will be supported able to be plugged into most existing applications.

5. For the front end library you can either:

* Save the library from the link above, and link to it locally. With this method, you can edit "Warehouser.js", find the configuration section and set "Warehouser.Source".

Alternatively **(Recommended)**

* Load Warehouser.js with Bootstrapper.html (<insert link here>) using the following resource line:

    {
    	URL: '<insert link here>', When: 'Warehouser',
    	Callback: function () { Warehouser.Source = 'http://Example.Site/WarehouseLocation/'; }
    }

## Creating Warehouses

Now you have your back and front end ready, it's time to add something to work with. You can create Warehouses in two ways..

* Using "./Warehouser.Client.php"

This client will enforce the design methodology discussed below in "Designing Your Warehouse", so it is highly recommended to start with.

To get started, grab the PHP file from [Here]"Warehouser.php", and save it into the same folder as Warehouser.php. It is loaded through "http://Example.Site/Warehouser.php?Client".

* Manually

One of the advantages of the open file structure of Warehouser is that you can manipulate warehouses directly within your filesystem. Please see the Security section below for advice on how to maintain data security, as well as Warehouse Design.

## Client Specifics

### Connection

The JavaScript client supports many methods of connection.

* "AJAX". This is the standard method as it represents the highest level of compatability (virtually any browser). It only requires you to define the API URL (Warehouser.php). This method is most useful for event-driven tasks (such as say, writing something when the user clicks a button).

* "Longpolling". This method is most useful for realtime operations (such as streaming data to and from games).

* "Websockets". Not sure if these will be implemented, since I don't think there would be a great benefit within the scope of this project. This is not an inter-program communication library, after all. Perhaps this will be considered for a future YMI library.

Depending on the Warehouses schema configuration, you may or may not require a Key for read or write access. Eventually, you will be able to get these API keys through a query to the same API host (Warehouser.php) if the schema allows it, otherwise the requests will fail until either a key is automatically granted to your client, or you configure one into your Warehouser.js distribution.

Until then, it is generally speaking something the developer will either know, or will be able to contact someone who knows, or probably shouldn't have access (heh).



## Making a request

Warehouser.js provides it's functionality through static functionality held within "window.Warehouser".

* Warehouser.Write

Syntax: Warehouser.Write('<Vector>', <JSON Data>);
Examples:

    // Writes a new record to Set1
    Warehouser.Write('/WarehouseName/Set1', { hello: 2 });

    // Writes a Revision (and creates if doesn't exist) to Record 1 in Set1
    Warehouser.Write('/WarehouseName/Set1/1', { hello: 1 });

* Warehouser.Read

Syntax: Warehouser.Read('<Vector>', '<Record ID>', '<Optional: Revision ID>');
Examples:

    // Reads the latest Revision of Record 1 in Set1
    var RawData = Warehouser.Read('/WarehouseName/Set1/1');

    // Reads Revision 2 from Record 1 in Set1
    var RawData = Warehouser.Read('/WarehouseName/Set1/1/2');

## Server Specifics

Much like the client, the API host has many configuration options.

* Performance Monitoring. This can be enabled to track metrics like requests per minute, etc etc. This will be REQUIRED for some schema's such for load balancing, however it is disabled by default as it will degrade performance. It can be enabled in real time in the event where these metrics become important, however beware that this will further degrade performance.

### Tools

Many tools are available to add to the Warehouser experience.

* Indexer. Provides an abstract queryable interface. You can even search within records from the index (if the schema allows, discussed below). This Indexing functionality can be configured to run in varying methods to meet differing requirements.

* Client. Provides a GUI-based set up, design, editing and management toolkit. It is invaluable when getting started, but as data is stored in regular folder structures, this is not at all REQUIRED.

## Advanced

#### IMPORTANT NOTE
It is highly advisable to use Warehouser.Client.php which provides a GUI, negating the need to think about any of the below. I do however recommend still reading the below to familiarise yourself with the storage methodology and preferred limitations.

### Designing Your Warehouses

Warehouses should be structured in such a way as to divide data sets using a vectoring methodology of layered subfolders. The most basic level of vectoring possible, not suitable for any activities of scale..

    /<Warehouse Name>/<Set Name>/<Incremental Record ID>/
    /Examples/Set1/0/ - Record 0 in Set1, contains all revisions

A full record revision filename takes the format of..

    /<Set Name>/<Incremental Record ID>/<Incremental Revision ID>.<Creation Timestamp>.<Creators UUID>.json
    /Set1/0/3.1388919393.MJCD.json - Revision 3 of Record 0, in Set1

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

Starting a new Warehouse is as simple as creating a new folder within your defined Warehouse Location. Once this is done, it is technically ready for use, however you may want to review your available Schema options (below) in order to make the most of the features available. You may also need to consider security of this folder if it is within your webserver - as it may be directly accessible, which you may or may not find desirable.

### Server Indexing

You can use indexing for arbitrary data requests (mainly useful for analysis queries) in many ways.

1. Have the indexer run for a percentage of all requests. This is fine for small data sets, or highly vectored. To enable this method, open Warehouser.php in a text editor, find the variable in the configuration section near the top of the document - "WarehouserAutoIndexChance" and set it from 0 to a value from 1 to 100. A value of 100 will run it for every request, which ensures up to date index data - but may drastically slow down all requests.

2. You can schedule an acron/Windows Scheduler job, either through SSH, Control Panel, or through systems like cpanel to run the indexer at fixed intervals.

3. Manually trigger updates. You can require a password for this to work by opening Warehouser.php in a text editor, finding the variable in the configuration section near the top of the document and setting "WarehouserManualIndexPassword".

## Warehouse Security

Because of its flat-file structure - for security sake, it is recommended you place your Warehouse Location folder outside your webserver's documents folder, and allow your PHP user access to that folder only. You should also disable write AND file creation access for ALL unauthorized users. I will post a guide on how to do this for Windows (NTFS) and Unix (Ext3) at a later date.

Once this is complete, access will only be available through one of the client scripting languages supported (currently just PHP) - which is where Acess Control List files play a key part. It is worth noting that unlike many ACL system's - this does not use an iterative model as it would cause impractical levels of load (see "Performance" below). Instead, "_AccessControlList.json" files within each folder/vector are absolute - affecting only that one exact target.

Through these you will also be able to set permissions for things like new records.

## Warehouse Schema's

By default, your new schema will act in the most basic of capacities. Providing universal, discrete operations. Additional functionality can be added using a Schema flags file. Each data node can have one "_Schema.json" file directly inside. The following options are available for use:

* "IP Security"

These rules can be either wildcard IP addresses (eg, 192.10.1.*) or using complex ranges (eg, 192.10.1.[41,63-67]). The same can be performed with a subnet (eg, 192.10.1.1/255.255.0.0) however this is not required, it can be useful for ensuring that internal ONLY resources. This is not yet implemented or in active development.

* "Session Security"

This will be what most people will prefer to use as it will be capable of tying into nearly any existing system's auth. Warehouser.php provides no auth mechanism as this is outside the scope of the library. 

Essentially the concept is to check a session variable is set, and based on this assume the user is auth'd. Whatever is in this variable will form the users id, so it at least should be a unique variable - if not one identifiable to a particular user.

An example would be, I have "webapp1.php", this sets "$_SESSION['UID'] = 'MJCD';" upon login. This would be a prime choice for use as this option. By default anonymous access is allowed to all resources, and without a schema, only revisions will be writable, meaning data loss is extremely unlikely.

This is not yet implemented or in active development but will come first.

* "Key Security"

This provides a way to issue keys for specific vectors or warehouses that have either read-only, write-only or both access levels assigned to them. These can be centrally managed and can be very secure. Eventually, these will be able to be complex PGP keys referenced from an external location/store, for now they are just simple strings. This is not yet implemented or in active development.

* "Static" Warehouses

Once a warehouse has Static added to it's schema - it can no longer have new revisions created. Implemented in write operations only. Not in active development yet.

* "Indexed Content" Warehouses

Schema's using content indexing will have their contents become searchable via the Indexer. Implemented in Index Generation and Index Lookup operations. Not in active development yet.

* "Slave", "To" Warehouses

Slave warehouses are replication points that can be chained. They simply read changes from one source, not from any client input. Also requires the "To" property set to an accessible URL. Setting "To" without "Slave" will push changes as they occur, rather than having a slave that pulls changes. Both combinations should not be used at the same time, as this will lead to wasted sync processing. Implemented in index generation. Not in active development yet.

"* Incremental Revisions"

Schemas using incremental revisions will only save the differences between the current commit and the last revision. This saves space, but creates inter-dependance of records. This vastly increases risk, as if one record down the chain suffers data corruption, all subsiquent revisions will do so too. It can also vastly increase access times due to computation times. Will develop this at some point - but for now, storage is cheap and plentiful. Implemented in Read AND write operations. Not in active development yet.
 
* "Referenced Records"

Schema's using referenced records will have all their data stored disjointed from their organizational vectoring/folders, and a reference to this record will instead be placed inside the vectors being used. This can have some serious performance impacts currently, since to remain filesystem agnostic - we cannot use symlinks. The main purpose for this is that you can have records that exist within multiple vectors. Implemented in read AND write operations. Not in active development yet.

* "Redactions Allowed"

Allows entire records to be redacted (entirely deleted). Much later in development, when Indexed Content is completed, strings will be able to be redacted while keeping all revisions otherwise intact. This would be useful for removing data such as people's names. Without this, this action is not possible, as documents are not writable, only revisable. Data that has been modified after the fact will be labeled as such clearly, with the UUID of the user(s) redacting. Implemented in write operations only. Not in active development yet.

* "Record Locking"

Enables per-node locking for read and write operations. This can be useful for example for preventing more than one person from creating revisions at one time, which can essentially lead to data loss without consolidation.

* "Separate Read/Write"

This mode will read from a different vector than is written to, in symetrically spanning vector tree's. The purpose of this mainly is to allow a methodology where by submitted revisions or new records must be approved by a central body before becoming 'live'.

* "Named Records" & "Named Revisions"

Allows names to be defined, either as a static list of available names, or as dynamic user input, rather than simply consecutively numbered.

* "Flat Records"

Records will no longer be folders full of revisions, instead just single files. Only atomic read/writes allowed.

* "Appended Records"

Allows records to be APPENDED to without any modifications to prior contents. This can be handy for logs, etc.

Some examples of these used would be

    /ExampleWarehouse/Vector1/Home/1/
    /ExampleWarehouse/Vector1/Home/52/
    /ExampleWarehouse/Vector1/Home/DRAFT/
    /ExampleWarehouse/Vector1/Home/EDIT/
    /ExampleWarehouse/Vector1/Home/PUBLISH/
    /ExampleWarehouse/Vector1/Home/CORRECTIONS/

You will also be able to go backwards and forwards between these stages as required - for example if a record is pushed back from publishing to the editor.

* "Memory Resident"

Warehouse will ONLY be kept within memory. This is the highest performance method available but data can be lost with power loss, and can balloon out your memory usage. You can set a memory limit, however this will result in hard errors if/when this is hit.

These are mainly good for disposable data, or data where in the event of an error - may not be fit for processing anyway, such as runtime data between binaries, where it is probably easier/better to start over.

* "Memory Redundant"

This will be by far the most highly leveraged type once implemented. The idea of this schema is to leverage 3 independant technologies for the absolute minimization of transactional latency for the most accessed resources within a given timeframe. Resources within this schema will automatically balance between:

1. OPTIONAL - Top level storage - RAM. This will be where the absolutely most used resources will be stored up to a given limit. As the name suggests, these will be REDUNDANT resources, loaded from disk if not found in memory.

2. OPTIONAL - Read-optimized SSD. This is an optional functionality, but ideally at least 1 SSD will be available for use with any high-demand resources that cannot fit into RAM, as well as any medium demand resources.

As an additional layer we will refer to as 2.5 would be the use of an SSD with built in RAM that transparently performs its own balancing and redundancy. This will in effect give a primary memory (top level - 1), a secondary memory (2.5) and a second level SSD with just the correct selection of hardware.

3. Archival - Traditional Platter-Based Magnetic Storage. All resources that cannot fit into any of the above will fall into this category. A lot of low traffic Warehouses will ONLY use Level 3 storage, however one should consider the performance implications listed below in this document.

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