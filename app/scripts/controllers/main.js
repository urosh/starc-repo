'use strict';

/**
 * @ngdoc function
 * @name starcRepoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the starcRepoApp
 */
angular.module('starcRepoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
