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
    posts[i].userInput();
    posts[i].display();
    posts[i].move();
    posts[i].collision(userPos, userSize);
    posts[i].isDead();
  }  
  //console.log(millis());
  strokeWeight(2);  
  user();  
  
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

// car constructor
function Post(position, start, ID)
{
  this.identity = int(ID);
  console.log('this posts ID: ' + ID);
  this.startTime = start;
  this.lifeTime = 10000;
  console.log('startTime: ' + this.startTime);
  
  this.xpos = position;
  this.ypos = position;
  this.s = 100;
  this.c = color(random(255), random(255), random(255));

  this.mes = 'placeholder text';

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
  ellipse(this.xpos, this.ypos, this.postSize, this.postSize);
  fill(100);
  textSize(12);
  text(this.mes, this.xpos, this.ypos, 300, 300);

}

Post.prototype.isDead = function() {
  this.dead = 0;

  if (millis() < this.startTime + this.lifeTime){ //update
    this.dead = 0;
    this.timePassed = millis() - this.startTime;
    //map(value, value low, value high, target low, target high)
    this.m = map(this.timePassed, 0, this.lifeTime, 0, this.s);//
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
    //print('originalColor' + originalColor);
    this.c = color(255,0,0);
    //console.log('collision!');
  } else {
    this.c = color(0,0,255);
  }


}

Post.prototype.selection = function(){

}

Post.prototype.userInput = function() {
  if(this.newBubble == true){
      //this.delayBegin = millis();
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








