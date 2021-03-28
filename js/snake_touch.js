// Get the gameboard
const gameBoard = document.getElementById("gameBoard");
// Set gameBoard 2D context
const gameBoard_ctx = gameBoard.getContext("2d");
const board_border = 'black';
const board_background = "white";
const LEFT_KEY = 'ArrowLeft';
const RIGHT_KEY = 'ArrowRight';
const UP_KEY = 'ArrowUp';
const DOWN_KEY = 'ArrowDown';
let dx =20;
let dy=0;
let food_x;
let food_y;
let score = 0;
//Generate the initial snake
//Snakes head 200 to tail 160 (4 parts)
let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200}];
//Always initialize with clear Canvase
clearCanvas();

function main(){
    // document.getElementById('start').style.visibility = "hidden";
    if(has_game_ended()) {
        document.getElementById("retry").disabled = false;
        return;
    } 
    document.getElementById("retry").disabled = true;
    setTimeout(function onTick()
    {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    },125
    )
}

function restart(){
    if(has_game_ended()) {
        dx =20;
        dy=0;
        generateFood();
        snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200}];
        main();
    }
}

//On Start, clear the canvas and draw the snake
document.getElementById('start').addEventListener('click', () => {document.getElementById("start").disabled = true;main()});
document.getElementById("retry").disabled = true;
document.addEventListener("keydown", function(event){
    changeDirection(event.code);
});
generateFood();
document.getElementById('retry').addEventListener('click', () => {restart()} );
// Draw a rectangle for each set of coordinates
function drawSnakePart(snakePart)
{
    gameBoard_ctx.fillStyle = 'orange';
    gameBoard_ctx.strokestyle = 'darkblue';
    gameBoard_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    gameBoard_ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function drawSnake()
{
    snake.forEach(drawSnakePart);
}

function clearCanvas() {
    //  Select the colour to fill the drawing
    gameBoard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    gameBoard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    gameBoard_ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
    // Draw a "border" around the entire canvas
    gameBoard_ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
  }

function moveSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head); //Adds to front of array

    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;

    if (has_eaten_food) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        generateFood();
      } else {
        // Remove the last part of snake body
        snake.pop();
      }
}

function changeDirection(keyPressed)
{
    const LEFT_KEY = 'ArrowLeft';
    const RIGHT_KEY = 'ArrowRight';
    const UP_KEY = 'ArrowUp';
    const DOWN_KEY = 'ArrowDown';

    //const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if(keyPressed === LEFT_KEY && !goingRight)
    {
        dx = -20;
        dy = 0;
    }

    if(keyPressed === UP_KEY && !goingDown)
    {
        dx = 0;
        dy = -20;
    }

    if(keyPressed === RIGHT_KEY && !goingLeft)
    {
        dx = 20;
        dy = 0;
    }

    if(keyPressed === DOWN_KEY && !goingUp)
    {
        dx = 0;
        dy = 20;
    }
}

function has_game_ended()
{
    for (let i = 4; i < snake.length; i++)
    {    
      const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
      if (has_collided) 
        return true
    }
    const hitLeftWall = snake[0].x < 0;  
    const hitRightWall = snake[0].x > gameBoard.width - 20;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameBoard.height - 20;
   
    return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}

function randomFood(min, max)
{
    return Math.round((Math.random() * (max-min) + min) / 20 ) * 20;
}

function generateFood()
{
    food_x = randomFood(0, gameBoard.width -20);
    food_y = randomFood(0, gameBoard.height - 20);
    snake.forEach(function hasSnakeEatenFood(part){
        const has_eaten = part.x == food_x && part.y == food_y;
        if(has_eaten) generateFood();
    });
}

function drawFood()
{
    gameBoard_ctx.fillStyle = 'lightgreen';
    gameBoard_ctx.strokestyle = 'darkgreen';
    gameBoard_ctx.fillRect(food_x, food_y, 20, 20);
    gameBoard_ctx.strokeRect(food_x, food_y, 20, 20);
}

// Touch elements
gameBoard.addEventListener("touchstart", handleTouchStart , false);
gameBoard.addEventListener("touchend", handleTouchEnd, false);

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0
let treshold = Math.max(1,Math.floor(0.01 * (gameBoard.width)));
const limit = Math.tan(45 * 1.5 / 180 * Math.PI);

function handleTouchStart(e)
{
    if(e.touches){
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }
}

function handleTouchEnd(e)
{
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    changeSwipedDirection();
}

function changeSwipedDirection()
{
    let x = touchEndX - touchStartX;
    let y = touchEndY - touchStartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (yx <= limit) {
            if (x < 0) {
                changeDirection(LEFT_KEY);
            } else {
                changeDirection(RIGHT_KEY);
            }
        }
        if (xy <= limit) {
            if (y < 0) {
                changeDirection(UP_KEY);
            } else {
                changeDirection(DOWN_KEY);
            }
        }
    } else {
        console.log("tap");
    }
}

