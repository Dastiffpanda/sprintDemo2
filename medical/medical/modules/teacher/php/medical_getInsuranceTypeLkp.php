<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();

$sql = "SELECT *
			FROM tlkpInsuranceType;";

$data = $connection->runSelectQueryArrayNotEncoded($sql);

echo json_encode($data);
?>