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

function flipFish(event) {
    let fish = event.currentTarget;
    let id = parseInt(fish.id) || 1;
    let index = id - 1;
    let probability = Math.random();

    //60% chance to flip
    if (probability < 0.6) {
        if(fish.style.transform === "scaleX(1)") {
            fish.style.transform = "scaleX(-1)";
        } else {
            fish.style.transform = "scaleX(1)";
        }

        if (directions[index] === "left") {
            directions[index] = "right";
            //fish.style.transform = "scaleX(-1)";
        } else {
            directions[index] = "left";
            //fish.style.transform = "scaleX(1)";
        }

        // Stop the current timer
        clearInterval(timerIds[index]);

        //New timer, with updated info?
        timerIds[index] = setInterval(() => moveFish(fish), 30);
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

        if(fish.style.transform === "scaleX(1)") {
            fish.style.transform = "scaleX(-1)";
        } else {
            fish.style.transform = "scaleX(1)";
        }

         //fish.style.transform = "scaleX(-1)";
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

         if(fish.style.transform === "scaleX(1)") {
            fish.style.transform = "scaleX(-1)";
        } else {
            fish.style.transform = "scaleX(1)";
        }

         //fish.style.transform = "scaleX(-1)"; //1
         //clearInterval(timerIds[index]);
         //timerIds[index] = setInterval(() => moveFish(fish), 15*id);
      } else {
         fish.style.left = (left + 5) + "px";
      }
   }
}