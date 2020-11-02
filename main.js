const wictory = document.querySelector('.wictory')
const youWin = document.querySelector('.youWin')

const btn = document.querySelector('.again')

btn.addEventListener('click', () => {
    location.reload();
})

var rawConter = 0;
var columnCounter = 0;

const spriteW = 272
const spriteH = 353

const jumpW = 273
const jumpH = 393

var rawConterJump = 0;
var columnCounterJump = 0;
var imgCounter = 0

var jumpFrames = 0
var framesPast = 0


const minus = 80
const plus = minus/2


class Character {
    constructor(playerX, playerY, playerW, playerH) {
        this.playerX = playerX;
        this.playerY = playerY;
        this.playerW = playerW;
        this.playerH = playerH;
    }

    draw() {
        ctx1.fillStyle = '#f7b045';
        // ctx1.fillRect(this.playerX+plus, this.playerY, this.playerW-minus, this.playerH)

        if (nowJump) { ctx1.drawImage(characterJump, columnCounterJump*jumpW, 0, jumpW, jumpH,
            this.playerX, this.playerY, this.playerW, this.playerH) //!!!! CHANGE THIS WHEN YOU START WORKING WITH SPRITES  !!!!
            jumpFrames++
            if (jumpFrames == 5) {
                columnCounterJump++
            }
            if (jumpFrames == 30) {
                columnCounterJump++
            }
            if (jumpFrames == 40) {
                columnCounterJump++
            }
            if (jumpFrames == 40) {
                columnCounterJump = 0
                jumpFrames = 0
            }

        }


        //

        if (framesPast == 4) {
        columnCounter++
        if ((rawConter == 0 || rawConter == 1) && columnCounter == 3) {
            rawConter++
            columnCounter = 0
        }
        if (rawConter == 2 && columnCounter == 1) {
            rawConter = 0
            columnCounter = 0
          }
          framesPast = 0
        } else framesPast++
        if (!nowJump) ctx1.drawImage(character, columnCounter*spriteW, rawConter*spriteH, spriteW, spriteH,
            this.playerX, this.playerY, this.playerW, this.playerH)
    }
}
var player = new Character(playerStartX, playerY, playerW, playerH)

player.draw()

class Obstacle{
    constructor(obstacleType, obstacleLine, color){
        this.x
        this.y = -500;
        this.obstacleType = obstacleType;
        this.obstacleLine = obstacleLine;
        this.color = color
    }

    draw() {
        switch (this.obstacleType) {
            case 'can':
                obstacleWidth = canW;
                obstacleHeight = canH;
                imageSrc = trashI
                break;
            case 'stone':
                obstacleWidth = stoneW;
                obstacleHeight = stoneH;
                imageSrc = stoneI
                break;
            case 'log':
                obstacleWidth = logW;
                obstacleHeight = logH;
                imageSrc = logI
                break;
            case 'cone':
                obstacleWidth = coneW;
                obstacleHeight = coneH;
                imageSrc = coneI
                break;
            case 'car':
                obstacleWidth = carW;
                obstacleHeight = carH;


                if (this.color == 0) imageSrc = car1I
                if (this.color == 1) imageSrc = car2I
                if (this.color == 2) imageSrc = car3I
                break;
            default:
                break;
        }
                if (this.obstacleLine == 0) {
                    this.x = line/2 - obstacleWidth/2 }
                if (this.obstacleLine == 1) {
                    this.x = line/2  + line - obstacleWidth/2  }
                if (this.obstacleLine == 2) {
                    this.x = line*2 }


        ctx1.fillStyle = 'red';
        //ctx1.fillRect(this.x, this.y, obstacleWidth, obstacleHeight)
        ctx1.drawImage(imageSrc, this.x, this.y, obstacleWidth, obstacleHeight)


    }
    update() {
        this.y += obstacleSpeed*speedIncreaser;
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
var addNextTime = 0;

var scoreIncreaser = 1
var speedIncreaser = 1

var lose = false

function game() {
    setTimeout( () => {
        ctx1.clearRect(0, 0, canvas2.width, canvas2.height)
        handleBackground()

            if (obstacleCounter >= playerH/1.8 && type != 'turn'  && type !='back') {
                genLine()
                generateType()
                carColor = Math.floor(Math.random()*3)

                obstacleArray.push(new Obstacle(obstacleType, obstacleLine, carColor))
                obstacleCounter = 0;
            }
        else {obstacleCounter += speedIncreaser}

        obstacleArray.forEach( function(element) {
            element.draw()
            element.update()
            isCollision(element)
            if (element.y > canvas1.height + frameSpeed*obstacleSpeed*4 + 10) {  obstacleArray.splice(element, 1)   }
            //

    });
        /*ctx1.fillStyle = 'yellow'
        ctx1.arc(100, 100, coinSize, 0, 2 * Math.PI)
        ctx1.fill()*/
        player.draw()
        if (moveTrigger == 1 && !nowIsMovingRight && moveLeftCounter < 3 && obstaclePosition != 'left') { moveLeft() }
        if (moveTrigger == 2 && !nowIsMovingLeft  && moveRightCounter < 3 && obstaclePosition != 'right') { moveRight() }
        if (nowJump) {jump()}

        updateScore()
        if (!lose) {
            requestAnimationFrame(game)
        } else {
            fallPlayer()

            setTimeout(() => {
                youWin.innerHTML = 'Score: ' + textString;
            wictory.classList.remove('wictory-hidden')
            wictory.classList.add('wictory-active')
        }, 300)

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
//// ARROWS END /////
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
    if (jumpCounter < 40) {
        jumpCounter++
    } else {
        nowJump = false;
        jumpCounter = 0;
    }
}



// Couple functions for obstacles
function removeObstacle(e) {
    obstacleArray.splice(e, 1) // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}



//ʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌʌ//
// Collision Detetcion //
//vvvvvvvvvvvvvvvvvvv// (player.playerX+plus)

function isCollision(e) {
    if ((Math.floor(playerY + playerH*0.4) == (e.y + obstacleHeight) ||
        Math.floor(playerY + playerH*0.4) == (e.y + obstacleHeight + 1) ||
        Math.floor(playerY + playerH*0.4) == (e.y + obstacleHeight + 2) ||
        Math.floor(playerY + playerH*0.4) == (e.y + obstacleHeight + 3))
      && (player.playerX+plus) >= e.x && (player.playerX+plus) <= (e.x + line-20) && !nowJump ) {
        console.log('Collision');
        lose = true;
    }

    if (e.y < player.playerY + player.playerH  && e.y > player.playerY - obstacleHeight + playerH*0.9 && !nowJump && e.obstacleType != 'car') { // Player touch  obstacle , exept car

        if (e.x > (player.playerX+plus) && e.x - (player.playerW-minus) - speed + 4 <= (player.playerX+plus) && !nowJump) { //Right
            console.log(e.x + ' - ' + (player.playerX+plus));
            lose = true //_____________________________________CHANGE THIS
        }

        if (e.x < (player.playerX+plus) && e.x + obstacleWidth + speed - 4 >= (player.playerX+plus) && !nowJump) {
            console.log(e.x + ' - ' + (player.playerX+plus));
            lose = true //_____________________________________CHANGE THIS
        }

    }

    if (e.y < player.playerY + player.playerH - playerH*0.3 && e.y > player.playerY - obstacleHeight + playerH*0.9  && e.obstacleType == 'car') { // Player touch  a Car

        if (e.x > (player.playerX+plus) && e.x - (player.playerW-minus)  <= (player.playerX+plus) ) { //Right
            console.log(e.x + ' - ' + (player.playerX+plus));
            lose = true //_____________________________________CHANGE THIS
        }

        if (e.x < (player.playerX+plus) && e.x + obstacleWidth  >= (player.playerX+plus) ) {
            console.log(e.x + ' - ' + (player.playerX+plus));
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
    if (scoreCounter >= 1000 && scoreCounter < 3000) {
    scoreIncreaser = 2
    speedIncreaser = 1
    }
    if (scoreCounter >= 3000 && scoreCounter < 5000 ) {
        scoreIncreaser = 3
        speedIncreaser = 1
    }
    if (scoreCounter >= 5000 && scoreCounter < 10000) {
        scoreIncreaser = 6
        speedIncreaser = 1
    }
    if (scoreCounter >= 10000 && scoreCounter < 20000 ) {
        scoreIncreaser = 8
        speedIncreaser = 1
    }
    if (scoreCounter >= 20000 && scoreCounter < 50000 ) {
        scoreIncreaser = 11
        speedIncreaser = 1
    }
    if (scoreCounter >= 50000 && scoreCounter < 100000) {
        scoreIncreaser = 16
        speedIncreaser = 1
    }
    if (scoreCounter >= 100000) {
        scoreIncreaser = 21
        speedIncreaser = 1
    }
}

var firstCheck, secondCheck, thirdCheck

function genLine() {

    if (type != 'turn' && type != 'park' && type !='back') {
        firstCheck = Math.floor (Math.random()*3)
    } else {
        firstCheck = Math.floor (Math.random()*2)
    }
    switch (firstCheck) {
        case 0:
            firstLineCheck()
            break;
        case 1:
            secondLineCheck()
            break;
        case 2:
            thirdLineCheck()
            break;
    }
}


var columnCounterFall = 0
function fallPlayer() { // Fall anmation
    setTimeout(() => {
        ctx1.clearRect(0, 0, canvas2.width, canvas2.height)
        handleBackground()
    obstacleArray.forEach( function(element) {
            element.draw()
            element.update() });
        ctx1.drawImage(characterFall, columnCounterFall*jumpW, 0, jumpW, jumpH,
            player.playerX, player.playerY-20, player.playerW, player.playerH)
        columnCounterFall++
    if (columnCounterFall < 4) {
        fallPlayer()
    }
    }, 1000/frameSpeed)


}





/*obstacleLine = Math.floor(Math.random()*3)*/

game()





