var posts = [];
var distance = [];
var users = 0;
var userPos = 150;
var userSize = 50;
var vel = 2;
var move;
var distance;
      
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

  }  
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
    posts[i] = new Post(userPos);
    //console.log('posts length: ' + posts.length);
  }
}

function collision() {
  for (var i = 0; i < posts.length; i++){
    //console.log('post ' + i + ': ' + posts[i].xpos);
    distance[i] = dist(posts[i].xpos, posts[i].ypos, userPos, userPos);

  }
  for (var i = 0; i < posts.length; i++){
    //console.log('distance function: ' + distance[i-1]);
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
function Post(position)
{
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
  // body of the car
  noStroke();
  fill(this.c);
  ellipse(this.xpos, this.ypos, 80, 80);

}

Post.prototype.isDead = function() {
  
}

Post.prototype.collision = function(userposition,usersize) {

  _xpos = this.xpos;
  _ypos = this.ypos;
  this.originalColor = color(0,0,0);
  distance = dist(_xpos, _ypos, userposition, userposition);
  //console.log(distance);
  if(distance <= usersize){
    originalColor = this.c;
    print('originalColor' + originalColor);
    this.c = color(255,0,0);
    console.log('collision!');
  } else {
    this.c = color(0,0,255);
  }
}

Post.prototype.selection = function(){
    
}














