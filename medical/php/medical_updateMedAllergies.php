<?php
require_once 'dbcontroller.php';

session_start();

$conn = new DBController();

$AllergyType    =  $conn->sanitize($_POST['AllergyType']);
$AllergyNote    =  $conn->sanitize($_POST['AllergyNote']);
$MedAllergyID   = $_POST['MedAllergyID'];



$sql = "UPDATE tblMedAllergies SET 
               AllergyType=\"$AllergyType\",
               AllergyNote=\"$AllergyNote\" 
               WHERE MedAllergyID =\"$MedAllergyID\"";

$result = $conn->runQuery($sql);


echo json_encode($result);

?>