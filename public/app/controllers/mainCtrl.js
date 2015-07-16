/* 
* @Author: Mehdi-H
* @Date:   2015-07-14 17:22:32
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 13:31:07
*/

angular.module('mainCtrl', [])

.controller('MainController', function($rootScope, $location, Auth){

	/*jslint node: true */
	'use strict';

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	// Si la route change...
	$rootScope.$on('$routeChangeStart', function(){
		vm.loggedIn = Auth.isLoggedIn();

		Auth.getUser()
			.then(function(data){
				vm.user = data.data;
			});
	});

	// choses à faire quand on se log
	vm.doLogin = function(){
		vm.processing = true;
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data){
				vm.processing = false;

				Auth.getUser()
					.then(function(data){
						vm.user = data.data;
					});

				if(data.success){
					$location.path('/');
				}else{
					vm.error = data.message;
				}
			});
	};

	vm.doLogout = function(){
		Auth.logout();
		$location.path('/logout');
	};

	return vm;
});