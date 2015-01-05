'use strict';

var app = angular.module('8rad');


app.controller('WelcomeCtrl',['$scope', '$modal', '$log', function WelcomeCtrl($scope, $modal, $log) {


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

  function ModalInstanceCtrl ($scope, $modalInstance, $log, myFirebase) {

    $scope.email = "";
    $scope.password = "";

    $scope.ok = function (action) {
      $log.info('email' + $scope.email + ' password ' + $scope.password);

      switch(action)
      {
        case 'create':
          myFirebase.createUser($scope.email, $scope.password);
          break;
        case 'login':
          myFirebase.login($scope.email, $scope.password);
          break;
      }

      $modalInstance.close('close');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
