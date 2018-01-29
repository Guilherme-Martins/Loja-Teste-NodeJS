module.exports = function(app){

	//Listar produtos.
	app.get('/produtos',function(req, res, next){
		//Conecção MySQL.
		var connection = app.infra.connectionFactory();
		//Instancia um produto.
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		//Lista de produtos.
		produtosDAO.lista(function(erros, resultados){
			if(erros){
				return next(erros);
			}
			res.format({
				html: function(){
					res.render('produtos/lista', {lista:resultados});
				},
				json: function(){
					res.json(resultados);
				}
			});			
		});

	    //Fecha conexão.
	    connection.end();
	    //Mensagem no servidor.
	    console.log("Atendendo a requisição de lista de produtos.");
	});

	//Formulário de cadastro de um produto.
	app.get('/produtos/form',function(req,res){
		//Conecção MySQL.
		res.render('produtos/form', {errosValidacao: {}, produto: {}});

	    //Mensagem no servidor.
	    console.log("Atendendo a requisição de fromulpario de produtos.");
	});

	//Salvar produtos.
	app.post('/produtos',function(req,res){
		//Conecção MySQL.
		var connection = app.infra.connectionFactory();
		//Instancia um produto.
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		//Recuperar dados do formulário.
		var produto = req.body;
		console.log(produto);

		//Validação.
		req.assert('titulo','Título é obrigatório.').notEmpty();
		req.assert('preco','Formato de preço inválido').isFloat();

		var errors = req.validationErrors();
		if(errors){
			res.format({
				html: function(){
					res.status(400).render('produtos/form', {errosValidacao: errors, produto: produto});
				},
				json: function(){
					res.status(400).json(errors);
				}
			});
			
			return;
		}

		produtosDAO.salva(produto, function(erros,resultados){
			console.log(erros);
			res.redirect('/produtos');
		});

	    //Fecha conexão.
	    connection.end();
	    //Mensagem no servidor.
	    console.log("Atendendo a requisição de salvar produtos.");
	});
}