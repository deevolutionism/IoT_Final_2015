var express = require('express');
var app = express();
var port = 8000;
var url = 'localhost';
var server = app.listen(port);
var io = require('socket.io').listen(server);
var prompt = require('prompt');
prompt.start();

app.use(express.static(__dirname + '/'));
console.log('Simple static server listening at ' +url+':'+port);

io.sockets.on('connection', function (socket) {
	
});
