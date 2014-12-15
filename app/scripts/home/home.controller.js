(function(){
	'use strict';
	/**
	 * @ngdoc function
	 * @name starcRepoApp.controller:MainCtrl
	 * @description
	 * # MainCtrl
	 * Controller of the starcRepoApp
	 */
	
	angular.module('starcRepoApp')
	  .controller('HomeCtrl', HomeCtrl);

	function HomeCtrl() {
	  var vm = this;
	  vm.buttonActive = false;
	  vm.buttonClicked = buttonClicked;

	  function buttonClicked() {
	  	//console.log('ok we are clicking');
	  	console.log(vm.buttonActive);
	  	vm.buttonActive = !vm.buttonActive;
	  }
	  
	};

	HomeCtrl.$inject = ['$scope'];

})()


