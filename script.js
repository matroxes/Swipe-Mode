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
const playerW = Math.floor(canvas1.width/5)
const playerH = Math.floor(playerW * (2.5/1.5))
const playerY = Math.floor (canvas1.height - playerH - (canvas1.height * (2/13)))
const playerStartX = (canvas1.width/2) - playerW/2
const speed = line/10;
const obstacleSpeed = canvas1.width/100;

const obstacleWidth = Math.floor(line/1.2);
const obstacleHeight = Math.floor(line/1.2);

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


// Images

const golem = new Image()
golem.src = 'Pit_Trap_Spikes.png'

const car = new Image()
car.src = 'city_cars_2 (1).png'
