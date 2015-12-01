var bodyParser = require('body-parser');
var express = require("express");
var app = express();//create instance of express
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);//socket io listen on port
var serialport = require("serialport");//serial port instance
var SerialPort = serialport.SerialPort;
var sport = new SerialPort("/dev/cu.usbmodem1411", { // create SerialPort instance called sport
  baudrate: 9600,// give baudrate
  parser: serialport.parsers.readline("\n") //parse data when end of line present
}, false);

var buttonData;


app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);

//socket.io stuff
io.sockets.on('connection', function (socket) {//open io connection
	sport.open(function(error) {//open serial connection
		if (error) {
	    	console.log('failed to open: ' + error);//if serial fails
		} else {
		    // port.write("A");
		    console.log('Serial open');


			sport.on("data", function (data) {
		  		//console.log(data);
		  		//http://stackoverflow.com/questions/2858121/convert-comma-separated-string-to-array
		  		var string = data;
		  		var temp = new Array();

		  		temp = string.split(",");
		  		for(i in temp){
		  			temp[i] = parseInt(temp[i], 10);
		  		}
		  		upButton = temp[0];
		  		downButton = temp[1];
		  		leftButton = temp[2];
		  		rightButton = temp[3];
		  		//console.log('up button: ' + temp[0]);
		  		socket.emit('controller', {up: upButton, down: downButton, left: leftButton, right: rightButton});

			});
		}	
	});


	console.log('socket connection established');


});



