'use strict';

angular.module('myApp.ticket-service', [])

    .service('TicketsService', function ($http, $q) {
        var auth_token = 'ee58acf5-fbd1-4ff0-a54e-72a4dc9ebd04';

        this.getTickets = function () {
            var deferred = $q.defer();
            $http
                .post('http://devserver.fieldbit.net:8080/fieldbit/rest/ticket/getAllTickets', {
                    authToken: auth_token
                })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data.Result.tickets);
                })
                .error(function (data, status, headers, config) {})
                .finally(function (data, status, headers, config) {});
            return deferred.promise;
        }
    });