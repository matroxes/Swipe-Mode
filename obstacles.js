var res

function generateType() {
    if (obstacleLine == 0) {
        // can-0, stone-1, log-2
        res = Math.floor(Math.random()*3)
        switch (res) {
            case 0:
                obstacleType = 'can'
                break;
            case 1:
                obstacleType = 'stone'
                break;
            case 2:
                obstacleType = 'log'
                break;
            default:
                break;
        }
        }
    if (obstacleLine == 1) {
        // can-0, stone-1, log-2, cone-3
        res = Math.floor(Math.random()*4)
        switch (res) {
            case 0:
                obstacleType = 'can'
                break;
            case 1:
                obstacleType = 'stone'
                break;
            case 2:
                obstacleType = 'log'
                break;
            case 3:
                obstacleType = 'cone'
                break;
            default:
                break;
        }
        }
    if (obstacleLine == 2) {
          if (type != 'park' && type != 'turn' && type != 'back') {
            obstacleType = 'car'
        } else {
            // can-0, stone-1, log-2
        res = Math.floor(Math.random()*3)
        switch (res) {
            case 0:
                obstacleType = 'can'
                break;
            case 1:
                obstacleType = 'stone'
                break;
            case 2:
                obstacleType = 'log'
                break;
            default:
                break;
        }
        }
    }
}


