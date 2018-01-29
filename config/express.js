var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {

	var app = express();

	//Carrega o conteúdo estático das páginas web.
	app.use(express.static('./app/public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	//Importa middlewares.
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);

	//Tratar rotas errados ou inexistentes.
	app.use(function(req, res, next){
		res.status(404).render('erros/404');
		next();
	});

	app.use(function(error,req,res,next){
		if(process.env.NODE_ENV == 'production'){
			res.status(500).render('erros/500');
			return;
		}
		next(error);
	});

	return app;
}