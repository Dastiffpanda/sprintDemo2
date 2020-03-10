<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$sql = "SELECT PersonFN, PersonLN from tblPeople";
$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>
