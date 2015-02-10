(function(){
	'use strict';

	angular.module('app.authentication')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['AuthFactory', '$location', '$state'];

	function LoginCtrl(AuthFactory, $location, $state) {
		var vm = this;
		vm.login = login;
		vm.submited = false;
		vm.notificationActive = false;
		vm.notificationMessage = "";
		vm.user = {};
		function login(valid, data) {
			vm.submited = true;

			if(valid) {
				AuthFactory.login(data).then(function success(response){
					vm.notificationActive = true;
					vm.user = response.data.user;
					// how do i know success, by its response, i will return 202 or whatever status ther is. 
					//vm.notificationMessage = 'Hi, ' + response.data.user.username + ' You are now logged in.';
					$state.go('explore');
					//$location.path('/test');

				}, errorHandler);
			}else{
				vm.notificationActive = true;
				vm.notificationMessage = 'You did not complete the form. Please try again';
					
			}
		}

		function errorHandler(data) {
			vm.notificationActive = true;
			vm.notificationMessage = data.data;
		}

	}

})();