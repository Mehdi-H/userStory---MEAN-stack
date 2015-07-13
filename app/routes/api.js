/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 21:01:07
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-13 15:35:51
*/

/*jslint node: true */
'use strict';

/*==========  Pkg nodeJS  ==========*/

var User         = require('../models/user'),
	config       = require('../../config'),
	secretKey    = config.secretKey,
	jsonWebToken = require('jsonwebtoken');


function createToken(user){
	var token = jsonWebToken.sign({
		_id: user._id,
		name: user.name,
		username: user.username
	}, secretKey, {
		expiresInMinute: 1440
	});

	return token;
}


module.exports = function(app, express){

	/*==========  router d'express  ==========*/
	var api = express.Router();

	/*==========  POST  ==========*/	
	// récupération des données d'inscription
	// et sauvegarde du nouvel utilisateur
	api.post('/signup', function(req,res){
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		// Sauvegarde des données
		user.save(function(err){
			if(err){
				res.send('Erreur :' + err);
				return;
			}else{
				res.json({message: 'Un nouvel utilisateur a été créé!'});
			}
		});
	});	

 	/*==========  GET  ==========*/ 
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


	api.post('/login', function(req,res){
		User.findOne({
			username: req.body.username
		}).select('password').exec(function(err,user){
			if(err){
				throw err;
			}else if(!user){
				res.send('Cet utilisateur n\'existe pas.');
			}else{
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.send({message: 'Mot de passe invalide'});
				}else{
					// création d'un token
					var token = createToken(user);
					res.json({
						success: true,
						message: 'La connexion a réussi!',
						token: token
					}); // test: axyom,root
				}
			}
		});
	});

	return api;
};