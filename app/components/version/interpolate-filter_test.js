'use strict';

describe('myApp.version module', function() {
  beforeEach(module('myApp.version'));

  describe('interpolate filter', function() {
    beforeEach(module(function($provide) {
      $provide.constant('AppVersion', 'Lior Hagever!');
    }));

    it('should replace VERSION', inject(function(interpolateFilter, uppercaseFilter) {
      expect(interpolateFilter('before %VERSION% after')).toEqual('before Lior Hagever! after');
      expect(interpolateFilter('x %VERSION% y %VERSION% z')).toEqual('x Lior Hagever! y Lior Hagever! z');

      expect(uppercaseFilter('ab7c')).toBe('AB7C');


    }));
  });
});
