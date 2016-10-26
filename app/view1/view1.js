'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $location, TicketsService) {
  $scope.tickets = null;
  $scope.page = 0;
  $scope.reverse = true;
  $scope.Math = window.Math;

  TicketsService.getTickets().then(function (tickets) {
    $scope.tickets = tickets;
  });

  $scope.updateTicket = function (ticket) {
    TicketsService.saveTicket(ticket);
  };

  $scope.gotoTicket = function (ticketId) {
    $location.path('ticket/' + ticketId);
  };

});
