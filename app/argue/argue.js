(function () {
    'use strict';

    var module = angular.module('myApp.argue', ['ngRoute']);

    module.config(function ($routeProvider) {
        $routeProvider.when('/argue', {
            templateUrl: 'argue/argue.html',
            controller: 'ArgueCtrl as vm'
        });
    });
    module.controller('ArgueCtrl', function (ChatFactory, $routeParams, $location) {

        //fix this duplication by refactoring
        this.argue = ChatFactory.currArgue();
        this.currentArgue = ChatFactory.currArgue();

        if (!this.currentArgue) {
            $location.path('home');
        }

        var argue = this.argue;
        this.povClicked = function (pov) {
            ChatFactory.setDebate(argue, pov);
            $location.path("chat");

        };

    });
})();