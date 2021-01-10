var dog, happyDog;
var dog_img,happyDog_img;
var database;
var foodQn , foodStock , food, foodImg;
var x=500 , g;


function preload(){
	dog_img=loadImage("Dog.png");
  happyDog_img=loadImage("happydog.png");
  foodimg=loadImage("petfood.png");
 

}

function setup() {
  database=firebase.database();
  //fetching stock from DB
  foodStock=database.ref("Food");
  foodStock.on("value",readStock,showError);
  console.log(foodQn)
 

	createCanvas(500, 500);
  
  dog= createSprite(250,420);
  dog.addImage(dog_img);
  dog.scale=0.2;

  food=createSprite(180,470);
  food.addImage(foodimg);
  food.scale=0.15 ;
 // food.visible=false;
  
fill("green");
  g = createSprite(250,450,500,100);
  g.shapeColor = rgb(0,204,0);

dog.depth = g.depth;
dog.depth = dog.depth + 1;
food.depth = g.depth;
food.depth = dog.depth + 1;

}


function draw() {  
  background(46, 139, 87);


  if(keyWentDown(UP_ARROW)){
    writeStock(foodQn);
    dog.addImage(happyDog_img);
    happyDog_img.scale = 0.1;
     food.visible=true;
  }

  else{
    dog.addImage(dog_img);
    food.visible=false;
  }
  
  drawSprites();
  

  strokeWeight(2);
fill("navy");
  textSize(24);
  text("Food Remaining : "+foodQn,140,100);
  x = x-2;
 
 
 if(keyDown("UP_ARROW")){
    textSize(24);
    text("Great! Bruno is Happy",130,160);
  }
else{
   textSize(24);
   text("Feed Bruno it is hungry!!",130,160);
 }
 

    textSize(24);
    text("Pet Name : Bruno",150,130);
  

 
  
  if(foodQn ===undefined){
    textSize(25);
    text("Loading...",170,250);
  }


  if(foodQn ===0){
    foodQn  = 10;
  }
}

function readStock(data){ 
  foodQn =data.val();
}



function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').set({
      Food:x
  })

}


function showError(){
  text("",200,200);
}


