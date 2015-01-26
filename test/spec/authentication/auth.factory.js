'use strict';

describe('Auth.Factory', function() {

	beforeEach(module('starcRepoApp'));

	var authFactory;

	beforeEach(inject(function($injector){
		authFactory = $injector.get('AuthFactory');

	}));

	
	console.log('ok now i can test Auth Factory');
	it('should do something', function(){
		expect(3).toBe(3);
	})
})