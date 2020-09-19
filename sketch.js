var tower, towerImage;
var door,doorImage,doorGroup;
var climber, climberImage,climberGroup;
var ghost,ghostImage
var invisibleBlock,invisibleBlockGroup;
var gameState = "play"
var spookySound
function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav")
  invisibleBlockGroup = new Group();
  doorGroup = new Group();
  climberGroup = new Group();
}


function setup(){
  createCanvas(600,600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage(towerImage)
  tower.velocityY=5;
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage(ghostImage)
  ghost.scale = 0.39
}


function draw(){
  background("black");
if(gameState === "play"){
    

  
  if(tower.y > 600){
    tower.y = 300
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  ghost.velocityY = ghost.velocityY + 0.8
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy()
    gameState = "end"
  }
  spawnDoors();
  spawnClimbers();
  drawSprites();
}
else if(gameState === "end"){
  stroke("blue");
  fill("blue");
  textSize(50)
  text("GAMEOVER",300,300);
}
}


function spawnDoors(){
  if(frameCount % 90 == 0){
    door = createSprite(200,-50);
    door.addImage(doorImage)
    door.velocityY=5;
    door.x = Math.round(random(120,400))
    
    door.lifetime = 150
    
    doorGroup.add(door)
    ghost.depth = door.depth
    ghost.depth ++
  }
}

function spawnClimbers(){
  if(frameCount % 90 == 0){
    climber = createSprite(200,10);
    climber.addImage(climberImage)
    climber.velocityY=5;
    climber.x = door.x
    
    climber.lifetime = 150
    
    climberGroup.add(climber)
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 5
    invisibleBlock.debug = true
    invisibleBlockGroup.add(invisibleBlock)
  }
}





