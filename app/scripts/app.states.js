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
				views: {
					'topbar@': {
						controller: 'TopBarCtrl as vm',
						templateUrl: 'scripts/home/topbar.tmpl.html',
					},
					'sidemenu@': {
						controller: 'HomeCtrl as vm',
						templateUrl: 'scripts/home/sidemenu.tmpl.html',
					},
					'content@': {
						templateUrl: 'scripts/home/home.tmpl.html',
					}
				}
				
				
			})
			.state('login', {
				url: '/login',
				views: {
					'topbar@': {
						templateUrl: 'scripts/home/topbar.tmpl.html',
					},
			
					'content@': {
						controller: 'LoginCtrl as vm',
						templateUrl: 'scripts/authentication/login.tmpl.html',
					}
				}
				
        
			})
			.state('register', {
				url: '/register',
				views: {
					'topbar@': {
						templateUrl: 'scripts/home/topbar.tmpl.html',
					},
			
					'content@': {
						controller: 'RegisterCtrl as vm',
						templateUrl: 'scripts/authentication/register.tmpl.html',
					}
				}
			});
			

	}	
})();
