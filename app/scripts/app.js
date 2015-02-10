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
    'angular-jwt',
    'app.explore'
    
  ], config);
  
 
  

angular.module('starcRepoApp')
  .constant('API_URL', 'http://localhost:8000/api');



var config = ['$httpProvider', 'AuthInterceptor', function($httpProvider,AuthInterceptor ){
  $httpProvider.interceptors.push('AuthInterceptor');
}];

config2.$inject = ['$httpProvider', 'AuthInterceptor'];

function config2($httpProvider, AuthInterceptor) {
  $httpProvider.interceptors.push('AuthInterceptor');
}
