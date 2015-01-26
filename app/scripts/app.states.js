(function(){
	'use strict';

	angular.module('starcRepoApp')
		.config(AppStates);


	AppStates.$inject = ['$stateProvider', '$urlRouterProvider'];
	function AppStates($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise("/");
		
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'scripts/home/home.html',
				controller: 'HomeCtrl as vm'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'scripts/authentication/login.html',
        controller: 'LoginCtrl as vm'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'scripts/authentication/register.html',
        controller: 'RegisterCtrl as vm'
			})
			.state('test', {
				url: '/test',
				templateUrl: 'scripts/authentication/test.html',
        controller: 'TestCtrl as vm'
			})

	}	
})();
