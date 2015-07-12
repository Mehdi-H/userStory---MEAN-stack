/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 16:35:42
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-12 18:34:25
*/

/*jslint node: true */
'use strict';

/*==========  Pkg node.js  ==========*/
var express    = require('express'),
	bodyParser = require('body-parser'),
	morgan     = require('morgan'),
	config     = require('./config');  // fichier config

/*==========  Middleware  ==========*/
app.use(bodyParser.urlencoded({extended:true}));  // false ne permet que de parser une string, true pour toute sorte de médias.
app.use(bodyParser.json());
app.use(morgan('dev'));

/*==========  Instanciation  ==========*/
var app = express();

/*==========  diffusion  ==========*/
app.listen(config.port, function(err){
	if(err)
		console.log('Erreur: ' + err);
	else
		console.log('L\'application tourne sur le port ' + config.port);
});