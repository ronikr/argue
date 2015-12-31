(function () {
    'use strict';

    var module = angular.module('myApp.chat', ['ngRoute']);

    module.config(function ($routeProvider) {
        $routeProvider.when('/chat', {
            templateUrl: 'chat/chat.html',
            controller: 'ChatCtrl as vm'
        });
    });


    module.controller('ChatCtrl', function ($location, $scope, ChatFactory, $interval) {

        var that = this;
        this.currentArgue = ChatFactory.currArgue();
        this.currentPov = ChatFactory.currPov();

        if (!this.currentArgue || !this.currentPov) {
            $location.path('home');
        }

        $scope.$watch(function () {
            return ChatFactory.isStarted();
        }, function (newVal) {
            console.log('isStarted watch: ', newVal);
            that.argueStarted = newVal;
        });


        //console.log('chat',this.currentPov);
        //this.currentPov = null;
        //this.hasNick = false;
        this.msgs = ChatFactory.query();
        this.newMsg = {txt: '', by: this.currentPov};
        //this.botMsg = {
        //    txt: ChatFactory.getRandomMsg(),
        //    by: 'Argument Referee'
        //};

        this.sendMsg = function () {
            ChatFactory.send(this.newMsg);
            this.newMsg = {txt: '', by: this.currentPov};
        };
        var msgs = this.msgs;
        var botMsg = {};
        this.argueBot = $interval(function () {
            msgs = ChatFactory.query();
            if (msgs.length % 4 === 0 && msgs.length !==0) {
                botMsg = {
                    txt: ChatFactory.getRandomMsg(),
                    by: 'Argument Referee'
                };
                ChatFactory.send(botMsg);
            }
        }, 3000);


        //this.setNick = function () {
        //    if (!this.currentPov) return;
        //    this.hasNick = true;
        //    this.newMsg.by = this.currentPov;
        //}
    });
})();
