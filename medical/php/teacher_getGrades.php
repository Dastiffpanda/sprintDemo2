<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$sql = "SELECT * FROM tblCourseGrades";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>
