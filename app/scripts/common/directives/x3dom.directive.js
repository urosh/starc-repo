(function(){
  'use strict';

  angular.module('app.commons')
    .directive('x3dStarc', x3dDirective);

  x3dDirective.$inject = ['$compile', '$http', 'requestNotificationChannel', '$timeout'];
  function x3dDirective($compile, $http, requestNotificationChannel, $timeout){
  	var directive = {
      restrict: 'E',
      replace: true,
      scope: {
    	},
    	link: function(scope, elem, attrs){
        requestNotificationChannel.onLoadX3DOM(scope, function(obj){
          if(obj.location === "url") {
            var template = '<iframe width="370" height="380" ng-src="' + obj.fileLocation + '"></iframe>';
            var compiled = $compile(template)(scope);
            elem.replaceWith(compiled);
            elem = compiled;
            requestNotificationChannel.x3domLoaded();
        
          }else{
            var url = "http://public.cyi.ac.cy/x3dom/3d/" + obj.docID + ".html";
            $http(url)
              .then(function(response){
                var template = response.data;
                var compiled = $compile(template)(scope);
                elem.replaceWith(compiled);
                elem = compiled;
                requestNotificationChannel.x3domLoaded();
                $timeout(function(){
                  x3dom.reload();

                }, 500);
                
              });
          
          }
          
         
        });

        requestNotificationChannel.onModalRemoved(scope, function(){
          var compiled = $compile('<div></div>')(scope);
          elem.replaceWith(compiled);
          elem = compiled;
            
        });
    	},
      template: ''
    
    };

    
    return directive;

  }




 })();

