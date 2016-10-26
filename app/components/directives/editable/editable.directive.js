'use strict';

angular.module('myApp.editable', [])

.directive('editable', function() {
    return {
        restrict: "EA",
        templateUrl: '/components/directives/editable/editable.html',
        scope: {
            value: '=',
            onSave: '&'
        },
        link: function(scope, element, attrs) {

        },
        controller: function ($scope, $timeout) {
            $scope.state = 'view';

            $scope.edit = function () {
                $scope.state = 'edit';
                $scope.tempValue = $scope.value;
            };

            $scope.cancel = function () {
                $scope.state = 'view';
            };

            $scope.save = function () {
                $scope.value = $scope.tempValue;
                $scope.state = 'view';
                // let angular complete a cycle in order to update value
                $timeout(function () {
                    $scope.onSave();
                }, 0);
            };
        }
    }
})