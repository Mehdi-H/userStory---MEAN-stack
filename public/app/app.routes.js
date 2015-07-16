/* 
* @Author: Mehdi-H
* @Date:   2015-07-16 13:05:37
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 13:11:28
*/

angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){

	/*jslint node: true */
	'use strict';

	$routeProvider
		.when('/', {
			templateUrl: 'app/views/pages/home.html'
		});


});