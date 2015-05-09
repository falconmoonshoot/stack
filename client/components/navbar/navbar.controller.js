'use strict';

angular.module('moonshootApp')
  .controller('NavbarCtrl', function ($scope, $location, $stateParams) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    console.log($location.path());

    //if ()

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });