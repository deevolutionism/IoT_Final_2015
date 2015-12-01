var posts = [];
var distance = [];
var users = 0;
var userPos = 150;
var userSize = 50;
var vel = 1;
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
  background(0);

 
   
  // loop through each car
  for(var i = 0; i < posts.length; i++)
  {
    posts[i].userInput(userSubmit());
    posts[i].display();
    posts[i].move();
    posts[i].collision(userPos, userSize);
    posts[i].isDead();
    posts[i].selection();
  }  
  //console.log(millis());
  strokeWeight(2);  
  user(); 
  controller();
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
    posts[i] = new Post(userPos, startTime, i);
    //console.log('posts length: ' + posts.length);

  }
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
}


function keyReleased() {
  move = 0;
}

function controller(){
  if(downButton == 1){
    move = 1;
  } else if (rightButton == 1){
    move = 2;
  } else if (leftButton == 1){
    move = 3;
  } else if (upButton == 1){
    move = 4;
  } else {
    move = 0;
  }
}

// car constructor
function Post(position, start, ID)
{
  this.identity = int(ID);
  console.log('this posts ID: ' + ID);
  this.startTime = start;
  this.lifeTime = 60000 * 10; //60 minute lifetime
  console.log('startTime: ' + this.startTime);
  
  this.xpos = position;
  this.ypos = position;
  this.s = 100;
  this.c = color(random(255), random(255), random(255));

  this.mes = 'placeholder text';
  this.tFill = 100;
  this.ts = 32;

  this.selectionMode = 0;
  this.selectionSize = this.postSize + 30;
  this.proximity = 150;
  this.sw = 1;

  this.newBubble = true;
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
  this.postSize = this.s-this.m;
  noStroke();
  fill(this.c);

  if(this.selectionMode == 1){//increase to legible size
    if(this.postSize < this.legibleSize){
      this.postSize+=2;
    }
  } else if(this.selectionMode == 0){
    ellipse(this.xpos, this.ypos, this.postSize, this.postSize);
  }

  fill(this.tFill);
  textSize(36-int(this.tSize));
  text(this.mes, this.xpos, this.ypos, 300, 300);
}

Post.prototype.isDead = function() {
  this.dead = 0;

  if (millis() < this.startTime + this.lifeTime){ //update
    this.dead = 0;
    this.timePassed = millis() - this.startTime;
    //map(value, value low, value high, target low, target high)
    this.m = map(this.timePassed, 0, this.lifeTime, 0, this.s);//
    this.tSize = map(this.timePassed, 0, this.lifeTime, 0, 24);
      //console.log('time passed since post was created: ' + this.timePassed);
      //console.log('mapped value: ' +this.m);
      //console.log('program run time: ' + millis());
      //console.log('if millis is greater than this, kill: ' + (this.startTime+10000));
  } else if (millis() > this.startTime + this.lifeTime){ //the post has died.
    console.log('Post ' + this.identity + ' has died');
    this.dead = 1;


  }

}

Post.prototype.collision = function(userposition,usersize) {

  this.originalColor = color(0,0,0);
  distance = dist(this.xpos, this.ypos, userposition, userposition);
  //console.log(distance);
  if(distance <= usersize){ //user collision
    originalColor = this.c;
    this.c = color(255,0,0);

    this.selectionMode = 1;

    //console.log('collision!');
  } else {
    this.c = color(0,0,255);
    this.selectionMode = 0;
  }


}

Post.prototype.selection = function(){//user has selected a post to interact with
  //when a user hovers over a post, the size increases to a legible size
  //if the user presses a key, they enter selection mode and may add a comment.
  if(this.selectionMode == 1){
    console.log('selectionSize: ' + this.selectionSize);
    console.log('postSize: ' + this.postSize);
    //increase the size

    

    this.selectionSize = this.postSize + this.proximity;


    noFill();
    stroke(0,255,0);
    strokeWeight(this.sw);
    ellipse(this.xpos, this.ypos, this.selectionSize, this.selectionSize);
    if(this.selectionSize > this.postSize){
      this.proximity--;
      this.sw = map(this.proximity, 150, 30, 0, 10);
      console.log('stroke weight: ' + this.sw);
      if(this.selectionSize <= this.postSize){
        console.log('selected!');
      }
    }
  } else {
    this.proximity = 150; 
  }
}

Post.prototype.userInput = function(message) {
  if(this.newBubble == true){
    
      this.message = prompt('Please type up to 144 characters');
      console.log(this.message.length);
      if (this.message.length > 144){
        this.message = prompt('You used too many characters, please try again');
      }
      this.mes = this.message;
      
      //this.delayDuration = millis() - this.delayBegin;
      //console.log('delayed startTime by: ' + this.delayDuration + ' milliseconds');
      this.startTime = millis();
      console.log('new startTime = ' + this.startTime);
      this.newBubble = false;
    }
}

Post.prototype.comment = function() {//users can add comments to existing posts
  //adding a comment with attach a new bubble to the perimeter
  //adding a new comment will also increase the lifetime of the post

}







