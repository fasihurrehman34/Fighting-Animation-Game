var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var p1Left = screenWidth * 0.15;
var p1Top = screenHeight * 0.40;
var p2Left = screenWidth * 0.65;
var p2Top = screenHeight * 0.40;

var keys = {};
var walkSpeed = 6;
var runSpeed = 12;

var p1Container = document.getElementById("player1");
var p2Container = document.getElementById("player2");

p1Container.style.left = p1Left + "px";
p1Container.style.top = p1Top + "px";
p2Container.style.left = p2Left + "px";
p2Container.style.top = p2Top + "px";

window.addEventListener("resize", function () {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
});

window.addEventListener("keydown", function (event) {
    if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
    keys[event.key.toLowerCase()] = true;
    updateGame();
});

window.addEventListener("keyup", function (event) {
    keys[event.key.toLowerCase()] = false;
    resetState(event.key.toLowerCase());
});

function updateGame() {
    var pWidth = p1Container.offsetWidth;
    var pHeight = p1Container.offsetHeight;

    var p1Speed = keys["r"] ? runSpeed : walkSpeed;

    if (keys["w"]) { p1Top -= p1Speed; showSprite("p1", "jump"); }
    else if (keys["s"]) { p1Top += p1Speed; showSprite("p1", "jump"); }

    if (keys["a"]) { p1Left -= p1Speed; showSprite("p1", keys["r"] ? "run" : "walk"); }
    else if (keys["d"]) { p1Left += p1Speed; showSprite("p1", keys["r"] ? "run" : "walk"); }

    if (keys["f"]) { showSprite("p1", "fight"); }

    if (p1Left < 0) p1Left = 0;
    if (p1Left > screenWidth - pWidth) p1Left = screenWidth - pWidth;
    if (p1Top < 0) p1Top = 0;
    if (p1Top > screenHeight - pHeight) p1Top = screenHeight - pHeight;

    p1Container.style.left = p1Left + "px";
    p1Container.style.top = p1Top + "px";


    var p2Speed = keys["m"] ? runSpeed : walkSpeed;

    if (keys["arrowup"]) { p2Top -= p2Speed; showSprite("p2", "jump"); }
    else if (keys["arrowdown"]) { p2Top += p2Speed; showSprite("p2", "jump"); }

    if (keys["arrowleft"]) { p2Left -= p2Speed; showSprite("p2", keys["m"] ? "run" : "walk"); }
    else if (keys["arrowright"]) { p2Left += p2Speed; showSprite("p2", keys["m"] ? "run" : "walk"); }

    if (keys[" "]) { showSprite("p2", "fight"); }

    if (p2Left < 0) p2Left = 0;
    if (p2Left > screenWidth - pWidth) p2Left = screenWidth - pWidth;
    if (p2Top < 0) p2Top = 0;
    if (p2Top > screenHeight - pHeight) p2Top = screenHeight - pHeight;

    p2Container.style.left = p2Left + "px";
    p2Container.style.top = p2Top + "px";
}

function showSprite(player, state) {
    var sprites = document.querySelectorAll("#" + (player === "p1" ? "player1" : "player2") + " img");
    for (var i = 0; i < sprites.length; i++) {
        sprites[i].classList.remove("active");
    }
    document.getElementById(player + "-" + state).classList.add("active");
}

function resetState(key) {
    if (["w", "s", "a", "d", "f", "r"].includes(key)) {
        if (!keys["w"] && !keys["s"] && !keys["a"] && !keys["d"] && !keys["f"] && !keys["r"]) {
            showSprite("p1", "stand");
        }
    }
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "m"].includes(key)) {
        if (!keys["arrowup"] && !keys["arrowdown"] && !keys["arrowleft"] && !keys["arrowright"] && !keys[" " && !keys["m"]]) {
            showSprite("p2", "stand");
        }
    }
}