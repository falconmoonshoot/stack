'use strict';

angular.module('moonshootApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        params: {auth: null},
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });