/* 
* @Author: Mehdi-H
* @Date:   2015-07-16 13:45:29
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 13:48:14
*/


angular.module('userService', [])

.factory('User', function($http){

	/*jslint node: true */
	'use strict';

	var userFactory = {};

	userFactory.create = function(userData){
		return $http.post('/api/signup', userData);
	};

	userFactory.all = function(){
		return $http.get('/api/users');
	};

	return userFactory;
});