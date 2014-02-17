### <Project> / Readme.md - Up To Date Library Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published <Publish date, Day/MM/Year>
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Forward Content>, <Getting Started Content>, <Other Topics>, <Example Content>

## Forward

This is a guide on securing Warehouses.

## Index

1. At the filesystem level
2. At the webserver level
3. At the "Warehouser.php" level
4. At the individual Schema level

Because of its flat-file structure - for security sake, it is recommended you place your Warehouse Location folder outside your webserver's documents folder, and allow your PHP user access to that folder only. You should also disable write AND file creation access for ALL unauthorized users. I will post a guide on how to do this for Windows (NTFS) and Unix (Ext3) at a later date.

Once this is complete, access will only be available through one of the client scripting languages supported (currently just PHP) - which is where Acess Control List files play a key part. It is worth noting that unlike many ACL system's - this does not use an iterative model as it would cause impractical levels of load (see "Performance" below). Instead, "_AccessControlList.json" files within each folder/vector are absolute - affecting only that one exact target.

Through these you will also be able to set permissions for things like new records.

<Other Topics, same format - ## Title + raw>

## Examples

<Example Content, raw>

#### - YourMove Infrastructure