'use strict';

var app = angular.module('8rad');


app.controller('MainCtrl', [function ($scope, $modal, $log) {

}]);



app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {


  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    //modalInstance.result.then(function (selectedItem) {
    //  $scope.selected = selectedItem;
    //}, function () {
    //  $log.info('Modal dismissed at: ' + new Date());
    //});
  };
});

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

    $scope.ok = function () {
      $log.info('email' + $scope.email + ' password ' + $scope.password);
      myFirebase.createUser($scope.email, $scope.password);
      $modalInstance.close('close');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
