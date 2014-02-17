### <Project> / Readme.md - Up To Date Library Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published <Publish date, Day/MM/Year>
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Forward Content>, <Getting Started Content>, <Other Topics>, <Example Content>

## Forward

This is a guide on the various aspects of the performance of Warehouser.

## Index

1. Storage
2. CPU
3. Memory
4. Benchmarks

### 1. Storage

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

## Other performance concerns will be addressed after writing and unit testing can be completed.

## 2. CPU
## 3. Memory
## 4. Benchmarks

#### - YourMove Infrastructure