(function () {
    'use strict';

    var module = angular.module('myApp.about', ['ngRoute']);

    module.config(function ($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutCtrl as vm'
        });
    });


    module.controller('AboutCtrl', function () {



    });
})();
