/* 
* @Author: Mehdi-H
* @Date:   2015-07-16 17:42:01
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 21:30:14
*/

angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketIo){
	
	/*jslint node: true */
	'use strict';

	var vm = this;

	Story.all()
		.success(function(data){
			vm.stories = data;
		});

	vm.createStory = function(){
		console.log(vm.StoryData);
		vm.message = '';
		Story.create(vm.StoryData)
			.success(function(data){
				console.log(data);
				vm.storyData = '';	// on vide le formulaire d'ajout
				vm.message = data.message;
			});
	};

	// Emission des stories en temps réel dans la vue
	socketIo.on('story', function(data){
		console.log(data);
		vm.stories.push(data);
	});
})

.controller('AllStoriesController', function(stories, socketIo){

	var vm = this;

	vm.stories = stories.data;

	socketIo.on('story', function(data){
		console.log(data);
		vm.stories.push(data);
	});
});