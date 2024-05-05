let blocks = {
    E:{color:"gray",move:false},
    G:{color:"green",move:false},
    A:{color:"white",move:true},
    B:{color:"blue",move:true},
    W:{color:"black",move:true},
    M:{color:"magenta",move:true},
    R:{color:"brown",move:true},
    P:{color:"pink",move:true},
    "#":{move:false}
}

let Interactables = {
    "Tutorial":{
        symbol:"C",
        color:"black",
        backgroundColor:"yellow",
        y:9,
        x:14,
        type:"NPC"
    },
    "Chest1":{
        symbol:"C",
        color:"yellow",
        backgroundColor:"brown",
        y:7,
        x:7,
        type:"Event"
    }
}

let interactiveMap = {
    "14,9": "Tutorial",
    "7,7": "Chest1"
}

let map = `AAAAEAAAAAAAAAAAAAAAEAAAA<e>
AAAAEAAAAAAAAAAAAAAAEAAAA<e>
AAAAEAAAAGAAAAAAAAAAEAAAA<e>
AAAAEAAAAGAAAAAAAAAAEAAAA<e>
AAAAAEAAAAAAAAAAAAAEAAAAA<e>
AAARAEAAAAAGAAAAAGAEAAAAA<e>
AAAAAEEAAGAAAAAAAAEEAAAAA<e>
AAAAAAE#AAAAAGAAAAEAAAAAA<e>
AAAAAAEAAAAAAAAAAAEAAAAAA<e>
AAABAAEAGGAAAA#AAAEAPBAAA<e>
AAAAAAEAGGAAAAAAAAEAAAAAA<e>
AAAAAAEAAAAAAAGGAAEAAAAAA<e>
AAAAAAEAAAAAAAGGAAEAAAAAA<e>
AAAMAAEEEEEEEEEEEEEAAAAAA<e>
AAAAWMAAAAAAAAAAAAAAAAAAA<e>
AAAAAAAAAAAAAAAAAAAAAAAAA<e>
AAAAAAAAAAAAAAAAAAAAAAAAA<e>
AAAAAAAAAAAAAAAAAAAAAAAAA<e>
AAAAAAAAAAAAAAAAAAAAAAAAA<e>
AAAAAAAAAAAAAAAAAAAAAAAAA<e>
AAAAAAAAAAAAAAAAAAAAAAAAA<e>
AAAAAAAAAAAAAAAAAAAAAAAAA<e>
AAAAAAAAAAAAAAAAAAAAAAAAA<e>`;
//The # is an interactable object
//Its position will be tracked independently
//In this case, it will be an NPC

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
bounds = [0,24,0,21]

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

document.onkeydown = checkKeys;

function checkKeys(e) {
    if (e.keyCode == '38') {
        // up arrow
        if(position[1] - viewport > bounds[2] && blocks[mapArray[position[1]-1][position[0]]].move == true){
            position[1]--;
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(position[1] + viewport < bounds[3] && blocks[mapArray[position[1]+1][position[0]]].move == true){
            position[1]++;
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
       if(position[0] - viewport*2 > bounds[0] && blocks[mapArray[position[1]][position[0]-1]].move == true){
        position[0]--;
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(position[0] + viewport*2 < bounds[1] && blocks[mapArray[position[1]][position[0]+1]].move == true){
        position[0]++;
        }
    }
    else if (e.keyCode == '32') {
        // spacebar
        // interact with object
        var tempAdjacent = 
        [`${position[0]+1},${position[1]}`,
        `${position[0]-1},${position[1]}`,
        `${position[0]},${position[1]+1}`,
        `${position[0]},${position[1]-1}`]
        for(var i = 0; i < 4;i++){
            var inter = interactiveMap[tempAdjacent[i]];
            if(inter != undefined){
                alert(`INTERACTING WITH ${inter}`)
            }
        }
     }
    //console.log(position);

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
            else if(mapArray[j][k] == '#'){
                var inter = interactiveMap[`${k},${j}`];
                mapString = mapString + `<div style=\"background-color:${Interactables[inter].backgroundColor};color:${Interactables[inter].color}\"class=\"mapItem\">` + `${Interactables[inter].symbol}` + "</div>";
            }
            else{
                mapString = mapString + `<div style=\"background-color:${blocks[mapArray[j][k]].color};color:${blocks[mapArray[j][k]].color}\"class=\"mapItem\">` + mapArray[j][k] + "</div>";
            }
        }
        mapString = mapString + "</div>";
    }
    document.getElementById("map").innerHTML = mapString;

}