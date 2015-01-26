'use strict';

/**
 * @ngdoc overview
 * @name starcRepoApp
 * @description
 * # starcRepoApp
 *
 * Main module of the application.
 */
angular
  .module('starcRepoApp', [
    
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'app.authentication',
    'angular-jwt'
    
  ], config);
  config.$inject = ['$httpProvider']
  function config($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }
angular.module('starcRepoApp')
  .constant('API_URL', 'http://localhost:8000/api');
  /*.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
*/