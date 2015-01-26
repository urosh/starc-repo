(function(){
	'use strict';

	angular.module('app.authentication')
		.controller('RegisterCtrl', RegisterCtrl);

	RegisterCtrl.$inject = ['AuthFactory'];

	function RegisterCtrl(AuthFactory) {
		var vm = this;
		vm.register = register;
		vm.notificationClasses = ['', 'active red', 'active green'];
		vm.notificationIndex = 0;
		vm.notificationMessage = "";
		function register(formValid, data) {

			if(formValid){
					AuthFactory.register(data).then(function success(response){
					vm.notificationIndex = 2;
					vm.notificationMessage = response.data.message;
					
				}, handleError);	
			}else{
				vm.notificationMessage = "You did not fill in the form. Please try again.";
				vm.notificationIndex = 1;		
			}
				
		}
		
		function handleError(response){
			vm.notificationMessage = response.data;
			vm.notificationIndex = 1;
		}
	}

})()