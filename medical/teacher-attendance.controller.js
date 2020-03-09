Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + "=" + encodeURIComponent(obj[key]));
    }

    return p.join("&");
};

var app=angular.module('mainApp', [])
    .controller("MainController", ["$scope", "$http",
        function AttendanceController($scope, $http)
{
    $scope.cadetList=[];
    $scope.loadAttendanceStudents= function loadAttendanceStudents()
    {
        $http({
            method: "POST",
            url: "./php/teacher_getAttendance.php",
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }).then(function (result) {
                $scope.cadetList = result.data;
            },
            function () {
                alert("Error getting records");
            });
    };
    $scope.loadAttendanceStudents();
}]);