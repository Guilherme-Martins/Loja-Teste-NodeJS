function ProdutosDAO(connection){
	this._connection = connection;
}

//Consulta de produtos. Retorna uma lista de produtos.
ProdutosDAO.prototype.lista = function(callback){
	this._connection.query('select * from produtos', callback);
}

ProdutosDAO.prototype.salva = function(produto, callback){
	this._connection.query('insert into produtos set ?', produto, callback);
}

module.exports = function(){
	return ProdutosDAO;
}