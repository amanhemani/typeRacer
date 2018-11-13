const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var curTime; //current time in milliseconds
var hundSecs;
var secs;
var mins;
var started = false;
var interval;
var win = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function convTime(num){
    if(num<10)
        return ("0" + num);
    return num;
}


// Run a standard minute/second/hundredths timer:
function runTimer(){
    //hund-seconds
       hundSecs = (hundSecs+1)%100;
    if(hundSecs==0 && curTime!=0){
        secs = (secs+1)%60;
    }
    if(secs==0 && hundSecs==0 && curTime!=0){
        mins++;
    }
    curTime++;
    theTimer.innerHTML = convTime(mins) +":"+ convTime(secs) +":"+ convTime(hundSecs);

}

// Match the text entered with the provided text on the page:
function checkMatch(e){
    originTextSlice = originText.substring(0,testArea.value.length);
    if(originTextSlice == testArea.value){
        if(testArea.value.length == originText.length){
            win = true;
            clearInterval(interval);
            testWrapper.style.borderColor = "green";
        }else{
            if(!win){testWrapper.style.borderColor = "blue";}    
        }
    }else{
        if(!win){testWrapper.style.borderColor = "red";}
    }
    


}


// Start the timer:
function start(e){
    if(!started){
        curTime = 0;
        hundSecs =0;
        secs=0;
        mins=0;
        interval = setInterval(runTimer, 10);
        started = true;
    }

}

// Reset everything:
function resetAll(){
    clearInterval(interval);
    interval = null;
    testWrapper.removeAttribute("style");
    theTimer.innerHTML = "00:00:00";
    testArea.value = "";
    started =false;
    win = false;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", checkMatch, false);
resetButton.addEventListener("click", resetAll, false);