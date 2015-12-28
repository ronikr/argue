(function (){

  'use strict';

  var module = angular.module('myApp.version', [
    'myApp.version.interpolate-filter',
    'myApp.version.version-directive'
  ]);

  module.constant('AppVersion', '0.4');
  module.constant('serverUrl', 'http://mrjson.com/api');


})();

