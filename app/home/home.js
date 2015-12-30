(function () {
    'use strict';
    var module = angular.module('myApp.home', ['ngRoute']);

    module.config(function ($routeProvider) {
        $routeProvider.when('/home', {
            controller: 'HomeCtrl as vm',
            templateUrl: 'home/home.html'
        });
    });


    module.controller('HomeCtrl', function (ChatFactory , $routeParams, $location) {

      this.argues = ChatFactory.getArgues();

        //console.log(this.argues);


        this.povClicked = function(pov,argue){
            ChatFactory.setDebate(argue, pov);
            $location.path("chat");

        };

    });

})();

