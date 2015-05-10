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
                       { name: 'Steven Simoni', type: 'Contact', checked:false, email:'steven.m.simoni+5@gmail.com'},
                       { name: 'Randy Flores', type: 'Contact', checked:false, email:'steven.m.simoni+6@gmail.com'},
                       { name: 'Rio Sites', type: 'Contact', checked:false, email:'steven.m.simoni+7@gmail.com'},
                       { name: 'Caitlin Garlow', type: 'Contact', checked:false, email:'steven.m.simoni+8@gmail.com'},
                      ];

    $scope.selectedUsers = [];

    $scope.sendFalcon = function(){
      if ($scope.recordingUniqueId){
        $scope.landed=true
        angular.forEach($scope.selectedUsers, function(value, key){
           $scope.falconGuid = $scope.guid();

           var falconref = new Firebase("https://glowing-torch-9335.firebaseio.com/"+$scope.falconGuid);

           falconref.update({
           					 creatorGuid:$scope.firstName+' '+$scope.lastName,
           					 creatorEmail:$scope.salesPersonEmail,
                             name:$scope.falconTitle,
                             status:'sent',
                             createDate: new Date().getTime(),
                             userGuid:value.email,
                             userName:value.name,
                             videoGuid:$scope.recordingUniqueId});

           $scope.sendemail(value.email, value.name, $scope.falconGuid);       
        });
      }
    }
    $scope.myfalcons = [];
    var allfalcons = new Firebase("https://glowing-torch-9335.firebaseio.com/");
    allfalcons.orderByChild("creatorEmail").equalTo($scope.salesPersonEmail).on("child_added",
    	function(snapshot)
    	{
    		$scope.myfalcons.push(snapshot.val());
    			$scope.processFalcons();
    		//	console.dir(snapshot.val());
    			$scope.$apply();
    	    	});


    $scope.processFalcons = function()
    {

    	var pushed = {};
		var blah = {};
		$scope.falcons=[];
    	
    	$scope.myfalcons.forEach(function(entry){
    		if(!blah[entry.name]) {
    			blah[entry.name] = {"name": entry.name,views: 0,responses:[], "publish_date": entry.createDate};
    			pushed[entry.name]=false;
    		}
    		blah[entry.name].views += (entry.status!='sent')?1:0;
    		if(entry.responsevideo)
    			blah[entry.name].responses.push({name:entry.userName,video:entry.responsevideo});

    		
    	});
    	

    	$scope.myfalcons.forEach(function(entry){
    		if(!pushed[entry.name]) {
    			$scope.falcons.push(blah[entry.name]);
    			pushed[entry.name]=true;
    		}
    	})
    	console.dir($scope.falcons);
    	return $scope.falcons;
    }
    	
   

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