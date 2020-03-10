<?php

require_once 'dbcontroller.php';
$connection = new DBController();

$CourseGradeID = $_POST['CourseGradeID'];//dddformID

//Works in db
$sql= "DELETE FROM tblCourseGrades 
        WHERE CourseGradeID = $CourseGradeID";

$data = array();

$data = $connection->runQuery($sql);

?>