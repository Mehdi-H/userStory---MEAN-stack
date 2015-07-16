/* 
* @Author: Mehdi-H
* @Date:   2015-07-14 15:54:50
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 14:40:34
*/

/*jslint node: true */
'use strict';

angular.module('MyApp', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
});