/*
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
        left = 0; //Reset position
    } else {
        left += 5; //Move the fish to the right
    
    }
    fishElements[id - 1].style.left = left + "px";   
}*/

let fishImages;
let timerIds = [];
let directions = [];
let flipIds = [];

document.addEventListener("DOMContentLoaded", () => {
    // Randomly assign an image to each fish
    const fishElements = document.querySelectorAll(".fish");
    const tank = document.querySelector(".tank");

    fishElements.forEach(fish => {
        const randomImageNumber = Math.floor(Math.random() * 7) + 1;
        fish.src = `fish${randomImageNumber}.png`;
        let id = parseInt(fish.id) || 1;

        //Randomly position each fish
        fish.style.top = `${Math.random() * (tank.clientHeight - fish.height)}px`;
        fish.style.right = `${Math.random() * (tank.clientWidth - fish.width)}px`;
        fish.style.left = "auto";

        if (randomImageNumber === 1 || randomImageNumber === 3) {
            directions[id - 1] = "left";
        } else {
            directions[id - 1] = "right";
        }
    });

    // Start swimming when loads
    startMoving();
});

function startMoving() {        
   fishImages = document.getElementsByClassName("fish"); //CONSISTENCY

   for (let fish of fishImages) {
        let id = parseInt(fish.id) || 1;

        //let timerId = setInterval(() => { moveFish(fish, timerId); }, 30);
        let timerId = setInterval(() => moveFish(fish), 30);
        timerIds.push(timerId);

        let flipId = setInterval(() => flipFish(fish), Math.floor(Math.random() * 5000) + 2000); // Random interval between 2 and 8 seconds
        flipIds.push(flipId);

        fish.addEventListener("click", changeSpeed);
   }
}

function flipFish(fish) {
    let id = parseInt(fish.id) || 1;
    let index = id - 1;
    let probability = Math.random();

    //50% chance to flip
    if (probability < 0.5) {
        if (directions[index] === "left") {
            directions[index] = "right";
            fish.style.left = (parseFloat(fish.style.right) || 0) + "px";
            fish.style.right = "auto";
            fish.style.transform = "scaleX(-1)";
        } else {
            directions[index] = "left";
            fish.style.left = "auto";
            fish.style.right = (parseFloat(fish.style.left) || 0) + "px";
            fish.style.transform = "scaleX(1)";
        }
    }
}

function changeSpeed(event) {
    let fish = event.currentTarget;
    let id = parseInt(fish.id) || 1;
    let index = id - 1; //array

    // Stop the current timer
    clearInterval(timerIds[index]);

    // Temporarily increase the speed
    timerIds[index] = setInterval(() => moveFish(fish), 15);

    // Return to the original speed after 3 seconds
    setTimeout(() => {
        clearInterval(timerIds[index]);

        timerIds[index] = setInterval(() => moveFish(fish), 30);
    }, 3000);
}

function moveFish(fish, timerId) {
   let id = parseInt(fish.id) || 1;
   let index = id - 1; //array
   let tank = document.querySelector(".tank");
   let max = tank.clientWidth - fish.offsetWidth; //need?
   
   if(directions[index] === "left") {
      let right = parseFloat(fish.style.right) || 0;
      
      if (right >= max) { //change to depend on tank
         directions[index] = "right";
         fish.style.left = (max - right) + "px";
         fish.style.right = "auto";
         fish.style.transform = "scaleX(-1)";
         //clearInterval(timerIds[index]);
         //timerIds[index] = setInterval(() => moveFish(fish), 15*id);
      } else {
         fish.style.right = (right + 5) + "px";
      }
   } else {
      let left = parseFloat(fish.style.left) || 0;
   
      if (left >= max) { //change to depend on tank
         directions[index] = "left";
         fish.style.left = "auto";
         fish.style.right = "0px";
         fish.style.transform = "scaleX(1)";
         //clearInterval(timerIds[index]);
         //timerIds[index] = setInterval(() => moveFish(fish), 15*id);
      } else {
         fish.style.left = (left + 5) + "px";
      }
   }
}