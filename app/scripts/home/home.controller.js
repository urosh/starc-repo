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

	angular.module('starcRepoApp')
	  .controller('TopBarCtrl', TopBarCtrl);


	function HomeCtrl() {
	  var vm = this;
	  vm.buttonActive = false;
	  vm.buttonClicked = buttonClicked;

	  function buttonClicked() {
	  	vm.buttonActive = !vm.buttonActive;
	  }

	  
	  
	};

	HomeCtrl.$inject = ['$scope'];

	
	
	TopBarCtrl.$inject = ['AuthFactory'];

	function TopBarCtrl(AuthFactory) {
		// i need to check if we are logged in. if not show login/register if
		// yes show user name.
		var vm = this;
		vm.signMessage = "";
		vm.logged = false;
		vm.showUserMenu = showUserMenu;
		vm.logout = logout;
		vm.show = false;
		
		AuthFactory.getUser().then(function success(response){
			console.log('we are still logged in');
			vm.logged = true;
		}, function error(response){
			
			vm.signMessage = "You need to login";
		});
		
		function showUserMenu() {
			console.log('am i here?');
			vm.show = !vm.show && vm.logged;
		}

		function logout() {
			AuthFactory.logout();
			vm.logged = false;
			vm.show = false;
		}
		
	}


})();


