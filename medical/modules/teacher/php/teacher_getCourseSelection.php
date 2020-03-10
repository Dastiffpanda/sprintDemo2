<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$CourseID = $_POST['CourseID'];
$CourseName = $_POST['CourseSubject'];

$sql ="SELECT attend.AttendanceDate, people.PersonFN, people.PersonLN, 
attend.AttendanceStatus, attend.AttendanceComment, attend.AttendanceOptions FROM tblAttendance 
attend JOIN tblCourses courses ON attend.fkCourseID = courses.CourseID 
JOIN tblCourseEnrollment enroll ON courses.CourseID = enroll.fkCourseID 
JOIN tblClassDetails class ON enroll.fkClassDetailID = class.ClassDetailID 
JOIN tblCadets cadets ON class.fkCadetID = cadets.CadetID JOIN tblPeople people 
ON cadets.fkPersonID = people.PersonID WHERE courses.CourseID='$CourseID'";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>