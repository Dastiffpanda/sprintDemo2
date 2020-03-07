<?php
require_once 'dbcontroller.php';


//Create connection
$conn = new DBController();

$data = array();
$status = "error";
$errorMsg = "Error getting summary information";


$status = "ok";
$errorMsg = "";

//select distinct date
$sql = " select distinct tblAttendance.date from tblAttendance";
$dates = array();
$result = $conn->runSelectQuery($sql);

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $dates[] = $row;
    }
}


//select all students
$sql = "select  * from tblPeople";

$students = array();

$result = $conn->runSelectQuery($sql);

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $students[] = $row;
    }
}

//select all attendance records
$sql = "select  * from tblAttendance";
$attendance = array();
$result = $conn->runSelectQuery($sql);

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $attendance[] = $row;
    }
}

$data['dates'] = $dates;
$data['students'] = $students;
$data['attendance'] = $attendance;

$output = array();
$output['data'] = $data;
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);

?>
