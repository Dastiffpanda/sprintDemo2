Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + "=" + encodeURIComponent(obj[key]));
    }

    return p.join("&");
};

var app=angular.module('educationApp', [])
    .controller("MainController", ["$scope", "$http",
        function EducationController($scope, $http)
        {
            $scope.list=[];
            $scope.loadEducationCourses=function loadAttendanceStudents()
            {
                $http({
                    method: "POST",
                    url: "./php/getEducationCourse.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.list = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };
            $scope.loadEducationCourses();
        }]);

