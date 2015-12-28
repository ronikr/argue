'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.view1',
  'myApp.chat',
  'myApp.version'
])
.config(function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
});
