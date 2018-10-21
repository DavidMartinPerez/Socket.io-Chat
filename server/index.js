var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 6677;

app.use(express.static('client'))


app.get("/hello", function(req, res){
    res.status(200).send("<h1>Bienvenidos</h1>")
})

//Guardamos todos los mensajes
var messages = [{
    id:1,
    text: 'Bienvenido al chat privado de mi casa',
    nickname: "Bot_toB"
}]

io.on("connection", function(socket){
    console.log(`El nodo con IP: ${socket.handshake.address} se ha conectado...`);

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages',messages)
    })
})

server.listen(port, function(){
    console.log("Servidor está corriendo en http://localhost:6677");
})