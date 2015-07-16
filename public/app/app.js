/* 
* @Author: Mehdi-H
* @Date:   2015-07-14 15:54:50
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 21:44:54
*/

angular.module('MyApp', [
	'appRoutes', 
	'mainCtrl', 
	'authService', 
	'userCtrl', 
	'userService',
	'storyService',
	'storyCtrl',
	'reverseDirective'
])

.config(function($httpProvider){

	/*jslint node: true */
	'use strict';

	$httpProvider.interceptors.push('AuthInterceptor');
});