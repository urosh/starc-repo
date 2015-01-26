'use strict';

describe('Routes', function() {

	beforeEach(module('starcRepoApp'));

	var location, route, rootScope;

	beforeEach(inject( function($location, $route, $rootScope){
		location = $location;
		route = $route; 
		rootScope = $rootScope;
	}));

	describe('index route', function() {
		beforeEach(inject(function($httpBackend){
			$httpBackend.expectGET('scripts/home/home.html')
				.respond(200, 'main HTML');
		}));

		it('should load the index page on succesful load of /', function() {
			location.path('/');
			rootScope.$digest();
			expect(route.current.controller).toBe('HomeCtrl');
		});

		it('should redirect to the index path on non-existent', function() {
			location.path('definetly/not/a/route');
			rootScope.$digest();
			expect(route.current.controller).toBe('HomeCtrl');
		})

	})
});




