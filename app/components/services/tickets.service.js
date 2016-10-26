'use strict';

angular.module('myApp.ticket-service', [])

    .service('TicketsService', function ($http, $q) {
        var auth_token = 'ee58acf5-fbd1-4ff0-a54e-72a4dc9ebd04';
        var tickets = [];
        
        this.getTicket = function (id) {
            for (var i = 0; i < tickets.length; i++) {
                var ticket = tickets[i];
                if (ticket.ticketId == id) {
                    return ticket;
                }
            }

            // get from server??
            return null;
        };

        this.getTickets = function () {
            var deferred = $q.defer();
            $http
                .post('http://devserver.fieldbit.net:8080/fieldbit/rest/ticket/getAllTickets', {
                    authToken: auth_token
                })
                .success(function (data, status, headers, config) {
                    tickets = data.Result.tickets;
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
                    deferred.resolve(tickets);
                })
                .error(function (data, status, headers, config) {})
                .finally(function (data, status, headers, config) {});
            return deferred.promise;
        }

        this.saveTicket = function (ticketJson) {
            return $http
                .post('http://devserver.fieldbit.net:8080/fieldbit/rest/ticket/editDetails', {
                    ticketId: ticketJson.ticketId,
                    description: ticketJson.description,
                    site: ticketJson.site,
                    equipment: ticketJson.equipment,
                    model: ticketJson.model,
                    authToken: auth_token
                })
        }
    });