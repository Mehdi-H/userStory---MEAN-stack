/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 16:35:42
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-16 21:22:29
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

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

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

// indique les fichiers à render, notamment le css et le js
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app,express,io);
app.use('/api',api);

/*==========  Content  ==========*/
app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/app/views/index.html');
});

/*==========  diffusion  ==========*/
server.listen(config.port, function(err){
	if(err)
		console.log('Erreur: ' + err);
	else
		console.log('L\'application tourne sur le port ' + config.port);
});