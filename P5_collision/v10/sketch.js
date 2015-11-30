var posts = [];
var distance = [];
var users = 0;
var userPos = 150;
var userSize = 50;
var vel = 2;
var move;
var distance, distance1;
var startTime;
var lifeSpan = 50; //10 second lifetime

var _xpos, _ypos;
      
function setup()
{
  createCanvas(300, 300);
  
}
 
function draw()
{
  // clear background
  background(230);

 
   
  // loop through each car
  for(var i = 0; i < posts.length; i++)
  {
    posts[i].move();
    posts[i].display();
    posts[i].collision(userPos, userSize);
    posts[i].isDead();
    if(this.interaction == true){
      posts[i].selection();
    }

  }  
  //console.log(millis());
  strokeWeight(2);  
  user();  
  collision();
  
}


function user() {
  fill(200,0,200,200);
  strokeWeight(2);
  ellipse(userPos,userPos,userSize,userSize);
  //var distance1 = dist(0,0,userPos,userPos);
  //console.log(distance1);
}

function newComment() {
  for (var i = users - 1; i < users; i++)
  {
    //console.log('i: ' + i + ', Users: ' + users);
    startTime = millis();
    posts[i] = new Post(userPos, millis());
    //console.log('posts length: ' + posts.length);

  }
}

function collision() {

  // for (var i = 0; i < posts.length; i++){
  //   //console.log('distance function: ' + distance[i-1]);
  // }
}
 
function keyPressed() {
 

  if (keyCode === DOWN_ARROW){ //move all objects up relative to user
    move = 1;
  } else if (keyCode === RIGHT_ARROW){ //move all objects left relative to user
    move = 2;
  } else if (keyCode === LEFT_ARROW){ //move all objects right relative to user
    move = 3;
  } else if (keyCode === UP_ARROW){ //move all objects down relative to user
    move = 4;
  }

  if (keyCode === ENTER){
    users++;
    newComment();
  }

  if(key === 32 && this.isTouching == true){ //initiate interaction with a post
    this.pauseTime = millis();
    console.log('pauseTime: ' + this.pauseTime);
    this.interaction = true;
  }
}


function keyReleased() {
  move = 0;
}

// car constructor
function Post(position, start)
{
  this.startTime = start; //the time at which the post was created
  this.lifeTime = 60000; //lifetime of the post
  this.scale = 100; //starting size of the post bubble
  console.log('startTime: ' + this.startTime);
  this.s = 0;
  this.legibleScale = 255;
  
  this.xpos = position;
  this.ypos = position;
  this.c = color(random(255), random(255), random(255));
}
 
// drive method
Post.prototype.move = function()
{
  if (move == 1){
    this.ypos = this.ypos - vel;
    
  } else if (move == 2){
    this.xpos = this.xpos - vel;
    
  } else if (move == 3){
    this.xpos = this.xpos + vel;
    
  } else if (move == 4){
    this.ypos = this.ypos + vel;
    
  } else if (move == 0){
    this.ypos = this.ypos;
    this.xpos = this.xpos;
  }
  //console.log('posx: ' + this.posx + ', posy: ' + this.posy)
}
 
// display method
Post.prototype.display = function()
{
    
    // if(this.isTouching == true){
    //   if (this.s < this.legibleScale){
    //     this.s++
    //     console.log(this.s);
    //   }
    // } else if (this.isTouching == false){
    //   this.s = scale - this.timePassed; // 10 pixel decrease for every 1000 miliseconds that pass. 10,000 milisecond lifeTime means 100px size.
    //   //console.log(this.timePassed);
    //   console.log(this.s);
    // }

    this.s = scale - this.timePassed;
    
    noStroke();
    fill(this.c);
    ellipse(this.xpos, this.ypos, this.s, this.s)
 

}

Post.prototype.isDead = function() {

  this.dead = 0;

  //reduce the size of the post as time passes

 //if collision is detected, ignore all code below.
    if (millis() < this.startTime + this.lifeTime){
      //the post has died, remove it.
      this.dead = 0;
      //console.log('startTime + lifeTime = ' + this.startTime + this.lifeTime);
      this.timePassed = (millis() - this.startTime)/scale; //slowly reduce the size of the comment bubble. divide by 100 to scale. 
      console.log(this.timePassed);
      //console.log('a post has died');
    } else if (millis() > this.startTime + this.lifeTime){
      console.log('a post has died');
      this.dead = 1;
    }

  //console.log('startTime: ' + this.startTime);

}

Post.prototype.collision = function(userposition,usersize) {

  this.originalColor = color(0,0,0);
  distance = dist(this.xpos, this.ypos, userposition, userposition);
  //console.log(distance);
  if(distance <= usersize){ //user collision
    this.isTouching = true;
    console.log(this.isTouching);
    originalColor = this.c;
    //print('originalColor' + originalColor);
    this.c = color(255,0,0);
    //this.pauseTime = millis(); //capture the beginning time of interaction
    //console.log('collision!');
  } else { //no collision detected
    this.c = color(0,0,255);
    this.isTouching = false;
    console.log(this.isTouching);
    this.interaction = false;
  }

  // for (var i = 0; i < posts.length; i++){ //Post collision. broken, needs fixing.
  //   _xpos = posts[i].xpos;
   
  //   _ypos = posts[i].ypos;
  //   distance1 = dist(this.xpos, this.ypos, _xpos, _ypos);
  //   if(distance1 <= 80){
  //     //how to get two classes to collide with one another and interact?
  //     //console.log(_xpos);
  //     //console.log('collision with another object'); // not working yet
  //   }
  // }


}

Post.prototype.selection = function(){
  //selection logic
  //when the user is hovering over a post, scale to a readable size.
  //if they press spacebar, it means they want to begin an interaction.
  //initiate the timer logic.
  
  //timer logic 
  //millis() - current time
  //timePassed - the time that has passed since the post was created (calulcated with: millis() - startTime)
  //lifetime - the lifetime of the post (fixed)
  //when an interaction occurs, pause the clock until the interaction is finished. 
  //time the durration of the interaction, make the post a legible size, stop it from decreasing.
  //when the interaction ends, subtract the duration of the interaction from timePassed.
  


}














