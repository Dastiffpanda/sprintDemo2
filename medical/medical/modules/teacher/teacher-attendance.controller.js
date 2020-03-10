var app = angular.module('teacher',[]);
app.controller('AttendanceController',
        function AttendanceController($scope, $http, $rootScope, $window) {

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


            $scope.attendanceList = [];
            $scope.loadEducationCourses = function loadAttendanceStudents() {
                $http({
                    method: "POST",
                    url: "./php/teacher_getEducationCourses.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendanceList = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };
            $scope.loadEducationCourses();


            $scope.peopleList = [];
            $scope.loadCourses = function loadCourses() {
                $http({
                    method: "POST",
                    url: "./php/teacher_getPeople.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.peopleList = result.data;
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
                    url: "./php/teacher_getCourseSelection.php",
                    data: Object.toparams(post),
                    headers: {"Content-type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        localStorage.setItem("Course1", post.CourseSubject);
                        $scope.nextpager = $window.localStorage.getItem("Course1");
                        window.location.href = 'teacher-attendance.view.html';
                        $scope.NextCourse(x);
                    },

                    function () {
                        alert("Error deleting record");
                    });
            };

            $scope.attendanceList=[];
            $scope.NextCourse = function NextCourse(x) {
                var post = {};
                post.CourseID = x.CourseID;
                post.CourseSubject=x.CourseSubject;
                post.TeacherName=x.TeacherName;
                $scope.datepager = $window.localStorage.getItem("AttendanceDate");
                post.AttendanceDate=$scope.datepager;
                $http
                ({
                    method: "POST",
                    url: "./php/teacher_getCourseSelection.php",
                    data: Object.toparams(post),
                    headers: {"Content-type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendanceList = result.data;
                        localStorage.setItem("CourseID", post.CourseID);
                        localStorage.setItem("CourseSubject", post.CourseSubject);
                        localStorage.setItem("TeacherName", post.TeacherName);
                        $scope.nextpager = $window.localStorage.getItem("CourseSubject");
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

            $scope.AddtoCourse = function AddtoCourse() {
                var post = {};
                this.applicants = JSON.parse($window.localStorage.getItem("temp_applicants"));
                post.applicants=this.applicants;
                $http({
                    method: "POST",
                    url: "./php/teacher_getAddtoCourse.php",
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

            $scope.courseList = [];
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
                        $scope.courseList= result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };

            $scope.loadCourseforstudents=function loadCourseforstudents()
            {
                $http({
                    method: "POST",
                    url: "./php/teacher_getNextCourse.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.courseList = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };

            $scope.loadCourseforstudents();

            $scope.newDate = function newDate(newDate){

                var post = angular.copy(newDate);
                post.AttendanceDates = convertToSqlDate(newDate.meetingDate);

                $http({
                    method: "POST",
                    data: Object.toparams(post),
                    url: "./php/teacher_addAttendanceDates.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendancedates = result.data;
                        alert("Record is recorded!");
                        alert(post.AttendanceDates);
                    },
                    function () {
                        alert("Error getting records");
                    });
            };

            $scope.gradeList=[];
            $scope.editMode = false;
            $scope.createMode = false;
            $scope.deleteList = [];

            $scope.cancelCreate = function cancelCreate(){
                $scope.createMode = false;
            };
            
            $scope.updateAttendance = function updateAttendance(attend)
            {
                var post ={};
                post.AttendanceID = attend.AttendanceID;
                post.AttendanceStatus = attend.AttendanceStatus;
                $http
                ({
                    method: "POST",
                    url: "./php/teacher_updateAttendance.php",
                    data: Object.toparams(post),
                    headers: {"Content-type": "application/x-www-form-urlencoded"}
                }).then (function(result)
                    {
                        alert("Record Updated");
                        $scope.loadAttendanceDates();
                    },
                    function()
                    {
                        alert("Error editing record");
                    });
            };

            $scope.DatePicker = function DatePicker(Date){
                var post = angular.copy(Date);
                post.AttendanceDate = convertToSqlDate(post.meetingDate);
                alert(post.AttendanceDate);
                localStorage.setItem("AttendanceDate", post.AttendanceDate);

                $http({
                    method: "POST",
                    data: Object.toparams(post),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendancedates = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };
          
            $scope.attendanceDates=[];
            $scope.loadAttendanceDates = function loadAttendanceDates() {
                $http
                ({
                    method: "POST",
                    url: "./php/teacher_getAttendanceDates.php",
                    headers: {"Content-type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.attendanceDates = result.data;
                    },

                    function () {
                        alert("Error getting record");
                    });
            };

           
            $scope.loadAttendanceDates();

            $scope.makeEditable = function makeEditable(){
                $scope.editMode = true;
                $scope.createMode = false;

            };
            $scope.showSelected= function showSelected(){
                console.log($scope.selectedVal)};

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
           
           
        }
);



