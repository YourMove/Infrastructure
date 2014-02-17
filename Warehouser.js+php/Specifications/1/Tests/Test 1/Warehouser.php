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
	public static $StoragePath = './Warehouses/';

	// Warehouser.php/2.3 Performance monitoring options [Not yet implemented]
	public static $PerformanceMonitoring = array(
		'Enabled' => FALSE,

		// Warehouser.php/2.3.1.1 Configurable handling of max
		'Maximum' => array(

			// Warehouser.php/2.3.2.1 Maximum requests per IP GLOBALLY
			'ByIP' => array(
				'Enabled' => FALSE,
				'Count' => 1,
				'Window' => 0 // Warehouser.php/2.3.2.3 Allow configurable window
			),

			// Warehouser.php/2.3.2.2 Maximum requests per "user profile" GLOBALLY
			'ByProfile' => array(
				'Enabled' => FALSE,
				'Count' => 1000,
				'Window' => 0 // Warehouser.php/2.3.2.3 Allow configurable window
			)

		),

		// Warehouser.php/2.3.2.3 Maximum requests per SUB-PATH / SUB-VECTOR
		'ByVector' => array(
			'Enabled' => FALSE,
			'Method' => 'Profile', // Warehouser.php/2.3.2.3.1 By "IP", 2.3.2.3.2 By "Profile"
			'Count' => 100,
			'Window' => 0 // Warehouser.php/2.3.2.3 Allow configurable window
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
	private static function SearchVector ($Vector, $Limit=1, $BaseName=TRUE) {

		// Warehouser.php/4.1 Check that the path exists and is readable
		if (file_exists($Vector) && is_readable($Vector)) {

			// Warehouser.php/4.1 Search the path (vector) for all files/folders
			$Nodes = glob($Vector.'/*');
			// Warehouser.php/4.2 Naturally sort - this means 1-11 rather than 1, 11, 2-9
			natsort($Nodes);

			// Warehouser.php/4.3 Check if there are any nodes found
			if (count($Nodes) > 0) {

				// Warehouser.php/4.4 If there is a Limit of 1, just return last straight away
				if ($Limit == 1) {
					if ($BaseName == TRUE) return basename(array_pop($Nodes));
					else return array_pop($Nodes);
				}

				else {
					// Warehouser.php/4.5 Otherwise, keep getting records from the end until the limit and return all
					$Return = array();
					while ($Limit > 0 && empty($Nodes) == FALSE) {
						$Return[] = array_pop($Nodes); $Limit = $Limit - 1;
					}
					return $Return;
				}
			}
		}

		return 0;

	}

	// Warehouser.php/5. Define the read function of the API
	public static function Read ($Vector='', $Optional_Record=FALSE, $Optional_Revision=FALSE) {

		// Prepend our path on to the vector
		$Vector = Warehouser::$StoragePath.$Vector;

		// Warehouser.php/5.1 If no Record ID given, use search function to get the last record in the path/vector (...)
		if ($Optional_Record == FALSE) {
			$Optional_Record = Warehouser::SearchVector($Vector);
			// Warehouser.php/5.1.1 If no Record at all found, this is a fatal error.
			if ($Optional_Record == FALSE) return 'Warehouser.php/5.1.1: No records found in vector '.$Vector;
		}
		// Warehouser.php/5.1.2 Filter into vector.
		$Vector = $Vector.'/'.filter_var($Optional_Record, FILTER_SANITIZE_STRING);

		// Warehouser.php/5.2 If no Revision ID given, use search function to get the last revision in the complete path/vector
		if ($Optional_Revision == FALSE) {
			$Optional_Revision = Warehouser::SearchVector($Vector);
			// Warehouser.php/5.2.1 If no record at all, this is a fatal error.
			if ($Optional_Revision == FALSE) return 'Warehouser.php/5.2.1 Invalid vector.. '.$Vector;
		}
		// Otherwise just append file extension
		else $Optional_Revision = $Optional_Revision.'.json';

		// Warehouser.php/5.2.2 Filter into vector.
		$Vector = $Vector.'/'.filter_var($Optional_Revision, FILTER_SANITIZE_STRING);

		// Warehouser.php/5.2.3 Final sanity check
		if (file_exists($Vector) == FALSE || is_readable($Vector) == FALSE) return 'Warehouser.php/5.2.3: Invalid vector.. '.$Vector;

		// Warehouser.php/5.3 Read now complete path/vector/record/revision out to the browser immediately
		if (($Data = file_get_contents($Vector)) == FALSE) return 0;
		else return $Data;

	} // End Warehouser->Read();

	// Warehouser.php/6. Define the write function of the API
	public static function Write ($RawData='', $Vector='', $Optional_Record=FALSE) {

		// Warehouser.php/6.1 Sanitize data provided
		$Data = filter_var($RawData, FILTER_UNSAFE_RAW);
		// Warehouser.php/<nospec> Add working dir to vector
		$Vector = Warehouser::$StoragePath.$Vector;

		// Warehouser.php/6.2 Error check provided vector to ensure it is valid and writable
		if (file_exists($Vector) == FALSE && is_writable($Vector) == FALSE) exit('Warehouser.php/6.2: Fatal Server Error ... '.$Vector);

		// Warehouser.php/6.3 Check if Record ID provided
		if ($Optional_Record == FALSE) {
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
		if (file_put_contents($Vector, $Data) === FALSE) return 0;
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
			if (!isset($Request['Vector'])) $Request['Vector'] = 0;

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
			foreach ($Queue['Read'] as $Key=>$Request) 
				$Results['Read'][$Key] = Warehouser::Read($Request['Vector'], $Request['Record'], $Request['Revision']);
		}

		// Warehouser.php/14. Encode return construct and write to browser atomically
		exit(json_encode($Results));

	}

} // End HTTP Request Processing

// - YourMove Infrastructure

?>