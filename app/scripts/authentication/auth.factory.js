(function(){
	'use strict';

	angular.module('app.authentication')
		.factory('AuthFactory', AuthFactory);

	AuthFactory.$inject = ['$http'];	
	
	function AuthFactory($http) {
		return {
			register: register
		};

		function register(data) {
			return $http.post('http://localhost:8000/api/register', {
				username: data.username,
				password: data.password,
				email: data.email
			});
		}

	}


})()