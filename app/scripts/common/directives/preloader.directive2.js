(function(){
  'use strict';

  angular.module('app.commons')
    .directive('preloader', PreloaderDirective);

  function PreloaderDirective(){

    var directive = {
      restrict: 'E',
      templateUrl: "scripts/common/templates/preloader.tpl.html"
    
    };

    return directive;
  
  }




 })();

