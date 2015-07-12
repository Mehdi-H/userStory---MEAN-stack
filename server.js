/* 
* @Author: Mehdi-H
* @Date:   2015-07-12 16:35:42
* @Last Modified by:   Mehdi-H
* @Last Modified time: 2015-07-12 16:47:43
*/

/*jslint node: true */
'use strict';

/*==========  Pkg node.js  ==========*/
var express    = require('express'),
	bodyParser = require('body-parser'),
	morgan     = require('morgan');

/*==========  Instanciation  ==========*/
var app = express();

/*==========  diffusion  ==========*/
app.listen(3000, function(err){
	if(err)
		console.log('Erreur: ' + err);
	else
		console.log('L\'application tourne sur le port 3000');
});