'use strict';

angular.module('myApp.version.version-directive', [])



.directive('appVersion', function(AppVersion) {
  return function(scope, elm, attrs) {
    elm.text(AppVersion);
  };
});
