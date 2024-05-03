var gameStarted = false;

//waits for user response to start
//the game
//
$( document ).ready(function() {
    showIntro();

    // Start game on spacebar press.
    this.onkeypress = function(e) {
      if (gameStarted == false && e.keyCode == 32) { // 32 = Spacebar
        gameStarted = true;
        gamerun();
      }
    }

});

function gamerun() {
  init();
}

//Called as id is increased as the game is played
//basically how the game is animated and progress
//over time
//
function step(){
  update();
  draw();
}

function update() {
  if (!movesnake()) {
    die();
    showConclusion(size)
  }
}

//Updates the screen as the snake moves
//or on game start draws object to game board
//
function draw() {
  if (gameStarted) {
      screenclear();
      drawsnake();
      drawfood();
  }
}

function showIntro() {
    var canvas = document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    ctx.font="30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("SNAKE", canvas.width/2, canvas.height/2);

    ctx.font="20px Arial";
    ctx.fillText("press space to start", canvas.width/2, canvas.height/2+40);
}

function showConclusion(score) {
    screenclear();
    var canvas = document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    ctx.font="30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.fillText("score: " + score, canvas.width/2, canvas.height/2-40);
    ctx.font="20px Arial";
    ctx.fillText("press space to start", canvas.width/2, canvas.height/2+80);
}


var ctx;
var WIDTH;
var HEIGHT;

var dx = 20;
var dy = 20;
var dr = 10;

// 0: left
// 1: up
// 2: right
// 3: down
var direction;

var snake;
var size;

var food;

var id;

//Initilizes game state after space bar down
//
function init() {
    ctx = $('#canvas')[0].getContext("2d"); //Get drawing surface reference to update game state
    WIDTH = $("#canvas").width(); //Width of game board
    HEIGHT = $("#canvas").height(); //Height of game board

    createsnake();
    newfood();

    direction = 0; //Starts going left
    size = 1;

    id = setInterval(step, 100); //Game clock that updates game state as time progresses

    //Jacobs modification to display the current score
    let scoreLabel = document.querySelector('#score');
    scoreLabel.textContent = "Current Score: " + size;
}

//Updates current direction when
//arrow key is pressed
//Jacobs modification removed depreciated keyboard event code
//now arrow key press recognized across browsers
//
$(document).keydown(function(event) {
    if (event.keyCode === 32) {
        // Spacebar pressed, start game
        if (!gameStarted) {
            gameStarted = true;
            gamerun();
        }
    } else if (event.keyCode >= 37 && event.keyCode <= 40) {
        // Arrow keys pressed, update direction
        var newdir = event.keyCode - 37;

        // Only lateral turns are allowed (no u-turns)
        if (newdir !== direction && newdir !== direction + 2 && newdir !== direction - 2) {
            direction = newdir;
        }
    }
});

function createsnake() {
    snake = Array();
    var head = Array();

    //place snake in the center of game board
    //
    head.x = WIDTH/2;
    head.y = HEIGHT/2;
    snake.push(head);
}

//Test for collision with snake body and game board bounds
//
function collision(n) {
    // are we out of the playground?
    if (n.x < 0 || n.x > WIDTH - 1 || n.y < 0 || n.y > HEIGHT - 1) {
        return true;
    }

    // are we eating ourselves?
    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x == n.x && snake[i].y == n.y) {
            return true;
        }
    }
    return false;
}

//creates food at a random position
function newfood() {
    var wcells = WIDTH/dx;
    var hcells = HEIGHT/dy;

    var randomx = Math.floor(Math.random()*wcells);
    var randomy = Math.floor(Math.random()*hcells);

    food = Array();
    food.x = randomx * dx;
    food.y = randomy * dy;
    food.r = dr;
    size = size+1;

    //Jacob modification: Updates score display for user
    let scoreLabel = document.querySelector('#score');
    scoreLabel.textContent = "Current Score: " + size;
}

//Touching food check
//
function meal(n) {
    return (n.x == food.x && n.y == food.y);
}

//Handles arrow key down events
//also check for lose conditions
//spawns new food if food was eaten
//
function movesnake() {

    h = snake[0]; // peek head

    // create new head relative to current head
    var n = Array();
    switch (direction) {
        case 0: // left
            n.x = h.x - dx;
            n.y = h.y;
            break;
        case 1: // up
            n.x = h.x;
            n.y = h.y - dy;
            break;
        case 2: // right
            n.x = h.x + dx;
            n.y = h.y;
            break;
        case 3: // down
            n.x = h.x;
            n.y = h.y + dy;
            break;
    }

    // if out of box or collision with ourselves, we die
    if (collision(n)) {
        return false;
    }

    snake.unshift(n);

    // if there's food there
    if (meal(n)) {
        newfood(); // we eat it and another shows up

    } else {
        snake.pop();
        // we only remove the tail if there wasn't food
        // if there was food, the snake grew
    }

    return true;

}

function die() {
    if (id) {
        clearInterval(id);
    }
    gameStarted = false;
}

//Food
//
function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

//Snake parts
//
function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function screenclear() {
    ctx.fillStyle = "#000000";
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    rect(0,0,WIDTH,HEIGHT);
}

//Draws snake body using
//rectangles
//
function drawsnake() {
    ctx.fillStyle = "#FFFFFF";
    snake.forEach(function(p) {
        rect(p.x, p.y, dx, dy);
    })
}

//Draws new food using
//circles
//
function drawfood() {
    ctx.fillStyle = "#FF0000";
    circle(food.x+food.r, food.y+food.r, food.r);
}