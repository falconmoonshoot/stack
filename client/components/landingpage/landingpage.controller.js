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

        //size the div to the size of the video
        var vidheight = ZiggeoApi.Videos.get(syncObject.videoGuid).streams[0].video_height;
        var vidwidth = ZiggeoApi.Videos.get(syncObject.videoGuid).streams[0].video_width;

        $("#player").height(vidheight);
        $("#player").width(vidwidth);
         ZiggeoApi.Embed.embed("#player", {video: syncObject.videoGuid, modes:['player'], responsive:true});
        
     }
    });

   $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });