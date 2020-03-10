<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$date = $_POST['AttendanceDates'];

$sql="INSERT INTO tblAttendance (fkCourseID,fkClassDetailID) VALUES ($CourseID, $ClassDetailID)";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);

?>
