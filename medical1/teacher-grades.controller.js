//search-committee.config.js
"use strict"

Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + "=" + encodeURIComponent(obj[key]));
    }

    return p.join("&");
};


// Converts a htmlDate formated as "Tuesday Jan 15 2019"
// into an sqlDate  year-mm-dd
function convertToSqlDate(htmlDate) {
    if (htmlDate === null) {
        return "0000-00-00";
    }

    //Split htmldate
    var dateArray = htmlDate.toString().split(" ");

    var month;
    if (dateArray[1] === "Jan") {
        month = "01";
    }
    else if (dateArray[1] === "Feb") {
        month = "02";
    }
    else if (dateArray[1] === "Mar") {
        month = "03";
    }
    else if (dateArray[1] === "Apr") {
        month = "04";
    }
    else if (dateArray[1] === "May") {
        month = "05";
    }
    else if (dateArray[1] === "Jun") {
        month = "06";
    }
    else if (dateArray[1] === "Jul") {
        month = "07";
    }
    else if (dateArray[1] === "Aug") {
        month = "08";
    }
    else if (dateArray[1] === "Sep") {
        month = "09";
    }
    else if (dateArray[1] === "Oct") {
        month = "10";
    }
    else if (dateArray[1] === "Nov") {
        month = "11";
    }
    else {
        month = "12";
    }

    var sqlDate = dateArray[3] + '-' + month + '-' + dateArray[2];
    return sqlDate;
}

// Converts a htmlDate formated as "Tuesday Jan 15 2019"
// into an sqlDateTime  year-mm-dd 00:00:00
function convertToSqlDateTime(htmlDate) {

    if (htmlDate === null) {
        return "0000-00-00";
    }

    //Split htmldate
    var dateArray = htmlDate.toString().split(" ");

    var sqlDate = convertToSqlDate(htmlDate)+ " " + dateArray[4];

    return sqlDate;
}

// Converts a sqlDate formatted as "year-mm-dd 00:00"
// into an htmlDate formated as "Tuesday Jan 15 2019"
function convertToHtmlDate(sqlDate) {

    if (sqlDate === null) {
        return new Date("");
    }

    var tempDate = sqlDate.split(" ")[0]; //year-mm-dd
    var htmlDate = new Date("");

    if (tempDate !== "0000-00-00") {

        htmlDate = new Date(tempDate + "T00:00:00");
    }
    return htmlDate;
}

// Converts a sqlDate formatted as "year-mm-dd 00:00"
// into an htmlDate -- maintain the same time.
function convertToHtmlDateTime(sqlDate) {

    if (sqlDate === null) {
        return new Date("");
    }

    var tempDate = sqlDate.split(" ")[0]; //year-mm-dd
    var tempTime = sqlDate.split(" ")[1]; //00:00:00
    var htmlDate = new Date("");

    if (tempDate !== "0000-00-00") {

        htmlDate = new Date(tempDate + "T"+tempTime);
    }
    return htmlDate;
}
function convertDatesInArrayToHtml(myArray) {
    var index = 0;
    while (index < myArray.length) {
        convertDatesInObjectToHtml(myArray[index]);
        index++;
    }
}

function convertDatesInArrayToSql(myArray) {
    var index = 0;
    while (index < myArray.length) {
        convertDatesInObjectToSql(myArray[index]);
        index++;
    }
}

function convertDatesInObjectToSql(myObject) {

    if ((myObject != null) && (typeof myObject === "object")) {
        for (var fieldName in myObject) {
            //Check to see if property name contains Date
            if (fieldName.indexOf("Date") !== -1) {
                if (myObject[fieldName] !== null) {//IF DATE IS NOT NULL
                    myObject[fieldName] = convertToSqlDate(myObject[fieldName]);
                }
                else {
                    myObject[fieldName] = "";
                }
            }
        }
    }
}

function convertDatesInObjectToHtml(myObject) {
    if ((myObject != null) && (typeof myObject === "object")) {
        for (var fieldName in myObject) {
            //Check to see if property name contains Date
            // console.log(fieldName);
            // if (fieldName.includes("Date")) {
            if (fieldName.indexOf("Date") !== -1) {
                if (myObject[fieldName] !== null) {//IF DATE IS NOT NULL
                    myObject[fieldName] = convertToHtmlDate(myObject[fieldName]);
                }
                else {
                    myObject[fieldName] = "";
                }
            }
        }
    }
}

function resetAllFields(obj) {
    for (var fieldName in obj) {

        obj[fieldName] = "";
    }

}


var app=angular.module('teacherGrades', []);
app.controller("GradesController",
    function($scope, $http){

        $scope.gradeList=[];
        $scope.editMode = false;
        $scope.createMode = false;
        $scope.deleteList = [];

        $scope.makeEditable = function makeEditable(){
            $scope.editMode = true;
            $scope.createMode = false;

            //create a backup of data.
            $scope.backup = angular.copy($scope.gradeList);
        };

        $scope.cancelUpdate = function cancelUpdate(){
            $scope.editMode = false;

            //reset deleteList;
            $scope.deleteList =[];

            //restore data to original values stored in backup
            $scope.gradeList = angular.copy($scope.backup);
        };
        $scope.makeCreatable = function makeCreatable() {
            //clear any existing values in newStud
            $scope.newGrade ={CourseGradeDate:"", Score:"", ClassDetail:"",CourseID:""};

            //set flags to show input fields
            $scope.createMode = true;
            $scope.editMode = false;
        };

        $scope.createGrade = function createGrade(newGrade){
            $scope.createMode = false;

            //add new item to grade array

            var post = angular.copy(newGrade);
            post.CourseGradeDate = convertToSqlDate(post.CourseGradeDate);


            $http({
                method: "POST",
                data: Object.toparams(post),
                url: "./php/teacher_createGrades.php",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            }).then(function (result) {
                    alert("Record Added!");
                    $scope.loadGrades();
                },
                function () {
                    alert("Error getting records");
                });
        };

        $scope.cancelCreate = function cancelCreate(){
            $scope.createMode = false;
        };
        $scope.deleteGrade = function deleteGrade(grade)
        {
            var post = {};
            post.CourseGradeID = grade.CourseGradeID;

            $http
            ({
                method: "POST",
                url: "./php/teacher_deleteGrades.php",
                data: Object.toparams(post),
                headers: {"Content-type": "application/x-www-form-urlencoded"}
            }).then (function(result)
                {
                    alert("Record Deleted!");
                    $scope.loadGrades();
                },
                function()
                {
                    alert("Error deleting record");
                });
        };
        $scope.updateGrades = function updateGrades(grade)
        {
            var post ={};
            post.CourseGradeID = grade.CourseGradeID;
            post.CourseGradeDate = convertToSqlDate(grade.CourseGradeDate);
            post.Score = grade.Score;
            $http
            ({
                method: "POST",
                url: "./php/teacher_updateGrades.php",
                data: Object.toparams(post),
                headers: {"Content-type": "application/x-www-form-urlencoded"}
            }).then (function(result)
                {
                    alert("Record Updated");
                    $scope.loadGrades();
                },
                function()
                {
                    alert("Error editing record");
                });
        };
        $scope.loadGrades= function loadGrades()
        {
            $http({
                method: "POST",
                url: "./php/teacher_getGrades.php",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            }).then(function (result) {
                    $scope.gradeList = result.data;
                    convertDatesInArrayToHtml($scope.gradeList);
                },
                function () {
                    alert("Error getting records");
                });
        };

        $scope.loadGrades();
    });
