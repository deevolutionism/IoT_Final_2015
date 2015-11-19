/*
 * @name Regular Polygon
 * @description What is your favorite? Pentagon? Hexagon? Heptagon? No? 
 * What about the icosagon? The polygon() function created for this example is 
 * capable of drawing any regular polygon. Try placing different numbers into 
 * the polygon() function calls within draw() to explore.
 */
 var r;
 var b;
 var s;
 var posx, posy, velx, vely, radius;
function setup() {
  createCanvas(720, 400);
  b=200;
  r=255;
  s = "The quick brown fox jumped over the lazy dog.";
  posx = 0;
  posy = 0;
  radius = 50;
  velx = 1;
  vely = 1;
  
}


function draw() {
  background(red,green,blue);
  
  fill(r,200,6);
  ellipse(posx, posy, radius, radius);

update();
collision();

// textSize(12);
// fill(255);
// text(s, 200, 50, 250, 100); // Text wraps within text box
}

function update() {
  posx += velx;
  posy += vely;
}

function collision() {
  //top
  if (posy < 0) {
      vely *= -vely;
  }
  if (posy > displayHeight){
      vely *= -vely;
  }
  if (posx < 0){
      velx *= -velx;
  }
  if (posx > displayWidth){
      velx *= -velx
  }
}

// When the user clicks the mouse
function mousePressed() {
  var lbut = dist(mouseX, mouseY, 250, 150);
	var rbut = dist(mouseX, mouseY, 350, 150);
  
  
  if (lbut < 50) {
    r = random(255);
    left();
  }
  
  if (rbut < 50) {
    b = random(255);
    right();
  }
}

