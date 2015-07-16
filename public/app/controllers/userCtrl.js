/* 
* @Author: Mehdi-H
* @Date:   2015-07-16 13:48:43
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 14:15:57
*/



angular.module('userCtrl', ['userService'])

.controller('UserController', function(User){

	/*jslint node: true */
	'use strict';

	var vm = this;

	User.all()
		.success(function(data){
			vm.users = data;
		});
})

.controller('UserCreateController', function(User, $location, $window){

	var vm = this;

	vm.signupUser = function(){
		vm.message = '';

		User.create(vm.userData)
			.then(function(response){
				vm.userData = {};
				vm.message = response.data.message;

				$window.localStorage.setItem('token', response.data.token);
				$location.path('');
			});	
	};

});