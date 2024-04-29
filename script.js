let map = `AAAAAAAAAA<br>
AABAAAAAAA<br>
AAAAAADAAA<br>
AAAACAAAAA<br>
AAAAAEAAAA<br>
FAAAAAAAAA<br>`;

//The holy array that holds the entire map
mapArray = [];

mapRow = [];
for(i = 0; i < map.length;i++){
    if(map.substring(i,i+4) == "<br>"){
        i = i+4
        mapArray.push(mapRow);
        console.log("NEW ROW ADDED");
        mapRow = [];
        //Add newline to map row
    }
    else{
        mapRow.push(map[i])
        console.log(mapRow);
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
        for(k = 0; k < mapArray[j].length;k++){
            mapString = mapString + mapArray[j][k];
        }
        mapString = mapString + "<br>"
    }
    document.getElementById("map").innerHTML = mapString;

}

function moveUp(){
    
}