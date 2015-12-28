'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  describe('view1 controller', function(){

    it('should be defined', inject(function($controller) {
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

    it('should introduce a pet in the vm', inject(function($controller) {
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl.pet).toBeDefined();
    }));


  });
});