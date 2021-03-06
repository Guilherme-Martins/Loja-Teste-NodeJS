var mysql = require('mysql');

function createDBConnetion() {

	if(!process.env.NODE_ENV) {
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'casadocodigo_nodejs'
		});
	}

	if(process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'casadocodigo_nodejs_test'
		});
	}
}

//wrapper
module.exports = function(){
	return createDBConnetion;
}