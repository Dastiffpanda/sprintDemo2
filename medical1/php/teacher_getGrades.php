<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$sql = "SELECT grades.CourseGradeID, grades.CourseGradeDate, people.PersonFN, 
    people.PersonLN, courses.CourseSubject , courses.CourseNumber, grades.Score 
    FROM tblCourseGrades grades JOIN tblCourses courses ON grades.fkCourseID = courses.CourseID 
    JOIN tblCourseEnrollment enroll ON courses.CourseID = enroll.fkCourseID 
    JOIN tblClassDetails class ON enroll.fkClassDetailID = class.ClassDetailID 
    JOIN tblCadets cadets ON class.fkCadetID = cadets.CadetID 
    JOIN tblPeople people ON cadets.fkPersonID = people.PersonID";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>