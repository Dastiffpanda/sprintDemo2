<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$date = $_POST['AttendanceDate'];

$sql ="SELECT AttendanceDate from tblAttendance LIMIT 5 WHERE AttendanceDate='$date'";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>