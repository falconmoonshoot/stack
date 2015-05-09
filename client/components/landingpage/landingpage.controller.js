'use strict';

angular.module('moonshootApp')
  .controller('LandingPageCtrl', function ($scope, $location, $stateParams, $firebaseObject) {
     $scope.effortGuidPath =  $stateParams.effortGuid;
    var ref = new Firebase("https://glowing-torch-9335.firebaseio.com/"+$scope.effortGuidPath);
    console.log ($scope.effortGuidPath);
    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "effortGuid");

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });