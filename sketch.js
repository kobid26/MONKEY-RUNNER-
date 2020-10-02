var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var PLAY = 1;
var END = 0;
var ground, gameState = PLAY;
var score = 0
var survivalTime = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(50, 350, 20, 50);
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1;

  ground = createSprite(400, 380, 900, 10);

  obstaclesGroup = new Group();
  bananasGroup = new Group();
}

function draw() {
  background("green");

  stroke("red")
  textSize("20")
  fill("red");
  text("score " + score, 500, 40)


   
  if (gameState === PLAY) {
    ground.velocityX = -4;


    if (keyDown("space") && monkey.y >= 305) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    if (monkey.isTouching(bananasGroup)) {
      score = score + 1
      banana.destroy();
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    stroke("black");
    textSize("28");
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate())
    text("SURVIVAL TIME =" + survivalTime, 100, 50)


    obstacles();
    bananas();

    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;
    }


    //monkey.debug = true;

  } else if (gameState === END) {

    ground.velocityX = 0;
    stroke("black");
    textSize("28");
    fill("black")
    text("GAME OVER !!", 200, 300)
    monkey.velocityX = 0;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setVelocityXEach(0);
  }
  monkey.collide(ground);
  drawSprites();
}

function obstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(300, 360, 60, 60);
    obstacle.velocityX = -4
    obstacle.lifetime = 590;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 140)
    obstaclesGroup.add(obstacle)
  }
}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(300, 320, 20, 20)
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4
    bananasGroup.add(banana);
    banana.y = Math.round(random(200, 280));
  }

}