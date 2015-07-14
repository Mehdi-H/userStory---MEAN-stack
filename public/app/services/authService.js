/* 
* @Author: Mehdi-H
* @Date:   2015-07-14 16:10:35
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-14 16:59:58
*/

/*jslint node: true */
'use strict';

angular.module('authService', [])

.factory('Auth', function($http, $q, AuthToken){

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
});

