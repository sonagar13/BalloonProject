var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var databaseRoot;
var databasePosition;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1200,600);
  console.log(database);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  databaseRoot = database.ref('balloon/height');
  databaseRoot.on("value", getPosition, errData);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    setData(-1,0);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    setData(+1,0);
  }
  else if(keyDown(UP_ARROW)){
    //setData(0,-1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   // balloon.scale = balloon.scale + 0.01;
    //balloon.scale = balloon.scale + 0.01;
    //write code to move air balloon in up direction
    setData(0,-1);

    balloon.scale = balloon.scale + 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    setData(0,1);
  }

  drawSprites();
  text(mouseX + "," + mouseY, mouseX,mouseY);
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function setData(x,y){



  database.ref('balloon/height').set({


    'x' : databasePosition.x + x,
    'y': databasePosition.y + y



  })
}

/*
function setData(x,y){

  balloon.x = balloon.x + x;
    balloon.y = balloon.y + y;

}
*/


function getPosition(data){


  databasePosition = data.val();
  console.log(databasePosition);
  balloon.x =  databasePosition.x;
  balloon.y = databasePosition.y ;
}


function errData(){



}