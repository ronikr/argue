
(function(){
  'use strict';
  var module = angular.module('myApp.view1', ['ngRoute']);

  module.config(function($routeProvider) {
    $routeProvider.when('/view1', {
      controller: 'View1Ctrl as vm',
      templateUrl: 'view1/view1.html'
    });
  });



  module.controller('View1Ctrl', function() {
    this.pet  = {id: 123, name: 'Charli124', desc: 'lorem ipsum', humanYearsFactor: 6};

  });

})();

