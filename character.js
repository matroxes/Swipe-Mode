

class Character {
    constructor(playerX, playerY, playerW, playerH) {
        this.playerX = playerX;
        this.playerY = playerY;
        this.playerW = playerW;
        this.playerH = playerH;
    }

    draw() {
        ctx1.fillStyle = '#bb00ff';
        ctx1.fillRect(this.playerX, this.playerY, this.playerW, this.playerH)
    }
}

var player = new Character(playerStartX, playerY, playerW, playerH)

player.draw()

var moveTrigger = 0;
var moveCounter = 0;
var nowIsMovingLeft = false
var nowIsMovingRight = false

function game() {
    ctx1.clearRect(0, 0, canvas2.width, canvas2.height)
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
    player.draw()
    if (moveTrigger == 1 && !nowIsMovingRight && moveLeftCounter < 3) { moveLeft() }
    if (moveTrigger == 2 && !nowIsMovingLeft  && moveRightCounter < 3) { moveRight() }

    requestAnimationFrame(game)
}


// swiped-left
canvas1.addEventListener('swiped-left', function(e) {
    if (!nowIsMovingLeft && !nowIsMovingRight  && moveLeftCounter < 2) {
        console.log('left');
        moveLeftCounter++
        moveRightCounter--
        moveTrigger = 1;
    }

});

// swiped-right
canvas1.addEventListener('swiped-right', function(e) {
    if (!nowIsMovingLeft && !nowIsMovingRight && moveRightCounter < 2) {
        console.log('right');
        moveRightCounter++
        moveLeftCounter--
        moveTrigger = 2;
    }
});


function moveLeft () {
    if (moveCounter <= Math.floor(line)/speed) {
        nowIsMovingLeft = true;
        player.playerX -= speed;
        moveCounter++
    } else {
        nowIsMovingLeft = false;
        moveCounter = 0;
        moveTrigger = 0;
    }
}
function moveRight () {
    if (moveCounter <= Math.floor(line)/speed) {
        nowIsMovingRight = true;
        player.playerX += speed;
        moveCounter++

    } else {
        nowIsMovingRight = false;
        moveCounter = 0;
        moveTrigger = 0;
    }
}


if (!PC) {
    game()
} else {
    ctx1.fillStyle = '#ffffff';
    ctx1.fillRect(0, 0, canvas1.width, canvas1.height)
    ctx1.fillStyle = '#000';
    ctx1.font = '20px Roboto';
    ctx1.fillText('Sory, the game is unavailable on this device.', canvas1.width/2-200, canvas1.height/2 - 30)
    ctx1.fillText('Please use smartphone or tablet.', canvas1.width/2-160, canvas1.height/2 + 30)
}

