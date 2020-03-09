Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + "=" + encodeURIComponent(obj[key]));
    }

    return p.join("&");
};

var app=angular.module('teacherGrades', [])
    .controller("GradesController", ["$scope", "$http",
        function GradesController($scope, $http)
{
    $scope.cadetList=[];
    $scope.loadGrades= function loadGrades()
    {
        $http({
            method: "POST",
            url: "./php/teacher_getGrades.php",
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }).then(function (result) {
                $scope.cadetList = result.data;
            },
            function () {
                alert("Error getting records");
            });
    };
    $scope.loadGrades();
}]);
