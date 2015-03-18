(function(){
  'use strict';

  angular.module('app.commons')
    .directive('starcPreloader', PreloaderDirective);

  function PreloaderDirective(){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        active: '='
      },
      template: '<div ng-show="active" id="wave-preloader"><span></span><span></span><span></span><span></span><span></span></div>'

    };
  }
}) ();


