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

document.addEventListener("DOMContentLoaded", () => {
    // Randomly assign an image to each fish
    const fishElements = document.querySelectorAll(".fish");

    fishElements.forEach(fish => {
        const randomImageNumber = Math.floor(Math.random() * 7) + 1;
        fish.src = `fish${randomImageNumber}.png`;

        // Position each fish
        fish.style.position = "absolute";
        fish.style.right = "0px";
    });

    // Start swimming when loads
    startMoving();
});

function startMoving() {        
   fishImages = document.getElementsByClassName("fish");

   for (let fish of fishImages) {
      let id = parseInt(fish.id) || 1;
      
      if(!fish.style.right) {
         fish.style.right = "0px";
      }

      let timerId = setInterval(() => { moveFish(fish, timerId); }, 25*id);
      timerIds.push(timerId);

      fish.addEventListener("click", changeSpeed);
   }
}

function changeSpeed(event) {
    let fish = event.currentTarget;
    let id = parseInt(fish.id) || 1;
    let index = id - 1; //array

    // Stop the current timer
    clearInterval(timerIds[index]);

    // Temporarily increase the speed
    timerIds[index] = setInterval(
        () => moveFish(fish),
        12 * id
    );

    // Return to the original speed after 3 seconds
    setTimeout(() => {
        clearInterval(timerIds[index]);

        timerIds[index] = setInterval(
            () => moveFish(fish),
            25 * id
        );
    }, 3000);
}

function moveFish(fish, timerId) {
   let right = parseInt(fish.style.right) || 0;
   
   if (right + fish.width > document.body.clientWidth) { //change to depend on tank
      //clearInterval(timerId);
      fish.style.right = "0px";
   } else {
      fish.style.right = (right + 5) + "px";
   }
}