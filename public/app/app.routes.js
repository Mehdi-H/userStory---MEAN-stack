/* 
* @Author: Mehdi-H
* @Date:   2015-07-16 13:05:37
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 13:33:27
*/

angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){

	/*jslint node: true */
	'use strict';

	// Routing map
	$routeProvider
		.when('/', {
			templateUrl: 'app/views/pages/home.html'
		})
		.when('/login', {
			templateUrl: 'app/views/pages/login.html'
		});

	
	$locationProvider.html5Mode(true);


});