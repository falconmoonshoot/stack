'use strict';

angular.module('moonshootApp')
  .controller('LoginCtrl', function ($scope, $state, $location, $stateParams, $firebaseObject) {
    
    if($location.hash()) {

    var authhash = $location.hash().split('&');
    var cnt=0;
    var params= {};
    authhash.forEach(function(entry) { 
      cnt++;
      params[entry.split('=')[0]]=
           entry.split('=')[1];
        
    });
    if(cnt > 0)
    {
      $state.go('main',{'auth':params})
    }
    var url2 = params["instance_url"]+"/services/data/v33.0/query/q=Select+Name+from+Contact";
  }
   $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });