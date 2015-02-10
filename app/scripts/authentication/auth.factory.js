(function(){
	'use strict';

	angular.module('app.authentication')
		.factory('AuthFactory', AuthFactory);

	AuthFactory.$inject = ['$http', 'AuthTokenFactory', '$q', 'API_URL'];	
	
	function AuthFactory($http, AuthTokenFactory, $q, API_URL) {
		return {
			register: register, 
			login: login,
			logout: logout,
			getUser: getUser
		};
	//	var API_URL = 'http://localhost:8000/api';
		function register(data) {
			return $http.post(API_URL + '/register', {
				username: data.username,
				password: data.password,
				email: data.email
			});
		}

		function login(data) {
			return $http.post(API_URL + '/login', {
				username: data.username,
				password: data.password
			}).then(function success(response){
				AuthTokenFactory.setToken(response.data.token);
				return response;
			});
		}

		function logout() {
			AuthTokenFactory.setToken();
		}

		function getUser() {
			if (AuthTokenFactory.getToken()) {
				return $http.get(API_URL + '/me');

			}else{
				return $q.reject({data: 'user is not authenticated'});
			}
		}

	}


})();