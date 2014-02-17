### <Project> / Readme.md - Up To Date Library Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published <Publish date, Day/MM/Year>
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Forward Content>, <Getting Started Content>, <Other Topics>, <Example Content>

## Forward

This is a guide on working with Warehouses as a data storage and management concept. It deals with the topic of vectored storage and direct implementations.

## Index

1. Technology
2. Organization
3. Designing Your Warehouses
4. Management

## 1. Technoloy

Warehouser uses simple directories and **flat files** serialized using the **JSON format** as a directly accessible database. What does this mean?

* "Flat Files" - each record is its own discrete unit. In contrast to say, a database, in which many files are encoded into one.

* "JSON" - "(J)avascript (S)erial (O)bject (N)otation" is a lightweight and highly trusted data encapsulation format. This is the format currently used to store data.

## 2. Organization

Warehouser is a **vectoring data warehouse**. What does this mean?

* "Vectoring" - Data sets are iteratively broken down by groupings. The filesystem structure of Warehouser natively works this way, as directory trees they are based on do. For examples of this in action, see "Designing Your Warehouses" below (insert link).

* "Data Warehouse" - Iterative data sets which are frequently much more long term minded than perhaps a database might otherwise be. They are also often frequently read far less than they are written. For further reading on the various data warehousing methodologies, please take a look at ['Data Warehouse on Wikipedia'](http://en.wikipedia.org/wiki/Data_warehouse). 

## 3. Designing Your Warehouses

You can create Warehouses in two ways..

* Using "Warehouser.php" as a GUI

This client will enforce the design methodology discussed below in "Designing Your Warehouse" (below), so it is highly recommended to start with.

To get started, simply open "Warehouser.php?Client". For further information on usage of this function, please see "Guide.Client.md".

* Manually

One of the advantages of the open file structure of Warehouser is that you can manipulate warehouses directly within your filesystem. Please see the Security section below for advice on how to maintain data security, as well as Warehouse Design.

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

## 4. Warehouse Management

You can create Warehouses in two ways..

* Using "Warehouser.php" as a GUI

This client will enforce the design methodology discussed below in "Designing Your Warehouse" (below), so it is highly recommended to start with.

To get started, simply open "Warehouser.php?Client". For further information on usage of this function, please see "Guide.Client.md".

* Manually

One of the advantages of the open file structure of Warehouser is that you can manipulate warehouses directly within your filesystem. Please see the Security section below for advice on how to maintain data security, as well as Warehouse Design.

<Other Topics, same format - ## Title + raw>

## Examples

<Example Content, raw>

#### - YourMove Infrastructure