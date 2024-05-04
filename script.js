let colors = {
    E: "gray",
    G: "green",
    A: "white",
    B: "blue",
    W: "black",
    M: "magenta"
  };

let map = `AAEAAAAAAAAAAAAAAAEAA<e>
AAAEAAAAAAAAAAAAAEAAA<e>
ARAEAAAAAGAAAAAGAEAAA<e>
AAAEEAAGAAAAAAAAEEAAA<e>
AAAAEAAAAAAGAAAAEAAAA<e>
AAAAEAAAAAAAAAAAEAAAA<e>
ABAAEAGGAAAAAAAAEAPBA<e>
AAAAEAGGAAAAAAAAEAAAA<e>
AAAAEAAAAAAAGGAAEAAAA<e>
AAAAEAAAAAAAGGAAEAAAA<e>
AMAAEEEEEEEEEEEEEAAAA<e>
AAWMAAAAAAAAAAAAAAAAA<e>`;

//The holy array that holds the entire map
//Will eventually just hold a viewport
mapArray = [];
mapRow = [];

//Below variables are hardcoded for now, they are bounds of world, viewport, and starting position
//The viewport number is how many squares in each direction of the player can you see, so 2 = a 5x5 square
viewport = 3;
//Position is starting position of player, the upper left corner is 0,0
position = [10,5];
//Bounds is the min and max values of the map if put into array form
bounds = [0,20,0,10]

//The below function just converts the block of text into a 2D array
for(i = 0; i < map.length;i++){
    if(map.substring(i,i+3) == "<e>"){
        i = i+3
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
        if(position[1] - viewport > bounds[2]){
            position[1]--;
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(position[1] + viewport < bounds[3]){
            position[1]++;
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
       if(position[0] - viewport*2 > bounds[0]){
        position[0]--;
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(position[0] + viewport*2 < bounds[1]){
        position[0]++;
        }
    }
    console.log(position);

    //Every time that a movement key is pressed, write to the screen
    //Keep track of a movement variable
    //Draw the viewport around that variable
    //Horizontal viewport is 2x the length of the vertical one
    let mapString = "";
    for(j = position[1] - viewport; j < position[1] + viewport+1;j++){
        mapString = mapString + "<div>"
        for(k = position[0] - viewport*2; k < position[0] + viewport*2+1;k++){
            if(position[1] == j && position[0] == k){
                mapString = mapString + "<div style=\"background-color:orange;\"class=\"mapItem\"><b>P</b></div>";
            }
            else{
                mapString = mapString + `<div style=\"background-color:${colors[mapArray[j][k]]};\"class=\"mapItem\">` + mapArray[j][k] + "</div>";
            }
            console.log(mapString);
        }
        mapString = mapString + "</div>";
    }
    document.getElementById("map").innerHTML = mapString;

}