var express = require('../config/express')();
var request = require('supertest')(express);

describe('ProdutosController', function(){

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("delete from produtos", function(ex, result){
            if(!ex){
                done();
            }
        });
    });

    it('Listagem JSON', function(done){
        console.log("\n* Teste de verificação de listagem JSON.");

        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);
    });

    it('Listagem HTML', function(done){
        console.log("\n* Teste de verificação de listagem HTML.");

        request.get('/produtos')
        .set('Accept','text/html')
        .expect('Content-Type',/html/)
        .expect(200, done);
    });

    it('Cadastro de um novo produto com dados INVÁLIDOS', function(done){
        console.log("\n* Teste de cadastro de um produto INVÁLIDOS.");

        request.post('/produtos')
        .send({titulo: "", descricao: "Novo livro."})
        .expect(400, done);
    });

    it('Cadastro de um novo produto com dados VÁLIDOS', function(done){
        console.log("\n* Teste de cadastro de um produto VÁLIDOS.");

        request.post('/produtos')
        .send({titulo: "Título Novo 001", descricao: "Novo livro.", preco: "20.50"})
        .expect(302, done);
    });
});