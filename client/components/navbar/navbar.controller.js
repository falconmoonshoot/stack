'use strict';

angular.module('moonshootApp')
  .controller('NavbarCtrl', function ($scope, $location, $stateParams) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
<<<<<<< HEAD
    
    if($location.path().indexOf('personal') !== -1){
      $scope.personal = true;
    }
=======
    console.log($location.path());

    //if ()
>>>>>>> d

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });