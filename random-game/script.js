const character = document.getElementById("character");
const barrier = document.getElementById("barrier");
let game;
let isGameOver = false;

document.addEventListener("keydown", function (event) {
    jump();
});

function jump() {
    if (character.classList != "jump") {
        character.classList.add("jump");
    }
    setTimeout(function () {
        character.classList.remove("jump");
    }, 300)
}

let isAlive = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let barrierLeft = parseInt(window.getComputedStyle(barrier).getPropertyValue("left"));
    
    if (barrierLeft < 50 && barrierLeft > 0 && characterTop >= 140 ) {
        endGame();
    }
}, 10)