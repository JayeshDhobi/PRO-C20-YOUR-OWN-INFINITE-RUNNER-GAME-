var bg,mainCyclist;
var boyImg, boy1 , boy2 , boy3;
var bgImg,boyImg1,boyImg2,boyImg3;

var boy;

var boy_collidedImg , boy_collided;
var zombiesImg;
var zombies;

var rockImg , rockImg , rock;

var gameOverImg;


var END =0;
var PLAY =1;
var gameState = PLAY;


var distance;
var distance=0;
var gameOver, restart;

function preload(){
  bgImg = loadImage("images/background.png");
  boyImg = loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png","images/boy5.png","images/boy6.png","images/boy7.png","images/boy8.png");
  boy_collidedImg = loadImage("images/ground2.png")
  
  gameOverImg = loadImage("images/gameOver.jpg");
  
  rockImg = loadImage("images/rock2.png");
 
  zombiesImg = loadImage("images/zombies.png");

  
}

function setup(){
  
createCanvas(1200,800);
// Moving background
bg=createSprite(600,400);
bg.addImage(bgImg);
bg.velocityX = -5;
//bg.scale=5

//creating boy running
boy  = createSprite(400,700);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=2;
//boy.velocityX=0.9;

zombies = createSprite(80,700);
zombies.addAnimation("SahilRunning",zombiesImg);
zombies.scale=0.2;
//zombies.velocityX=0.9;

boy_collided = createSprite(400,795);
boy_collided.addImage(boy_collidedImg)

gameOverImg = createSprite(600,400);
gameOverImg.addImage(boy_collidedImg);
gameOverImg.scale = 2;
gameOverImg.visible=false;






rockGroup = createGroup();

  zombies.setCollider("rectangle",0,0,zombies.width,zombies.height);
  zombies.debug = true;

  distance = 0;
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance : "+ distance,900,30);
  
  if(gameState===PLAY){
  
    bg.velocityX = -(4 + 3* distance/100)
    //scoring
    distance = distance + Math.round(getFrameRate()/60);
    
    console.log("FrameRate= " + getFrameRate() );
    if(distance>0 && distance%100 === 0){
      // checkPointSound.play() 
    }
  }
  
 //code to reset the background
 if(bg.x < 0 ){
  bg.x = width/2;
}


//if(keyDown("space")&& zombies.y >= 200) {
  //zombies.velocityY = -12;
  //jumpSound.play();
//}

if(keyDown("space")&& boy.y > 200) {
  boy.velocityY = -12;
  //jumpSound.play();
}


    // zombies.velocityY = zombies.velocityY + 0.8

  spawnRock();

  if(rockGroup.isTouching(zombies)){
    zombies.velocityY= -12;
    //zombies.velocityY = zombies.velocityY + 8;
    

  }
  boy.collide(boy_collided);
  drawSprites();
 }
function spawnRock(){
  if (frameCount % 60 === 0){
    var rock = createSprite(1200,780,10,40);
    rock.y = Math.round(random(1100,600));
    rock.addImage(rockImg);
    rock.scale = 9;
    rock.velocityX = -(5 + distance/100);
    
     //generate random obstacles
     
     //assign scale and lifetime to the obstacle           
     rock.scale = 0.2;
     rock.lifetime = 300;
    
    //add each obstacle to the group
     rockGroup.add(rock);
     //console.log("1 + 1");
  } 
 }