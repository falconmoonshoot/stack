'use strict';

angular.module('moonshootApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $stateProvider 
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                abstract:true,
                templateUrl: 'components/home/home.html',
            })
            .state('analytics', {
                url: '/analytics',
                templateUrl: 'components/analytics/analytics.html',     
            })
            .state('landingpage', {
                url: '/personal',
                templateUrl: 'components/landingpage/landingpage.html',
            })

    $locationProvider.html5Mode(true);
  });