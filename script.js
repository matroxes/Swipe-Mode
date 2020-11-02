var device =  window.matchMedia('(min-width: 320px) and (max-width: 1280px)').matches;


var canvas1 = document.querySelector('#canvas-1')
var canvas2 = document.querySelector('#canvas-2')

var ctx1, ctx2

var PC

if (device) {  // It will pass if it's a mobile device or tablet
  canvas1.width = innerWidth
  canvas1.height = innerHeight
  canvas2.width = innerWidth
  canvas2.height = innerHeight

  ctx1 = canvas1.getContext('2d');
  ctx2 = canvas2.getContext('2d');
}



if(!device) { // It will pass if it's a PC
  canvas1.height = innerHeight  - (innerHeight * 0.05) ;
  canvas1.width = canvas1.height/2;
  canvas2.height = innerHeight - (innerHeight * 0.05);
  canvas2.width = canvas1.height/2;

  ctx1 = canvas1.getContext('2d');
  ctx2 = canvas2.getContext('2d');

  PC = true
}

// Define global variables
const line = canvas1.width/3

const playerW = Math.floor(canvas1.width*(2/8.5))
const playerH = Math.floor(playerW*(2.5/1.5))

const playerY = Math.floor (canvas1.height - playerH - (canvas1.height * (2/13)))
const playerStartX = (canvas1.width/2) - playerW/2
const speed = line/10;
const obstacleSpeed = canvas1.width/100;

var obstacleWidth;
var obstacleHeight;

var moveLeftCounter = 1
var moveRightCounter = 1

// Player conditionals
var nowJump = false

/*ctx1.fillRect(playerStartX, playerY, playerW, playerH)*/

const frameSpeed = 80

// Score counter

const ratio = 80/800
const fontSize = Math.floor(canvas1.width*ratio)
const downGap = Math.floor(canvas1.height/12)


var scoreCounter = 0;


// variables for different obstacles //

var obstacleType

// ####### Trash Can ######## //

const canW = canvas1.width * 1.5/8.5
const canH = canW * 2/1.5
const canSpriteH = canH


// ####### Cone ######## //

const coneW = canvas1.width * 1.5/8.5
const coneH = coneW
const coneSpriteH = coneH


// ####### Car ######## //

const carW = canvas1.width * 0.3
const carH = carW * 1.6
const carSpriteH = carH


// ####### stone ######## //

const stoneW = canvas1.width * 1.5/8.5
const stoneH = stoneW
const stoneSpriteH = stoneH


// ####### log ######## //

const logW = canvas1.width * 1.5/8.5
const logH = logW
const logSpriteH = logH

// stone +
// log +
// can +
// cone +
// police
// car +
// fence
// truck


//---------//
//  COINS  //
//---------//

const coinSize = canvas1.width * 1/8.5

// Images 273x393

var character = new Image();
character.src = 'css_sprites.png'

var characterJump = new Image();
characterJump.src = 'jump.png'

var characterFall = new Image();
characterFall.src = 'fall.png'

var imageSrc

const trashI = new Image()  // Trash can
trashI.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Item/obstacles/size/4.png'

const coneI = new Image() // Cone
coneI.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Item/obstacles/size/2.png'


const car1I = new Image() // Car 1
car1I.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Item/obstacles/size/10.png'

const car2I = new Image() // Car 2
car2I.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Item/obstacles/size/11.png'

const car3I = new Image() // Car 3
car3I.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Item/obstacles/size/12.png'


const stoneI = new Image() // stone
stoneI.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Item/obstacles/size/7.png'

const logI = new Image() // log
logI.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Item/obstacles/size/6.png'


// Infinit background

const backgroundRoad = new Image();
backgroundRoad.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Background/size/1.jpg';

const backgroundTurn = new Image();
backgroundTurn.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Background/size/2.jpg';

const backgroundBack = new Image();
backgroundBack.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Background/size/3.jpg';

const backgroundPark = new Image();
backgroundPark.src = 'graphicriver-mNsfp3ua-game-assets-robber-run/PNG/Background/size/4.jpg';

const BG =  {
  y1: 0,
  y2: -canvas1.height,
  x: 0,
  width: canvas1.width,
  height: canvas1.height
}

var currentTile
var previousType = 'road'
var randTen
var source, source1
var type
var first = true
var first1 = true

function function_name() {
  if (previousType == 'road') {
    // Randomly Choose the next type
    rendTen = Math.floor(Math.random()*5)
    if (rendTen > 0) type = 'road'
    else type = 'turn'
  }
  if (previousType == 'turn') type = 'park'
  if (previousType == 'park') {
    rendTen = Math.floor(Math.random()*3)
    if (rendTen > 0) type = 'park'
    else type = 'back'
  }
  if (previousType == 'back') type = 'road'
 }

function handleBackground() {
  if (!first) {
    if (Math.floor( BG.y1) - Math.floor(obstacleSpeed) == -canvas1.height) {
      function_name()
    if (type == 'road') {
      source = backgroundRoad
      previousType = 'road'
    }
    if (type == 'turn') {
      source = backgroundTurn
      previousType = 'turn'
    }
    if (type == 'park') {
      source = backgroundPark
      previousType = 'park'
    }
    if (type == 'back') {
      source = backgroundBack
      previousType = 'back'
    }
  } // if 1
} // If main
 if (first){
    source = backgroundRoad
    first = false
  } // else

  if (!first) {
    if (Math.floor( BG.y2) - Math.floor(obstacleSpeed) == -canvas1.height) {
    function_name()
    if (type == 'road') {
      source1 = backgroundRoad
      previousType = 'road'
    }
    if (type == 'turn') {
      source1 = backgroundTurn
      previousType = 'turn'
    }
    if (type == 'park') {
      source1 = backgroundPark
      previousType = 'park'
    }
    if (type == 'back') {
      source1 = backgroundBack
      previousType = 'back'
    }
   } //
  } // main if
  if (first1){
    source1 = backgroundRoad
    first1 = false
  }





  if (BG.y1 >= BG.height - obstacleSpeed*speedIncreaser*2) BG.y1 = -canvas1.height;
  else BG.y1 += obstacleSpeed * speedIncreaser

  if (BG.y2 >= BG.height - obstacleSpeed*speedIncreaser*2) BG.y2 = -canvas1.height
  else BG.y2 += obstacleSpeed * speedIncreaser

  ctx1.drawImage(source, BG.x, BG.y1, BG.width, BG.height)
  ctx1.drawImage(source1, BG.x, BG.y2, BG.width, BG.height)
} // fnc


// #################################### //
// Here I work with obstacle generation //
// #################################### //

var firstLine = 5 ;
var secondLine = 5 ;
var thirdLine = 5 ;


var carColor





