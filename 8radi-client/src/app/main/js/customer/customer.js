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

        var rootUser = myFirebase.getCurrentNGUser($rootScope.userId);


        $scope.logout = function(){
            myFirebase.logout();
            $state.go('home', {logout:true}, {poo:true});
        };


    }

]);

mod.controller('CustomerOwnPostCtrl', [
    '$scope',
    '$state',
    '$q',
    '$rootScope',
    'myFirebase',
    function CustomerOwnPostCtrl($scope, $state, $q, $rootScope, myFirebase) {

            var temp = [];
            for(var propertyName in $rootScope.currentUser.posts){
                myFirebase.getPost(propertyName, $rootScope.currentUser).once('value', function(snapshot){
                    if(snapshot.val()){
                        temp.push(snapshot.val());
                    }
                    $scope.$apply(function(){
                        $scope.postings = temp;
                    });
                });
            }


    }

]);
