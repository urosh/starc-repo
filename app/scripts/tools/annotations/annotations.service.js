/**
 * Created by urosdamnjanovic on 10/7/14.
 */

(function(){
  'use strict';

  angular.module('app.tools.annotations')
    .factory('annotationsService', AnnotationsService);

  AnnotationsService.$inject = ['$http'];
  function AnnotationsService($http) {

    var service = {
      saveAnnotation: saveAnnotation,
      prepareAnnotationList : prepareAnnotationList
    };

    return service;

    function prepareAnnotationList(_list) {
      var list = _list;

      _.each(list, function(item){
        item.width = parseInt(item.coordinates.width);
        item.height = parseInt(item.coordinates.height);
        item.top = parseInt(item.coordinates.top);
        item.left = parseInt(item.coordinates.left);
        item.center = {
          top: item.top + item.height / 2 - 4,
          left: item.left + item.width / 2 -4
        };
      });

      return list;
    }
    function saveAnnotation(annotation){
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      return $http.post('http://public.cyi.ac.cy/starcRepo/map/saveannotation', JSON.stringify(annotation));
    }

  }
  

})();

