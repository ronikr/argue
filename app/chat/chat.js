(function () {
    'use strict';

    var module = angular.module('myApp.chat', ['ngRoute']);

    module.config(function ($routeProvider) {
        $routeProvider.when('/chat', {
            templateUrl: 'chat/chat.html',
            controller: 'ChatCtrl as vm'
        });
    });

    module.controller('ChatCtrl', function (ChatFactory) {

        this.currentPov = ChatFactory.currPov();
        //console.log('chat',this.currentPov);
        //this.currentPov = null;
        this.hasNick = false;
        this.msgs = ChatFactory.query();
        this.newMsg = {txt: '', by: this.currentPov};

        this.sendMsg = function () {
            ChatFactory.send(this.newMsg);
            this.newMsg = {txt: '', by: this.currentPov};
        };
        this.setNick = function () {
            if (!this.currentPov) return;
            this.hasNick = true;
            this.newMsg.by = this.currentPov;
        }
    });
})();
