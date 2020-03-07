var myApp=angular.module('medical')
    .controller('PeopleController', ['$scope', '$http','$rootScope','$window',
        function MedicalController($scope, $http, $rootScope, $window) {
            $scope.list=[];
            $scope.loadEducationCourses=function loadEducationCourses()
            {
                $http({
                    method: "POST",
                    url: "./php/getPeople.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (result) {
                        $scope.list = result.data;
                    },
                    function () {
                        alert("Error getting records");
                    });
            };
            $scope.loadEducationCourses();

        }

    ]);
