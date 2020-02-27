<?php
/**
 * Created by PhpStorm.
 * User: Aviato
 * Date: 2/6/2020
 * Time: 4:34 PM
 */
require_once 'dbcontroller.php';
$connection = new DBController();
$data = array();


$sql = "SELECT attendanceID,fkStudentID, date FROM tblattendance";
$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);
?>
