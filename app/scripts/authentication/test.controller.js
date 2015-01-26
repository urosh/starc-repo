(function(){
	'use strict';

	angular.module('starcRepoApp')
		.controller('TestCtrl', TestCtrl);


	function TestCtrl($http,  AuthFactory, $location) {
		var vm = this;
		/*vm.user = {
			username: loadData.data
		}*/

		// init function 
		AuthFactory.getUser().then(function success(response){
			vm.message = response.data;	
		}, function error(response){
			$location.path('/login');
			vm.message = response.data;
		})


		/*loadData.then(function success(response){
			vm.username = {
				username: response.data
			};
		}, function(error){
			vm.username = {
				username: 'error'
			};
		})*/

		/*vm.loadData = function() {
			console.log('are we here?');
			return $http.post('http://localhost:8000/test').then(function success(response){
				vm.user.username = "uros";
				return response;
			});
		}*/
	}


})();