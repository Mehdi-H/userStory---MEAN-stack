/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 20:42:05
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-12 20:46:04
*/

/*jslint node: true */
'use strict';

/*==========  Pkg node.js  ==========*/

var mongoose = require('mongoose');

/*==========  Descriptif du schéma de données  ==========*/

var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,  // non nullité
		index: { unique: false}  // unicité
	},
	password: {
		type: String,
		required: true,
		select: false  // pour ne pas afficher le pwd quand on query un user
	}
});

module.exports = mongoose.model('User', UsrSchema);