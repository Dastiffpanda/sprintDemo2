<?php

require_once 'dbcontroller.php';
$connection = new DBController();

$AttendanceStatus = $_POST['AttendanceStatus'];
$AttendanceID = $_POST['AttendanceID'];

$sql= "UPDATE tblAttendance SET AttendanceStatus = '$AttendanceStatus'
       WHERE AttendanceID = '$AttendanceID'";

$data = array();

$data = $connection->runQuery($sql);

?>
<?php

require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();

$attendComment = $_POST['AttendanceComment'];
$attendOptions = $_POST['AttendanceOptions'];

$sql ="UPDATE tblAttendance SET AttendanceComment='$attendComment'and AttendanceOptions='$attendOptions'";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);


?>