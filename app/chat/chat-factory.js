(function () {
    'use strict';
    var module = angular.module('myApp.chat');
    module.factory('ChatFactory', function ($rootScope) {
        var currentPov = '';
        var currentArgue = {};
        var msgs = [];
        var argues = [

            {
                id: 1,
                name: 'Politics',
                pov: ['Left', 'Right']

            },
            {
                id: 2,
                name: 'Legalization of weed',
                pov: ['For', 'Against']

            },
            {
                id: 3,
                name: 'Who is the master of server',
                pov: ['Riki Balbua', 'Gaby Zraya']

            },
            {
                id: 4,
                name: 'Soda in the Moda?',
                pov: ['Yes', 'No']

            }
        ];


        var PUBNUB_chat = PUBNUB.init({
            publish_key: 'pub-c-0f682cbc-a4b7-4b20-9d6a-348cbf350aed',
            subscribe_key: 'sub-c-f2f3429e-a97f-11e5-802b-02ee2ddab7fe'
        });

        // Subscribe to the demo_tutorial channel
        PUBNUB_chat.subscribe({
            channel: 'coding-academy-chat',
            message: function (msg) {
                msgs.push(msg);
                $rootScope.$apply();
            }
        });

        return {

            setPov: function (pov) {
                currentPov = pov;
                console.log('factory', currentPov);

            },

            setArgue: function (argue) {
                currentArgue = argue;
                //channel = currentArgue.name;


            },

            getArgues: function () {
                return argues;

            },

            currPov: function () {
                return currentPov;
            },

            currArgue: function () {
                return currentArgue;
            },

            query: function () {
                return msgs;
            },
            send: function (msg) {
                console.log('Sending: ', msg);
                PUBNUB_chat.publish({
                    channel: 'coding-academy-chat',
                    message: msg
                });

            }


        }


    });


})();