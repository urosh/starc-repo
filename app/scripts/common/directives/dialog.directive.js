
(function(){
  'use strict';

  angular.module('app.commons')
    .directive('starcDialog', DialogDirective);

  DialogDirective.$inject = ['$timeout'];

  function DialogDirective($timeout){
    return {
      restrict: 'E',
      templateUrl: 'scripts/common/templates/dialog.tpl.html',
      scope: {
        text: '=',
        response: '&',
        type: '=',
        classes: '='
      },
      replace: true

    };
  }

  
})();
