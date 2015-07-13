/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 21:01:07
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-13 15:17:48
*/

/*jslint node: true */
'use strict';

/*==========  Pkg nodeJS  ==========*/

var User      = require('../models/user'),
	config    = require('../../config'),
	secretKey = config.secretKey;

module.exports = function(app, express){

	// router d'express
	var api = express.Router();

	// POST
	// récupération des données d'inscription
	// et sauvegarde du nouvel utilisateur
	api.post('/signup', function(req,res){
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		// sauvegarde des données
		user.save(function(err){
			if(err){
				res.send('Erreur :' + err);
				return;
			}else{
				res.json({message: 'Un nouvel utilisateur a été créé!'});
			}
		});
	});	

	// GET
	// affichage de tous les utilisateurs
	api.get('/users',function(req,res){
		User.find({}, function(err,users){
			if(err){
				res.send('Erreur: ' + err);
				return;
			}else{
				res.json(users);
			}
		});
	});

	return api;
};