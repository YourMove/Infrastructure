<?php

// Warehouser / Warehouser.php - All in one
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/01/2014
//   All rights reserved.

// Start the session. Alternatively, this could be unique cookies issued on login.
// For now, sessions are the easiest option and can easily be compatible with
// the auth system from nearly any PHP system.
@session_start();

// Warehouser.php/1. Define Warehouser class

class Warehouser {

	// Warehouser.php/2. Provide some configuration

	// Warehouser.php/2.1 Allow definition of the main warehouse storage root
	public static $StoragePath = '../Specifications/1/Tests/_TestWarehouse/';

	// Warehouser.php/<nospec> Allow for basic error/performance tracking
	public static $OperationTimeout = 5; // Seconds
	public static $MaxEndnodeScan = 5;  // 5 results will be checked to try and find an end node when scanning.

	// Warehouser.php/2.3 Request Limiting options
	public static $RequestLimiting = array(

		// Warehouser.php/2.3.2.1 Maximum requests per IP GLOBALLY
		'ByIP' => array(
			'Count' => 1,
			'Window' => 0 // Warehouser.php/2.3.2.3 Allow configurable window (in seconds)
		),

		// Warehouser.php/2.3.2.3 Maximum requests per SUB-PATH / SUB-VECTOR
		'ByVector' => array(
			'Enabled' => FALSE,
			'Method' => 'Profile', // Warehouser.php/2.3.2.3.1 By "IP", 2.3.2.3.2 By "Profile"
			'Count' => 100,
			'Window' => 0 // Warehouser.php/2.3.2.3 Allow configurable window (in seconds)
		)

	);

	// Warehouser.php/3. Allow definition of a global schema
	// Warehouser.php/3.1 This must be within the main Warehouser.php file to save a file read
	// Warehouser.php/3.2 By default, this will be applied OVER any local schema - meaning these values cannot be overwritten
	// Warehouser.php/3.3 You can enable the global schema "Iterative Schema" (see documentation [here]) to allow overwriting,
	// Warehouser.php/3.3(...) and also apply schemas iteratively through ALL subvectors. In this configuration, the local
	// Warehouser.php/3.3(...) schema overwrites all.
	private static $GlobalSchema = array(

	);

	// End Warehouser.php Configuration - Only technical patches beyond this point!

	// Warehouser.php/4. Define a path validity and consistency function that can also be used for finding the last record
	// Warehouser.php/4(...) or revision in a path.
	private static function SearchVector ($Vector, $OnlyDir=FALSE, $ReverseSort=TRUE) {

		// Warehouser.php/4.1 Check that the path exists and is readable
		if (file_exists($Vector) && is_readable($Vector)) {

			// Warehouser.php/4.1 Search the path (vector) for all files/folders
			if ($OnlyDir === FALSE) $Nodes = glob($Vector.'/*.json');
			else $Nodes = glob($Vector.'/*', GLOB_ONLYDIR);

			// Warehouser.php/4.2 Naturally sort - this means 1-11 rather than 1, 11, 2-9
			if ($ReverseSort === TRUE) rsort($Nodes);
			else sort($Nodes);

			// Warehouser.php/4.3 Check if there are any nodes found
			if (count($Nodes) > 0)
				return basename(array_pop($Nodes));

		}

		return NULL;

	}

	// Warehouser.php/5. Define the read function of the API
	public static function Read ($Vector='', $Optional_Record='', $Optional_Revision='') {

		// Warehouser.php/<nospec> Add working dir to vector
		$Vector = Warehouser::$StoragePath.'/'.$Vector;

		// Warehouser.php/5.1 If no Record ID given, use search function to get the last record in the path/vector (...)
		$AllowSpecificRevision = TRUE;
		if ($Optional_Record == '') {

			// Warehouser.php/5.1: Note: There must be at least one 
			$Optional_Record = Warehouser::SearchVector($Vector, TRUE);
			if ($Optional_Record === NULL) return 'Warehouser.php/5.1 No records found in vector.. '.$Vector;
			else $AllowSpecificRevision = FALSE;

		}

		// Warehouser.php/5.1.2 Filter into vector.
		$Vector = $Vector.'/'.filter_var($Optional_Record, FILTER_SANITIZE_STRING);

		// Warehouser.php/5.2 If Record ID given and no Revision ID given, use search function to get the (...)
		// Warehouser.php/5.2(...) last revision in the complete path/vector.
		if ($AllowSpecificRevision === TRUE && $Optional_Revision != '')
			$Vector = $Vector.'/'.rtrim(filter_var($Optional_Revision, FILTER_SANITIZE_STRING), '.json').'.json';

		// Warehouser.php/<nospec> This conditional below can be removed if we're happy to have no warning
		else if ($AllowSpecificRevision === FALSE && $Optional_Revision != '')
			return 'Warehouser.php/5.2.1 Warning: You cannot read a specific revision of a record retrieved by searching..';

		else {

			// Warehouser.php/5.2.1 Search for revision
			$Revision = Warehouser::SearchVector($Vector, FALSE, FALSE);

			// Warehouser.php/5.2.1 If no record at all, this is a fatal error.
			if ($Revision === NULL) return 'Warehouser.php/5.2.1 Invalid vector, no revisions - vector deeper?.. '.$Vector;
			else $Vector = $Vector.'/'.filter_var($Revision, FILTER_SANITIZE_STRING);

		}

		// Warehouser.php/5.2.1 Final sanity check
		if (file_exists($Vector) === FALSE || is_dir($Vector) === TRUE || is_readable($Vector) === FALSE)
			return 'Warehouser.php/5.2.1 Invalid vector (unknown cause).. '.$Vector;

		// Warehouser.php/5.3 Read now complete path/vector/record/revision out to the browser immediately
		if (($Data = file_get_contents($Vector)) != FALSE) return $Data;
		else return 'Warehouser.php/5.2.3: Failed to read (unknown cause).. '.$Vector;

	} // End Warehouser->Read();

	// Warehouser.php/6. Define the write function of the API
	public static function Write ($RawData='', $Vector='', $Optional_Record='') {

		// Warehouser.php/<nospec> Add working dir to vector
		$Vector = Warehouser::$StoragePath.'/'.$Vector;

		// Warehouser.php/6.1 Sanitize data provided
		$Data = filter_var($RawData, FILTER_UNSAFE_RAW);

		// Warehouser.php/6.2 Error check provided vector to ensure it is valid and writable
		if (file_exists($Vector) == FALSE && is_writable($Vector) == FALSE) exit('Warehouser.php/6.2: Fatal Server Error ... '.$Vector);

		// Warehouser.php/6.3 Check if Record ID provided
		if ($Optional_Record == '') {
			// Warehouser.php/6.4(...) Create new record as the current microtime with a random fragment appended 
			$Vector = $Vector.'/'.(str_replace('.', '', str_replace(' ', '', microtime(TRUE)))).rand(0,1000000).'/';
			if ((@mkdir($Vector)) == FALSE) exit('Warehouser.php/6.4: Fatal Server Error');
		}

		else {
			// Warehouser.php/6.5(...) Filter in vector string and check it is valid. (...)
			$Vector = $Vector.'/'.filter_var($Optional_Record, FILTER_SANITIZE_STRING).'/';
			// Warehouser.php/6.5(...) If not, this is a fatal error.
			if (file_exists($Vector) == FALSE && is_writable($Vector)) exit('Warehouser.php/6.5: Fatal Server Error');
		}

		// Warehouser.php/6.6 Add new revision ID. (...)
		// Warehouser.php/6.6 (...) This cannot be defined by input now, but later will be able to with the "Named Revisions" schema.
		// Warehouser.php/6.7 Like with our record ID's we append some random data to prevent the already unlikely collisions with certainty.
		$Vector = $Vector.(str_replace('.', '', str_replace(' ', '', microtime(TRUE)))).rand(0,1000000).'.json';

		// Warehouser.php/6.8 Perform atomic write operation.
		if (file_put_contents($Vector, $Data) === FALSE) return 'Warehouser.php/6.8: Failed to write.. '.$Vector;
		else return $Vector;

	} // End Warehouser->Write();

} // End Warehouser;

// Warehouser.php/7. Check for any HTTP requests
if (!empty($_POST) && !empty($_POST['Data'])) {

	// Warehouser.php/8. Process request data from designated variable
	$Data = json_decode(urldecode($_POST['Data']), TRUE);

	// Warehouser.php/9. Only process if there's requests within.
	if (isset($Data['Requests']) && !empty($Data['Requests'])) {

		// Warehouser.php/10. Process each request
		$Queue = array('Read'=>array(), 'Write'=>array());

		foreach ($Data['Requests'] as $Request) {

			// Warehouser.php/10.1 If there is no Operation type, assume 'Read'
			if (!isset($Request['Type'])) $Request['Type'] = 'Read';
			// Warehouser.php/10.2 We use the first letter of the operation and case-insensitive ('r' or 'w')
			$Request['Type_LI'] = strtolower($Request['Type'][0]);

			// Warehouser.php/10.3 If there is no Vector type, use falsy value
			if (!isset($Request['Vector'])) $Request['Vector'] = '';

			// Warehouser.php/10.3 If there is no Record ID, use falsy value
			if (!isset($Request['Record'])) $Request['Record'] = 0;

			// Warehouser.php/10.4 Fork for read/write

			if ($Request['Type_LI'] == 'r') {

				// Warehouser.php/10.4.1 Handle Read operation

				// Warehouser.php/10.4.1.1 If there is no Revision ID, use falsy value
				if (!isset($Request['Revision'])) $Request['Revision'] = 0;
				// Warehouser.php/10.4.1.2 Commit read operation to queue
				array_push($Queue['Read'], $Request);

			}

			else if ($Request['Type_LI'] == 'w') {

				// Warehouser.php/10.4.2 Handle Write operation

				// Warehouser.php/10.4.2.1 If there is no Data, use falsy value
				if (!isset($Request['Data'])) $Request['Data'] = 0;
				// Warehouser.php/10.4.1.2 Commit write operation to queue
				array_push($Queue['Write'], $Request);

			}

			// Warehouser.php/10.4.1.3 Erronious operation types.
			else exit('Warehouser.php/10.4.1.3: Fatal Server Error');

		}

		// Warehouser.php/11. Prepare results storage
		$Results = array('Read'=>array(), 'Write'=>array());

		// Warehouser.php/12. Perform all queued writes first (if any)
		if (!empty($Queue['Write'])) {
			foreach ($Queue['Write'] as $Key=>$Request)
				$Results['Write'][$Key] = Warehouser::Write($Request['Data'], $Request['Vector'], $Request['Record']);
		}

		// Warehouser.php/13. Perform all queued reads second
		if (!empty($Queue['Read'])) {

			foreach ($Queue['Read'] as $Key=>$Request) {
				//if ()
				$Results['Read'][$Key] = Warehouser::Read($Request['Vector'], $Request['Record'], $Request['Revision']);
			}
		}

		// Warehouser.php/14. Encode return construct and write to browser atomically
		exit(json_encode($Results));

	}

} // End HTTP Request Processing

// - YourMove Infrastructure

?>