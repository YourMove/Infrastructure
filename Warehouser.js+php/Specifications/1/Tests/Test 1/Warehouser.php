<?php

// Warehouser / Warehouser.php - All in one
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published 26/01/2014
//   All rights reserved.

// Warehouser.php Configuration -----------------------------------------------

$WarehousePath = './Warehouses/';

// Uncomment lines to enable. Edit path as required.
$Tools = array(
	// 'Index' => '/Warehouser.Indexer.php',
	// 'Client' => './Warehouser.Client.php'
);

// End Warehouser.php Configuration - Only technical patches beyond this point.

// Start the session. Alternatively, this could be unique cookies issued on login.
// For now, sessions are the easiest option and can easily be compatible with
// the auth system from nearly any PHP system.
@session_start();

// Define the core class

class Warehouser {

	public static $StoragePath, $Tools;

	private static function SearchVector ($Vector, $Limit=1) {

		if (file_exists($Vector) && is_readable($Vector)) {
			$Nodes = glob($Vector.'*');
			natsort($Nodes);

			if (count($Nodes) > 0) {
				if ($Limit === 1) return array_pop($Nodes);
				else {
					$Return = array();
					while ($Limit > 0 && empty($Nodes) === FALSE) {
						$Return[] = array_pop($Nodes); $Limit = $Limit - 1;
					}
					return $Return;
				}
			}
		}
		return FALSE;

	}

	public static function Read ($Vector='', $Optional_Record=FALSE, $Optional_Revision=FALSE) {

		// Define record - if none defined, use the most recent record
		if ($Optional_Record === FALSE) $Vector = Warehouser::SearchVector($Vector.$Optional_Record);
		else $Vector = $Vector.filter_var($Optional_Record, FILTER_SANITIZE_STRING);

		// Define revision - if none defined, use the most recent revision
		if ($Optional_Revision === FALSE) $Vector = Warehouser::SearchVector($Vector.$Optional_Revision);
		else $Vector = $Vector.filter_var($Optional_Revision, FILTER_SANITIZE_STRING);

		// Error check
		if (file_exists($Vector) === FALSE || is_readable($Vector) === FALSE)
			exit('Warehouser.php/<nospec>: Vector invalid or not readable..');

		// Read revision
		if (($Data = file_get_contents($Vector)) === FALSE)
			exit('Warehouser.php/<nospec>: Fatal Server Error: Failed to read final vector..');
		else exit($Data);

	} // End Warehouser->Read();

	public static function Write ($RawData='', $Vector='', $Optional_Record=FALSE) {

		// Sanitize data
		$Data = filter_var($RawData, FILTER_UNSAFE_RAW);

		// Check that Vector is valid
		if (file_exists($Vector) === FALSE && is_writable($Vector) === FALSE)
			exit('Warehouser.php/<nospec>: Vector invalid or not writable..');

		// Define record - if none defined, make a new record
		if ($Optional_Record === FALSE) {
			$Vector = $Vector.'/'.microtime().'/';
			if ((@mkdir($Vector)) === FALSE) exit('Warehouser.php/<nospec>: Fatal: Failed to create new record..');
		}
		else {
			$Vector = $Vector.'/'.filter_var($Optional_Record, FILTER_SANITIZE_STRING).'/';
			if (file_exists($Vector) === FALSE && is_writable($Vector))
				exit('Warehouser.php/<nospec>: Record invalid or not writable..');
		}

		// Add current revision time
		$Vector = $Vector.microtime().'.json';

		// Perform write
		if (file_put_contents($Vector, $Data) !== FALSE)
			exit('Warehouser.php/<nospec>: Fatal: Failed to write, unknown cause..');
		else exit('Warehouser.php/<nospec>: Write OK');

	} // End Warehouser->Write();

} // End Warehouser;

// Preconfigure Warehouser
Warehouser::$StoragePath = $WarehousePath; unset($WarehousePath);
Warehouser::$Tools = $Tools; unset($Tools);

// Check for any HTTP requests
if (!empty($_POST) && !empty($_POST['Data'])) {
	$Data = json_decode(urldecode($_POST['Data']), TRUE);
}

// Check for Command Line Interface requests
else if (PHP_SAPI === 'cli') {
	if ($argc === 0) exit('Warehouser.php, Not enough options. See github documentation.');
	else if ($argc >= 2) {
		$Request = array();
		$Request['Operation'] = array_shift($argv);
		$Request['Vector'] = array_shift($argv);

		if (!empty($argv)) $Request['Record'] = array_shift($argv);
		else { $Request['Record'] = FALSE; $Request['Revision'] = FALSE; }
		if (!empty($argv)) {
			$Request['Operation_LI'] = strtolower($Request['Operation'][0]);
			// Next part should be revision for read requests
			if ($Request['Operation_LI'] === 'r') $Request['Revision'] = array_shift($argv);
			if ($Request['Operation_LI'] === 'w') {
				// Take the data off the end first
				$Request['Revision'] = array_shift($argv);
		}
	}
}


	if (isset($Data['Requests']) && !empty($Data['Requests'])) {

		// Process each request
		foreach ($Data['Requests'] as $Request) {

			if (!isset($Request['Operation'])) $Request['Operation'] = 'Client';
			$Request['Operation_LI'] = strtolower($Request['Operation'][0]);

			if ($Request['Operation_LI'] === 'c') include Warehouser::$Tools['Client'];
			else if ($Request['Operation_LI'] === 'i') include Warehouser::$Tools['Indexer'];

			else {

				// Reconstruct vector if needed
				if (!isset($Request['Vector'])) $Request['Vector'] = '';

				// Allow no record id
				if (!isset($Request['Record'])) $Request['Record'] = FALSE;

				// Fork for read/write
				if ($Request['Operation_LI'] === 'r') {
					// Normalize revision
					if (!isset($Request['Revision'])) $Request['Revision'] = FALSE;
					Warehouser::Read($Request['Vector'], $Request['Record'], $Request['Revision']);
				}

				else if ($Request['Operation_LI'] === 'w') {
					if (!isset($Request['Data'])) $Request['Data'] = '';
					Warehouser::Write($Request['Data'], $Request['Vector'], $Request['Record']);
				}

				// PHP.Specification.md:2.4: Handle erronious operation type
				else exit('Warehouser.php/<nospec>: Fatal Error: Unknown type..');

			}

		}

	}

}

// - YourMove Infrastructure

?>