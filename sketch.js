var PLAY = 1;
var END = 0;
var gameState = 1;
var knife;
var score = 0;
var gameOverImage, knifeImage;  
var fruit1,fruit2,fruit3,fruit4,monsterImage;

var gameOver;



function preload(){
  knifeImage = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png");  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadImage("alien1.png","alien2.png"); 

  knifeCuttingSound = loadSound("knifeSwooshSound.mp3");  
  gameOverSound = loadSound("gameover.mp3"); 

}

function setup(){
createCanvas(600,600);
 //camera.position.x = windowWidth*2;
  knife = createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;

  knife.setCollider("circle",0,0,50);  
  knife.debug = false;  


  fruitGroup = createGroup(); 
  enemyGroup = createGroup();

  gameOver = createSprite(300,300,10,10);
}












function draw(){
background("lightBlue");


if (gameState === PLAY){  
  
  
  fruits();
  enemy();
  
 

  knife.x = World.mouseX;  
  knife.y = World.mouseY;  
  
  
  if (fruitGroup.isTouching(knife)){  
    fruitGroup.destroyEach(); 
    score = score+2;
    knifeCuttingSound.play();
  
  }
  
  gameOver.visible = false;
} 
  

  
  if (knife.isTouching(enemyGroup)){  
    gameState = END; 
    gameOver.addImage(gameOverImage);
    gameOverSound.play();
  }
  
  
  
   if (gameState === END){
    fruitGroup.destroyEach();        
    enemyGroup.destroyEach();         
    fruitGroup.setVelocityXEach();         
    enemyGroup.setVelocityXEach();     
    
    //knife.addimage(gameOverImage);   
    knife.x = 200;    
    knife.y = 200;
    
  gameOver.visible = true;    
    
    
    
    } 
  
  
  
  
  
  
  
  
  
  
  
  drawSprites();

  text("score : "+ score,300,30);  
  

}

 function enemy(){
  if(World.frameCount%200===0){
    microbes = createSprite(400,200,20,20);    
    microbes.addImage(monsterImage);    
    microbes.y = Math.round(random(100,300));    
    microbes.velocityX = -8;  
    microbes.setLifetime = 50;  
    microbes.velocityX = -(8+(score/10))
    enemyGroup.add(microbes);
  
  }   
   
   
 }

function fruits(){
   
  if (World.frameCount%80===0) {
     position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);       
    fruit.scale = 0.2;
    

    f=Math.round(random(1,4));
  if (f ==1) {
      fruit.addImage(fruit1);}    
      else if (f ==2){
      fruit.addImage(fruit2);}  
      else if (f ==3){
      fruit.addImage(fruit3);}
      else {
      fruit.addImage(fruit4);}
    
  fruit.y = Math.round(random(50,340));      
  fruit.velocityX = -7;
  fruitsetLifetime=100;

  if(position==1){
     fruit.x=400;
     fruit.velocityX= -(7+(score/4));
     camera.position.x = 300;
     //camera.position.y = cars[index-1].y
   } 
   else 
    {
      if(position==2){
      fruit.x=0; 
      fruit.velocityX= (7+(score/4));  
        
      }
    }
    
    fruitGroup.add(fruit);

  } 
  
} 