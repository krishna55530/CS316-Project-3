// var fishEl = document.getElementById("fish"); //all fish elements??
const fishElements = document.querySelectorAll(".fish");
let timerId;

fishElements.forEach(fishEl => {
    fishEl.addEventListener("click", changeSpeed);
});

function swim() {
    timerId = setInterval(move, 5);
}

function changeSpeed(event) {
    event.target.style.left = parseInt(event.target.style.left || 0) + 5 + "px";
}

function move(event) {
    let id = event.target.id;
    let left = parseInt(fishElements[id - 1].style.left);
    fishElements[id - 1].style.left = left + 5 + "px";   
}