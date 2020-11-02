function firstLineCheck() { // ------------------- First
switch (firstLine) {
    case 5:
        obstacleLine = 0

        firstLine -= 1
        secondLine = 5
        thirdLine = 5
        break;

    case 4:
        secondCheck = Math.floor(Math.random()*100)
        if (secondCheck <= 30) obstacleLine = 0;
            else {
                thirdCheck = Math.floor(Math.random()*2);
                switch (thirdCheck) {
                    case 0:
                        secondLine = 5;
                        thirdLine = 5;
                        secondLineCheck()
                        break;
                    case 1:
                        secondLine = 5;
                        thirdLine = 5;
                        thirdLineCheck()
                        break;
                }
            }

        firstLine -= 1
        secondLine = 5
        thirdLine = 5
        break;

    case 3:
        thirdCheck = Math.floor(Math.random()*2);
        switch (thirdCheck) {
            case 0:
                secondLine = 5;
                thirdLine = 5;
                secondLineCheck()
                break;
            case 1:
                secondLine = 5;
                thirdLine = 5;
                thirdLineCheck()
                break;

        break;
    }
}
}



function secondLineCheck() { // ______________ Second
switch (secondLine) {
    case 5:
        obstacleLine = 1

        firstLine = 5
        secondLine -= 1
        thirdLine = 5
        break;

    case 4:
        secondCheck = Math.floor(Math.random()*100)
        if (secondCheck <= 30) obstacleLine = 1;
            else {
                thirdCheck = Math.floor(Math.random()*2);
                switch (thirdCheck) {
                    case 0:
                        firstLine = 5
                        thirdLine = 5;
                        firstLineCheck()
                        break;
                    case 1:
                        firstLine = 5
                        thirdLine = 5;
                        thirdLineCheck()
                        break;
                }
            }

        firstLine = 5
        secondLine -= 1
        thirdLine = 5
        break;

    case 3:
        thirdCheck = Math.floor(Math.random()*2);
        switch (thirdCheck) {
            case 0:
                firstLine = 5
                thirdLine = 5;
                firstLineCheck()
                break;
            case 1:
                firstLine = 5
                thirdLine = 5;
                thirdLineCheck()
                break;

        break;
    }
}
}


function thirdLineCheck() { // -----------Third
switch (thirdLine) {
    case 5:
        obstacleLine = 2

        firstLine = 5
        secondLine = 5
        thirdLine -= 1
        break;

    case 4:
        secondCheck = Math.floor(Math.random()*100)
        if (secondCheck <= 30) obstacleLine = 2;
            else {
                thirdCheck = Math.floor(Math.random()*2);
                switch (thirdCheck) {
                    case 0:
                        firstLine = 5
                        secondLine = 5
                        firstLineCheck()
                        break;
                    case 1:
                        firstLine = 5
                        secondLine = 5
                        secondLineCheck()
                        break;
                }
            }

        firstLine = 5
        secondLine = 5
        thirdLine -= 1
        break;

    case 3:
        thirdCheck = Math.floor(Math.random()*2);
        switch (thirdCheck) {
            case 0:
                firstLine = 5
                secondLine = 5
                firstLineCheck()
                break;
            case 1:
            firstLine = 5
                secondLine = 5
                secondLineCheck()
                break;

        break;
    }
}
}
