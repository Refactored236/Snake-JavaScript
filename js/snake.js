// Get the gameboard
const gameBoard = document.getElementById("gameBoard");
// Set gameBoard 2D context
const gameBoard_ctx = gameBoard.getContext("2d");
const board_border = 'black';
const board_background = "white";
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
document.addEventListener("keydown", changeDirection);
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

function changeDirection(event)
{
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
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