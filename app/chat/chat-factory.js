(function () {
    'use strict';
    var module = angular.module('myApp.chat');
    module.factory('ChatFactory', function ($rootScope) {
        var currentPov = null;
        var currentArgue = null;
        var currentChannel = null;
        var argueStarted = false;
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

        var argueRobot = [
            "lol that's bullshit",
            "that is such an uninformed thing to say",
            "lame",
            "guess what",
            "stupid",
            "what are you, a mormon?",
            "any person with a minimum IQ knows that",
            "you sound like my grandma",
            "boring"

        ];
        var PUBNUB_chat = PUBNUB.init({
            publish_key: 'pub-c-0f682cbc-a4b7-4b20-9d6a-348cbf350aed',
            subscribe_key: 'sub-c-f2f3429e-a97f-11e5-802b-02ee2ddab7fe'
        });

        // Subscribe to the demo_tutorial channel


        return {

            setArgue: function (argue) {
                currentArgue = argue;
            },
            setDebate: function (argue, pov) {
                currentArgue = argue;
                currentPov = pov;


                currentChannel = 'argue-' + argue.id;

                function sendArrivalMsg() {
                    PUBNUB_chat.publish({
                        channel: currentChannel,
                        message: {txt: 'DebateJoined'}
                    });
                }

                sendArrivalMsg();
                PUBNUB_chat.subscribe({
                    channel: currentChannel,
                    message: function (msg) {
                        if (!argueStarted) {
                            sendArrivalMsg();
                            argueStarted = true;
                        } else if (msg.txt !== 'DebateJoined') {
                            msgs.push(msg);
                        }

                        $rootScope.$apply();
                    }
                });

            },

            getArgues: function () {
                return argues;
            },
            isStarted: function () {
                return argueStarted;
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
                //console.log('Sending: ', msg);
                PUBNUB_chat.publish({
                    channel: currentChannel,
                    message: msg
                });
            },
            getRandomMsg: function () {
                return argueRobot[randomInteger(0, argueRobot.length)] ;
            }


        }


    });


})();