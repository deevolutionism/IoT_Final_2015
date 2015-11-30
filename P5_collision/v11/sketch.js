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
var newBubble = false;
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
    posts[i].move();
    posts[i].display();
    posts[i].collision(userPos, userSize);
    posts[i].isDead();
    posts[i].userInput();

  }  
  //console.log(millis());
  strokeWeight(2);  
  user();  
  
}


function user() {
  strokeWeight(2);
  fill(255,0,0,200);
  ellipse(userPos,userPos,userSize,userSize);
  //var distance1 = dist(0,0,userPos,userPos);
  //console.log(distance1);
}

function newComment() {
  for (var i = users - 1; i < users; i++) //add another comment bubble to the posts array
  {
    //console.log('i: ' + i + ', Users: ' + users);
    startTime = millis();
    posts[i] = new Post(userPos, startTime, i);
    newBubble = true;
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

  if (keyCode === SHIFT){
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
  //this.startTime = start;
  //console.log('original startTime: ' + startTime);
  this.lifeTime = 60000;
  this.scale = this.lifeTime/(this.lifeTime/100);
  this.s = 100;
  //console.log('startTime: ' + this.startTime);

  this.isTouching = false;
  this.legibleSize = 255;
  
  this.xpos = position;
  this.ypos = position;
  this.c = 255;

  this.tWidth = 300;
  this.tHeight = 300;
  this.tFontSize = 12;
  this.mes = 'placeholder text';

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
  
  this.postSize = this.s - this.m;
  // if(this.isTouching == true && this.s < this.legibleSize && this.dead == 0){
  //     this.m+=2;
  //     console.log('this.isTouching');
  // } else if (this.isTouching == false && this.dead == 0){
  //   if(this.m > this.scale - this.timePassed){
  //     this.m-=2;
  //   } else {
  //     this.m
  //   }
    
  // }

  // if(this.dead == 1){
  //   if (this.s > 0){
  //     this.s--
  //   }
  //   if(this.c > 0){
  //     this.c--;
  //   }
  // }
  //console.log(this.timePassed);


  if(this.isTouching == true && this.postSize);




  noStroke();
  fill(this.c);
  ellipse(this.xpos, this.ypos, this.postSize, this.postSize);
  // fill(150);
  // textSize(this.tFontSize);
  // text(this.mes, this.xpos, this.ypos,this.tWidth,this.tHeight);
    //console.log('this.s = ' + this.s);

}

Post.prototype.isDead = function() {

  this.dead = 0;

  //reduce the size of the post as time passes
  
  

  if (millis() < this.startTime + this.lifeTime){
    //the post has died, remove it.
    this.dead = 0;
    this.timePassed = millis() - this.startTime;
    //console.log('startTime + lifeTime = ' + this.startTime + this.lifeTime);
    this.m = map(this.timePassed, 0, this.startTime + this.lifeTime, 0, this.s);//
   
    //console.log('size over time: ' + this.m);
    //this.timePassed = (millis() - this.startTime)/this.scale;
    //console.log(this.timePassed);
    //console.log('a post has died');
  } else if (millis() > this.startTime + this.lifeTime){
    console.log('Post ' + this.identity + ' has died');
    this.dead = 1;
  }
  
  //console.log('startTime: ' + this.startTime);

}

Post.prototype.collision = function(userposition,usersize) {

  this.originalColor = color(0,0,0);
  distance = dist(this.xpos, this.ypos, userposition, userposition);
  //console.log(distance);
  if(distance <= userSize){ //user collision
    originalColor = this.c;
    this.isTouching = true;
    //print('originalColor' + originalColor);
    //console.log('collision!');
  } else {
    this.isTouching = false;
  }

}

Post.prototype.selection = function(){

}

Post.prototype.userInput = function() {
  if(newBubble == true){
      //this.delayBegin = millis();
      this.message = prompt('Please type up to 144 characters');
      console.log(this.message.length);
      if (this.message.length > 144){
        this.message = prompt('You used too mamy characters, please try again');
      }
      this.mes = this.message;
      
      //this.delayDuration = millis() - this.delayBegin;
      //console.log('delayed startTime by: ' + this.delayDuration + ' milliseconds');
      this.startTime = millis();
      newBubble = false;

    }
}





