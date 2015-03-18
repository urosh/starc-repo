(function(){
	'use strict';

	angular.module('app.tools.visualizations')
		.directive('starcVis', function(){
			return {
				restrict: 'E',
				scope: {},
				//template: '<h1>ajme mene</h1>'
				templateUrl: 'scripts/tools/visualizations/template.tpl.html'
			}
		})	
})();