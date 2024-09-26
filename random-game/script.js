const character = document.getElementById("character");
const barrier = document.getElementById("barrier");
const scoreElement = document.getElementById("score");
let game;
let score = 0;

let isAlive = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let barrierLeft = parseInt(window.getComputedStyle(barrier).getPropertyValue("left"));

    if (barrierLeft < 50 && barrierLeft > 0 && characterTop >= 140 ) {
        endGame();
    }
}, 10)

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

function startGame() {
    game = setInterval(isAlive, 10);
    barrier.style.animation = '';
}

function endGame() {
    clearInterval(game);
    barrier.style.animation = 'none';
    alert("Game Over! Нажмите кнопку для перезапуска игры.");
}

document.getElementById('restartButton').addEventListener('click', function () {
    startGame();
});