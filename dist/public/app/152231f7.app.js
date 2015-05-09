"use strict";angular.module("moonshootApp",["firebase","ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap","checklist-model"]).run(["$rootScope","$location","$state",function(a,b,c){a.$on("$stateChangeStart",function(a,b,c,d,e){var f="login"===b.name})}]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/login"),a.state("login",{url:"/login",templateUrl:"components/login/login.html"}).state("analytics",{url:"/analytics",templateUrl:"components/analytics/analytics.html"}).state("landingpage",{url:"/personal/:effortGuid",templateUrl:"components/landingpage/landingpage.html"}).state("callback",{url:"/auth",templateUrl:"components/callback/callback.html"}),c.html5Mode(!0)}]),angular.module("moonshootApp").controller("MainCtrl",["$scope","$http","$filter","$firebaseObject",function(a,b,c,d){a.userId="dsaf";var e=new Firebase("https://glowing-torch-9335.firebaseio.com/"+a.userId),f=d(e);f.$bindTo(a,"user"),a.contacts=[{name:"Patrick Malley",type:"Contact",checked:!1},{name:"Patrick Michael",type:"Contact",checked:!1},{name:"Patrick Martin",type:"Contact",checked:!1}],a.selectedUsers=[],ZiggeoApi.Events.on("submitted",function(b){a.recordingUniqueId=b.video.token,console.log("unique id ",a.recordingUniqueId),a.user.videos?a.user.videos.push(a.recordingUniqueId):a.user.videos=[a.recordingUniqueId],a.$apply(function(){a.videoRecorded=!0})})}]),angular.module("moonshootApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("moonshootApp").controller("LandingPageCtrl",["$scope","$location","$stateParams","$firebaseObject",function(a,b,c,d){a.lp=!0,a.effortGuidPath=c.effortGuid;var e=new Firebase("https://glowing-torch-9335.firebaseio.com/"+a.effortGuidPath),f=d(e);f.$bindTo(a,"effortGuid");f.$watch(function(){if(f.videoGuid){var a=ZiggeoApi.Videos.get(f.videoGuid).streams[0].video_height,b=ZiggeoApi.Videos.get(f.videoGuid).streams[0].video_width;$("#player").height(a),$("#player").width(b),ZiggeoApi.Embed.embed("#player",{video:f.videoGuid,modes:["player"]})}});a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]),angular.module("moonshootApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("moonshootApp").controller("NavbarCtrl",["$scope","$location","$stateParams",function(a,b,c){a.menu=[{title:"Home",link:"/"}],b.path().indexOf("personal")&&(a.personal=!0),a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]),angular.module("moonshootApp").run(["$templateCache",function(a){a.put("app/main/main.html",'<div style=padding-top:50px class=container><div class=row><div class=col-lg-8><h3 tooltip="A moonshoot is a great way to communicate with customers and prospects" class=page-header>1. Record a Video:</h3><ziggeo ziggeo-width=640 ziggeo-height=480 ziggeo-meta_profile=bc1cd9329d4776dffe0609004fe397d4></ziggeo></div><div class=col-lg-4><h3 class=page-header>2. Select Contacts:<ul><li class=falconstyle ng-repeat="contact in contacts"><input type=checkbox checklist-model=selectedUsers checklist-value=contact.name type="checkbox"> {{contact.name}}</li><div>Total: ({{selectedUsers}})</div></ul></h3></div></div><div class=row><div class=col-lg-12><div class=text-center style=padding-top:45px><button style=font-size:32px;font-weight:300 class="btn btn-primary" ng-click=sendVideo()>Send a Falcon</button></div></div></div><div class=row><div class=col-lg-12><h3 class=page-header>My Studio:</h3></div></div></div><footer class=footer><div class=container><p>Falcon Moonshoot | <a href=https://twitter.com/falconmoonshoot>@falconMoonshoot</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Made with Love in NYC</a></p></div></footer>'),a.put("components/analytics/analytics.html",""),a.put("components/callback/callback.html","sadfadsfads"),a.put("components/landingpage/landingpage.html","<div ng-controller=LandingPageCtrl><div class=container style=padding-top:50px><div class=row><h2 class=page-header>You've received a Falcon from {{effortGuid.username}}:</h2><!--\n    Loading Personalized Video for GUID: {{effortGuid.name}} <br/>\n    <br/>\n    Video ID (from firebase) : {{effortGuid.videoGuid}} <br/>\n    User ID (from firebase) : {{effortGuid.userGuid}} <br/>\n    Status : {{effortGuid.status}} <br/>\n    Other User Metadata: <br/>--><div class=stylePlayer id=player></div></div><div class=row><h2 class=page-header>Respond Back:</h2><!--\n    Loading Personalized Video for GUID: {{effortGuid.name}} <br/>\n    <br/>\n    Video ID (from firebase) : {{effortGuid.videoGuid}} <br/>\n    User ID (from firebase) : {{effortGuid.userGuid}} <br/>\n    Status : {{effortGuid.status}} <br/>\n    Other User Metadata: <br/>--><ziggeo class=stylePlayer></ziggeo></div></div></div><div id=player></div>"),a.put("components/login/login.html",'<!DOCTYPE html><html lang=en><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1"><!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --><meta name=description content=""><meta name=author content=""><link rel=icon href=../../favicon.ico><title>Sign in to Falcon MoonShot</title><!-- Bootstrap core CSS --><link href=../../dist/css/bootstrap.min.css rel=stylesheet><!-- Custom styles for this template --><link href=signin.css rel=stylesheet><!-- Just for debugging purposes. Don\'t actually copy these 2 lines! --><!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]--><script src=../../assets/js/ie-emulation-modes-warning.js></script><!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries --><!--[if lt IE 9]>\n      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>\n      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>\n    <![endif]--><script src=https://cdn.firebase.com/js/client/2.2.1/firebase.js></script></head><body><div style=padding-top:50px class=container><div class=col-sm-4><div class=list-group><a href="https://login.salesforce.com/services/oauth2/authorize?response_type=token&client_id=3MVG9sG9Z3Q1Rlbdh8cds.P2v.Fv9AhIQiKXoVWXXMQSwbjLsY1qdBewcq0adiFZzhe45gIyQmqVvD5KdhDeQ&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Flogin" class=list-group-item>Authenticate with Salesforce</a> <a href=# class=list-group-item>Authenticate with Google</a> <a href=# class=list-group-item>Authenticate with Dropbox</a></div></div></div><!-- /container --><!-- IE10 viewport hack for Surface/desktop Windows 8 bug --><script src=../../assets/js/ie10-viewport-bug-workaround.js></script></body></html>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<header ng-controller=NavbarCtrl id=header style="-webkit-transform: none"><div class=header1><a class=js-use-pushstate id=logo href=http://www.salesramp.io target=_blank>Falcon Moonshoot</a><nav class=hide-on-mobile id=primaryNavigation><ul ng-hide=personal class="nav navbar-nav nav-falcon"><!--<li ng-hide=\'isSearchActive\' ui-sref-active="active1"><a ui-sref="timeline">Timeline</a></li>--><li ui-sref-active=active1><a ui-sref=main>Home</a></li><li ui-sref-active=active1><a ui-sref=analytics>Analytics</a></li><!--<li ng-hide=\'isSearchActive\' ui-sref-active="active1"><a ui-sref="competitions">Competitions</a></li>--></ul></nav></div></header>')}]);