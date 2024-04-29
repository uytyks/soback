let map = `AAAAAAAAAA
AAAAAAAAAA
AAAAAAAAAA
AAAAAAAAAA`;

document.onkeydown = checkMovement;

function checkMovement(e) {

    if (e.keyCode == '38') {
        // up arrow
        console.log("UP ARROW!!")
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }
    document.getElementById("map").innerHTML = map;

}