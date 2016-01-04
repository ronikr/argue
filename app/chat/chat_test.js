'use strict';

describe('myApp.chat module', function() {

  var stubChatFactory = {
      query: function() {
        return [{txt: 'Hi There!', by: 'Puki'}, {txt: 'Good and You?', by: 'Muki'}];
      },
      send: function (msg) {

      }
  };
  
  
  beforeEach(module('myApp.chat'));

  describe('chat controller', function(){

    beforeEach(module(function($provide) {
      $provide.constant('ChatFactory', stubChatFactory);
    }));


    it('should ....', inject(function($controller) {
      var chatCtrl = $controller('ChatCtrl');
      expect(chatCtrl).toBeDefined();
    }));
    it('should put msgs on vm', inject(function($controller) {
      var chatCtrl = $controller('ChatCtrl');
      expect(chatCtrl.msgs).toBeDefined();
      expect(chatCtrl.msgs.length).toBe(2);
    }));
    it('should handle hasNick', inject(function($controller) {
      var chatCtrl = $controller('ChatCtrl');
      expect(chatCtrl.hasNick).toBeFalsy();
      chatCtrl.setNick('Moshe');
      expect(chatCtrl.hasNick).toBeFalsy();

    }));

 });
});