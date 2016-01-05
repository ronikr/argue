(function () {
    'use strict';
    var module = angular.module('myApp.chat');
    module.factory('ChatFactory', function ($rootScope) {
        var currentPov = null;
        var currentArgue = null;
        var currentChannel = null;
        var argueStarted = true;
        var subscribeCallback = null;
        //var msgs = [];
        var argues = [

            {
                id: 1,
                name: 'Politics',
                pov: ['Left', 'Right'],
                msgs: []

            },
            {
                id: 2,
                name: 'Legalization of weed',
                pov: ['For', 'Against'],
                msgs: []

            },
            {
                id: 3,
                name: 'Veganism VS. Carnism',
                pov: ['Veganism', 'Carnism'],
                msgs: []

            },
            {
                id: 4,
                name: 'Android VS. Apple',
                pov: ['Android', 'Apple'],
                msgs: []

            }
        ];

        var argueBot = [
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
                //sessionStorage.argue = JSON.stringify(argue);
            },
            setDebate: function (argue, pov) {
                currentArgue = argue;
                currentPov = pov;

                currentChannel = 'argue-' + argue.id;
                console.log('channel = ', currentChannel);
                function sendArrivalMsg() {
                    PUBNUB_chat.publish({
                        channel: currentChannel,
                        message: {txt: 'DebateJoined', by: currentPov}
                    });
                }

                PUBNUB_chat.subscribe({
                    channel: currentChannel,
                    message: function (msg) {


                        if (msg.txt === 'DebateJoined' && msg.by !== currentPov) {
                            sendArrivalMsg();
                            //argueStarted = true;
                        } else if (msg.txt !== 'DebateJoined') {
                           currentArgue.msgs.push(msg);

                        }
                        subscribeCallback();
                    }
                });
                sendArrivalMsg();

            },

            getArgues: function () {
                return argues;
            },
            getArgueById: function (argueId) {
                var argueMatch = argues.filter(function (argue) {
                    return argue.id == argueId;
                });
                return argueMatch[0];
            },
            isStarted: function () {
                return argueStarted;
            },

            currPov: function () {
                return currentPov;
            },

            currArgue: function () {
                //if (!currentArgue) {
                //    currentArgue = JSON.parse(sessionStorage.argue);
                //}
                return currentArgue;
            },

            query: function () {
                return currentArgue.msgs;
            },
            send: function (msg) {
                //console.log('Sending: ', msg);
                PUBNUB_chat.publish({
                    channel: currentChannel,
                    message: msg
                });
            },
            getRandomMsg: function () {
                return argueBot[randomInteger(0, argueBot.length)];
            },
            subscribe: function (cb) {
                subscribeCallback = cb;
            }
        }

    });

})();