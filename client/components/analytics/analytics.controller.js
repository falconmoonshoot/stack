'use strict';

angular.module('moonshootApp')
  .controller('AnalyticsPageCtrl', function ($scope, $location, $stateParams, $firebaseObject) {

    var firebaseRef = new Firebase("https://glowing-torch-9335.firebaseio.com/");

    $scope.logEvents = [];
    $scope.eventLimit = 15;

    firebaseRef.child("myfirstcreator").on("value", function(eventObj) {
      var events = eventObj.val();

      angular.forEach(events.eventlog, function(value, key){

        $scope.logEvents.push(value);
      });

      console.log($scope.logEvents);
      $scope.$apply();
    });

    $scope.totalMinutes = Math.floor((Math.random() * 100) + 20);
    $scope.totalFalcons = Math.floor((Math.random() * 10) + 1);
    $scope.totalMoonshots = Math.floor((Math.random() * 10) + 1);
  });