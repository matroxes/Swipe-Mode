var device =  window.matchMedia('(min-width: 320px) and (max-width: 1280px)').matches;

var canvas1 = document.querySelector('#canvas-1')
var canvas2 = document.querySelector('#canvas-2')

var ctx1, ctx2

var PC

if (device) {  // Check if it mobile device
  canvas1.width = innerWidth
  canvas1.height = innerHeight
  canvas2.width = innerWidth
  canvas2.height = innerHeight

  ctx1 = canvas1.getContext('2d');
  ctx2 = canvas2.getContext('2d');
}



if(!device) { // Check if it Tablet or PC
  canvas1.width = 600;
  canvas1.height = 600;
  canvas2.width = 600;
  canvas2.height = 600;

  ctx1 = canvas1.getContext('2d');
  ctx2 = canvas2.getContext('2d');

  PC = true
}

// Define global variables
const line = canvas1.width/3
const playerW = line - line/5
const playerH = playerW
const playerY = canvas1.height - playerH - 40
const playerStartX = (canvas1.width/2) - playerW/2
const speed = 16;


var moveLeftCounter = 1
var moveRightCounter = 1

/*ctx1.fillRect(playerStartX, playerY, playerW, playerH)*/



