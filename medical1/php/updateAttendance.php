<?php

require_once 'dbController.php';
$connection = new DBController();

$Score = $_POST['PersonFN'];
$Score = $_POST['PersonLN'];
$CourseGradeDate = $_POST['CourseGradeDate'];
$CourseGradeID = $_POST['CourseGradeID'];

$sql= "UPDATE tblCourseGrades SET Score = '$Score',
       CourseGradeDate = '$CourseGradeDate' 
       WHERE CourseGradeID = '$CourseGradeID'";

$data = array();

$data = $connection->runQuery($sql);

?>