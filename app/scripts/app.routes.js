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
      .when('/test', {
        templateUrl: 'scripts/authentication/test.html',
        controller: 'TestCtrl',
        controllerAs: 'vm'
        /*resolve: {
          loadData: loadData
        }*/
      })

      .otherwise({
        redirectTo: '/'
      });
  });

loadData.$inject = ['$http'];

function loadData($http) {
  return $http.post('http://localhost:8000/api/test').then(function success(response){
    return response;
  }, function errorHandler(response){
    response.data = "error we are not logged in";
    return response;
    
  });
}