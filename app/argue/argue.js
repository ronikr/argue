(function () {
    'use strict';

    var module = angular.module('myApp.argue', ['ngRoute']);

    module.config(function ($routeProvider) {
        $routeProvider.when('/argue/:argueId?', {
            templateUrl: 'argue/argue.html',
            controller: 'ArgueCtrl as vm'
        });
    });
    module.controller('ArgueCtrl', function (ChatFactory, $routeParams, $location) {

        this.currentArgue = ChatFactory.currArgue();


        var argueId = $routeParams.argueId || null;

        if (argueId) {
            this.currentArgue = ChatFactory.getArgueById(argueId);
        }


        if (!this.currentArgue) {
            $location.path('home');
            return;
        }

        this.povClicked = function (pov) {
            ChatFactory.setDebate(this.currentArgue, pov);
            $location.path("chat");

        };

    });
})();