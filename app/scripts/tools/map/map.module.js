/**
 * Created by urosdamnjanovic on 11/3/14.
 */
(function(){
	angular.module('app.tools.map', ['uiGmapgoogle-maps']);

	angular.module('app.tools.map')
		.config(function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        key: 'AIzaSyDXuSxAlefxRVSKVAaRX27QmBfrHNkhUug',
	        v: '3.17',
	        libraries: 'weather,geometry,visualization'
	    });
		});

	angular.module('app.tools.map')
		.directive('starcMap', function() {
			return {
				restrict: 'E',
      	scope: {},
      	templateUrl: 'scripts/tools/map/map.tpl.html',
      	controller: 'mapController',
      	controllerAs: 'mapCtrl'
			}
		})	
})();

