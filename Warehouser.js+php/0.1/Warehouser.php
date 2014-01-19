<?php

// <Project> / <Filename>.js - <Short Document Title>
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published <Publish date, Day/MM/Year>
//   All rights reserved.

// Warehouser.php Configuration -----------------------------------------------

$WarehousePath = './';

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
					while ($Limit > 0 && empty($Nodes) === FALSE) { $Return[] = array_pop($Nodes); $Limit = $Limit - 1; }
					return $Return;
				}
			}
		}
		return FALSE;

	}

	function Read ($Vector='', $Optional_Record=FALSE, $Optional_Revision=FALSE) {

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

	function Write ($RawData='', $Vector='', $Optional_Record=FALSE) {

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
Warehouser::StoragePath = $WarehousePath; unset($WarehousePath);
Warehouser::Tools = $Tools; unset($Tools);

// Check for any HTTP requests
if (!empty($_GET)) {

	if (isset($_GET['Client']) || $LowerInitial === 'c') include Warehouser::Tools['Client'];
	else if (isset($_GET['Index']) || $LowerInitial === 'i') include Warehouser::Tools['Indexer'];

	else {

		// PHP.Specification.md:1: Normalize input
		if (!isset($_GET['Operation'])) { $Operation = 'Index'; $_GET['Generate'] = 1; }
		else $Operation = filter_var(trim($_GET['Operation']), FILTER_SANITIZE_STRING);
		if (!isset($_GET['Vector'])) $_GET['Vector'] = '';
		if (!isset($_GET['Record'])) $_GET['Record'] = FALSE;

		// PHP.Specification.md:2: Fork for operation type
		$LowerInitial = strtolower($Operation[0]);

		else if ($LowerInitial === 'r') {
			// Normalize revision
			if (!isset($_GET['Revision'])) $_GET['Revision'] = FALSE;
			Warehouser::Read($_GET['Vector'], $_GET['Record'], $_GET['Revision']);
		}

		else if ($LowerInitial === 'w') {
			if (!isset($_POST['Data'])) $_POST['Data'] = '';
			Warehouser::Write($_POST['Data'], $_GET['Vector'], $_GET['Record']);
		}

		// PHP.Specification.md:2.4: Handle erronious operation type
		else exit('Warehouser.php/<nospec>: Fatal Error: Unknown type..');

	}

}

// - YourMove Infrastructure

?>