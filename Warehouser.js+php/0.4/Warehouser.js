// Warehouser / Warehouser.js - JavaScript Client Implementation
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 19/01/2014
//   All rights reserved.

// Warehouser.js/1. Define Warehouser class
var Warehouser = {

	// Warehouser.js/2. Provide some configuration

	API: {
		// Warehouser.js/2.1 Provide a string to set the HTTP-accessible API url (Warehouser.php by default)
		URL: 'http://localhost/Warehouser.js+php/0.4/Warehouser.php',
		// Warehouser.js/2.2 Provide a keychain (empty by default)
		Keys: []
	},

	// Warehouser.js/2.3 Provide many connection options for different connection types
	Connection: {

		Type: 'AJAX', // Warehouser.js/2.3.1 AJAX (default), 2.3.2 COMET/longpoll

		// Warehouser.js/2.4 Configurable connection  tolerance
		Timeout: 2, // Warehouser.js/2.4.1 Connection timeout in seconds.
		Retry: 0, // Warehouser.js/2.4.2 Retry failed requests X times.

		// Warehouser.js/<nospec> Configurable connection limiting
		Limit: 10, // Warehouser.js/2.4.3 Limit to this many requests (...)
		Window: 10 // Warehouser.js/2.4.4(...) window period in seconds.

	},

	// Warehouser.js/2.5 Configurable request batching
	Bundling: {

		Limit: 1, // Warehouser.js/2.5.1 Bundle limit in request count. Note that deferred requests are added on TOP of this.
		Deferrals: 20, // Warehouser.js/<nospec> Going over this limit will cause requests to be lost. Set to 0 or false to disable.

		Window: 10, // Warehouser.js/<nospec> Bundle window in seconds - will send in this time even if not full. Set to 0 or false to disable.

		// Warehouser.js/2.5.3 Allow empty - will submit timed out bundles even if empty. (...)
		// Warehouser.js/2.5.3(...) Good if you don't know if there is data you need or not.
		// Warehouser.js/2.5.3(addition) Note: If bundling window is enabled and allow empty is true, will continually send empty 
		// Warehouser.js/2.5.3(addition)(..) requests. Good when you constantly need to receive data but only occasionally send.
		AllowEmpty: false

	},

	// Warehouser.js/2.6 Configurable request monitoring
	Monitor: {
		Immediate: true, // Warehouser.js/2.6.1 Allow request monitoring to start immediately, or triggered [manually]
		Window: 0.5 // Warehouser.js/2.6.2 Configurable monitoring window to avoid wasting cycles (in seconds)
	},

	// End Configuration - Only technical patches beyond this point!

	// Warehouser.js/<nospec> Provide functionality to get even seconds
	_GetSecs: function () { return Math.floor((new Date()).getTime() / 1000); },

	// Warehouser.php/3. Preconfigure runtime storage

	_Current: {},
	_Queue: [],
	_Deferred: [],

	_LastRun: false,
	_Locked: false,
	_RequestObject: false,

	// Warehouser.js/4. Provide functionality to start the monitoring function
	Daemon: {
		_Timer: false,

		// Warehouser.js/4.1 Do not take any action if already started.
		Start: function () {

			if (Warehouser.Daemon._Timer === false) Warehouser.Daemon._Timer = setTimeout(Warehouser.Daemon.Monitor, 0);

		},
		// Warehouser.js/5. Provide functionality to stop monitoring
		// Warehouser.js/5.1 Do not take any action if not running.
		Stop: function () {

			if (Warehouser.Daemon._Timer !== false) { clearTimeout(Warehouser.Daemon._Timer); Warehouser.Daemon._Timer = false; }

		},
		Monitor: function () {

			var Now = Warehouser._GetSecs(), Waiting = Warehouser._Queue.length + Warehouser._Deferred.length;	

			if (

				// Locked..
				(Warehouser._Locked === true) || // Do not run if already running

				( // Queuing..
					(
						(Waiting === 0) && // if nothing queued AND..
						(Warehouser.Bundling.AllowEmpty != true) // empty bundles not allowed
					)
				) || // OR..

				( // Bundling..
					(
						((Now % Warehouser.Bundling.Window) !== 0) && // if we're not at bundling window AND..
						(Waiting != Warehouser.Bundling.Limit) // if we are not at bundling limit
					) || // OR..
					(
						(Waiting <= Warehouser.Bundling.Limit) && // if not at the bundle size limit AND...
						((Now - Warehouser._LastRun) < Warehouser.Bundling.Window) // if the window has not elapsed since last run
					)
				)

			) { console.log('Waiting.. ', Now); setTimeout(Warehouser.Daemon.Monitor, (Warehouser.Monitor.Window * 1000)); }
			else { console.log('Warehouser.js/<nospec> Performing send..', Now); Warehouser.Send(); }

		},
	},

	// Warehouser.js/6. Provide a common send structure for reads AND writes
	Send: function () {

		// Warehouser.js/6.1 Send should lock Warehouser - but does not need to check if locked as this is daemon's job to trigger this
		Warehouser._Locked = true;
		Warehouser._LastRun = Warehouser._GetSecs();

		// Warehouser.js/6.2 Start building request object ready for adding other data into
		Warehouser._Current = {
			Started: Warehouser._LastRun, // Warehouser.js/6.2.1 Add request start time
			Sent: false, // Warehouser.js/6.2.2 Add sent status and sent time
			Count: Warehouser._Queue.length, // Warehouser.js/6.2.3 Add count of all requests contained
			Requests: [] // Warehouser.js/6.2.4 Add storage for request objects
		};

		// Warehouser.js/<nospec> Add any deferred content to the queue up to deferral limit
		if (Warehouser._Deferred.length > 0 && Warehouser.Bundling.Deferred > 0) {
			var Deferred = 0;
			while (Warehouser.Deferred.length > 0 && Deferred <= Warehouser.Bundling.Deferred) {
				Warehouser._Queue.push(Warehouser.Deferred.shift());
				Deferred += 1;
			}
		}

		// Warehouser.js/6.3 Process all items from the queue into the new construct.
		Warehouser._Queue.forEach(function (Request) {

			// Warehouser.js/6.3.1 Fill in any missing data

			// Warehouser.js/6.3.1.1 If no Operation type - assume 'Read'.
			Request.Operation = Request.Operation || 'Read';
			// Warehouser.js/6.3.1.2 If no Data - use empty object.
			Request.Data = Request.Data || {};

			// Warehouser.js/6.3.2 Push into storage
			Warehouser._Current.Requests.push(Request);

		});

		// Warehouser.js/6.3.3 Clear the queue once processed
		Warehouser._Queue = [];

		// Warehouser.js/6.4 JSON encode the entire construct ready for transmission
		Warehouser._Current.JSON = JSON.stringify(Warehouser._Current);
		Warehouser._Current.Response = false;

		// Warehouser.js/6.5 Fork for connection type (case insensitive)
		if (Warehouser.Connection.Type.toLowerCase() === 'ajax') {

			// Warehouser.js/6.5.1 AJAX

			// Warehouser.js/6.5.1.1 Construct object (cross-browser)
			Warehouser._RequestObject = false;
			try { Warehouser._RequestObject = new XMLHttpRequest(); }
			catch (Exception) {
				try { Warehouser._RequestObject = new ActiveXObject('Msxml2.XMLHTTP'); }
				catch (Exception2) { Warehouser._RequestObject = new ActiveXObject('Microsoft.XMLHTTP'); }
			}
			// Warehouser.js/6.5.1.1.1 Will not continue if this fails
			if(Warehouser._RequestObject === false)
				return console.log('Warehouser.js/6.5.1.2: AJAX: Fatal Error: Could not create ANY XHR object');

			// Warehouser.js/6.5.1.2 Add callback
			Warehouser._RequestObject.onreadystatechange = function() {
				// Warehouser.js/6.5.1.2.1 Check request is complete or not.
				if (Warehouser._RequestObject.readyState === 4) {
					// Warehouser.js/6.5.1.2.2 Check request success or not.
					if (Warehouser._RequestObject.status !== 200)
						return console.log('Warehouser.js/<nospec>: AJAX: Fatal Error: Non-success return from API');
					
					// Warehouser.js/6.5.1.2.3 JSON decode return construct.
					console.log('Response..', JSON.parse(Warehouser._RequestObject.responseText));
					Warehouser._Current.Response = JSON.parse(Warehouser._RequestObject.responseText);

					// Warehouser.js/6.5.1.2.4 Run "Callback" from each request construct (if any).
					// Warehouser.js/6.5.1.2.4.1 Note: Return data specific to this request will be available as first/only argument to Callback.
					Warehouser._Current.Requests.forEach(function (Request, Index) {
						// If the request has a callback, and there is data for this request - run the callback.
						if (typeof Request.Callback !== 'undefined' &&
							typeof Warehouser._Current.Response[Index] !== 'undefined' && Warehouser._Current.Response[Index].length > 0) {
							Request.Callback(Warehouser._Current.Response[Index]);
						}
						// Else, no action required.
					});

					// Unlock ready for new requests
					Warehouser._Locked = false;
					console.log('Warehouser.js/<nospec>: AJAX: Request complete');
				}
			};

			// Warehouser.js/6.5.1.3 Finalise and send (transmit) request through newly created object
			Warehouser._RequestObject.open('POST', Warehouser.API.URL, true);
			Warehouser._RequestObject.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			Warehouser._RequestObject.send('Data='+encodeURIComponent(Warehouser._Current.JSON));

		}

		else if (Warehouser.Connection.Type.toLowerCase() === 'comet' || Warehouser.Connection.Type.toLowerCase() === 'longpoll') {

			// Warehouser.js/6.5.2 COMET [NOT YET IMPLEMENTED]

			// Warehouser.js/6.5.2.1 Finalise and send (transmit) request through existing/stored object 

		}

		// Warehouser.js/6.6 Start the monitoring daemon to wait for completion
		Warehouser._Current.Sent = Warehouser._GetSecs();
		setTimeout(Warehouser.Daemon.Monitor, (Warehouser.MonitoringWindow * 1000));

	},

	// Warehouser.js/7. Define read logic of API
	Read: function (Vector, Optional_Record, Optional_Revision) {

		// Warehouser.js/<nospec> If locked, defer request until no longer locked.
		if (Warehouser._Locked === true) return Warehouser.Deferred.push([Vector, Optional_Record, Optional_Revision]);

		// Warehouser.js/7.1 Start formatting new request construct
		var RequestObject = {
			Type: 'Read', // Warehouser.js/7.1.1 Add request type to new construct.
			Vector: Vector || '' // Warehouser.js/7.1.2 If no vector is given default to falsy value
		};

		// Warehouser.js/7.2 Add the Record ID to the construct (if any)
		if (typeof Optional_Record !== 'undefined') {
			RequestObject.Record = Optional_Record;

			// Warehouser.js/7.2.1 (...) Add the Revision ID (if any).
			if (typeof Optional_Revision !== 'undefined') RequestObject.Revision = Optional_Revision;
			// Warehouser.js/7.2.1.1 If there is none, fill revision with empty string
			else RequestObject.Revision = '';

		}

		// Warehouser.js/7.2.2 If there is no Record ID, fill both Record and Revision with empty strings
		else { RequestObject.Record = ''; RequestObject.Revision = ''; }

		// Warehouser.js/7.3 Push request construct to processing queue
		Warehouser._Queue.push(RequestObject);

	},

	// Warehouser.js/8. Define write logic for API
	Write: function (RawData, Vector, Optional_Record) {

		// Warehouser.js/<nospec> If locked, defer request until no longer locked.
		if (Warehouser._Locked === true) return Warehouser.Deferred.push([Vector, Optional_Record, Optional_Revision]);

		// Warehouser.js/8.1 Start formatting new request construct
		var RequestObject = {
			Type: 'Write', // Warehouser.js/8.1.1 Add request type to new construct.
			Vector: Vector || '' // Warehouser.js/8.1.2 If no vector is given, use empty string
		};

		// Warehouser.js/8.2 Fork for different types of Data

		// Warehouser.js/8.2.1 If Data is an object, JSON encode
		if (typeof RawData === 'object') RequestObject.Data = JSON.stringify(RawData);
		// Warehouser.js/8.2.2 Otherwise, Use value as is (if any, otherwise default: empty string)
		else RequestObject.Data = RawData || '';
		// Warehouser.js/8.3 Add the Record ID to the construct (if any)
		if (typeof Optional_Record !== 'undefined') RequestObject.Record = Optional_Record;
		// WArehouser.js/8.3.1 If none, use space.
		else RequestObject.Record = '';

		// Warehouser.js/8.4 Push request construct to processing queue
		Warehouser._Queue.push(RequestObject);

	}
}

// Warehouser.js/<nospec> Init the last run time
Warehouser.LastRun = Warehouser._GetSecs();

// Warehouser.js/9. Check if monitoring/runtime should start immediately
if (Warehouser.Monitor.Immediate === true) Warehouser.Daemon.Start();

// - YourMove Infrastructure