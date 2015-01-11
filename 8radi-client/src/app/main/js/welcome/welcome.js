'use strict';

var app = angular.module('8rad');


app.controller('WelcomeCtrl', [
    '$scope',
    '$modal',
    '$log',
    '$rootScope',
    function WelcomeCtrl($scope, $modal, $log, $rootScope) {
        console.log('logged in here', $rootScope.fireAuth);

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
                                    zip: $scope.user.location.zip
                                }
                            };
                            myFirebase.sync.$set($scope.fullUser);
                        }).then(function () {
                            $rootScope.user = $scope.fullUser
                            $state.go('customers')
                        });
                    break;
                case 'login':
                    myFirebase.login($scope.user)
                        .then(function (data) {
                            console.log('logged in', data);
                        });
                    break;
            }

            $modalInstance.close('close');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
