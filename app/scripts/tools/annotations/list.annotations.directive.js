/**
 * Created by urosdamnjanovic on 10/7/14.
 */
(function(){
  'use strict';

  angular.module('app.tools.annotations')
    .directive('starcListAnnotations', ListAnnotationDirective);


  function ListAnnotationDirective() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope:{
        imageSource: '=imsource',
        imageH: '=imageh',
        list: '='
      },
      templateUrl: 'scripts/tools/annotations/templates/list.tpl.html',
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, element, attrs){
      scope.$watch('imageSource', function(){
        if(scope.imageSource){
          var dEl = angular.element(element.children()[0]);
          dEl.css({height: (scope.imageH + 5) + 'px'});
          scope.annotationSelected = false;
        }

      });

      scope.selectAnnotation = function(item){
        scope.annotationSelected = true;
        var mEl = angular.element(angular.element(element.children()[0]).children()[2]);
        mEl.css({
          width: item.coordinates.width + 'px',
          height: item.coordinates.height + 'px',
          top: item.coordinates.top + 'px',
          left: item.coordinates.left + 'px'
        });

        scope.title = item.title;
        scope.description = item.description;

      };

    }
  }
})();
