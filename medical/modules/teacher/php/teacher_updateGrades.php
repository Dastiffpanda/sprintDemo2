<?php

require_once 'dbcontroller.php';
$connection = new DBController();

$Score = $_POST['Score'];
$CourseGradeDate = $_POST['CourseGradeDate']; 
$CourseGradeID = $_POST['CourseGradeID'];

$sql= "UPDATE tblCourseGrades SET Score = '$Score',
       CourseGradeDate = '$CourseGradeDate' 
       WHERE CourseGradeID = '$CourseGradeID'";

$data = array();

$data = $connection->runQuery($sql);

?>