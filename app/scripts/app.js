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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'app.authentication',
    'ngMessages'
  ]);
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