'use strict';


describe('myApp.version module', function() {
  beforeEach(module('myApp.version'));

  describe('app-version directive', function() {
    it('should print current version', function() {
      module(function($provide) {
        $provide.constant('AppVersion', 'Sali Hagever');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('Sali Hagever');
      });
    });
  });
});
