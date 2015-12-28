'use strict';

describe('myApp.version module', function() {
  beforeEach(module('myApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(AppVersion) {
      expect(AppVersion).toEqual('0.4');
    }));
  });
});
