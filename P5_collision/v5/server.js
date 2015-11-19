var express = require("express");
var app = express();//create instance of express
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require('socket.io').listen(server);
var prompt = require('prompt');
prompt.start();

var userComment;

app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);

io.sockets.on('connection', function (socket) {
	
	console.log('We have a new client: ' + socket.id);
	
	socket.on('disconnect', function(){
		console.log('Client has disconnected');
	});

	socket.on('mouse', function (data){
		console.log('recieved: mouse' + data.x + ' ' + data.y);
		socket.broadcast.emit('mouse', data);
	});

	socket.on('collision', function (data){
		//prompt user to make a comment
		console.log('collision recieved');
		prompt.get(['Comment'], function (err, result){
			userComment = result.Comment;
		});
		socket.emit('comment', userComment); //send comment to sketch
	});

	



});