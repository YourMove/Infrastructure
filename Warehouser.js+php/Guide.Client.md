### <Project> / Readme.md - Up To Date Library Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published <Publish date, Day/MM/Year>
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Forward Content>, <Getting Started Content>, <Other Topics>, <Example Content>

## Forward

This is a guide on working with Warehouses using the Warehouser JavaScript library, and GUI companion application. It is recommended you complete the steps in the [Getting Started](Insert link here) section of the Readme.md before reading this guide.

## Index

1. JavaScript Client Configuration
	1. API & Connection Options
	2. Bundling & Monitoring Options

2. Making a request using the JavaScript API
	1. Reads
	2. Writes
	3. Combinations

3. PHP Client Configuration
4. Making a request using the PHP API
	1. Reads
	2. Writes

## 1. JavaScript Client Configuration

### 1. API & Connection Options

The JavaScript client supports many methods of connection.

* "AJAX". This is the standard method as it represents the highest level of compatability (virtually any browser). It only requires you to define the API URL (Warehouser.php). This method is most useful for event-driven tasks (such as say, writing something when the user clicks a button).

* "Longpolling". This method is most useful for realtime operations (such as streaming data to and from games).

* "Websockets". Not sure if these will be implemented, since I don't think there would be a great benefit within the scope of this project. This is not an inter-program communication library, after all. Perhaps this will be considered for a future YMI library.

Depending on the Warehouses schema configuration, you may or may not require a Key for read or write access. Eventually, you will be able to get these API keys through a query to the same API host (Warehouser.php) if the schema allows it, otherwise the requests will fail until either a key is automatically granted to your client, or you configure one into your Warehouser.js distribution.

Until then, it is generally speaking something the developer will either know, or will be able to contact someone who knows, or probably shouldn't have access (heh).

## 2. Making a request using the JavaScript API

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



<Other Topics, same format - ## Title + raw>

## Examples

<Example Content, raw>

#### - YourMove Infrastructure