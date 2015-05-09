'use strict';

angular.module('moonshootApp')
  .controller('MainCtrl', function ($scope,$state,$stateParams, $http, $filter, $firebaseObject) {

  	console.log($stateParams.auth);
    //$http.get('')
    if($stateParams.auth==null)
    {

    	$state.go('login')
    }

    if ($stateParams.auth){
      $http.defaults.headers.common.Authorization = 'OAuth '+$stateParams.auth.access_token;
      $http.get($stateParams.auth.instance_url+"/services/data/v33.0/query?q=SELECT+Name+from+Contact").success(function(data){
        console.log(data);
      })
    }

    $scope.userId = 'dsaf'
    var ref = new Firebase("https://glowing-torch-9335.firebaseio.com/"+$scope.userId);


    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "user");
    
    $scope.contacts = [{ name: 'Patrick Malley', type: 'Contact', checked:false},
                       { name: 'Patrick Michael', type: 'Contact', checked:false},
                       { name: 'Patrick Martin', type: 'Contact', checked:false},
                      ];

    $scope.selectedUsers = [];

    ZiggeoApi.Events.on("submitted", function (data) {
        // Triggered when a video has been recorded 
        $scope.recordingUniqueId = data.video.token;
        console.log('unique id ', $scope.recordingUniqueId);
        if ($scope.user.videos){
          $scope.user.videos.push($scope.recordingUniqueId);
        }
        else{
          $scope.user.videos = [$scope.recordingUniqueId];
        }
        

        $scope.$apply(function () {
              $scope.videoRecorded = true;
        });
    });

  });