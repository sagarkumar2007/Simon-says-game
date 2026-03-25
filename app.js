let userSeq = [];
let gameSeq = [];
let highScore = 0;


let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
h3.innerText = `High Score: ${level}`;

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        console.log("game has started");

        levelUP();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(() => {
        btn.classList.remove("gameflash");
    }, 250);

    
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUP() {
    level++;
    userSeq = [];
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUP, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!!! Your score:<b>${level - 1}</b><br>Press any key to restart`;
        let currentScore = level - 1;
        if (currentScore > highScore) {
            highScore = currentScore;
        }
        h3.innerText = `High Score: ${highScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"
        }, 200);
        reset();
    }
}

function btnPress() {
    console.log(this);
    userFlash(this);

    userColor = this.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}