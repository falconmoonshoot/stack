'use strict';

angular.module('moonshootApp')
  .controller('NavbarCtrl', function ($scope, $location, $stateParams) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    if($location.path().indexOf('personal')){
      $scope.personal = true;
    }

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });