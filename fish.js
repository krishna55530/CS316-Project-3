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
        fish.style.left = `${Math.random() * (tank.clientWidth - fish.offsetWidth)}px`;
        fish.style.right = "auto";

        directions[index] = "right";
    });

    // Start swimming when loads
    startMoving();
});

function startMoving() {        
   fishImages = document.getElementsByClassName("fish"); //CONSISTENCY

   for (let fish of fishImages) {
        const id = parseInt(fish.id) || 1;
        const index = id - 1;

        // Start normal movement
        timerIds[index] = setInterval(() => moveFish(fish), 30);

        // Randomly check whether to flip direction
        flipIds[index] = setInterval(
            () => flipFish(fish),
            Math.floor(Math.random() * 6000) + 2000
        );

        // Speed up when clicked
        fish.addEventListener("click", changeSpeed);
   }
}

function flipFish(fish) {
    const id = parseInt(fish.id) || 1;
    const index = id - 1;

    //60% chance to flip
    if (Math.random() < 0.6) {
        if (directions[index] === "left") {
            directions[index] = "right";
            fish.style.transform = "scaleX(-1)";
        } else {
            directions[index] = "left";
            fish.style.transform = "scaleX(1)";
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
    const index = id - 1;
    const tank = document.querySelector(".tank");
    const max = tank.clientWidth - fish.offsetWidth;

    let left = parseFloat(fish.style.left) || 0;
    let right = parseFloat(fish.style.right) || 0;

    
    if (fish.style.left === "auto" || fish.style.left === "") {
        left = tank.clientWidth - fish.offsetWidth - right;
        fish.style.right = "auto";
        fish.style.left = left + "px";
    }

    if (directions[index] === "right") {
        left += 5;

        if (left >= max) {
            left = max;
            directions[index] = "left";
            fish.style.transform = "scaleX(-1)";
        }
    } else {
        left -= 5;

        if (left <= 0) {
            left = 0;
            directions[index] = "right";
            fish.style.transform = "scaleX(1)";
        }
    }

    fish.style.left = left + "px";
}