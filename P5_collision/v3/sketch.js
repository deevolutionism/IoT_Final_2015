var posx, posy, velx, vely, radius;


function setup() { //setup ... fixes defined variables and size of canvas
    createCanvas(displayWidth, displayHeight);
    fill(0);
    posx = 0;
    posy = 0;
    velx = 1;
    vely = 1;
    radius = 50;

}

function draw() { // draw fuction similar to void draw() in processing
    background(255);
    ballMove();
}



function ballMove() {
    // calculations to make ball move
    posx += 1;
    posy += 1;
    fill(0,0,0,150);
    ellipse(posx, posy, radius, radius);

	// Bounce when touch the edge of the defined canvas size
	if (posx < 0) { 
		posx = 0; 
		velx = -velx; 
	}
 	if (posy < 0) { 
 		posy = 0; 
 		vely = -vely; 
 	}
 	if (posx > width - 20) { 
 		posx = width - 20; 
 		velx = -velx; 
 	}
 	if (posy > height - 20) { 
 		posy = height - 20; 
 		vely = -vely; 
 	}
	
}

