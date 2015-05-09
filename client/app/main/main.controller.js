'use strict';

angular.module('moonshootApp')
  .controller('MainCtrl', function ($scope,$state,$stateParams, $http, $filter, $firebaseObject) {

  	console.log($stateParams.auth);
    //$http.get('')
    //if($stateParams.auth==null)
    //{

    //	$state.go('login');
    //}
    $scope.guid = function guid() {
       function s4() {
         return Math.floor((1 + Math.random()) * 0x10000)
           .toString(16)
           .substring(1);
       }
       return s4() + s4() + s4() + s4() +
         s4() + s4() + s4() + s4();
    }

    //if ($stateParams.auth){
      //$http.defaults.headers.common.Authorization = 'OAuth '+$stateParams.auth.access_token;
      //$http.get($stateParams.auth.instance_url+"/services/data/v33.0/query?q=SELECT+Name+from+Contact").success(function(data){
      //  console.log(data);
      //});
      //this would all come from the server.
      $scope.userIdGuid = $scope.guid();
      $scope.salesPersonEmail = 'mike@salesramp.io';
      $scope.firstName = 'Mike';
      $scope.lastName = 'Pollack';
    //}

    var ref = new Firebase("https://glowing-torch-9335.firebaseio.com/"+$scope.userIdGuid);


    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "user");
    
    $scope.contacts = [{ name: 'Patrick Malley', type: 'Contact', checked:false, email:'steven.m.simoni+1@gmail.com'},
                       { name: 'Patrick Michael', type: 'Contact', checked:false, email:'steven.m.simoni+2@gmail.com'},
                       { name: 'Ray Carrol', type: 'Contact', checked:false, email:'steven.m.simoni+3@gmail.com'},
                       { name: 'Patrick Martin', type: 'Contact', checked:false, email:'steven.m.simoni+4@gmail.com'},
                       { name: 'Scott Hutchins', type: 'Contact', checked:false, email:'steven.m.simoni+5@gmail.com'},
                       { name: 'Randy Flores', type: 'Contact', checked:false, email:'steven.m.simoni+6@gmail.com'},
                       { name: 'Rio Sites', type: 'Contact', checked:false, email:'steven.m.simoni+7@gmail.com'},
                       { name: 'Caitlin Garlow', type: 'Contact', checked:false, email:'steven.m.simoni+8@gmail.com'},
                      ];

    $scope.selectedUsers = [];

    $scope.sendFalcon = function(){
      if ($scope.recordingUniqueId){
        angular.forEach($scope.selectedUsers, function(value, key){
           $scope.falconGuid = $scope.guid();

           var falconref = new Firebase("https://glowing-torch-9335.firebaseio.com/"+$scope.falconGuid);

           falconref.update({creatorGuid:$scope.firstName+' '+$scope.lastName,
                             name:$scope.falconTitle,
                             status:'sent',
                             userGuid:value.email,
                             userName:value.name,
                             videoGuid:$scope.recordingUniqueId});

           $scope.sendemail(value.email, value.name, $scope.falconGuid);       
        });
      }
    }

    $scope.falcons = [
    {
      name: 'This is the best event ever!',
      views: 20,
      publish_date: '05/09/2015',
    },
    {
      name: 'Video Hack Day 2015!',
      views: 1,
      publish_date: '05/09/2015',
    },
    {
      name: 'I really wanna win the Dropcam Prizes!',
      views: 15,
      publish_date: '05/09/2015',
    },
    {
      name: 'Firebase has Changed my Life!',
      views: 40,
      publish_date: '05/09/2015',
    },
    ]

  $scope.sendemail = function sendMail(eml, to_name, guid) {
       $.ajax({
         type: 'POST',
         url: 'https://mandrillapp.com/api/1.0/messages/send.json',
         data: {
           'key': 'sVS2sg9fxEQL-dRBlp5Ayw',
           'message': {
             'from_email': 'videohackday@salesramp.io',
             'to': [
                 {
                   'email': eml,
                   'name': to_name,
                   'type': 'to'
                 }
               ],
             'autotext': 'true',
             'subject': 'A New Falcon has Landed',
             'html': 'Your new falcon is at url: www.falconmoonshoot.com/personal/' + guid
           }
         }
        }).done(function(response) {
          console.log(response); 
        });
    }

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