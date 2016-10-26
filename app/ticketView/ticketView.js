'use strict';

angular.module('myApp.ticketView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ticket/:id', {
    templateUrl: 'ticketView/ticketView.html',
    controller: 'TicketViewCtrl'
  });
}])

.controller('TicketViewCtrl', function($scope, $routeParams, $location, TicketsService) {
  $scope.ticket = TicketsService.getTicket($routeParams.id);
  if ($scope.ticket == null) {
    $location.path('view1');
  }

  $scope.gotoList = function () {
    $location.path('view1');
  };
});
