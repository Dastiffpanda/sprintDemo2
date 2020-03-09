var app = angular.module('teacher', []);
app.controller('teacherController', 
        function teacherController($scope, $http, $rootScope, $window) {

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
                    url: "./php/teacher_getEducationCourses.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendance = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };
            $scope.loadEducationCourses();

            $scope.attendance=[];


            $scope.NextCourse = function NextCourse(x) {
                var post = {};
                post.CourseID = x.CourseID;
                post.CourseSubject=x.CourseSubject;
                post.TeacherName=x.TeacherName;
                $http
                ({
                    method: "POST",
                    url: "./php/teacher_getCourseSelection.php",
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


            $scope.displayElement = function displayElement(course) {
                var post = {};
                post.CourseSubject = course.CourseSubject;
                $http
                ({
                    method: "POST",
                    url: "./php/teacher_getNextPage.php",
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

            $scope.addToCourse = function addToCourse() {
                var post = {};
                this.applicants = JSON.parse($window.localStorage.getItem("temp_applicants"));
                post.applicants=this.applicants;
                $http({
                    method: "POST",
                    url: "./php/teacher_getAddToCourse.php",
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

            attendancedates=[];

            $scope.editMode = false;
            $scope.createMode = false;
            $scope.deleteList = [];
            $scope.courselist = [];

            $scope.DatePicker = function DatePicker(newDate){

                var post = angular.copy(newDate);
                post.AttendanceDate = convertToSqlDate(post.AttendanceDate);
                alert(post.AttendanceDate);

                $http({
                    method: "POST",
                    data: Object.toparams(post),
                    url: "./php/teacher_getAttendanceDates.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendancedates = result.data;
                        alert("Record is recorded!");
                    },
                    function () {
                        alert("Error getting records");
                    });
            };
            $scope.loadAttendanceCourseStudents = function loadAttendanceCourseStudents(x) {
                var post = {};
                post.CourseID=x.CourseID;
                alert(post.CourseID);

                $http({
                    method: "POST",
                    url: "./php/teacher_getCourseSelection.php",
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
                    url: "./php/teacher_getNextCourse.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.courselist = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };

             $scope.loadCourseforstudents();

            $scope.editMode = false;
            $scope.createMode = false;
            $scope.deleteList = [];

            $scope.cancelCreate = function cancelCreate(){
                $scope.createMode = false;
            };      
    }
);



