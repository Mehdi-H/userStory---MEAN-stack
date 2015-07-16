/* 
* @Author: Mehdi-H
* @Date:   2015-07-14 16:10:35
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-14 17:53:09
*/



angular.module('authService', [])
/*==========  Factory de gestion de l'authentification  ==========*/
.factory('Auth', function($http, $q, AuthToken){

	/*jslint node: true */
	'use strict';

	// Variable de stockage des méthodes
	var authFactory = {};

	/*==========  Méthode de Login  ==========*/	
	authFactory.login = function(username,password){
		return $http.post('/api/login', {
			username: username,
			password: password
		})
		// success promise
		.success(function(data){
			AuthToken.setToken(data.token);
			return data;
		});
	};

	/*==========  Méthode de Logout  ==========*/
	authFactory.logout = function(){
		AuthToken.setToken();  // clear le token
	};

	/*==========  Vérifier si logged  ==========*/	
	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken()){
			return true;
		}else{
			return false;
		}
	};

	/*==========  Infos sur un utilisateur  ==========*/
	authFactory.getUser = function(){
		if(AuthToken.getToken()){
			return $http.get('/api/me');
		}else{
			return $q.reject({ message: 'Pas de token pour cet utilisateur' });
		}
	};

	return authFactory;
})
/*==========  Factory pour traiter le token dans le navigateur  ==========*/
.factory('AuthToken',function($window){

	/*jslint node: true */
	'use strict';

	var authTokenFactory = {};

	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};

	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token',token);
		}else{
			$window.localStorage.removeItem('token');
		}
	};

	return authTokenFactory;
})
/*==========  AuthInterceptor factory  ==========*/
.factory('AuthInterceptor', function($q, $location, AuthToken){

	/*jslint node: true */
	'use strict';

	var interceptorFactory = {};

	interceptorFactory.request = function(config){
		var token = AuthToken.getToken();

		if(token){
			config.headers['x-access-token'] = token;
		}

		return config;
	};

	interceptorFactory.responseError = function(response){
		if(response.status == 403){  // forbidden
			$location.path('/login');
		}

		return $q.reject(response);
	};

	return interceptorFactory;
});



