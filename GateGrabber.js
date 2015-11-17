//
//Canvas Variables
//
var previousFrameTime = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//
//Game Variables
//
var match = false;
var paused = false; //denotes whether the game is currently running

//
//Button Variables
//
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

//
//Ball Variables
//
// var ballRadius=10;
// var ballX = canvas.width/2;
// var ballY = canvas.height-30;

//
//Gate Types
//- Each gate will have 8 possible combination.
//- Currently we only have AND & OR gates.
// var gateType0=document.getElementById("ANDGate");
// var gateType1=document.getElementById("ORGate");
var gateType0=document.getElementById("AND00x");
var gateType1=document.getElementById("AND0x0");
var gateType2=document.getElementById("AND0x1");
var gateType3=document.getElementById("AND01x");
var gateType4=document.getElementById("AND1x0");
var gateType5=document.getElementById("AND1x1");
var gateType6=document.getElementById("AND10x");
var gateType7=document.getElementById("AND11x");
var gateType8=document.getElementById("OR00x");
var gateType9=document.getElementById("OR0x0");
var gateType10=document.getElementById("OR0x1");
var gateType11=document.getElementById("OR01x");
var gateType12=document.getElementById("OR1x0");
var gateType13=document.getElementById("OR1x1");
var gateType14=document.getElementById("OR10x");
var gateType15=document.getElementById("OR11x");

//
//Ball Object
// -radius
// -Coords - x and y
//
var ball = { radius:10, x: (canvas.width/2), y: (canvas.height-30)};

//
//Player Object
// -lives
// -score
// -value - 0 or 1
//
var player = { lives:['L','L','L','L','L','L','L','L','L','L'], score:0, value:1};

//CREATE THE API OBJECT
var tempAPI = new test();
tempAPI.structure("array")
    .location("#visDiv")
    .data(player.lives)
    .attr("plane", "vertical")			//Visualizes the array vertically
    .attr("index-color", "#5C0099")		//Changes the color of each index
    .attr("text-Color", "#F5E5FF")		//Changes the color of the text in each index
    .visualize();

//
//Gate Objects
// -needed - players can enter 0 or 1
// -Coords - x and y
// -gate type - 0 or 1 for now
//
var gate1 = { need: 0, x:(canvas.width/4), y:-200, type:3, rate: Math.floor((Math.random() * 4) +1)};
var gate2 = { need: 1, x:(2*(canvas.width/4)), y:-200, type:14, rate: Math.floor((Math.random() * 4) +1)};
var gate3 = { need: 0, x:(3*(canvas.width/4)), y:-200, type:9, rate: Math.floor((Math.random() * 4) +1)};

while(gate2.rate == gate1.rate){
    gate2.rate = Math.floor((Math.random() * 4) +1);
}
while(gate3.rate == gate2.rate || gate3.rate == gate1.rate){
    gate3.rate = Math.floor((Math.random() * 4) +1);
}

var rate = {rate1 : gate1.rate, rate2 : gate2.rate, rate3 : gate3.rate};

var speedVis = new test();
speedVis.structure("speed")
    .location("#speedDiv")
    .data(rate)
    .visualize();

//
//Event Listeners
// -key pressed
// -key released
//
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


/*Key Handlers

 keyDownhandler()
 -If one of the specified keys is pressed down, dectected by the key code, the value for that key is set to true.
 keyUpHandler()
 -If one of the specified keys is released, dectected by the key code, the value for that key is set to false.

 Keys Detected(key code):
 -Right Arrow(39)
 -Left Arrow(37)
 -Up Arrow(38)
 -Down Arrow(40)
 -Space Bar (32)


 */


//Sound objects

var collection = new Audio("Resources/Sounds/Collection.mp3");
var miss = new Audio("Resources/Sounds/Miss.mp3");
var music = new Audio('Resources/Sounds/Music.m4a');
var mute = false;
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    if(e.keyCode == 37) {
        leftPressed = true;
    }
    if(e.keyCode == 38){
        upPressed = true;

    }
    if(e.keyCode == 40){
        downPressed = true;
    }
    if(e.keyCode == 32){
        spacePressed = true;
    }
    if(e.keyCode == 77){
        if(mute == false){
            mute = true;
            music.pause();
            music.currentTime = 0;
        }
        else if(mute == true){
            mute = false;
            music.play();
        }
    }

}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    if(e.keyCode == 38){
        upPressed = false;

    }
    if(e.keyCode == 40){
        downPressed = false;
    }
    if(e.keyCode == 32){
        spacePressed = false;
    }
}

//
//  drawBall()
//  Creates ball at the bottom of the screen that the player uses to match their value to the gates falling.
//
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

}

/*  drawGate()
 Creates a gate, given the x and y coordinates and an integer value represtening which gate type to draw.
 Gate Types:
 -AND
 16 different AND gate images.
 -OR
 16 differet OR gate images.

 //-NAND  to be added??
 //-XOR    to be added??
 */
function drawGate(x, y, gate){
    if(gate== 0){
        ctx.beginPath();
        ctx.drawImage(gateType0,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==1){
        ctx.beginPath();
        ctx.drawImage(gateType1,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==2){
        ctx.beginPath();
        ctx.drawImage(gateType2,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==3){
        ctx.beginPath();
        ctx.drawImage(gateType3,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==4){
        ctx.beginPath();
        ctx.drawImage(gateType4,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==5){
        ctx.beginPath();
        ctx.drawImage(gateType5,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==6){
        ctx.beginPath();
        ctx.drawImage(gateType6,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==7){
        ctx.beginPath();
        ctx.drawImage(gateType7,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==8){
        ctx.beginPath();
        ctx.drawImage(gateType8,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==9){
        ctx.beginPath();
        ctx.drawImage(gateType9,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==10){
        ctx.beginPath();
        ctx.drawImage(gateType10,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==11){
        ctx.beginPath();
        ctx.drawImage(gateType11,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==12){
        ctx.beginPath();
        ctx.drawImage(gateType12,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==13){
        ctx.beginPath();
        ctx.drawImage(gateType13,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==14){
        ctx.beginPath();
        ctx.drawImage(gateType14,x, y, 60, 120);
        ctx.closePath();
    }
    else if(gate ==15){
        ctx.beginPath();
        ctx.drawImage(gateType15,x, y, 60, 120);
        ctx.closePath();
    }


}

/*  changeGate()
 Function called to change the gates that are output. Each gate has a value that will satisfy the logic. The value is randomly slected between 0 or 1. For now the number that determines the gate, that is the value that satisfies that "gate".

 */
function changeGate(gate){

    //V Change value of the first gate V
    if(gate == 1){
        temp = Math.floor(Math.random() * 16);

        gate1.type = temp;
        gate1.need = neededValue(gate1.type);
    }

    //V change the value of the second gate V
    if(gate == 2){
        temp = Math.floor(Math.random() * 16);

        gate2.type = temp;
        gate2.need = neededValue(gate2.type);
    }

    //V change the value of the third gate V
    if(gate == 3){
        temp = Math.floor(Math.random() * 16);

        gate3.type = temp;
        gate3.need = neededValue(gate3.type);
    }

}

/*  neededValue(gate)    // gate = gateType number 0-16
 This function determines the value that is needed to satisfy each logic gate.
 If the gate will always produce the output with the given input, then the needed value is set to 2.
 If it is not possible to produce the output with the given input, then the needed value will be set to 3.

 */
function neededValue(gate){
    var value = 0;

    if(gate == 0){
        value = 2;
    }
    else if(gate == 1){
        value = 2;
    }
    else if(gate == 2){
        value = 0;
    }
    else if(gate == 3){
        value = 0;
    }
    else if(gate == 4){
        value = 3;
    }
    else if(gate == 5){
        value = 1;
    }
    else if(gate == 6){
        value = 3;
    }
    else if(gate == 7){
        value = 1;
    }
    else if(gate == 8){
        value = 0;
    }
    else if(gate == 9){
        value = 0;
    }
    else if(gate == 10){
        value = 3;
    }
    else if(gate == 11){
        value = 3;
    }
    else if(gate == 12){
        value = 1;
    }
    else if(gate == 13){
        value = 2;
    }
    else if(gate == 14){
        value = 1;
    }
    else if(gate == 15){
        value = 2;
    }

    return value;
}

/*  checkMatch()
 Function called to check whether the player's value matches the gate the player grabbed.
 If the needed value equals 2 then that means either a player vlaue of 0 or 1 would satisfy the gate.

 */
function checkMatch(gate){
    if(gate == "gate1"){
        if(gate1.need == player.value || gate1.need == 2){
            player.score += 100;
            collection.play();
        }
        else {
            player.lives.pop();
            miss.play();
        }
    }
    else if(gate == "gate2"){
        if(gate2.need == player.value || gate2.need == 2){
            player.score+= 100;
            collection.play();
        }else {
            player.lives.pop();
            miss.play();
        }
    }
    else if(gate =="gate3"){
        if(gate3.need == player.value || gate3.need == 2){
            player.score+= 100;
            collection.play()
        }else{
            player.lives.pop();
            miss.play();
        }
    }
    else{
        player.lives.pop();
    }

}

//resets all of the y gate coordinates and set a new random fall rate to each gate.
function resetGates(gate){

    if(gate == 1){
        changeGate(1);
        gate1.rate = Math.floor((Math.random() * 4) +1);
        while(gate1.rate == gate2.rate || gate1.rate == gate3.rate){
            gate1.rate = Math.floor((Math.random() * 4) +1);
        }
        gate1.y = -200;
    }
    else if(gate == 2){
        changeGate(2);
        gate2.rate = Math.floor((Math.random() * 4) +1);
        while(gate2.rate == gate1.rate || gate2.rate == gate3.rate){
            gate2.rate = Math.floor((Math.random() * 4) +1);
        }
        gate2.y = -200;
    }
    else if(gate == 3){
        changeGate(3);
        gate3.rate = Math.floor((Math.random() * 4) +1);
        while(gate3.rate == gate1.rate || gate3.rate == gate2.rate){
            gate3.rate = Math.floor((Math.random() * 4) +1);
        }
        gate3.y = -200;
    }

}

/*  checkCollision()
 This function is called everytime the screen is drawn. It checks whether the gates have either hit the bottom of the window or have hit the ball. This is done by checking the the x and y coordinates of the ball and the gates. If the gates hit the bottom of the window, they are reset and the player loses a life. If the gates come in contact with the ball, the player's vlaue and the gates needed value are checked. If they match, the score is increased by 100. If the values don't match, the player loses a life.

 */
function checkCollision(){

    if((gate1.y-10) >= canvas.height){
        resetGates(1);
    }
    if((gate2.y-10) >= canvas.height){
        resetGates(2);
    }
    if((gate3.y-10) >= canvas.height){
        resetGates(3);
    }
    if(ball.x >=gate1.x && ball.x <= (gate1.x+60) && (gate1.y+120) >= (ball.radius + ball.y)){
        checkMatch("gate1");
        resetGates(1);
    }
    if(ball.x >=gate2.x && ball.x <= (gate2.x+60) && (gate2.y+120) >= (ball.radius + ball.y)){
        checkMatch("gate2");
        resetGates(2);
    }
    if(ball.x >=gate3.x && ball.x <= (gate3.x+60) && (gate3.y+120) >= (ball.radius + ball.y)){
        checkMatch("gate3");
        resetGates(3);
    }
}

//setUpScreen()
//This function takes care of all the items that need to be put on the screen.
//
function setUpScreen(time){
    var FPS = Math.floor(1000 / (time - previousFrameTime));
    var fpsSTRING = FPS.toString();
    previousFrameTime = time;
    ctx.font = "12px Verdana";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(fpsSTRING, 0, 10);
    ctx.fillText("FPS", 20, 10);
    ctx.fillText("Score:", 0, 30);
    ctx.fillText(player.score, 40, 30);
    ctx.fillText("Lives:", 0, 50);
    ctx.fillText(player.lives.length, 40, 50);
    ctx.fillText("Current Value:", 0, 600);
    ctx.fillText(player.value, 95, 600);
}

//changePlayerValue()
//This function is called when the mouse has been clicked. It will  change playerValue from a 1 to a 0 or a 0 to a 1.
//
function changePlayerValue(){
    if(player.value == 0){
        player.value = 1;
    }
    else{
        player.value = 0;
    }
}

//V on mouse move function V
//this function is called anytime the mouse moves on the screen and updates the ballx variable
//the coordinates are returned relative to the top left of the screen so we need to use the canvas bounds to adjust them.
//lastly, this function checks to make sure the position is inside the canvas. it will not change the coordinates if it is not

$(document).on("mousemove", function (event) {
    var rect = canvas.getBoundingClientRect();
    if((event.clientX - rect.left) - ball.radius > 0 && (event.clientX - rect.left) + ball.radius < canvas.width && (event.clientY - rect.top) > 0 && (event.clientY - rect.top) < canvas.height){
        ball.x = event.clientX - rect.left;
    }
});

/*
 This loops the music file by playing the music file again whenever it ends. Music file is choppy on the loop as better editing sofware is needed.
 */
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

music.play();

//   pause() -> this function changes the value of the variable playing (causing the game to pause)


function pause(){
    if (paused == false){
        paused = !paused;
    }
    else{
        paused = !paused;
        requestAnimationFrame(draw);
    }
}


/*  draw()
 This is the main function that draws the screen which includes the three gates, ball, score, lives, and FPS. The rate that the screen is drawn at varries.This is what frames per second(FPS) is in the top corner of the screen.

 IF the left or right arrows are pressed  the x coordinate of the ball is chnaged; right arrow= +4, left arrow -4.
 The Y coordinate of the gates is increased, creating the animation of the gates falling.
 If the space bar is pressed the player's value  will change from 0 to 1 or vice versa. (kinda glitchy)

 */


function draw(time) {


    setUpScreen(time);

    checkCollision();

    drawGate(gate1.x, gate1.y, gate1.type);
    drawGate(gate2.x, gate2.y, gate2.type);
    drawGate(gate3.x, gate3.y, gate3.type);

    drawBall();
    ctx.fillStyle = "#FF0000";
    ctx.fillText(player.value, ball.x - 4, ball.y + 2);


    gate1.y = gate1.y + gate1.rate;
    gate2.y = gate2.y + gate2.rate;
    gate3.y = gate3.y + gate3.rate;

    tempAPI.update(player.lives);

    var speed = {rate1: gate1.rate, rate2:gate2.rate, rate3: gate3.rate};
    speedVis.update(speed);

    if (rightPressed && ball.x + ball.radius < canvas.width) {
        ball.x += 4;
    }
    if (leftPressed && ball.x - ball.radius > 0) {
        ball.x -= 4;
    }

    canvas.onclick = changePlayerValue;


    if (player.lives == 0) {
        ctx.textAlign="center";
        ctx.fillText("GAME OVER", (canvas.width/2), canvas.height/2);
        ctx.fillText("You've scored "+player.score+" points", (canvas.width/2),(canvas.height/2)+25);
        loadEndMenu();
        pause();
        ctx.textAlign="start"
    }




    if (!paused){
        requestAnimationFrame(draw);
    }

}

function loadMainMenu(){
    //clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("mainMenu");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
}

function loadEndMenu(){
    //clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("endGame");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }

}

function newGame(){
    //clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("inGame");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
    //reset game variables..... need to add more to these once quit/restart button is done.
    player = { lives:['L','L','L','L','L','L','L','L','L','L'], score:0, value:1};
    		gate1 = { need: 0, x:(canvas.width/4), y:-200, type:3, rate: Math.floor((Math.random() * 4) +1)};
    		gate2 = { need: 1, x:(2*(canvas.width/4)), y:-200, type:14, rate: Math.floor((Math.random() * 4) +1)};
    		gate3 = { need: 0, x:(3*(canvas.width/4)), y:-200, type:9, rate: Math.floor((Math.random() * 4) +1)};

        		while(gate2.rate == gate1.rate){
        			gate2.rate = Math.floor((Math.random() * 4) +1);
        		}
    		while(gate3.rate == gate2.rate || gate3.rate == gate1.rate){
        			gate3.rate = Math.floor((Math.random() * 4) +1);
        		}

    //start the game
    		paused = false;
    requestAnimationFrame(draw);
}

	function quitGame(){
    		paused = true;
    		ctx.clearRect(0, 0, canvas.width, canvas.height);
    		loadMainMenu();
    	}
// V Main Event Loop V   <- this is what runs "sequentially" after everything has been loaded; good starting point for trying to figure out whats going on
loadMainMenu();