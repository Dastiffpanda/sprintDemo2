<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$sql = "SELECT CourseID, CourseSubject, TeacherName FROM tblCourses";
$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>
