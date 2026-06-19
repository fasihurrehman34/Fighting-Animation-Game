var player1 = document.getElementById("player1")
var p1Left = 50
var p1Bottom = 50

document.addEventListener("keydown", function (event) {
    var key = event.key
    if (key === "w") {
        if (window.innerHeight - 350 > p1Bottom) {
            p1Bottom += 10;
            player1.style.bottom = p1Bottom + "px";
        }
    }

    if (key === "s") {
        if (50 < p1Bottom) {
            p1Bottom -= 10;
            player1.style.bottom = p1Bottom + "px";
        }
    }

    if (key === "a") {
        if (50 < p1Left) {
            p1Left -= 10;
            player1.style.left = p1Left + "px";
        }
    }

    if (key === "d") {
        if (window.innerWidth - 350 > p1Left) {
            p1Left += 10;
            player1.style.left = p1Left + "px";
        }
    }
})
