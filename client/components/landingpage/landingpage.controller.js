'use strict';

angular.module('moonshootApp')
  .controller('LandingPageCtrl', function ($scope, $location, $stateParams, $firebaseObject) {
    $scope.lp = true;
    $scope.effortGuidPath =  $stateParams.effortGuid;
    var ref = new Firebase("https://glowing-torch-9335.firebaseio.com/"+$scope.effortGuidPath);
    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "effortGuid");
    var unwatch = syncObject.$watch(function() {

      if(syncObject.videoGuid) {
       ZiggeoApi.Embed.embed("#player", {video: syncObject.videoGuid, modes:['player']});
       console.log("loaded"); 
     }
    });

   $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });