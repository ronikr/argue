
(function(){
  'use strict';
  var module = angular.module('myApp.view1');

  module.directive('sayHello', function() {
    return {
      template: '<h1>Hello</h1>'
    }
  });

})();