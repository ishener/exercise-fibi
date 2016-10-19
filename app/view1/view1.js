'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, TicketsService) {
  $scope.tickets = null;
  $scope.page = 0;

  TicketsService.getTickets().then(function (tickets) {
    for (var i = 0; i < tickets.length; i++) {
      var ticket = tickets[i];
      for (var j = 0; j < ticket.participateList.length; j++) {
        var participant = ticket.participateList[j];
        var participantDisplay = participant.participateDisplayName + " - " + participant.onlineState;
        if (participant.participateState == 'OWNER') {
          ticket.owner = participantDisplay;
        } else {
          ticket.participant = participantDisplay;
        }
      }
    }
    $scope.tickets = tickets;
  });

});