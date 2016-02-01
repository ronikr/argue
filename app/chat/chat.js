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

        //*******************test data***************************8

        //this.currentArgue = {
        //    id: 3,
        //    name: 'צמחונות וטבעונות',
        //    pov: [
        //        {
        //            name: 'קרניבור',
        //            intro: 'מחכה להיפסטר חובב חסה'
        //        },
        //
        //        {
        //            name: 'טבעוני',
        //            intro: 'מחכה לרוצח כבשים'
        //        }
        //    ],
        //    msgs: [],
        //    argueBot: ["בשר זה רצח!",
        //        "ירקות זה האוכל של האוכל",
        //        "מי אתם שתחליטו מי יחיה ומי ימות?",
        //        "הגוף האנושי צריך בי-12"
        //    ]
        //
        //};
        //this.currentPov = {name: "קרניבור", intro: "מחכה להיפסטר חובב חסה"};

        //*******************end of test data***************************8

        if (!this.currentArgue || !this.currentPov) {
            $location.path('home');
            return;
        }

        //TODO enable smooth scrolling on chrome://flags/

        ChatFactory.subscribe(function (msg) {
            console.log('subs called: ', msg)
            var hello = document.querySelector('.historyChat');
            hello.scrollTop = hello.scrollHeight;

            $scope.$apply();
        });

        $scope.$watch(function () {
            return ChatFactory.isStarted();
        }, function (newVal) {
            console.log('isStarted watch: ', newVal);
            that.argueStarted = newVal;
        });


        this.msgs = ChatFactory.query();
        this.newMsg = {txt: '', by: this.currentPov.name};


        this.sendMsg = function () {
            ChatFactory.send(this.newMsg);
            this.newMsg = {txt: '', by: this.currentPov.name};
        };
        var msgs = this.msgs;
        var botMsg = {};
        this.argueBot = $interval(function () {
            msgs = ChatFactory.query();

            if (msgs.length % 5 === 0 && msgs.length !== 0 && msgs[msgs.length - 1].by !== 'הבורר') {

                botMsg = {
                    txt: ChatFactory.getRandomMsg(),
                    by: 'הבורר'
                };
                console.log('msg length = ', msgs.length);
                console.log('msg by: ', msgs[msgs.length - 1].by);
                ChatFactory.send(botMsg);
            }
        }, 3000);

        window.onbeforeunload = closingCode;
        function closingCode(){
            confirm('Are you sure you want to leave?');
            alert('yo');
            return null;
        }


    });
})();
