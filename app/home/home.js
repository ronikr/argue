
(function(){
  'use strict';
  var module = angular.module('myApp.home', ['ngRoute']);

  module.config(function($routeProvider) {
    $routeProvider.when('/home', {
      controller: 'HomeCtrl as vm',
      templateUrl: 'home/home.html'
    });
  });



  module.controller('HomeCtrl', function() {
    this.pet  = {id: 123, name: 'Charli124', desc: 'lorem ipsum', humanYearsFactor: 6};

  });

})();

