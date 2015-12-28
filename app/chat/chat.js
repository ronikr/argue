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

        this.currentPov = ChatFactory.currentPov;
        console.log('chat',this.currentPov);
        this.nick = null;
        this.hasNick = false;
        this.msgs = ChatFactory.query();
        this.newMsg = {txt: ''};

        this.sendMsg = function () {
            ChatFactory.send(this.newMsg);
            this.newMsg = {txt: '', by: this.nick};
        };
        this.setNick = function () {
            if (!this.nick) return;
            this.hasNick = true;
            this.newMsg.by = this.nick;
        }
    });
})();
