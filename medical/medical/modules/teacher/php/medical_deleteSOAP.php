<?php
/*session_start();
require_once 'dbcontroller.php';
$connection = new DBController();

$data = array();
$status="error";
$errorMsg="Error retrieving information from server";

if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
} else if (!isset($_SESSION['ClassDetailID'])) {
    $status = "error";
    $errorMsg = "You must select a cadet first!";
} else {
    $soapNoteID = $_SESSION['SOAPNoteID'];
    
	$sql = "DELETE *
			FROM tblSOAPNotes soap
			WHERE soap.SOAPNoteID = '$soapNoteID'";
    
	$data = $connection->runDeleteQuery($sql);
    $status ="ok";
    $errorMsg="";
}
$output = array();
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);*/
?>