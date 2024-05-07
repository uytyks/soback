//============================
//PROGRESSION
//============================
//This is the overall progression of the game

//I just threw 10 0s in here, they'll all be used for values eventually, its an array of flags pretty much
let eventArray = [0,0,0,0,0,0,0,0]
//0: Tutorial Text Progression





//============================
//INVENTORY
//============================
let inventory = [];

function inventoryRefresh(){
    //reload html with the array
    let list = document.getElementById("invList");
    if(inventory.length > 0){
        let listString = "";
        for(var i = 0; i < inventory.length;i++){
            listString = listString + `<li>${inventory[i]}</li>`;
        }
        list.innerHTML = listString;
    }
    else{
        list.innerHTML = "<li>Empty</li>";
    }
}




//==========================================
//BLOCKS AND INTERACTABLES
//==========================================
//check if in the middle of an NPC convo already or not
let isInteracting = false;

let blocks = {
    E:{color:"gray",move:false},
    G:{color:"green",move:false},
    A:{color:"#70e64c",move:true},
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
        type:"NPC",
        usable:true
    },
    "Chest1":{
        symbol:"c",
        color:"yellow",
        backgroundColor:"brown",
        y:7,
        x:7,
        type:"Event",
        usable:true
    }
}

let interactiveMap = {
    "14,9": "Tutorial",
    "7,7": "Chest1"
}

function interactObject(inter){
    if(inter == "Chest1"){
        alert("You found a chest!\n\nInside was a Key!");
        inventory.push("Key");
        inventoryRefresh();
        mapArray[Interactables[inter].y][Interactables[inter].x] = "A";
        inter.usable = false;
    }
    else if(inter == "Tutorial"){
        isInteracting = true;
        currentNPC.name = "Tutorial";
        //match Tutorial with eventArray[0]
        currentNPC.dialogueIndex = eventArray[0];
        currentNPC.dialogueCount = 0;
        convoProgress();
    }
}



//====================================
//NPC CONVERSATIONS
//====================================

dialogueMap = {
    "Tutorial":[
        [ //first time meeting
        "Oh hello!",
        "Howdy!",
        "It hurts so badly",
        "Nice to meet you! :)"
        ],
        [ //idle text after first meeting
        "Go.",
        "Get outta here matey",
        "I don't want you here."
        ],
        [ //he will hate you
        "LEAVE.",
        "GET OUT OF HERE GET OUT OF HERE!",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        ]
    ]
}

//NPC Object instead of 3 variables
let currentNPC = {
    name:"",
    dialogueIndex: 0, //which dialogue array to pick
    dialogueCount: 0, //which index in said array to show
}

//General Function to Progress NPC Dialogue
function convoProgress(){
    chatdiv = document.getElementById("chat");
    chatdiv.innerHTML = dialogueMap[currentNPC.name][currentNPC.dialogueIndex][currentNPC.dialogueCount];
    if(currentNPC.dialogueCount < Object.keys(dialogueMap[currentNPC.name][currentNPC.dialogueIndex]).length){
        currentNPC.dialogueCount++;
    }
    else{
        isInteracting = false;
        chatdiv.innerHTML = "";
        endOfConvo(currentNPC.name,currentNPC.dialogueIndex);
    }
}

//At the end of conversations, trigger events and change progress
//Lots of if statements
function endOfConvo(name, index){
    if(name == "Tutorial"){
        if(index != 2){
            eventArray[0]++;
        }
    }
}


//====================================
//MAP GENERATION
//====================================

//The holy map string
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

//The holy map array
mapArray = [];
mapRow = [];

//---HARDCODED MAP VARIABLES---
//
//The viewport number is how many squares in each direction of the player can you see, so 2 = a 5x5 square
viewport = 3;
//Position is starting position of player, the upper left corner is 0,0
position = [10,5];
//Bounds is the min and max values of the map if put into array form
bounds = [0,24,0,21]

//Converts Map String into the Map Array
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


//==========================
//CHECKING IF KEYS PRESSED
//==========================
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
        //if interacting w an NPC, progress dialogue instead of interacting again
        if(isInteracting){
            convoProgress();
        }
        else{
        //else look for things to interact with
            var tempAdjacent = 
            [`${position[0]+1},${position[1]}`,
            `${position[0]-1},${position[1]}`,
            `${position[0]},${position[1]+1}`,
            `${position[0]},${position[1]-1}`]
            for(var i = 0; i < 4;i++){
                var inter = interactiveMap[tempAdjacent[i]];
                if(inter != undefined){
                    if(Interactables[inter].usable == true){
                        interactObject(inter);
                    }
                }
            }
        }
    }
    //=================================
    //VIEWPORT LOADING
    //=================================
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