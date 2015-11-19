var socket;
var posx, posy, targetX, targetY, numPixels;
var easing = 0.05;
var radius;
var r1, r2, r3, r4;
var posx1, posx2, posx3, posx4;
var posy1, posy2, posxy, posy4;
var size1, size2, size3, size4;
var fill1, fill2, fill3, fill4
var distance1, distance2, distance3, distance4;
var clicked1, clicked2, clicked3, clicked4;

var backgroundColor;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	
	socket = io();


	radius = 80;
	numPixels = 5;
	posx = 100;
	posy = 100;



	r1 = 100;
	posx1 = 100;
	posy1 = 100;
	size1 = 50;
	text1 = 12;
	fill1 = 255;
	clicked1 = 0;

	r2 = 100;
	posx2 = 200;
	posy2 = 100;
	size2 = 50;
	text2 = 12;
	fill2 = 255;
	clicked2 = 0;

	r3 = 100;
	posx3 = 300;
	posy3 = 100;
	size3 = 50;
	text3 = 12;
	fill3 = 255;
	clicked3 = 0;

	r4 = 200;
	posx4 = 300;
	posy4 = 300;
	size4 = 50;
	text4 = 12;
	fill4 = 255;
	clicked4 = 0;

	
}

// function mouseDragged() {
// 	var data = {
// 		x: mouseX,
// 		y: mouseY
// 	};

// 	socket.emit('mouse', data);
// }

function draw() {
	background(backgroundColor);

	
	move();
	textBubbles();
	collision();
	player();

	//console.log(mouseX);

	s = "The quick brown fox jumped over the lazy dog.  brown fox jumped over the lazy dog.  brown fox jumped over the lazy dog.";
	
	//translate(mouseX, mouseY);
	textAlign(CENTER);
	//fill(0);
	//text(string, posx, posy, width, height)
	//text(s, mouseX, mouseY-40, size1, size1); // Text wraps within text box
	
	socket.on('comment', function (data){
		print('comment: ' + data);
	});


}

function player(){
	fill(255,0,0);
	// socket.on('mouse', function (data){
	// 	fill(0,0,255);
	// 	noStroke();
	// 	ellipse(data.x, data.y, 80,80);
	// 	posx = data.x;
	// 	posy = data.y;

	// });

	var dx = targetX - posx;
	if(abs(dx) > 1){
		posx += dx * easing;
	}

	var dy = targetY - posy;
	if(abs(dy) > 1){
		posy += dy * easing;
	}

	noStroke();
	ellipse(posx,posy,radius,radius);
}

function move(){

}


function textBubbles(){
	
	
	s = "I just walked 10 miles today!";
	fill(fill1);
	ellipse(posx1,posy1,r1,r1);
	//translate(posx1, posy1);
	textSize(text1);
	fill(100);
	text(s,0,0,size1,size1); 
	

	s = "Im moving to Canada if Trump wins the election!"
	fill(fill2);
	ellipse(posx2,posy2,r2,r2);
	//translate(posx2,posy2);
	textSize(text2);
	fill(100);
	text(s,0,0,size2,size2);

	
	s = "black lives matter!"
	fill(fill3);
	ellipse(posx3,posy3,r3,r3);
	//translate(posx3, posy3);
	textSize(text3);
	fill(100);
	text(s,0,0,size3,size3);
	
}

function collision(){
	distance1 = dist(posx1, posy1, mouseX, mouseY);
	//print('distance 1: ' + distance1);
	if(distance1 <= r1){
		fill1 = 100;
		clicked1 = 1; // -> mouseclicked
		print('collision!');
	} else {
		fill1 = 255;
	}

}

// function keyPressed() {
// 	//up key
// 	if (keyCode === UP_ARROW){
// 		targetY = posy - numPixels;
// 		print('up arrow pressed');
// 	}

// 	//down key
// 	if (keyCode === DOWN_ARROW){
// 		targetY = posy + numPixels;
// 	}

// 	//right key
// 	if (keyCode === RIGHT_ARROW){
// 		targetX = posx + numPixels;
// 	}

// 	//left
// 	if(keyCode === LEFT_ARROW){
// 		targetX = posx - numPixels;
// 	}
// }

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    backgroundColor = 255;
  } else if (keyCode === RIGHT_ARROW) {
    backgroundColor = 100;
  }
}


function mouseClicked() {

	if(clicked1 == 1){
		socket.emit('collision', clicked1);
		clicked1 == 0;
		print('clicked!');
	} else if (clicked2 == 2){
		socket.emit('collision', clicked2);
		clicked2 = 0;
	}

}








