
var monkey , monkey_running, monkey_collided;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime=0 ;
var score = 0 ;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);

 monkey = createSprite(50,300,20,50);
 monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1
  ground = createSprite(10,334,600,10)
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {

  background("lightblue");
 
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil(frameCount/frameRate())
  text("survivalTime: "+survivalTime,100,50);
  console.log("this is",gameState)
  
  if(gameState===PLAY){
    
      score =score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -4;
    
      if(ground.x<400)
      {
       ground.x = ground.width/2;
      }
  
      if(keyDown("space"))
      {
       monkey.velocityY = -12;
      }
      monkey.velocityY = monkey.velocityY+0.8;
      monkey.setCollider("circle",0,0,300);
      monkey.debug = false;
    
    
      Createbanana()
      CreateObstacles()
    
    if(foodGroup.isTouching(monkey))
    {
      foodGroup.destroyEach();
    }
    else if(obstacleGroup.isTouching(monkey))
     {
       gameState = END;
     }
}
  
  if(gameState === END){
    ground.velocityX = 0;
    
  }
   
  monkey.collide(ground);
  
  
  drawSprites()
  
}

function Createbanana()
{
   if (frameCount % 80 === 0)
   {
     banana = createSprite(600,165,10,40);
     banana.y = Math.round(random(100,200));
     banana.addImage(bananaImage);
     banana.scale = 0.1
     banana.velocityX = -4 ;
     
     
    banana.lifetime = 200;
     
    banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
     
     foodGroup.add(banana);
   }
}

function CreateObstacles()
{
  if (frameCount % 300 === 0)
  {
   var obstacle = createSprite(600,315,50,50);
    obstacle.velocityX = -4;
  obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;    
    
    obstacle.lifetime = 200;
    obstacle.depth =obstacle.depth+1;
   
    obstacle.collide(monkey);
    obstacleGroup.add(obstacle);
    
  }
}



