<?php

require_once 'dbcontroller.php';
$connection = new DBController();

$courseID = $_POST['fkCourseID'];//dddformID
$fkClassDetailID = $_POST['fkClassDetailID']; //formName
$score = $_POST['Score'];
$courseGradeDate = $_POST['CourseGradeDate'];


$sql= "INSERT INTO tblCourseGrades(fkCourseID,fkClassDetailID, Score, CourseGradeDate) 
        VALUES ('$courseID','$fkClassDetailID','$score', '$courseGradeDate')";
$data = array();
$data = $connection->createRecord($sql);

?>