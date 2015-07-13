/* 
* @Author: Mehdi-H
* @Date:   2015-07-13 17:48:01
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-13 17:50:36
*/

/*jslint node: true */
'use strict';

/*==========  Pkg node.js  ==========*/
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorySchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	content: String,
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Story', StorySchema);