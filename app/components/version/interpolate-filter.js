'use strict';

angular.module('myApp.version.interpolate-filter', [])

.filter('interpolate', function(AppVersion) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, AppVersion);
  };
});

