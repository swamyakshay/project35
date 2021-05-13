var city, cityImg, position; 
var balloon, balloonImg; 
var database,height;

function preload(){
  cityImg = loadImage("cityImage.png");
  balloonImg = loadAnimation("hotairballon2.png","hotairballon3.png","hotairballon1.png" )
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  database = firebase.database();

  city = createSprite(400, 200, 50, 50);
  city.addImage(cityImg); 
  city.scale = 0.7; 
  
  balloon = createSprite(200,200,10,10); 
  balloon.addAnimation(balloonImg);
  balloon.scale = 0.5;

  var balloonPosition = database.ref('balloon/height'); 
  balloonPosition.on("value",readPosition, showError); 
}

function draw() {
  background(255,255,255);  

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10; 
    writePosition(balloon.x,balloon.y);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(balloon.x,balloon.y);
    balloon.x = balloon.x+10; 
  }
  else if(keyDown(UP_ARROW)){
    writePosition(balloon.x,balloon.y);
    balloon.y = balloon.y-10; 
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(balloon.x,balloon.y);
    balloon.y = balloon.y+10; 
  }
  
  var balloonPosition = database.ref('balloon/height'); 
  balloonPosition.on("value",readPosition, showError); 
  
  drawSprites();
}

function writePosition(x,y){
  database.ref("balloon/height").set({
    'x': x ,
    'y': y
  })
}


function readPosition(data){
  position = data.val();
  balloonPosition.x = position.x;
  balloonPosition.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}