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
        
        const id = parseInt(fish.id) || 1;
        const index = id - 1;

        //Randomly position each fish
        fish.style.top = `${Math.random() * (tank.clientHeight - fish.offsetHeight)}px`;
        fish.style.right = `${Math.random() * (tank.clientWidth - fish.offsetWidth)}px`;
        fish.style.left = "auto";

        fish.style.transform = "scaleX(1)";

        if (randomImageNumber === 1 || randomImageNumber === 3) {
            directions[index] = "left";
        } else {
            directions[index] = "right";
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

        let flipId = setInterval(() => flipFish(fish), Math.floor(Math.random() * 6000) + 2000); // Random interval between 2 and 8 seconds
        flipIds.push(flipId);

        fish.addEventListener("click", changeSpeed);
   }
}

function flipFish(fish) {
    const id = parseInt(fish.id) || 1;
    const index = id - 1;

    //60% chance to flip
    if (Math.random() < 0.6) {
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
    }
}

function changeSpeed(event) {
    const fish = event.currentTarget;
    const id = parseInt(fish.id) || 1;
    const index = id - 1; //array

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

function moveFish(fish) {
   const id = parseInt(fish.id) || 1;
   const index = id - 1; //array
   const tank = document.querySelector(".tank");
   const max = tank.clientWidth - fish.offsetWidth; //need?
   
   if(directions[index] === "left") {
      let right = parseFloat(fish.style.right) || 0;
      
      if (right >= max) { //change to depend on tank
         directions[index] = "right";
         fish.style.left = (max - right) + "px";
         //fish.style.left = "0px";
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