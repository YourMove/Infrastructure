// Warehouser / Warehouser.js - JavaScript Client Implementation
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 19/01/2014
//   All rights reserved.

// Warehouser.js/1. Define Warehouser class
var Warehouser = {

	// Warehouser.js/2. Provide some configuration

	API: {
		// Warehouser.js/2.1 Provide a string to set the HTTP-accessible API url (Warehouser.php by default)
		URL: './Warehouser.php',
		// Warehouser.js/2.2 Provide a keychain (empty by default)
		Keys: []
	},

	// Warehouser.js/2.3 Provide many connection options for different connection types
	Connection: {

		Type: 'AJAX', // Warehouser.js/2.3.1 AJAX (default), 2.3.2 COMET/longpoll

		// Warehouser.js/2.4 Configurable connection tolerance
		Timeout: 2, // Warehouser.js/2.4.1 Connection timeout in seconds.
		Retry: 0, // Warehouser.js/2.4.2 Retry failed requests X times.
		Limit: 10, // Warehouser.js/2.4.3 Limit to this many requests (...)
		Window: 10 // Warehouser.js/2.4.4(...) window period in seconds.
	},

	// Warehouser.js/2.5 Configurable request batching
	Bundling: {
		Limit: 1, // Warehouser.js/2.5.1 Bundle limit in request count.
		Timeout: 10, // Warehouser.js/Bundle timeout in seconds - will send in this time even if not full.
		// Warehouser.js/2.5.3 Allow empty - will submit timed out bundles even if empty. (...)
		// Warehouser.js/2.5.3(...) Good if you don't know if there is data you need or not.
		AllowEmpty: false 
	},

	// Warehouser.js/2.6 Configurable request monitoring
	Monitor: {
		Immediate: true, // Warehouser.js/2.6.1 Allow request monitoring to start immediately, or triggered [manually]
		Window: 0.5 // Warehouser.js/2.6.2 Configurable monitoring window to avoid wasting cycles (in seconds)
	},

	// End Configuration - Only technical patches beyond this point!

	// Warehouser.php/3. Preconfigure runtime storage

	Current: {},
	Queue: [],
	LastRun: false,
	Locked: false,
	RequestObject: false,
	DaemonTimer: false,

	// Warehouser.js/4. Provide functionality to start the monitoring function
	// Warehouser.js/4.1 Do not take any action if already started.
	StartMonitoring: function () { if (Warehouser.DaemonTimer === false) Warehouser.DaemonTimer = setTimeout(Warehouser.MonitorDaemon, 1); },
	// Warehouser.js/5. Provide functionality to stop monitoring
	// Warehouser.js/5.1 Do not take any action if not running.
	StopMonitoring: function () { if (Warehouser.DaemonTimer !== false) { clearTimeout(Warehouser.DaemonTimer); Warehouser.DaemonTimer = false; } },
	MonitorDaemon: function () {
		
		// Do not run if already running or if nothing queued
		if (Warehouser.Locked === true || Warehouser.Queue.length === 0 || Warehouser.Queue.length < Warehouser.Bundling.Limit)
			setTimeout(Warehouser.MonitorDaemon, (Warehouser.MonitoringWindow * 1000));
		else Warehouser.Send();

	},

	// Warehouser.js/6. Provide a common send structure for reads AND writes
	Send: function () {

		// Warehouser.js/6.1 Send should lock Warehouser - but does not need to check if locked as this is daemon's job to trigger this
		Warehouser.Locked = true;

		// Warehouser.js/6.2 Start building request object ready for adding other data into
		Warehouser.Current = {
			Started: (new Date()).getTime(), // Warehouser.js/6.2.1 Add request start time
			Sent: false, // Warehouser.js/6.2.2 Add sent status and sent time
			Count: Warehouser.Queue.length, // Warehouser.js/6.2.3 Add count of all requests contained
			Requests: [] // Warehouser.js/6.2.4 Add storage for request objects
		};

		// Warehouser.js/6.3 Process all items from the queue into the new construct.
		Warehouser.Queue.forEach(function (Request) {

			// Warehouser.js/6.3.1 Fill in any missing data

			// Warehouser.js/6.3.1.1 If no Operation type - assume 'Read'.
			Request.Operation = Request.Operation || 'Read';
			// Warehouser.js/6.3.1.2 If no Data - use empty object.
			Request.Data = Request.Data || {};

			// Warehouser.js/6.3.2 Push into storage
			Warehouser.Current.Requests.push(Request);

		});

		// Warehouser.js/6.3.3 Clear the queue once processed
		Warehouser.Queue = [];

		// Warehouser.js/6.4 JSON encode the entire construct ready for transmission
		Warehouser.Current.JSON = JSON.stringify(Warehouser.Current);
		Warehouser.Current.Response = false;

		// Warehouser.js/6.5 Fork for connection type (case insensitive)
		if (Warehouser.Connection.Type.toLowerCase() === 'ajax') {

			// Warehouser.js/6.5.1 AJAX

			// Warehouser.js/6.5.1.1 Construct object (cross-browser)
			Warehouser.RequestObject = false;
			try { Warehouser.RequestObject = new XMLHttpRequest(); }
			catch (Exception) {
				try { Warehouser.RequestObject = new ActiveXObject('Msxml2.XMLHTTP'); }
				catch (Exception2) { Warehouser.RequestObject = new ActiveXObject('Microsoft.XMLHTTP'); }
			}
			// Warehouser.js/6.5.1.1.1 Will not continue if this fails
			if(Warehouser.RequestObject === false)
				return console.log('Warehouser.js/6.5.1.2: AJAX: Fatal Error: Could not create ANY XHR object');

			// Warehouser.js/6.5.1.2 Add callback
			Warehouser.RequestObject.onreadystatechange = function() {
				// Warehouser.js/6.5.1.2.1 Check request is complete or not.
				if (Warehouser.RequestObject.readyState === 4) {
					// Warehouser.js/6.5.1.2.2 Check request success or not.
					if (Warehouser.RequestObject.status !== 200)
						return console.log('Warehouser.js/<nospec>: AJAX: Fatal Error: Non-success return from API');
					
					// Warehouser.js/6.5.1.2.3 JSON decode return construct.
					console.log('Response..', JSON.parse(Warehouser.RequestObject.responseText));
					Warehouser.Current.Response = JSON.parse(Warehouser.RequestObject.responseText);

					// Warehouser.js/6.5.1.2.4 Run "Callback" from each request construct (if any).
					// Warehouser.js/6.5.1.2.4.1 Note: Return data specific to this request will be available as first/only argument to Callback.
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

			// Warehouser.js/6.5.1.3 Finalise and send (transmit) request through newly created object
			Warehouser.RequestObject.open('POST', Warehouser.API.URL, true);
			Warehouser.RequestObject.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			Warehouser.RequestObject.send('Data='+encodeURIComponent(Warehouser.Current.JSON));

		}

		else if (Warehouser.Connection.Type.toLowerCase() === 'comet' || Warehouser.Connection.Type.toLowerCase() === 'longpoll') {

			// Warehouser.js/6.5.2 COMET [NOT YET IMPLEMENTED]

			// Warehouser.js/6.5.2.1 Finalise and send (transmit) request through existing/stored object 

		}

		// Warehouser.js/6.6 Start the monitoring daemon to wait for completion
		Warehouser.Current.Sent = (new Date()).getTime();
		setTimeout(Warehouser.MonitorDaemon, (Warehouser.MonitoringWindow * 1000));

	},

	// Warehouser.js/7. Define read logic of API
	Read: function (Vector, Optional_Record, Optional_Revision) {

		// Warehouser.js/7.1 Start formatting new request construct
		var RequestObject = {
			Type: 'Read', // Warehouser.js/7.1.1 Add request type to new construct.
			Vector: Vector || 0 // Warehouser.js/7.1.2 If no vector is given default to falsy value
		};

		// Warehouser.js/7.2 Add the Record ID to the construct (if any)
		if (typeof Optional_Record !== 'undefined') {
			RequestObject.Record = Optional_Record;

			// Warehouser.js/7.2.1 (...) Add the Revision ID (if any).
			if (typeof Optional_Revision !== 'undefined') RequestObject.Revision = Optional_Revision;
			// Warehouser.js/7.2.1.1 If there is none, fill revision with falsy value.
			else RequestObject.Revision = 0;

		}

		// Warehouser.js/7.2.2 If there is no Record ID, fill both Record and Revision with falsy values.
		else { RequestObject.Record = 0; RequestObject.Revision = 0; }

		// Warehouser.js/7.3 Push request construct to processing queue
		Warehouser.Queue.push(RequestObject);

	},

	// Warehouser.js/8. Define write logic for API
	Write: function (RawData, Vector, Optional_Record) {

		// Warehouser.js/8.1 Start formatting new request construct
		var RequestObject = {
			Type: 'Write', // Warehouser.js/8.1.1 Add request type to new construct.
			Vector: Vector || 0 // Warehouser.js/8.1.2 If no vector is given, use falsy value.
		};

		// Warehouser.js/8.2 Fork for different types of Data

		// Warehouser.js/8.2.1 If Data is an object, JSON encode
		if (typeof RawData === 'object') RequestObject.Data = JSON.stringify(RawData);
		// Warehouser.js/8.2.2 Otherwise, Use value as is (if any, otherwise default: Empty String)
		else RequestObject.Data = RawData || '';
		// Warehouser.js/8.3 Add the Record ID to the construct (if any)
		if (typeof Optional_Record !== 'undefined') RequestObject.Record = Optional_Record;
		// WArehouser.js/8.3.1 If none, use falsy value.
		else RequestObject.Record = 0;

		// Warehouser.js/8.4 Push request construct to processing queue
		Warehouser.Queue.push(RequestObject);

	}

}

// Warehouser.js/9. Check if monitoring/runtime should start immediately
if (Warehouser.Monitor.Immediate === true) Warehouser.StartMonitoring();

// - YourMove Infrastructure