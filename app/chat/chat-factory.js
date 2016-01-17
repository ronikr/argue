(function () {
    'use strict';
    var module = angular.module('myApp.chat');
    module.factory('ChatFactory', function ($rootScope) {
        var currentPov = null;
        var currentArgue = null;
        var currentChannel = null;
        var argueStarted = true;
        var subscribeCallback = null;
        var lastSentArrivalMsgAt = null;
        //var msgs = [];
        var argues = [

            {
                id: 1,
                name: 'פוליטיקה',
                pov: [
                    {
                        name: 'ימין',
                        intro: 'מחכה לסמולני',
                        count: 0
                    },

                    {
                        name: 'שמאל',
                        intro: 'מחכה לימני פאשיסט',
                        count: 0
                    }
                ],
                msgs: [],
                argueBot: ["ביבי בשלטון כבר 200 שנה! לא הגיע הזמן להחליף?",
                    "מה השמאל הביא למדינה חוץ מפיגועים?",
                    "פושעי אוסלו לדין!",
                    "בסוף גם ככה יהיו פה שתי מדינות"
                ]

            },
            {
                id: 2,
                name: 'לגליזציית סמים קלים',
                pov: [
                    {
                        name: 'בעד',
                        intro: 'מחכה לסחי בלטה'
                    },

                    {
                        name: 'נגד',
                        intro: 'מחכה לנרקומן מזדמן'
                    }
                ],
                msgs: [],
                argueBot: ["סחים הם אנשים משעממים לאללה!",
                    "זה מה שאתם רוצים? חיילים מסטולים?",
                    "מסמים קלים לקשים הדרך ממש קצרה",
                    "לקנאביס יש סגולות רפואיות!",
                    "הכל קונספירציה של חברת התרופות"
                ]

            },
            {
                id: 3,
                name: 'צמחונות וטבעונות',
                pov: [
                    {
                        name: 'קרניבור',
                        intro: 'מחכה להיפסטר חובב חסה'
                    },

                    {
                        name: 'טבעוני',
                        intro: 'מחכה לרוצח כבשים'
                    }
                ],
                msgs: [],
                argueBot: ["בשר זה רצח!",
                    "ירקות זה האוכל של האוכל",
                    "מי אתם שתחליטו מי יחיה ומי ימות?",
                    "הגוף האנושי צריך בי-12"
                ]

            },
            {
                id: 4,
                name: 'Android VS. Apple',
                pov: [
                    {
                        name: 'Android',
                        intro: 'מחכה לחובב אייפון חי בסרט'
                    },

                    {
                        name: 'Apple',
                        intro: 'מחכה למשתמש אנדרואיד מעפן'
                    }
                ],
                msgs: []

            }
        ];

        //var argueBot = [
        //    "lol that's bullshit",
        //    "that is such an uninformed thing to say",
        //    "lame",
        //    "guess what",
        //    "stupid",
        //    "what are you, a mormon?",
        //    "any person with a minimum IQ knows that",
        //    "you sound like my grandma",
        //    "boring"
        //
        //];
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
                    lastSentArrivalMsgAt = Date.now();
                }

                PUBNUB_chat.subscribe({
                    channel: currentChannel,
                    message: function (msg) {
                        if (!msg) return;

                        if (msg.txt === 'DebateJoined' && msg.by !== currentPov && Date.now() > lastSentArrivalMsgAt + 5000) {
                            sendArrivalMsg();
                            //argueStarted = true;
                        } else if (msg.txt !== 'DebateJoined') {
                            currentArgue.msgs.push(msg);

                        }
                        subscribeCallback(msg);
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
                return currentArgue.argueBot[randomInteger(0, currentArgue.argueBot.length)];
            },
            subscribe: function (cb) {
                subscribeCallback = cb;
            }
        }

    });

})();