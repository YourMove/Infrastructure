### Warehouser / Guide.Schema.md - Schema Guide
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 16/02/2014
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Example Content>

## Forward

This is a guide on the available schema options. These are available globally or per-vector. In the case of the 'Iterative Schema' option, it can be defined iteratively through vector recursion. See the examples section below for common combinations/configurations for various purposes.

## Index

* Note: Any items seen with [^] will only be seen in the NEXT specification (currently 2). Please check (insert link here) for updates on the state of the development lifecycle or to make contributions.

* Note: Any items seen with [*] are currently incomplete but are required to meet the current specification (insert link here). This means it is an issue already, as all specification features should normally be complete before publishing/ready for consumption (RFC > 0.5). In many cases, this timeframe will be rolled over to the bug/patching period before the next *.0 version - generally no shorter than 1 month. Any contributions towards these would be welcomed

1. Security [*]
	1. "IP Security" [*]
	2. "Session Security" [*]
	3. "Key Security" [*]

2. Content [^]
	1. "Static" Warehouses [^]
	2. "Indexed Content" Warehouses [^]
	3. "Incremental Revisions" [^]
	4. "Redactions Allowed" [^]
	5. "Named Records" & "Named Revisions" [^]
	6. "Flat Records" [^]
	7. "Appended Records" [^]
	8. "Integral Records" [^]

3. Extra/Misc [^]
	1. "Slave", "To" Warehouses [^]
	2. "Referenced Records" [^]
	3. "Record Locking" [^]
	4. "Separate Read/Write" [^]
	5. "Memory Resident" [^]
	6. "Memory Redundant" [^]

## 1. Security

1. "IP Security"

These rules can be either wildcard IP addresses (eg, 192.10.1.*) or using complex ranges (eg, 192.10.1.[41,63-67]). The same can be performed with a subnet (eg, 192.10.1.1/255.255.0.0) however this is not required, it can be useful for ensuring that internal ONLY resources. This is not yet implemented or in active development.

2. "Session Security"

This will be what most people will prefer to use as it will be capable of tying into nearly any existing system's auth. Warehouser.php provides no auth mechanism as this is outside the scope of the library. 

Essentially the concept is to check a session variable is set, and based on this assume the user is auth'd. Whatever is in this variable will form the users id, so it at least should be a unique variable - if not one identifiable to a particular user.

An example would be, I have "webapp1.php", this sets "$_SESSION['UID'] = 'MJCD';" upon login. This would be a prime choice for use as this option. By default anonymous access is allowed to all resources, and without a schema, only revisions will be writable, meaning data loss is extremely unlikely.

This is not yet implemented or in active development but will come first.

3. "Key Security"

This provides a way to issue keys for specific vectors or warehouses that have either read-only, write-only or both access levels assigned to them. These can be centrally managed and can be very secure. Eventually, these will be able to be complex PGP keys referenced from an external location/store, for now they are just simple strings. This is not yet implemented or in active development.

## 2. Content

1. "Static" Warehouses

Once a warehouse has Static added to it's schema - it can no longer have new revisions created. Implemented in write operations only. Not in active development yet.

2. "Indexed Content" Warehouses

Schema's using content indexing will have their contents become searchable via the Indexer. Implemented in Index Generation and Index Lookup operations. Not in active development yet.

3. "Incremental Revisions"

Schemas using incremental revisions will only save the differences between the current commit and the last revision. This saves space, but creates inter-dependance of records. This vastly increases risk, as if one record down the chain suffers data corruption, all subsiquent revisions will do so too. It can also vastly increase access times due to computation times. Will develop this at some point - but for now, storage is cheap and plentiful. Implemented in Read AND write operations. Not in active development yet.
 
4. "Redactions Allowed"

Allows entire records to be redacted (entirely deleted). Much later in development, when Indexed Content is completed, strings will be able to be redacted while keeping all revisions otherwise intact. This would be useful for removing data such as people's names. Without this, this action is not possible, as documents are not writable, only revisable. Data that has been modified after the fact will be labeled as such clearly, with the UUID of the user(s) redacting. Implemented in write operations only. Not in active development yet.

5. "Named Records" & "Named Revisions"

Allows names to be defined, either as a static list of available names, or as dynamic user input, rather than simply consecutively numbered.

Some examples of these used would be
	
    /ExampleWarehouse/Vector1/Article1/DRAFT/
    /ExampleWarehouse/Vector1/Article1/EDIT/
    /ExampleWarehouse/Vector1/Article1/PUBLISH/
    /ExampleWarehouse/Vector1/Article1/CORRECTIONS/

You will also be able to go backwards and forwards between these stages as required - for example if a record is pushed back from publishing to the editor, implying a stateful workflow between records in a set.

6. "Flat Records"

Records will no longer be folders full of revisions, instead just single files. Only atomic read/writes allowed.

7. "Appended Records"

Allows records to be APPENDED to without any modifications to prior contents. This can be handy for logs, etc.

8. "Integral Records"

Ensures that uploaded data will not in any way be translated, encoded, compressed or otherwise changed from its original format. File name will also be preserved, however to allow for revisions, a unique prefix will be prepended. All meta data will be stored in a central Integral database (json) file for that vector to avoid litter.

**Important Note: You cannot use "Integral Records" together with schema options 2.3 (incremental revisions), 2.4 (redactions allowed), 2.6 (flat records) or 2.7 (appended records).**

## 3. Extra/Misc.

1. "Slave", "To" Warehouses

Slave warehouses are replication points that can be chained. They simply read changes from one source, not from any client input. Also requires the "To" property set to an accessible URL. Setting "To" without "Slave" will push changes as they occur, rather than having a slave that pulls changes. Both combinations should not be used at the same time, as this will lead to wasted sync processing. Implemented in index generation. Not in active development yet.

2. "Record Locking"

Enables per-node locking for read and write operations. This can be useful for example for preventing more than one person from creating revisions at one time, which can essentially lead to data loss without consolidation.

3. "Referenced Records"

Schema's using referenced records will have all their data stored disjointed from their organizational vectoring/folders, and a reference to this record will instead be placed inside the vectors being used. This can have some serious performance impacts currently, since to remain filesystem agnostic - we cannot use symlinks. The main purpose for this is that you can have records that exist within multiple vectors. Implemented in read AND write operations. Not in active development yet.

4. "Separate Read/Write"

This mode will read from a different vector than is written to, in symetrically spanning vector tree's. The purpose of this mainly is to allow a methodology where by submitted revisions or new records must be approved by a central body before becoming 'live'.

5. "Memory Resident"

Warehouse will ONLY be kept within memory. This is the highest performance method available but data can be lost with power loss, and can balloon out your memory usage. You can set a memory limit, however this will result in hard errors if/when this is hit.

These are mainly good for disposable data, or data where in the event of an error - may not be fit for processing anyway, such as runtime data between binaries, where it is probably easier/better to start over.

6. "Memory Redundant"

This will be by far the most highly leveraged type once implemented. The idea of this schema is to leverage 3 independant technologies for the absolute minimization of transactional latency for the most accessed resources within a given timeframe. Resources within this schema will automatically balance between:

1. OPTIONAL - Top level storage - RAM. This will be where the absolutely most used resources will be stored up to a given limit. As the name suggests, these will be REDUNDANT resources, loaded from disk if not found in memory.

2. OPTIONAL - Read-optimized SSD. This is an optional functionality, but ideally at least 1 SSD will be available for use with any high-demand resources that cannot fit into RAM, as well as any medium demand resources.

As an additional layer we will refer to as 2.5 would be the use of an SSD with built in RAM that transparently performs its own balancing and redundancy. This will in effect give a primary memory (top level - 1), a secondary memory (2.5) and a second level SSD with just the correct selection of hardware.

3. Archival - Traditional Platter-Based Magnetic Storage. All resources that cannot fit into any of the above will fall into this category. A lot of low traffic Warehouses will ONLY use Level 3 storage, however one should consider the performance implications listed below in this document.

## Examples

<Example Content, raw>

#### - YourMove Infrastructure