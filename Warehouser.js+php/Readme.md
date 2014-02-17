### Warehouser / Readme.md - Up To Date Library Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 15/02/2014
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.

## Forward

**Warehouser** is an incredibly light weight single purpose library for storing and retrieving data. Unlike most data warehouses, no dedicated database server is needed.

### Core Features

* Responsive, low transactional latency
* Iterative, document centric model
* Easy to set up, no dedicated server

## Getting Started

### Requirements

1. A HTTP server capable of executing PHP scripts

### Steps

1. Download the backend processor - "Warehouser.php" above.

2. Copy/move this within it's own folder somewhere inside your webservers documents folder. 

3. Edit Warehouser.php with your favourite editor (I like/use Sublime Text) - within the configuration section at the top, set where your Warehouses are to be stored (folder must exist).

4. Load the client/front end library

Option 1: Link Locally

1. Download the Warehouser.js here
2. Edit file to find the configuration section and set "Warehouser.Connection.API" to your backend.
3. Link to your HTML file directly

Option 2: Link from CDN

1. Set variable "window.WarehouserAPI" to the location of your back end
2. Link your HTML file to (insert link here)

Option 3: Use Bootstrapper **(Recommended)**

If you aren't familiar with Bootstrapper, take a moment to check it out (insert link here). It is very useful, especially if you intend to use more than one YMI system/library. If you are just going to use this one, it is probably simpler to use option 1 or 2. Otherwise, you can load and initialise Warehouser using the following **Bootstrapper Resource** line:

    {
    	URL: '(insert link here)', When: 'Warehouser',
    	Callback: function () { Warehouser.Source = 'http://Example.Site/WarehouseLocation/'; }
    }

## Extended Guides

* [Warehouses](./Guide.Warehouses.md)

1. Technology
2. Organization
3. Designing Your Warehouses
4. Management

* [Schema](./Guide.Schema.md)

1. Security
1.1. "IP Security"
1.2. "Session Security"
1.3. "Key Security"

2. Content
2.1. "Static" Warehouses
2.2. "Indexed Content" Warehouses
2.3. "Incremental Revisions"
2.4. "Redactions Allowed"
2.5. "Named Records" & "Named Revisions"
2.6. "Flat Records"
2.7. "Appended Records"

3. Extra/Misc
3.1. "Slave", "To" Warehouses
3.2. "Referenced Records"
3.3. "Record Locking"
3.4. "Separate Read/Write"
3.5. "Memory Resident"
3.6. "Memory Redundant"

* [Client](./Guide.Client.md)

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

* [Security](./Guide.Security.md)

1. At the filesystem level
2. At the webserver level
3. At the "Warehouser.php" level
4. At the individual Schema level

* [Performance](./Guide.Performance.md)

1. Storage
2. CPU
3. Memory
4. Benchmarks

## Use-Case Examples

<Example Content, raw>

## Projects That Use Warehouser

* Note: To get your project listed here, please see "Contact" section here (insert link)

### Author: [MJCD](http://github.com/MJCD/)

* WarehouseCRM - an **incredibly** lightweight customer resource manager
* WarehouseCMS - an **incredibly** lightweight content management and templating system

#### - YourMove Infrastructure