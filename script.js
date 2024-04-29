let map = `AAAAAAAAAA<br>
AABAAAAAAA<br>
AAAAAADAAA<br>
AAAACAAAAA<br>
AAAAAEAAAA<br>
FAAAAAAAAA`;

mapArray = [];

for(i = 0; i < map.length;i++){
    if(map.substring(i,i+4) == "<br>"){
        mapArray.push("<br>");
        i = i+4
        //Temporary thing that ONLY doesnt accept newlines and lines them up right
    }
    else{
        mapArray.push(map[i]);
    }
}

document.onkeydown = checkMovement;

function checkMovement(e) {

    if (e.keyCode == '38') {
        // up arrow
        moveUp();
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

    let mapString = "";
    for(j = 0; j < mapArray.length;j++){
        mapString = mapString + mapArray[j]
    }
    document.getElementById("map").innerHTML = mapString;

}

function moveUp(){

}