var dog, sadDog, happyDog, database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  dog00 = loadImage("running.png")
  dog000 = loadImage("runningLeft.png")
  dog001 = loadImage("Garden.png")
  dog002 = loadImage("Garden.png")
  dog003 = loadImage("Living Room.png")
  dog004 = loadImage("Wash Room.png")
  dog005 = loadImage("Lazy.png")


}

function setup() {
  database = firebase.database();
  createCanvas(1200, 800);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 700, 200);
  dog.addImage(sadDog);
  dog.scale = 0.4;

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(4, 222, 222);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }

  currentTime = hour();
  if (currentTime == (lastFed)) {
    dog.addImage(dog000);
  }
  else if (currentTime == (lastFed + 1)) {
    dog.addImage(dog001);
  }
  else if (currentTime == (lastFed + 2)) {
    dog.addImage(dog002);
  }
  else if (currentTime == (lastFed + 3)) {
    dog.addImage(dog003);
  }
  else if (currentTime == (lastFed + 4)) {
    dog.addImage(dog004);
  }
  else if (currentTime == (lastFed + 5)) {
    dog.addImage(dog005);
  }
  else {
    dog.addImage(dog005);
  }


  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog() {
  if (foodS > 0) {


    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime: hour()
    })
  }
}


//function to add food in stock
function addFoods() {
  if (foodS < 50) {
    foodS++;
    database.ref('/').update({
      Food: foodS
    })
  }
}
