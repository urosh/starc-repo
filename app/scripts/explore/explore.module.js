(function(){
	'use strict';

	angular.module('app.explore', []);

	angular.module('app.explore')
		.config(ExploreState)
		.controller('MenuController', MenuController);

	ExploreState.$inject = ['$stateProvider'];
	function ExploreState($stateProvider) {

		$stateProvider
			.state('explore', {
				url: '/explore',
				views: {
					'topbar@': {
						controller: 'TopBarCtrl as vm',
						templateUrl: 'scripts/home/topbar.tmpl.html',
					},
					/*'sidemenu@': {
						controller: 'HomeCtrl as vm',
						templateUrl: 'scripts/home/sidemenu.tmpl.html',
					},*/
					'content@': {
						templateUrl: 'scripts/explore/explore.tmpl.html',
					}
				}
			})


		
	}
	MenuController.$inject = ['$scope'];

	function MenuController($scope) {
		var vm = this;
	  vm.buttonActive = false;
	  vm.buttonClicked = buttonClicked;

	  function buttonClicked() {
	  	vm.buttonActive = !vm.buttonActive;
	  }
	}


})();