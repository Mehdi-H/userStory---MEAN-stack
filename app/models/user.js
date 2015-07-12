/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 20:42:05
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-12 20:54:04
*/

/*jslint node: true */
'use strict';

/*==========  Pkg node.js  ==========*/

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');  // pour hasher le pwd;

/*==========  Descriptif du schéma de données  ==========*/

var Schema = mongoose.Schema;

//UserSchema description
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

// password hashing
UserSchema.pre('save', function(next){
	var user = this;

	if(!user.isModified('password')){
		return next();
	}

	bcrypt.hash(user.password, null, null, function(err,hash){
		if(err){
			return next(err);
		}else{
			user.password = hash;
			next();
		}
	});
});

module.exports = mongoose.model('User', UserSchema);