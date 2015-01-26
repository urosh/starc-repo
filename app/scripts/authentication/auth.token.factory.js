(function(){
	'use strict';

	angular.module('starcRepoApp')
		.factory('AuthTokenFactory', AuthTokenFactory);

	AuthTokenFactory.$inject = ['$window', 'jwtHelper'];

	function AuthTokenFactory($window, jwtHelper) {
		var store = $window.localStorage;
		var key = 'auth-token';

		return{
			getToken: getToken,
			setToken: setToken
		};

		function getToken() {
			var token = store.getItem(key);
			if(token){
				var isExpired = jwtHelper.isTokenExpired(store.getItem(key));
				if(isExpired){
					store.removeItem(key);
				}	
			}
			return store.getItem(key);
		};
		

		function setToken(token) {
			if(token) {
				store.setItem(key, token)
			}else{
				store.removeItem(key);
			}
		}


	}	
})();