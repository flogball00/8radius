'use strict';

var mod = angular.module('8rad');

mod.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('customer', {
            url: 'customer',
            views: {
                '@': {
                    controller: 'CustomerMainCtrl',
                    templateUrl: 'app/main/js/customer/customer.html'
                }
            },
            resolve: {
                currentAuth: ['fireAuth', function (fireAuth) {
                    return fireAuth.$requireAuth();
                }]
            }

        });
    }
]);

mod.controller('CustomerMainCtrl', [
    '$scope',
    '$state',
    '$q',
    '$rootScope',
    'currentAuth',
    'myFirebase',
    function CustomerMainCtrl($scope, $state, $q, $rootScope, currentAuth, myFirebase) {
        $scope.logout = function(){
            myFirebase.logout();
            $state.go('home', {logout:true}, {poo:true});
        };


        console.log('currentuser', $rootScope.currentUser);

    }

]);

