/* 
* @Author: Mehdi-H
* @Date:   2015-07-16 13:05:37
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 20:19:01
*/

angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){

	/*jslint node: true */
	'use strict';

	// Routing map
	$routeProvider
		.when('/', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'MainController',
			controllerAs: 'main'
		})
		.when('/login', {
			templateUrl: 'app/views/pages/login.html'
		})
		.when('/signup', {
			templateUrl: 'app/views/pages/signup.html'
		})
		.when('/allStories', {
			templateUrl: 'app/views/pages/allStories.html',
			controller: 'AllStoriesController',
			controllerAs: 'story',
			resolve: {
				stories: function(Story){
					return Story.allStories();
				}
			}
		});


	$locationProvider.html5Mode(true);


});