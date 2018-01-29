var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    method: 'post',
    path: '/produtos',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function(res){
    console.log(res.statusCode);
    res.on('data', function(body){
        console.log('Corpo: ' + body);
    });
});

var produto = {
    titulo : '',
    descricao : 'Descrição da inserção.',
    preco : '35'
};

console.log(produto);
client.end(JSON.stringify(produto));

