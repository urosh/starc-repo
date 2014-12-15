(function(){
	'use strict';

	angular.module('app.authentication')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl() {
		var vm = this;
		vm.submit = submit;
		vm.submited = false;
		vm.notificationActive = false;
		function submit(valid, data) {
			vm.submited = true;
			vm.notificationActive = true;
			console.log('we submited the form');
			console.log(data);
			console.log(valid);
		}

	}

})()