const wictory = document.querySelector('.wictory')
const youWin = document.querySelector('.youWin')

const btn = document.querySelector('.again')

btn.addEventListener('click', () => {
    location.reload();
})

class Character {
    constructor(playerX, playerY, playerW, playerH) {
        this.playerX = playerX;
        this.playerY = playerY;
        this.playerW = playerW;
        this.playerH = playerH;
    }

    draw() {
        ctx1.fillStyle = '#f7b045';

        // if (nowJump) {ctx1.fillStyle = '#bbff00';} //!!!! CHANGE THIS WHEN YOU START WORKING WITH SPRITES  !!!!

        /*ctx1.fillRect(this.playerX, this.playerY, this.playerW, this.playerH)*/
        ctx1.drawImage(car, this.playerX, this.playerY, this.playerW, this.playerH)
    }
}
var player = new Character(playerStartX, playerY, playerW, playerH)

player.draw()

class Obstacle{
    constructor(x){
        this.x = x;
        this.y = -obstacleHeight - 10;
    }

    draw() {
        ctx1.fillStyle = 'red';
        /*ctx1.fillRect(this.x, this.y, obstacleWidth, obstacleHeight)*/
        ctx1.drawImage(golem, this.x, this.y, obstacleWidth, obstacleHeight)


    }
    update() {
        this.y += obstacleSpeed;
    }
}

var obstacleX


var obstacleArray = []






var moveTrigger = 0;
var moveCounter = 0;
var jumpCounter = 0;
var nowIsMovingLeft = false
var nowIsMovingRight = false
var keyPressed = false;

var obstacleCounter = 0;
var obstacleLine;
var obstaclePosition;

var scoreIncreaser = 1

var lose = false

function game() {
    setTimeout( () => {
        ctx1.clearRect(0, 0, canvas2.width, canvas2.height)

        if (obstacleCounter >= frameSpeed*1.2 ) {
            // obstacleX = Math.floor(Math.random()*3) * (line +10)
            obstacleLine = Math.floor(Math.random()*3)
            if (obstacleLine == 0) {
                obstacleX = line/2 - obstacleWidth/2 }
            if (obstacleLine == 1) {
                obstacleX = line/2  + line - obstacleWidth/2  }
            if (obstacleLine == 2) {
                obstacleX = line/2  + line*2 - obstacleWidth/2 }

            obstacleArray.push(new Obstacle(obstacleX))
            obstacleCounter = 0;
        } else {obstacleCounter++}

        obstacleArray.forEach( function(element) {
            element.draw()
            element.update()
            isCollision(element)
            if (element.y > canvas1.height + frameSpeed*1.2*obstacleSpeed + 10) {  removeObstacle(element)   }
            //

    });

        player.draw()
        if (moveTrigger == 1 && !nowIsMovingRight && moveLeftCounter < 3 && obstaclePosition != 'left') { moveLeft() }
        if (moveTrigger == 2 && !nowIsMovingLeft  && moveRightCounter < 3 && obstaclePosition != 'right') { moveRight() }
        if (nowJump) {jump()}

        updateScore()

        if (!lose) {
            requestAnimationFrame(game)
        } else {
            youWin.innerHTML = 'Score: ' + textString;
            wictory.classList.remove('wictory-hidden')
            wictory.classList.add('wictory-active')
        }

    }, 1000/frameSpeed)
}


    /////////////
////SWIPES START/////
   /////////////
// swiped-left
canvas1.addEventListener('swiped-left', function(e) {
    if (!nowIsMovingLeft && !nowIsMovingRight  && moveLeftCounter < 2) {
        moveLeftCounter++
        moveRightCounter--
        moveTrigger = 1;
    }

});

// swiped-right
canvas1.addEventListener('swiped-right', function(e) {
    if (!nowIsMovingLeft && !nowIsMovingRight && moveRightCounter < 2) {
        moveRightCounter++
        moveLeftCounter--
        moveTrigger = 2;
    }
});

// swiped-up
canvas1.addEventListener('swiped-up', function(e) {
  if (!nowJump) {
    nowJump = true;
  }
});



    /////////////
////SWIPES END/////
   /////////////


    //%%%%%%%%%%//
////ARROWS START/////
   //%%%%%%%%%%%//
// arrow-keys
addEventListener('keydown', function(event) {
    if (event.keyCode == 37 && !keyPressed) { // Left
        if (!nowIsMovingLeft && !nowIsMovingRight  && moveLeftCounter < 2 ) {
        keyPressed = true
        moveLeftCounter++
        moveRightCounter--
        moveTrigger = 1;
    }  }

    if (event.keyCode == 39 && !keyPressed) { //Right
    if (!nowIsMovingLeft && !nowIsMovingRight && moveRightCounter < 2) {
        keyPressed = true
        moveRightCounter++
        moveLeftCounter--
        moveTrigger = 2;
    } }

    if (!nowJump && event.keyCode == 38) { // Up
    nowJump = true;
  }

});

    //%%%%%%%%%%//
////ARROWS END/////
   //%%%%%%%%%%%//


function moveLeft () {
    if (moveCounter <= Math.floor(line-10)/speed) {
        nowIsMovingLeft = true;
        player.playerX -= speed;
        moveCounter++
    } else {
        keyPressed = false;
        nowIsMovingLeft = false;
        moveCounter = 0;
        moveTrigger = 0;
    }
}
function moveRight () {
    if (moveCounter <= Math.floor(line-10)/speed) {
        nowIsMovingRight = true;
        player.playerX += speed;
        moveCounter++
    } else {
        keyPressed = false;
        nowIsMovingRight = false;
        moveCounter = 0;
        moveTrigger = 0;
    }
}

function jump() {
    if (jumpCounter < 60) {
        jumpCounter++
    } else {
        nowJump = false;
        jumpCounter = 0;
    }
}



// Couple functions for obstacles
function removeObstacle(e) {
    obstacleArray.splice(e, 1)
}



//ʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌ//
// Collision Detetcion //
//vvvvvvvvvvvvvvvvvvv//

function isCollision(e) {
    if ((Math.floor(playerY + playerH*0.4) == (e.y + obstacleHeight) ||
        Math.floor(playerY + playerH*0.4) == (e.y + obstacleHeight + 1) ||
        Math.floor(playerY + playerH*0.4) == (e.y + obstacleHeight + 2) ||
        Math.floor(playerY + playerH*0.4) == (e.y + obstacleHeight + 3))
      && player.playerX >= e.x && player.playerX <= (e.x + line-20) && !nowJump) {
        console.log('Collision');
        lose = true;
    }

    if (e.y < player.playerY + player.playerH && e.y > player.playerY - obstacleHeight + playerH*0.4) { // Player touch  obstacle on the left side

        if (e.x > player.playerX && e.x - player.playerW - speed + 4 <= player.playerX) { //Right
            console.log(e.x + ' - ' + player.playerX);
            lose = true //_____________________________________CHANGE THIS
        }

        if (e.x < player.playerX && e.x + obstacleWidth + speed - 4 >= player.playerX) {
            console.log(e.x + ' - ' + player.playerX);
            lose = true //_____________________________________CHANGE THIS
        }
    }
}

var textString;

// Working With Score
function updateScore() {
    increaseScorePoints()
    scoreCounter += scoreIncreaser
    ctx1.fillStyle = 'white'
    ctx1.font = (fontSize|0) + "px Roboto";
    textString = Math.floor (scoreCounter)
    textWidth = ctx1.measureText(textString ).width;
    ctx1.fillText(textString , (canvas1.width/2) - (textWidth / 2), downGap);
}

function increaseScorePoints() {
    switch (scoreCounter) {
        case 500:
           scoreIncreaser = 1.5
            break;
        case 1000:
            scoreIncreaser = 2
        case 3000:
            scoreIncreaser = 2.5
        case 5000:
            scoreIncreaser = 3
        case 10000:
            scoreIncreaser = 3.5
        case 20000:
            scoreIncreaser = 4
        case 50000:
            scoreIncreaser = 4.5
        case 100000:
            scoreIncreaser = 5
        default:
            scoreIncreaser = 1
            break;
    }
}

//player.playerX + e.x < player.playerX + player.playerW + obstacleWidth + obstacleWidth/2
game()


