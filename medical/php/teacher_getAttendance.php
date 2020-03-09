<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$sql = "SELECT Distinct AttendanceID
FROM tblCourseAttendance a JOIN tblClassDetails b ON a.fkClassDetailID = b.ClassDetailID
JOIN tblCadets c ON b.fkCadetID = c.CadetID
JOIN tblPeople d ON c.fkPersonID = d.PersonID";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>
