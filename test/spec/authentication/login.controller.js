'use strict';

describe('Controller: LoginCtrl', function() {
	
	beforeEach(module('starcRepoApp'));

	var LoginCtrl, 
		scope;

	// Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

	

	it('should pass by default', function () {
    expect(3).toBe(3);
  });

	it('Now i want to access function', function () {
		LoginCtrl.login(true, {'username' : 'uros', 'password': 'srbija'});
		expect(LoginCtrl.submited).toBe(true);
  });

  it('Now i want to access function', function () {
		LoginCtrl.login(false, {'username' : 'uros', 'password': 'srbija'});
		expect(LoginCtrl.notificationActive).toBe(true);
  });


});