'use strict';

angular.module('moonshootApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.contacts = [{ name: 'Patrick Malley', type: 'Contact'},
                       { name: 'Patrick Malley', type: 'Contact'},
                       { name: 'Patrick Malley', type: 'Contact'},
                      ];

  });
