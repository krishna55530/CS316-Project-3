// var fishEl = document.getElementById("fish"); //all fish elements??
const fishElements = document.querySelectorAll(".fish"); //by class, diff?
let timerIds = [];

fishElements.forEach(fishEl => {
    fishEl.addEventListener("click", changeSpeed);
});

function startSwimming() {
    for (let fish in fishElements) {
        let id = parseInt(fish.id) || 1;

        let timerId = setInterval(() => { swim(fish, timerId); }, 5*id);
        timerIds.push(timerId);
    }
}

function changeSpeed(event) { //need another timer?
    event.target.style.left = parseInt(event.target.style.left || 0) + 5 + "px";
}

function swim(fish, timerId) {
    let id = event.target.id;
    let left = parseInt(fishElements[id - 1].style.left) || 0;

    if (left >= window.innerWidth) { //CHANGE FOR TANK
        left = -100; //Reset position
    } else {
        left += 5; //Move the fish to the right
    
    }
    fishElements[id - 1].style.left = left + "px";   
}

