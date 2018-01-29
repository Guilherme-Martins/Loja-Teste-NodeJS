var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

var porta = process.env.PORT || 3000;
var server = http.listen(porta, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Servidor rodando em \"http://%s:%s\"', host, port);
    console.log("Servidor rodando em \"http://localhost:3000\".");
});

/** 
http.listen(3000,function(){
    console.log("Servidor rodando em \"http://localhost:3000\".");
});
*/