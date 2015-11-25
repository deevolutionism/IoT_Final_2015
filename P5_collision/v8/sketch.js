
// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;

//user variables
var v1, size;

//comment bubble variables
var c1, size1;

function setup() {
  createCanvas(740, 400);
  current = createVector(0,0);
  c1 = createVector(0,0);
  previous = createVector(0,0);
  v1 = createVector(300,200);
  size = 50;

};

function draw() {
  background(200);
  update();
  // If it's time for a new point
  fill(0);
  ellipse(100,100,50);
  if (millis() > next && painting) {

    // Grab mouse position      
    current.x = mouseX;
    current.y = mouseY;

    // New particle's force is based on mouse movement
    // var force = p5.Vector.sub(current, previous);
    // force.mult(0.05);

    // Add new particle
    // paths[paths.length - 1].add(current, force);
    
    // Schedule next circle
    // next = millis() + random(10);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

function update() {
  user();

}

// Start it up
// function mousePressed() {
//   next = 0;
//   painting = true;
//   previous.x = mouseX;
//   previous.y = mouseY;
//   paths.push(new Path());
// }

// // Stop
// function mouseReleased() {
//   painting = false;
// }

function mouseClicked() {
  c1.x = v1.x; //location for new comment
  c1.y = v1.y;
  paths.push(new Path()); //add new comment
  console.log('mouse clicked');
}

function keyPressed() {
  if(keyCode === UP_ARROW){
    v1.y -= 10;
  } else if (keyCode === DOWN_ARROW){
    v1.y += 10;
  } else if (keyCode === LEFT_ARROW){
    v1.x -= 10;
  } else if(keyCode === RIGHT_ARROW){
    v1.x += 10;
  }
}

function user() {
  fill(0);
  ellipse(v1.x, v1.y, size)
}

// A Path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(100);
}

Path.prototype.add = function(position, force) {
  // Add a new particle with a position, force, and hue
  this.particles.push(new Particle(position, this.hue));
}

// Display plath
Path.prototype.update = function() {  
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}  

// Display plath
Path.prototype.display = function() {
  
  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }

}  

// Particles along the path
function Particle(position, hue) {
  this.position = createVector(position.x, position.y);
  // this.velocity = createVector(force.x, force.y);
  // this.drag = 0.95;
  this.lifespan = 255;
}

Particle.prototype.update = function() {
  // Move it
  // this.position.add(this.velocity);
  // // Slow it down
  // this.velocity.mult(this.drag);
  // Fade it out
  this.position = c1;
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  stroke(0, this.lifespan);
  fill(0, this.lifespan/2);    
  ellipse(this.position.x,this.position.y, 8, 8);    
  // If we need to draw a line
  // if (other) {
  //   line(this.position.x, this.position.y, other.position.x, other.position.y);
  // }
}