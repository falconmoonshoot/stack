'use strict';

angular.module('moonshootApp')
  .controller('LandingPageCtrl', function ($scope, $location, $stateParams, $firebaseObject) {
    $scope.lp = true;
    $scope.effortGuidPath =  $stateParams.effortGuid;
    var ref = new Firebase("https://glowing-torch-9335.firebaseio.com/"+$scope.effortGuidPath);
    var syncObject = $firebaseObject(ref);
    var eventlog;
    var loaded=false;
    syncObject.$bindTo($scope, "effortGuid");
    var unwatch = syncObject.$watch(function() {
       ref.update({status:'opened'});
   
      if(syncObject.creatorGuid && !loaded)
      {

        eventlog =  new Firebase("https://glowing-torch-9335.firebaseio.com/"+syncObject.creatorGuid+"/eventlog");
        var eventObject = $firebaseObject(eventlog);
        console.dir(eventObject);
        eventlog.push({ 'event_type': 'Landing Page Opened', 
                          'event_falcon': syncObject.name, 
                          'event_user': syncObject.userName,
                          'event_time': new Date().getTime(),
                          });
        
       
        loaded=true;
      

      }
      if(syncObject.videoGuid) {

        //size the div to the size of the video
        var vidheight = ZiggeoApi.Videos.get(syncObject.videoGuid).streams[0].video_height;
        var vidwidth = ZiggeoApi.Videos.get(syncObject.videoGuid).streams[0].video_width;

        $("#player").height(vidheight);
        $("#player").width(vidwidth);

         ZiggeoApi.Events.on("play", function(data) 
         {
            console.dir(data);
            eventlog.push(
              { 'event_type': 'Playback started', 
                          'event_falcon': syncObject.name, 
                          'event_user': syncObject.userName,
                          'event_time': new Date().getTime(),
                          }
              );
         });
          ZiggeoApi.Events.on("stop", function(data) 
         {
            console.dir(data);
            eventlog.push(
              { 'event_type': 'Playback stopped', 
                          'event_falcon': syncObject.name, 
                          'event_user': syncObject.userName,
                          'event_time': new Date().getTime(),
                          }
              );
         });
           ZiggeoApi.Events.on("pause", function(data) 
         {
            console.dir(data);
            eventlog.push(
              { 'event_type': 'Playback paused', 
                          'event_falcon': syncObject.name, 
                          'event_user': syncObject.userName,
                          'event_time': new Date().getTime(),
                          }
              );
         });

            ZiggeoApi.Events.on("record", function(data) 
         {
            console.dir(data);
            eventlog.push(
              { 'event_type': 'Recorded a video', 
                          'event_falcon': syncObject.name, 
                          'event_user': syncObject.userName,
                          'event_time': new Date().getTime(),
                          }
              );
         });

           
         ZiggeoApi.Embed.embed("#player", {video: syncObject.videoGuid, modes:['player']});

     }
     syncObject.status="Opened";
     unwatch();
    });

   $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });