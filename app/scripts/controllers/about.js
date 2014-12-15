'use strict';

/**
 * @ngdoc function
 * @name starcRepoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the starcRepoApp
 */
angular.module('starcRepoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
