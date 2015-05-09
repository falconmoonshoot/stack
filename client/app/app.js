'use strict';

angular.module('moonshootApp', [
  'firebase',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    //this is home

    $stateProvider 
            // HOME STATES AND NESTED VIEWS ========================================
            .state('login', {
                url: '/login',
                templateUrl: 'components/home/home.html',
            })
            .state('analytics', {
                url: '/analytics',
                templateUrl: 'components/analytics/analytics.html',     
            })
            .state('landingpage', {
                url: '/personal/:effortGuid',
                templateUrl: 'components/landingpage/landingpage.html',
            })

    $locationProvider.html5Mode(true);
  });