const character = document.getElementById("character");
const barrier = document.getElementById("barrier");
const scoreElement = document.getElementById("score");
let game;
let score = 0;
let isGameRunning = false;
let barrierSpeed = 3;

document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", function () {
        document
            .querySelectorAll(".button")
            .forEach((btn) => btn.classList.remove("active"));

        button.classList.add("active");
    });
});

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

let isAlive = setInterval(function () {
    if (!isGameRunning) return;

    let characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top"),
    );
    let barrierLeft = parseInt(
        window.getComputedStyle(barrier).getPropertyValue("left"),
    );

    if (barrierLeft < 50 && barrierLeft > 0 && characterTop >= 140) {
        endGame();
    } else if (barrierLeft < -50) {
        score++;
        updateScore();
    }
}, 10);

document.addEventListener("keydown", function (event) {
    jump();
});

function jump() {
    if (character.classList != "jump") {
        character.classList.add("jump");
    }
    setTimeout(function () {
        character.classList.remove("jump");
    }, 300);
}

function toggleButtonsState(disabled) {
    document.querySelectorAll('.button').forEach(button => {
        button.disabled = disabled;
    });
}

    function startGame() {
        game = setInterval(isAlive, 10);
        score = 0;
        updateScore();
        isGameRunning = true;
        setBarrierSpeed(barrierSpeed);
        barrier.style.animation = "";

        if (isGameRunning) {
            toggleButtonsState(true);
        }
    }

    function endGame() {
        clearInterval(game);
        isGameRunning = false;
        barrier.style.animation = "none";
        toggleButtonsState(false);
        alert(` 
         Ваш рекорд: ${score}
         Нажмите кнопку для перезапуска игры.`);
    }

    document.getElementById("restartButton").addEventListener("click", function () {
        startGame();
    });

    function setBarrierSpeed(speed) {
        barrier.classList.remove('speed1', 'speed2', 'speed3');
        barrier.classList.add(`speed${speed}`);    }

    document.getElementById("easy").addEventListener("click", function () {
        barrierSpeed = 3;
    });

    document.getElementById("medium").addEventListener("click", function () {
        barrierSpeed = 2;
    });

    document.getElementById("hard").addEventListener("click", function () {
        barrierSpeed = 1;
    });

startGame();
