'use strict';

angular.module('moonshootApp')
  .controller('MainCtrl', function ($scope, $http, $filter, $firebaseObject) {
    $scope.userId = 'dsaf'
    $scope.contacts = [{ name: 'Patrick Malley', type: 'Contact'},
                       { name: 'Patrick Malley', type: 'Contact'},
                       { name: 'Patrick Malley', type: 'Contact'},
                      ];

    $scope.selectedContacts = [];
    $scope.selectedContacts = function () {
      $scope.falconcontacts = $filter('filter')($scope.selectedContacts, {checked: true});
    }

    ZiggeoApi.Events.on("submitted", function (data) {
        // Triggered when a video has been recorded 
        $scope.recordingUniqueId = data.video.token;
        console.log('unique id ', $scope.recordingUniqueId);
        $scope.$apply(function () {
              $scope.videoRecorded = true;
        });
    });

  });
