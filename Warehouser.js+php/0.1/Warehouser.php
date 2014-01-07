<?php

// <Project> / <Filename>.js - <Short Document Title>
//   YourMove Infrastructure (Boilerplate 0.1)
//   Published <Publish date, Day/MM/Year>
//   All rights reserved.

// Warehouser.php Configuration -----------------------------------------------

$WarehouseLocation = './';

// End Warehouser.php Configuration - Only technical patches beyond this point.

// Start the session. Alternatively, this could be unique cookies issued on login.
// For now, sessions are the easiest option and can easily be compatible with
// the auth system from nearly any PHP system. The only downside is an extra
// file operation.
session_start();

// Define a utility function for normalizing paths between unix and windows
function NormalizePath ($Path) {
	return (
		rtrim(
			str_replace(
				str_replace($_GET['RevisionID'] '\\', '/'),
				'/../', ''
			), '/'
		)
	).'/';
}

// PHP.Specification.md:1: Normalize operation type input
if (!isset($_GET['Operation'])) { $_GET['Operation'] = 'Index'; $_GET['Generate'] = TRUE; }

// PHP.Specification.md:1.1: Apply string sanitization
$_GET['Operation'] = filter_var(trim($_GET['Operation']), FILTER_SANITIZE_STRING);

// PHP.Specification.md:2: Fork for operation type

if ($_GET['Operation'] === 'Read') {
	// PHP.Specification.md:2.1.1: Check that a Vector was supplied (required)
	if (!isset($_GET['Vector']) || !isset($_GET['RecordID']))
		exit('Warehouser.php/Specification.md:2.1.1: Fatal: Invalid Read request; No Vector or Record given');

	// PHP.Specification.md:2.1.2: Normalize WarehouseLocation to start constructing full vector (./store/)
	$FullVector = NormalizePath(filter_var($_GET['Vector'], FILTER_SANITIZE_URL));
	// PHP.Specification.md:2.1.3: Normalize Vector (if any) and add to full vector (./store/ vector/vector/)
	$FullVector = $FullVector.NormalizePath(filter_var($_GET['Vector'], FILTER_SANITIZE_URL));

	// PHP.Specification.md:2.1.4: Normalize Record ID (required) and add to full vector (./store/ vector/vector/ 1/)
	$FullVector = $FullVector.NormalizePath(filter_var($_GET['RecordID'], FILTER_SANITIZE_NUMBER_INT));
	// PHP.Specification.md:2.1.5: Normalize Revision ID (if any) and add to full vector (./store/ vector/vector/ 1/ 2.json)
	if (isset($_GET['RevisionID']))
		$FullVector = $FullVector.filter_var($_GET['RevisionID'], FILTER_SANITIZE_NUMBER_INT).'.*.json';
	else $FullVector = $FullVector.'*.*.json';

	// PHP.Specification.md:2.1.3: Construct full search vector and perform search
	$VectorNodes = glob($FullVector);

	// Check if there is any results
	$VectorNodeCount = count($VectorNodes);
	if ($VectorNodes === FALSE || $VectorNodeCount == 0)
		exit('Warehouser.php/Specification.md:2.1.1: No VectorNodes');

	// Sort just incase there are many revisions..
	natsort($VectorNodes);
	// Grab the final node.
	$EndNode = array_pop($VectorNodes);

	// Check for an _AccessControlList.json file inside endnode
	$AccessControlFilename = dirname($EndNode).'/_AccessControlList.json';
	if (file_exists($AccessControlFilename)) {

		// Read the control file
		$AccessControlFile = file_get_contents($AccessControlFilename);
		// Decode the JSON
		$AccessControl = json_decode($AccessControlFile, TRUE);

		// Check if the user has the token defined in the ACL file, or 'Username' as a default.
		if (!isset($AccessControl['TokenID'])) $AccessControl['TokenID'] = 'Username';
		if (!isset($_SESSION[$AccessControl['TokenID']]))
			exit('Error: User is not logged in, and is probably attempting to break something.');

		// Compare users UUID to ACL
		$UsersByUUID = array_flip($AccessControl['Users']);
		if (!isset($UsersByUUID[$_SESSION[$AccessControl['TokenID']]]))
			exit('Error: User is logged in but not allowed access.');
		// Else, user OK - continue!

	}

	// Check for a _Schema.json file inside endnode
	$SchemaFilename = dirname($EndNode).'/_Schema.json';
	if (file_exists($SchemaFilename)) {

		// Read the schema file
		$SchemaFile = file_get_contents($SchemaFilename);
		// Decode the JSON
		$Schema = json_decode($SchemaFile);

		// Process any/all schema options
		foreach ($Schema as $Option) {
			switch ($Option) {
				case ('Incremental Revisions'):
					// We need to read all revisions in the set and compute from the ground up.
					exit('Node-set uses incremental revisions; these are not yet implemented, sorry!');
					break;
				case ('Referenced Records'):
					// We need to resolve the file referenced in this file's contents.
					exit('Node-set uses referenced records; these are not yet implemented, sorry!');
					break;
				case ('Read Locking'):
					// We need to read all revisions in the set and compute from the ground up.
					exit('Node-set uses read locking; these are not yet implemented, sorry!');
					break;
			}
		}

	}

	// Read this out to the client
	echo file_get_contents($EndNode);

}

else if ($_GET['Operation'] === 'Write') {
	// PHP.Specification.md:2.2: Handle Write request

}

else if ($_GET['Operation'] === 'Index') {

	if (isset($_GET['Query'])) {
		// PHP.Specification.md:2.3: Handle requests to query the index

	}

	else if (isset($_GET['Lookup'])) {
		// PHP.Specification.md:2.3: Handle requests to query the index

	}

	else if (isset($_GET['Generate'])) {
		// PHP.Specification.md:2.3: Handle requests to (re)generate the index

	}

	else {
		// PHP.Specification.md:2.4: Handle erronious index request

	}
}

else {
	// PHP.Specification.md:2.4: Handle erronious operation type

}

// - YourMove Infrastructure

?>