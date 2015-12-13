var posts = [];
var distance = [];
var users = 0;
var userPosx;
var userPosy;
var userSize = 50;
var vel = 1;
var move;
var distance, distance1;
var startTime;
var lifeSpan = 50; //10 second lifetime
var minutes = 1;
var createdNewComment = false;
var isConnected = false;
var connectedX = 0;
var connectedY = 0;
var placingNewComment = true;


var _xpos, _ypos;
      
function setup()
{
  createCanvas(displayWidth, displayHeight);
  
}
 
function draw()
{
  // clear background
  background(0);
   
  // loop through each car
  for(var i = 0; i < posts.length; i++)
  {
    posts[i].userInput(userSubmit());
    posts[i].drawLine();
    posts[i].display();
    posts[i].move();
    posts[i].collision(userPosx,userPosy, userSize);
    posts[i].isDead();
    posts[i].selection();
    posts[i].comment();
    //console.log("post #" + i + " xpos: " + posts[i].display.xpos);
  }  
  //console.log(millis());
  strokeWeight(2);  
  user(); 
  controller();
}
  


function user() {
  userPosx = windowWidth/2;
  userPosy = windowHeight/2;
  fill(200,0,200,200);
  strokeWeight(2);
  ellipse(userPosx,userPosy,userSize,userSize);
  //var distance1 = dist(0,0,userPosx,userPosy);
  //console.log(distance1);
}

function newPost() {
  for (var i = users - 1; i < users; i++)
  {
    //console.log('i: ' + i + ', Users: ' + users);
    startTime = millis();
    posts[i] = new Post(userPosx, userPosy, startTime, i, isConnected, connectedX, connectedY); //add a new post to the end of the array
    //console.log('posts length: ' + posts.length);
    console.log('userPosx: ' + userPosx + 'connectedX: ' + connectedX);
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
      newPost();
      if(placingNewComment == true){
        createdNewComment = !createdNewComment
      }
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
  if (postButton == 1){
    users++;
    newPost();
  }
}

//post constructor
function Post(positionx, positiony, start, ID, isconnected, conx, cony)
{
  this.identity = int(ID);
  console.log('this posts ID: ' + ID);
  this.startTime = start;
  this.lifeTime = 60000 * minutes; //60 minute lifetime
  console.log('startTime: ' + this.startTime);
  
  this.xpos = positionx;
  this.ypos = positiony;
  this.s = 100;
  this.c = color(random(255), random(255), random(255));

  this.mes = 'placeholder text';
  this.tFill = 100;
  this.ts = 32;

  this.selectionMode = 0;
  this.selectionSize = this.postSize + 30;
  this.proximity = 150;
  this.sw = 1;
  this.legibleSize = 100;
  this.selected = false;
  this.sx = positionx;
  this.sy = positiony;
  console.log('ID:' +this.identity + ' connected? ' + isconnected);
  if(isconnected == true){
  this.isConnected = isconnected;
  this.conx = conx;
  this.cony = cony;
  } else {
    this.conx = this.xpos;
    this.cony = this.ypos;
  }


  this.newBubble = true;
  this.placeNewComment = false;
  this.createNewComment = false;
}
 
Post.prototype.key = function(){

}



// drive method
Post.prototype.move = function()
{

  if (move == 1){
    this.ypos = this.ypos - vel;
    this.cony = this.cony - vel;
    
  } else if (move == 2){
    this.xpos = this.xpos - vel;
    this.conx = this.conx - vel;
    
  } else if (move == 3){
    this.xpos = this.xpos + vel;
    this.conx = this.conx + vel;
    
  } else if (move == 4){
    this.ypos = this.ypos + vel;
    this.cony = this.cony + vel;
    
  } else if (move == 0){
    this.ypos = this.ypos;
    this.xpos = this.xpos;
    this.cony = this.cony;
    this.conx = this.conx;
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
      ellipse(this.xpos, this.ypos, this.legibleSize, this.legibleSize);
    } else if (this.selectionMode == 0){
    ellipse(this.xpos, this.ypos, this.postSize, this.postSize);
  }
  if(this.dead == 0){
    fill(this.tFill);
    textSize(36-int(this.tSize));
    text(this.mes, this.xpos, this.ypos, 300, 300);
  }
}

Post.prototype.isDead = function() {
  this.dead = 0;

  if (millis() < this.startTime + this.lifeTime){ //update
    this.dead = 0;
    this.timePassed = millis() - this.startTime;
    //map(value, value low, value high, target low, target high)
    this.m = map(this.timePassed, 0, this.lifeTime, 0, this.s);//
    //console.log(this.m);
    this.tSize = map(this.timePassed, 0, this.lifeTime, 0, 24);
      //console.log('time passed since post was created: ' + this.timePassed);
      //console.log('mapped value: ' +this.m);
      //console.log('program run time: ' + millis());
      //console.log('if millis is greater than this, kill: ' + (this.startTime+10000));
  } else if (millis() > this.startTime + this.lifeTime){ //the post has died.
    //console.log('Post ' + this.identity + ' has died');
    this.dead = 1;
  }

}

Post.prototype.collision = function(userpositionx, userpositiony,usersize) {

  this.originalColor = color(0,0,0);
  distance = dist(this.xpos, this.ypos, userpositionx, userpositiony);
  //console.log(distance);
  if(distance <= usersize && this.dead == 0){ //user collision
    originalColor = this.c;
    this.c = color(255,0,0);

    this.selectionMode = 1; //the user might be selecting the post, initiate the process for determining selection.

    //console.log('collision!');
  } else {
    this.c = color(255,255,255);
    this.selectionMode = 0;
  }


}

Post.prototype.selection = function(){//user has selected a post to interact with
  //when a user hovers over a post, the size increases to a legible size
  //if the user presses a key, they enter selection mode and may add a comment.
  if(this.selectionMode == 1){
    //console.log('selectionSize: ' + this.selectionSize);
    //console.log('postSize: ' + this.postSize);
    //increase the size

    

    this.selectionSize = this.postSize + this.proximity;


    noFill();
    stroke(0,255,0);
    strokeWeight(this.sw);
    ellipse(this.xpos, this.ypos, this.selectionSize, this.selectionSize);
    if(this.selectionSize >= this.postSize){
      this.proximity--; //decreas the siez of the stroke ring as selection time increases
      this.sw = map(this.proximity, 150, 30, 0, 10); //stroke weight of selection ring
      //console.log('stroke weight: ' + this.sw);
      //console.log('selectionSize: ' + this.selectionSize + " postSize: " + this.postSize);
      if(this.selectionSize <= this.postSize){ //if the selection ring is smaller than the size of the post, it is selected.
        this.selected = true; 
        this.placeNewComment = true;
        placingNewComment = true;
        createdNewComment = false;
        //console.log('you selected post #'+this.identity);
        selectedID = this.identity; //pass the ID to the user.
        //placeNewComment = true;
        //console.log(this.selected);
      }
    }
  } else {
    this.proximity = 150; 
  }
}

Post.prototype.userInput = function(message) {
  if(this.newBubble == true){
      this.message = prompt('Please type up to 144 characters for your post');
      //console.log(this.message.length);
      if (this.message.length > 144){
        this.message = prompt('You used too many characters, please try again');
      }
      this.mes = this.message;
      
      //this.delayDuration = millis() - this.delayBegin;
      //console.log('delayed startTime by: ' + this.delayDuration + ' milliseconds');
      this.startTime = millis();
      //console.log('new startTime = ' + this.startTime);
      this.newBubble = false;
  }
}

Post.prototype.comment = function() {//users can add comments to existing posts
  //when the user has selected the post they wish to comment on, they may choose a location for their comment, select that location, and then fill the comment with their text.
  if (this.placeNewComment == true && this.dead == false){ //create a temorary cirlce to represent a new comment to be placed
    //constructor + attributes
    placingNewComment = true;
    isConnected = true;
    connectedX = this.xpos;
    connectedY = this.ypos;

    fill(100,100,100);
    ellipse(userPosx,userPosy, 80, 80);
    stroke(255);
    strokeWeight(2);
    line(userPosx, userPosy, this.xpos, this.ypos);
    noStroke();
    fill(200);
    textSize(12);
    text("drop your comment somewhere", userPosx, userPosy, 300, 300);
    console.log('placing a new comment');
  }

  if(createdNewComment == true){
    this.placeNewComment = false;
    placingNewComment = false;
    console.log('selection haulted');
  }
}

Post.prototype.drawLine = function(){
  strokeWeight(2);
  stroke(50);
  if(this.dead == 0){
  //console.log('ID: '+ this.identity + 'connectedX:' + this.conx + 'xpos: ' + this.xpos);
    line(this.xpos, this.ypos, this.conx, this.cony); //draw connecting line
  }
}












