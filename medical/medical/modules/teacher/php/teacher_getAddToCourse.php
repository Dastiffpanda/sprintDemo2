<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$ClassDetailID = $_POST['selectedIDs'];
$CourseID = $_POST['CourseID'];

$sql = "INSERT INTO tblAttendance (fkCourseID,fkClassDetailID) VALUES ($CourseID, $ClassDetailID)";

$data = $connection->runQuery($sql);

echo json_encode($data);


?>