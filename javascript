var plane1;
var planeImg;
var bullets = null;
var trees = [];
var frame;
var ene;
var first = true;
var bgSong;
var bullSound;
var expl;
var g = "GAME OVER";

score = 0;

//scene
var scene_W = 400;
var scene_H = 1000;

function preload() {
  planeImg = loadImage('images/plane.png');
  smallTree = loadImage('images/tree111.png');
  //enemy1 = loadImage('images/enemy.png');
  bgSong = loadSound('music/bensound-sweet.mp3');
  bullSound = loadSound('music/bullets.mp3');
  expl = loadSound('music/Explosion.mp3');
  
}
function setup() {
  pX = 400/2;
  pY = 500;
  createCanvas(400, 600);
  bgSong.play();
  bgSong.setVolume(0.3);
  
  myPlane = new Group();
  
  
  
  //background array of trees
  for(var i=0; i<100; i++) {
    trees[i] = createSprite(random(-width, scene_W+width), random(-height, scene_H+height));
    trees[i].addImage(smallTree);
  }
  
  //enemy BLUE #1
  ene = createSprite(random(width, scene_W+width), -75);

  ene.addAnimation("normal", 'images/enemy001.png', 'images/enemy019.png');
  ene.addAnimation('destroy','images/explosion001.png','images/explosion025.png');
  ene.velocity.y = 20;
  ene.maxSpeed = 1.3;
  ene.rotateToDirection = false;
  ene.friction = 2;
  
  //enemy RED #2
  enem = createSprite(random(width, scene_W+width), -175);

  enem.addAnimation("normal2", 'images/enemyR001.png', 'images/enemyR019.png');
  enem.addAnimation('destroy','images/explosion001.png','images/explosion025.png');
  enem.velocity.y = 20;
  enem.maxSpeed = 1.3;
  enem.rotateToDirection = false;
  enem.friction = 2;
  
  //enemy YELLOW #3
  enemy = createSprite(random(width, scene_W+width), -275);
  enemy.addAnimation("normal3", 'images/enemyY001.png', 'images/enemyY019.png');
  enemy.addAnimation('destroy','images/explosion001.png','images/explosion025.png');
  enemy.velocity.y = 20;
  enemy.maxSpeed = 1.3;
  enemy.rotateToDirection = false;
  enemy.friction = 2;
  
  //bullets
  bullets = createSprite(width/2, height/2, 2, 25);
  bullets.shapeColor = color(34,139,34);
  
  //your plane
  plane1 = createSprite(pX, pY);
  plane1.addImage(planeImg);
  plane1.addToGroup(myPlane);
  plane1.addAnimation('gameover','images/explosion001.png','images/explosion025.png');
  
  


  //noCursor();
}
function draw() {
  background(34,139,34);
  
  
  //draw a scaled plane
  plane1.scale = 0.1;
  //plane1.position.x = mouseX;  <------ This is for if you ever wanna 
  //plane1.position.y = mouseY;  <------ change to mouse rather than keystrokes
  
  //constrain sprites inside the canvas
  plane1.position.x = constrain(plane1.position.x, 35, 365);
  plane1.position.y = constrain(plane1.position.y, 35, 565);
  
  //move  enemy#1 toward myPlane
  /*if (keyPressed) {
    ene.attractionPoint(0.5, plane1.position.x, plane1.position.y);
  }*/ 
  
  
  ene.position.x = constrain(ene.position.x, 70, 330);
  ene.position.x = ene.position.x + random(0, 1);
  
  //collision with enemy # 1
  if(bullets !=null && bullets.life>0 && bullets.overlap(ene)) {
    ene.changeAnimation('destroy');
    expl.play();
    score++;
    setTimeout("moveShip()", 1000);
    } 
    
  enem.position.x = constrain(ene.position.x, 70, 330);
  enem.position.x = enem.position.x + random(0, 1);    
  
  //collision with enemy # 2
  if(bullets !=null && bullets.life>0 && bullets.overlap(enem)) {
    enem.changeAnimation('destroy');
    expl.play();
    score += 3;
    setTimeout("moveShip2()", 1000);
    } 
    
  enemy.position.x = constrain(ene.position.x, 70, 330);
  enemy.position.x = enemy.position.x + random(0, 1); 
    
  //collision with enemy # 3
  if(bullets !=null && bullets.life>0 && bullets.overlap(enemy)) {
    enemy.changeAnimation('destroy');
    expl.play();
    score += 5;
    setTimeout("moveShip3()", 1000);
    } 

  // remove bullet once bullet hits
  ene.overlap(bullets, Hit);
  enem.overlap(bullets, Hit);
  enemy.overlap(bullets, Hit);  
  
  //if ene#1 hits the your plane
  if(ene.overlap(plane1) && plane1.overlap(ene)){
    ene.changeAnimation('destroy');
    expl.play();
    setTimeout('over()', 1000);
    
    plane1.changeAnimation('gameover');
    setTimeout('rem()');
  }
  
  //if ene#2 hits the your plane
  if(enem.overlap(plane1) && plane1.overlap(enem)){
    enem.changeAnimation('destroy');
    expl.play();
    setTimeout('over()', 1000);

    plane1.changeAnimation('gameover');
    setTimeout('rem()');
  }

  //if ene#3 hits the your plane
  if(enemy.overlap(plane1) && plane1.overlap(enemy)){
    enemy.changeAnimation('destroy');
    expl.play();
    setTimeout('over()', 1000);

    plane1.changeAnimation('gameover');
    setTimeout('rem()');
  }  
  


  //move array of trees
  for(var i = 0; i< trees.length; i++) {
      trees[i].position.y++;
    if(trees[i].position.y>height+100) trees[i].position.y = -500;   
  }
  
  textSize(30);
  text(score, 25,550);
  
  

  noFill(0);
  frame = rect(0,0, 400, 600);
  
  drawSprites(myPlane);
  drawSprites();

}

function over() {
    noLoop();
    bgSong.stop();
    
}

function rem() {
  plane1.remove();
    fill(0);
    textSize(20);
    text("GAME OVER", 25, 25);
  ene.life = 25;
}

function Hit() {
  //bullets.position.x = -100;
  bullets.life = 0;
  //bullets.remove();
  //ene.Animation.remove();
}
function moveShip(){
  ene.position.x = random(-width, scene_W+width);
  ene.position.y = -75;
  ene.changeAnimation('normal');
  
}

function moveShip2(){
  enem.position.x = random(-width, scene_W+width);
  enem.position.y = -175;
  enem.changeAnimation('normal2');
}

function moveShip3(){
  enemy.position.x = random(-width, scene_W+width);
  enemy.position.y = -275;
  enemy.changeAnimation('normal3');
}


function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    plane1.setSpeed(1.5, 0);
    
  }
  else if (keyCode == DOWN_ARROW) {
    plane1.setSpeed(1.5, 90);
    
  }
  else if (keyCode == LEFT_ARROW) {
    plane1.setSpeed(1.5, 180);
  }
  else if (keyCode == UP_ARROW) {
    plane1.setSpeed(1.5, 270);
  }
  else if (key == ' ') {
    //plane1.setSpeed(0, 0); <-------this code is for stopping
  bullets = createSprite(-100, -100, 2, 25);
  bullets.shapeColor = color(34,139,34);  bullets.shapeColor = color(255);
  bullets.velocity.y = -100;
  bullets.position.x = plane1.position.x;
  bullets.position.y = plane1.position.y;
  bullets.friction = 0.9;
  bullets.life = 100;
  bullSound.setVolume(0.6);
  bullSound.play();
  
  
  }
  return false;
}
