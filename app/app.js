'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.home',
  'myApp.chat',
  'myApp.argue',
  'myApp.about',
  'myApp.version',
 'ngAnimate'
])

.config(function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
});

