(function(){
	"use strict";

	angular.module('app.explore')
			.config(ExploreState);
	
	angular.module('app.explore')
		.controller('DashController', DashController);

	DashController.$inject = ['requestNotificationChannel', 'searchService'];

	function DashController(requestNotificationChannel, searchService) {
		var vm = this;
		this.map = true;
		vm.toolSelected = toolSelected;
		function toolSelected(tool) {
			if(!this[tool]) {
				this[tool] = true;
				// tool added

				requestNotificationChannel.toolAdded(tool);

			}else{
				this[tool] = false;
				if(tool === "map") {
					searchService.addLocationInfo([]);
				}
				// tool removed
				requestNotificationChannel.toolRemoved(tool);
				
			
			}
		}	
	}		

		ExploreState.$inject = ['$stateProvider', 'tools'];
		
		function ExploreState($stateProvider, tools) {

			$stateProvider
				.state('explore', {
					url: '/explore',
					views: {
						'topbar@': {
							controller: 'TopBarCtrl as vm',
							templateUrl: 'scripts/home/topbar.tmpl.html',
						},
						'content@': {
							templateUrl: 'scripts/explore/explore.tmpl.html',
						}
					}
				})
				.state('dash', {
					url: tools.urls,
					views: {
						'topbar@': {
							controller: 'TopBarCtrl as vm',
							templateUrl: 'scripts/home/topbar.tmpl.html',
						},
						'content@': {
							controller: 'DashController as dashCtrl',

							templateUrl: 'scripts/explore/dash.tmpl.html'
							/*templateProvider: ['$templateFactory', function($templateFactory){
								return $templateFactory.fromUrl('scripts/explore/dash.tmpl.html').then(function success(res){
									return (res + '</div>');
								});
								
							}]*/
						
						}
					}
				})

				
			
		}


})();


