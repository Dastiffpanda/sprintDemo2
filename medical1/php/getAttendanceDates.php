<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();


$sql ="SELECT AttendanceDate from tblAttendance LIMIT 5";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>