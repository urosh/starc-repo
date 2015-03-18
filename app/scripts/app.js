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
    'ngAnimate',
    'angular-jwt',
    'app.d3',
    'app.explore',
    'app.commons',
    'app.tools.search',
    'app.tools.map',
    'app.tools.annotations',
    'app.tools.collections',
    'app.tools.statistics',
    'app.tools.visualizations',
    'app.tools.stories'
    
  ], config);
  
 
  

angular.module('starcRepoApp')
  .constant('API_URL', 'http://starc-srv.cyi.ac.cy/api');




var config = ['$httpProvider', 'AuthInterceptor', function($httpProvider,AuthInterceptor ){
  $httpProvider.interceptors.push('AuthInterceptor');
}];

config2.$inject = ['$httpProvider', 'AuthInterceptor'];

function config2($httpProvider, AuthInterceptor) {
  $httpProvider.interceptors.push('AuthInterceptor');
}
