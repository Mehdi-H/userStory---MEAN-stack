/* 
* @Author: Mehdi-H
* @Date:   2015-07-16 17:37:13
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 21:18:16
*/

angular.module('storyService', [])

.factory('Story', function($http){

	/*jslint node: true */
	'use strict';

	var storyFactory = {};

	storyFactory.allStories = function(){
		return $http.get('/api/all_stories');
	};

	// pour ajouter une story
	storyFactory.create = function(storyData){
		return $http.post('/api', storyData);
	};

	//pour voir les story deja ajoutées
	storyFactory.all = function(){
		return $http.get('/api');
	};

	return storyFactory;
})

.factory('socketIo', function($rootScope){

	var socket = io.connect();

	console.log('socket.io.connect()');

	return {

		on: function(eventName, callback){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket,args);
				});
			});
		},

		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
				$rootScope.apply(function(){
					if(callback){
						callback.apply(socket,args);
					}
				});
			});
		}
	};
});