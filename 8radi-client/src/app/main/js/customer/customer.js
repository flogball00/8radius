'use strict';

var mod = angular.module('8rad');

mod.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('customer', {
            url: '/customer',
            views: {
                '@': {
                    controller: 'CustomerMainCtrl',
                    templateUrl: 'app/main/js/customer/customer.html'
                }
            },
            resolve: {
                postings: ['myFirebase', function (myFirebase) {
                    return myFirebase.getPostings();
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
    'postings',
    function CustomerMainCtrl($scope, $state, $q, $rootScope, postings) {
        console.log(postings);
    }

]);

