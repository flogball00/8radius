'use strict';

var mod = angular.module('8rad');

mod.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('posting', {
            url: 'posting',
            views: {
                '@': {
                    controller: 'PostingCtrl',
                    templateUrl: 'app/main/js/posting/posting.html'
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

mod.controller('PostingCtrl', [
    '$scope',
    '$state',
    '$q',
    '$rootScope',
    'currentAuth',
    'myFirebase',
    'fireRef',
    function PostingCtrl($scope, $state, $q, $rootScope, currentAuth, myFirebase, fireRef) {

        $scope.postData = {
            createdBy: $rootScope.currentUser.userId,
            status: 'open'
        };


        console.log($rootScope.currentUser);

        $scope.post = function() {
            $scope.postData.createdAt = myFirebase.getTimestamp();

            myFirebase.incrementPostCount();

            myFirebase.addPost($scope.postData, $rootScope.currentUser).then(function(ref) {
                myFirebase.addPostKey(ref.key(), $rootScope.currentUser.userId).then(function(){
                    console.log('post added');
                    $state.go('customer');
                });   // key for the new ly created record
            }, function(error) {
                console.log("Error:", error);
            });
        }

    }

]);

