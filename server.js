/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 16:35:42
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-12 21:12:36
*/

/*jslint node: true */
'use strict';

/*==========  Pkg node.js  ==========*/
var express    = require('express'),
	bodyParser = require('body-parser'),
	morgan     = require('morgan'),
	config     = require('./config'),  // fichier config
	mongoose   = require('mongoose');

/*==========  Instanciation  ==========*/
var app = express();

/*==========  Configuration BDD  ==========*/
mongoose.connect(config.database,function(err){
	if(err){
		console.log('Erreur :' + err);
	}else{
		console.log('Connecté à la base de données.');
	}
});

/*==========  Middleware  ==========*/
app.use(bodyParser.urlencoded({extended:true}));  // false ne permet que de parser une string, true pour toute sorte de médias.
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/routes/api')(app,express);
app.use('/api',api);

/*==========  Content  ==========*/
app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/views/index.html');
});

/*==========  diffusion  ==========*/
app.listen(config.port, function(err){
	if(err)
		console.log('Erreur: ' + err);
	else
		console.log('L\'application tourne sur le port ' + config.port);
});