let map = `AAAAAAAAAAA<br>
AABAAAAAAAA<br>
AAAAAADAAAA<br>
AAAACAAAAAA<br>
AAAAAEAAAAA<br>
FAAAAAAAAAA<br>
AAAAAAAAGAA<br>`;

//The holy array that holds the entire map
//Will eventually just hold a viewport
mapArray = [];
mapRow = [];

//Below variables are hardcoded for now, they are bounds of world, viewport, and starting position
//The viewport number is how many squares in each direction of the player can you see, so 2 = a 5x5 square
viewport = 2;
position = [0,0];
bounds = [-5,5,-3,3]

//The below function just converts the block of text into a 2D array
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
        if(position[1] < bounds[3]){
            position[1]++;
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(position[1] > bounds[2]){
            position[1]--;
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
       if(position[0] > bounds[0]){
        position[0]--;
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(position[0] < bounds[1]){
        position[0]++;
        }
    }
    console.log(position);

    //Every time that a movement key is pressed, write to the screen
    //Keep track of a movement variable
    //Draw the viewport around that variable
    let mapString = "";
    for(j = position[1] - viewport; j < position[1] + viewport;j++){
        for(k = position[0] - viewport; k < position[0] + viewport + position;k++){
            mapString = mapString + mapArray[j][k];
        }
        mapString = mapString + "<br>"
    }
    document.getElementById("map").innerHTML = mapString;

}

function moveUp(){
    
}