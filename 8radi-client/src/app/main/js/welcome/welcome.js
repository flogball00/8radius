'use strict';

var app = angular.module('8rad');


app.controller('WelcomeCtrl', [
    '$scope',
    '$modal',
    '$log',
    '$rootScope',
    '$state',
    'fireAuth',
    'myFirebase',
    function WelcomeCtrl($scope, $modal, $log, $rootScope, $state, fireAuth, myFirebase) {
        $scope.auth = fireAuth;

        $scope.authenticated = $scope.auth.$getAuth();

        if($scope.authenticated){
            $rootScope.currentUser = myFirebase.getCurrentUser($scope.authenticated.auth.uid);
            $state.go('customer');
        }

        $scope.createUser = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'createUser.html',
                controller: 'ModalInstanceCtrl',
                size: size
            });
        };

        $scope.login = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'loginUser.html',
                controller: 'ModalInstanceCtrl',
                size: size
            });
        };

        $scope.$on('AUTH_REQUIRED', function(event, data){
            console.log('auth ON heard', event, data);
            $scope.showAuthRequired = true;
        });

        $scope.closeAlert = function() {
            $scope.showAuthRequired = false;
        }

    }]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', [
    '$scope',
    '$modalInstance',
    '$log',
    'myFirebase',
    'counties',
    '$state',
    '$rootScope',
    'states',
    function ModalInstanceCtrl($scope, $modalInstance, $log, myFirebase, counties, $state, $rootScope, states) {

        states.then(function (data) {
            $scope.states = data;
        });

        $scope.user = {
            'accountType': 'Customer'
        };

        $scope.accountTypes = ['Customer', 'Contractor'];

        $scope.stateSelected = false;

        $scope.$watch('user.location.state', function (newValue, oldValue) {
            if (newValue)
            {
                $scope.stateSelected = true;

                counties.getCountiesByState(newValue.name).then(function (data) {
                    $scope.counties = data;
                    $scope.stateSelected = true;
                });
            }
        });

        $scope.ok = function (action) {
            $log.info('email' + $scope.user.email + ' password ' + $scope.user.password);

            switch (action)
            {
                case 'create':
                    myFirebase.createUser($scope.user)
                        .then(function (data) {
                            $scope.fullUser = {
                                    userId: data.uid,
                                    firstName: $scope.user.firstName,
                                    lastName: $scope.user.lastName,
                                    location: {
                                        state: $scope.user.location.state.name,
                                        county: $scope.user.location.county,
                                        zip: $scope.user.location.zip
                                    }
                            };
                            myFirebase.addUser($scope.fullUser);
                        }).then(function () {
                            $rootScope.current = $scope.fullUser;
                            console.log('user created and logged in');
                            $state.go('customer');
                        });
                    break;
                case 'login':
                    myFirebase.login($scope.user)
                        .then(function (data) {
                            $rootScope.currentUser = myFirebase.getCurrentUser(data.auth.uid);
                            console.log('logged in');
                            $state.go('customer');

                        });
                    break;
            }

            $modalInstance.close('close');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
