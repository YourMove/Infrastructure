// Warehouser / Warehouser.js - JavaScript Client Implementation
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 19/01/2014
//   All rights reserved.

// Define core object
var Warehouser = {

	// Configuration --------------------------------------------------------------------------------------------------

	API: {
		URL: './Warehouser.php',
		Keys: ['DefaultServerAPIKey']
	},

	Connection: {
		Type: 'AJAX', // AJAX, longpoll
		Timeout: 2, // seconds
		Limit: 10, // concurrent requests
		Retry: 0 // times before giving up (default: 0, infinite)
	},

	Bundling: {
		Limit: 1, // before processing (default: 1, don't batch or -1, require manual Send)
		Timeout: 10 // max before forced processing
	},

	Monitor: {
		Immediate: true, // sets whether monitoring starts automatically, otherwise trigger yourself.
		Window: 0.5 // check every x seconds (default: 0.5)
	},

	// End Configuration - Only technical patches beyond this point ---------------------------------------------------

	// Runtime prepare runtime resources

	Current: {},
	Queue: [],
	LastRun: false,
	Locked: false,
	RequestObject: false,

	// Provide a runtime monitoring function
	StartMonitoring: function () { setTimeout(Warehouser.MonitorDaemon, 1); },
	MonitorDaemon: function () {
		
		// Do not run if already running or if nothing queued
		if (Warehouser.Locked === true || Warehouser.Queue.length === 0 || Warehouser.Queue.length < Warehouser.Bundling.Limit)
			setTimeout(Warehouser.MonitorDaemon, (Warehouser.MonitoringWindow * 1000));
		else Warehouser.Send();

	},

	Send: function () {

		// Lock the library.
		Warehouser.Locked = true;

		// Construct all requests into one request
		Warehouser.Current = {
			Started: (new Date()).getTime(),
			Sent: false,
			Count: Warehouser.Queue.length,
			Requests: []
		};
		Warehouser.Queue.forEach(function (Request) {
			// Fill in any missing data (blank requests are allowed)
			Request.Operation = Request.Operation || 'Read';
			Request.Data = Request.Data || {};
			// Add ID for easy callback and push into storage
			Warehouser.Current.Requests.push(Request);
		});
		// Clear the queue
		Warehouser.Queue = [];
		// JSON encode entire final request object
		Warehouser.Current.JSON = JSON.stringify(Warehouser.Current);
		Warehouser.Current.Response = false;

		// Make AJAX object
		Warehouser.RequestObject = false;
		try { Warehouser.RequestObject = new XMLHttpRequest(); }
		catch (Exception) {
			try { Warehouser.RequestObject = new ActiveXObject('Msxml2.XMLHTTP'); }
			catch (Exception2) { Warehouser.RequestObject = new ActiveXObject('Microsoft.XMLHTTP'); }
		}
		// Error check
		if(Warehouser.RequestObject === false)
			return console.log('Warehouser.js/<nospec>: AJAX: Fatal Error: Could not create ANY XHR object');

		// Add monitor function
		Warehouser.RequestObject.onreadystatechange = function() {
			// Check for finish
			if (Warehouser.RequestObject.readyState === 4) {
				// Error check
				if (Warehouser.RequestObject.status !== 200)
					return console.log('Warehouser.js/<nospec>: AJAX: Fatal Error: Non-success return from API');
				
				// Else, process some JSON!
				Warehouser.Current.Response = JSON.parse(Warehouser.RequestObject.responseText);

				// Handle all callbacks
				Warehouser.Current.Requests.forEach(function (Request, Index) {
					// If the request has a callback, and there is data for this request - run the callback.
					if (typeof Request.Callback !== 'undefined' &&
						typeof Warehouser.Current.Response[Index] !== 'undefined' && Warehouser.Current.Response[Index].length > 0) {
						Request.Callback(Warehouser.Current.Response[Index]);
					}
					// Else, no action required.
				});

				// Unlock ready for new requests
				Warehouser.Locked = false;
				console.log('Warehouser.js/<nospec>: AJAX: Request complete');
			}
		};

		// Send request
		Warehouser.RequestObject.open('POST', Warehouser.API.URL, true);
		Warehouser.RequestObject.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		Warehouser.RequestObject.send('Data='+encodeURIComponent(Warehouser.Current.JSON));

		// Sent fine, keep monitoring
		Warehouser.Current.Sent = (new Date()).getTime();
		setTimeout(Warehouser.MonitorDaemon, (Warehouser.MonitoringWindow * 1000));

	},

	// Core API
	Read: function (Vector, Optional_Record, Optional_Revision) {

		// Construct request object
		var RequestObject = {
			Type: 'Read',
			Vector: Vector
		};
		if (typeof Optional_Record !== 'undefined') {
			// Add record to request
			RequestObject.Record = Optional_Record;
			// Revision requires a record id - add revision to request (if any)
			if (typeof Optional_Revision !== 'undefined') RequestObject.Record = Optional_Revision;
		}

		// Push to queue
		Warehouser.Queue.push(RequestObject);

	},

	Write: function (RawData, Vector, Optional_Record) {

		// Construct request object
		var RequestObject = {
			Type: 'Write',
			Vector: Vector
		};
		// Add data - either object or string
		if (typeof RawData === 'object') RequestObject.Data = JSON.stringify(RawData);
		else RequestObject.Data = RawData || '';
		// Add record if any given
		if (typeof Optional_Record !== 'undefined') RequestObject.Record = Optional_Record;

		// Push to queue
		Warehouser.Queue.push(RequestObject);

	}

}

// Start monitoring immediately if configured to do so
if (Warehouser.Monitor.Immediate === true) Warehouser.StartMonitoring();

// - YourMove Infrastructure