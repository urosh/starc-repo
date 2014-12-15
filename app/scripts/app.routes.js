angular.module('starcRepoApp')
	.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'scripts/authentication/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'scripts/authentication/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
