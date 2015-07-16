/* 
* @Author: Mehdi-H
* @Date:   2015-07-16 21:40:11
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 21:42:11
*/

/*jslint node: true */
'use strict';

angular.module('reverseDirective', [])

.filter('reverse', function(){
	return function(items){
		return items.slice().reverse();
	};
});