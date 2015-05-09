'use strict';

angular.module('moonshootApp', [
  'firebase',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'checklist-model'
  
])
.run(function($rootScope, $location, $state) {


    $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
                                                   , fromState, fromParams) {

        var isLogin = toState.name === "login";
        if(isLogin){
           return; // no need to redirect 
        }

        // now, redirect only not authenticated

    });
})
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/login');

    //this is home

    $stateProvider 
            // HOME STATES AND NESTED VIEWS ========================================
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.html',
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