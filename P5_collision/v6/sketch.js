


var systems;
var comments; //object variable

//user variables
var v1,size;

function setup() {
	createCanvas(windowWidth, windowHeight);
	b = 0;
	v1 = createVector(windowWidth/2, windowHeight/2); 
	systems = [];
}

function draw() {
	background(b);
	for (i = 0; i < systems.length; i++){
		systems[i].run();
		systems[i].addParticle();
	}
	if (systems.length == 0){
		fill(255);
		textAlign(CENTER);
		textSize(32);
		text('Click to add a new comment bubble', windowWidth/2, windowHeight/2);
	}

}

var systems;

function setup() {
  createCanvas(710, 400);
  systems = [];
}

function draw() {
  background(51);
  background(0);
  for (i = 0; i < systems.length; i++) {
    systems[i].run();
    systems[i].addParticle();
  }
  if (systems.length==0) {
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("click mouse to add particle systems", width/2, height/2);
  }
}

function mousePressed() {
  this.p = new ParticleSystem(createVector(mouseX, mouseY));
  systems.push(p);
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function () {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  // Add either a Particle or CrazyParticle to the system
  if (int(random(0, 2)) == 0) {
    p = new Particle(this.origin);
  }
  this.particles.push(p);
};

ParticleSystem.prototype.run = function () {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};









function keyPressed() {
	
	if(keyCode === LEFT_ARROW){
		if (b > 10) {
		b -= 10;
		}
	}
	else if (keyCode === RIGHT_ARROW){
		if (b < 240){
			b += 10;
		}
	}
	
}