/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 21:01:07
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-13 18:07:53
*/

/*jslint node: true */
'use strict';

/*==========  Pkg nodeJS  ==========*/

var User         = require('../models/user'),
	config       = require('../../config'),
	secretKey    = config.secretKey,
	jsonWebToken = require('jsonwebtoken'),
	Story        = require('../models/story');


function createToken(user){
	var token = jsonWebToken.sign({
		id: user._id,
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

	/*==========  Connexion à l'API (POST)  ==========*/
	
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

	// Middleware post-connexion: traitement du token
	api.use(function(req,res,next){
		console.log('Une personne tente de se connecter.');

		// Récupération du token
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		//existance du token
		if(token){  // si le token existe...
			jsonWebToken.verify(token, secretKey, function(err,decoded){
				if(err){  // mauvais token
					res.status(403).send({  // 403 forbidden
						success: false,
						message: 'Echec de l\'authentification'
					});
				}else{  // token valide
					req.decoded = decoded;
					next();
				}
			});
		}else{  // si le token n'existe pas...
			res.status(403).send({
				success: false,
				message: 'Aucun token fourni'
			});
		}
	});

	// destination après le middleware analysant le token
	// api.get('/', function(req,res){
	// 	res.json("Hello World!");
	// });
	
	/*==========  API  ==========*/
	//les routes
	api.route('/')
		// ajout de story
		.post(function(req,res){
			var story = new Story({
				creator: req.decoded.id,
				content: req.body.content
			});

			story.save(function(err){
				if(err){
					res.send(err);
					return;
				}else{
					res.json({message: 'Une nouvelle story a été ajoutée.'});
				}
			});
		})
		// consulter toutes les stories
		.get(function(req,res){
			Story.find({creator: req.decoded.id},function(err,stories){
				if(err){
					res.send(err);
					return;
				}else{
					res.json(stories);
				}
			});
		});

	return api;
};