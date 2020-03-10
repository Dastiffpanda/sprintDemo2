<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$date = $_POST['AttendanceDate'];

$sql ="SELECT attend.AttendanceDate, people.PersonFN, people.PersonLN, 
attend.AttendanceStatus FROM tblAttendance 
attend JOIN tblCourses courses ON attend.fkCourseID = courses.CourseID 
JOIN tblCourseEnrollment enroll ON courses.CourseID = enroll.fkCourseID 
JOIN tblClassDetails class ON enroll.fkClassDetailID = class.ClassDetailID
JOIN tblCadets cadets ON class.fkCadetID = cadets.CadetID JOIN tblPeople people 
ON cadets.fkPersonID = people.PersonID WHERE attend.AttendanceDate='$date'";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);

?>

