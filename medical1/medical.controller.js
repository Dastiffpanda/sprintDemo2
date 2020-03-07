angular.module('medical')
    .controller('MedicalController', ['$scope', '$http','$rootScope','$window',
        function MedicalController($scope, $http, $rootScope, $window) {

            var post = {};
            post.CourseID;

            $scope.ClassDetailID = $window.localStorage.getItem("ClassDetailID");
            $scope.classDetailIDError = true;


            $scope.medInsurance = [
                {
                    "MedInsuranceID": "18",
                    "fkClassDetailID": "22",
                    "InsuranceType": "Medical",
                    "PolicyNumber": "716315172",
                    "PolicyHolderName": "Christian B. Edwards",
                    "PolicyHolderSSN": null,
                    "PolicyHolderRelationship": "Other",
                    "GroupNumber": null,
                    "PolicyExpDate": "2017-06-05",
                    "PrimaryHCP": null,
                    "CopayInfo": null,
                    "InsCoName": "Amerigroup RealSolution",
                    "InsCoAddress": null,
                    "InsCoAddress2": null,
                    "InsCoCity": null,
                    "InsCoState": null,
                    "InsCoZip": null,
                    "InsCoPhone": null,
                    "InsCoFax": null
                },
                {
                    "MedInsuranceID": "7",
                    "fkClassDetailID": "83",
                    "InsuranceType": "Medical",
                    "PolicyNumber": "IDW222236639",
                    "PolicyHolderName": null,
                    "PolicyHolderSSN": null,
                    "PolicyHolderRelationship": null,
                    "GroupNumber": "689689-010-00701",
                    "PolicyExpDate": null,
                    "PrimaryHCP": null,
                    "CopayInfo": null,
                    "InsCoName": "AETNA",
                    "InsCoAddress": "PO BOX 14079",
                    "InsCoAddress2": null,
                    "InsCoCity": "LEXINGTON",
                    "InsCoState": "KY",
                    "InsCoZip": "40512",
                    "InsCoPhone": "8888023862",
                    "InsCoFax": null
                },
                {
                    "MedInsuranceID": "9",
                    "fkClassDetailID": "84",
                    "InsuranceType": null,
                    "PolicyNumber": "urr045611723691",
                    "PolicyHolderName": null,
                    "PolicyHolderSSN": null,
                    "PolicyHolderRelationship": null,
                    "GroupNumber": null,
                    "PolicyExpDate": null,
                    "PrimaryHCP": null,
                    "CopayInfo": null,
                    "InsCoName": "BCBS OF SC",
                    "InsCoAddress": "PO BOX 100300",
                    "InsCoAddress2": null,
                    "InsCoCity": "COLUMBIA",
                    "InsCoState": "SC",
                    "InsCoZip": "29202",
                    "InsCoPhone": "8003256596",
                    "InsCoFax": null
                }
            ];


            $scope.collapseCards = function collapseCards() {
                $(".collapse").collapse("hide");

            };
            $scope.showCards = function showCards() {
                $(".collapse").collapse("show");
            };


            $scope.getCardStyle = function getCardStyle(editMode) {
                if (editMode) {
                    return "alert-warning";
                }
                return "";
            };
            $scope.init = function init() {
                $scope.fkClassDetailID = $window.localStorage.getItem("ClassDetailID");
                $scope.classDetailIDError = ($scope.fkClassDetailID == null || $scope.fkClassDetailID === -1);
            };

            // receives an reloadClassDetailEvent from  the find-cadet=panel-component
            //broadcast event to children - who will catch this with an $emit
            //source: http://www.binaryintellect.net/articles/5d8be0b6-e294-457e-82b0-ba7cc10cae0e.aspx
            $scope.$on("reloadClassDetailIDEvent", function (evt, data) {
                //the data is the class detail ID
                $scope.init();
            });

            $scope.init();


            $scope.attendance = [];
            $scope.loadEducationCourses = function loadAttendanceStudents() {
                $http({
                    method: "POST",
                    url: "./php/getEducationCourse.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendance = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };
            $scope.loadEducationCourses();


            $scope.list1 = [];
            $scope.loadCourses = function loadCourses() {
                $http({
                    method: "POST",
                    url: "./php/getPeople.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.list1 = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };

            $scope.loadCourses();

            $scope.NextPage = function NextPage(x) {
                var post = {};
                post.CourseID = x.CourseID;
                $http
                ({
                    method: "POST",
                    url: "./php/attendance_CourseSelection.php",
                    data: Object.toparams(post),
                    headers: {"Content-type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        localStorage.setItem("Course1", post.CourseSubject);
                        $scope.nextpager = $window.localStorage.getItem("Course1");
                        window.location.href = './medical.attendance.view.html';
                        $scope.NextCourse(x);
                    },

                    function () {
                        alert("Error deleting record");
                    });
            };

            $scope.attendance=[];
            $scope.NextCourse = function NextCourse(x) {
                var post = {};
                post.CourseID = x.CourseID;
                post.CourseSubject=x.CourseSubject;
                post.TeacherName=x.TeacherName;
                $http
                ({
                    method: "POST",
                    url: "./php/attendance_CourseSelection.php",
                    data: Object.toparams(post),
                    headers: {"Content-type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendance = result.data;
                        localStorage.setItem("CourseID", post.CourseID);
                        localStorage.setItem("CourseSubject", post.CourseSubject);
                        localStorage.setItem("TeacherName", post.TeacherName);
                        $scope.nextpager = $window.localStorage.getItem("CourseSubject");
                        $scope.nextpagerAdditonal = $window.localStorage.getItem("TeacherName");
                    },

                    function () {
                        alert("Error getting record");
                    });
            };

            $scope.DisplayElement = function DisplayElement(x) {
                var post = {};
                post.CourseSubject = x.CourseSubject;
                $http
                ({
                    method: "POST",
                    url: "./php/NextPage.php",
                    data: Object.toparams(post),
                    headers: {"Content-type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        localStorage.setItem("Course", post.CourseSubject);
                        $scope.applicants = $window.localStorage.getItem("Course");
                    },
                    function () {
                        alert("Error deleting record");
                    });
            };

            $scope.AddtoCourse = function AddtoCourse() {
                var post = {};
                this.applicants = JSON.parse($window.localStorage.getItem("temp_applicants"));
                post.applicants=this.applicants;
                $http({
                    method: "POST",
                    url: "./php/AddtoCourse.php",
                    data: Object.toparams(post),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        alert("Recieved....");
                        alert(this.applicants);
                    },
                    function () {
                        alert("Error getting records");
                    });
            };

            $scope.courselist = [];
            $scope.loadAttendanceCourseStudents = function loadAttendanceCourseStudents(x) {
                var post = {};
                post.CourseID=x.CourseID;
                alert(post.CourseID);

                $http({
                    method: "POST",
                    url: "./php/attendance_CourseSelection.php",
                    data: Object.toparams(post),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.courselist= result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };

            $scope.courselist=[];
            $scope.loadCourseforstudents=function loadCourseforstudents()
            {
                $http({
                    method: "POST",
                    url: "./php/NextCourse.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.courselist = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };

             $scope.loadCourseforstudents();

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

            $scope.attendancedates=[];
            $scope.AttendanceDates = function AttendanceDates() {
                $http
                ({
                    method: "POST",
                    url: "./php/getAttendanceDates.php",
                    data: Object.toparams(post),
                    headers: {"Content-type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendancedates = result.data;
                    },

                    function () {
                        alert("Error getting record");
                    });
            };

            $scope.AttendanceDates();

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

    }
    ]);



