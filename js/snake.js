// Get the gameboard
const gameBoard = document.getElementById("gameBoard");
// Set gameBoard 2D context
const gameBoard_ctx = gameBoard.getContext("2d");
const board_border = 'black';
const board_background = "white";
let dx =10;
let dy=0;
//Generate the initial snake
//Snakes head 200 to tail 160 (4 parts)
let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200}];
//Always initialize with clear Canvase
clearCanvas();

function main(){
    
    if(has_game_ended()) {
        return;
    } 

    setTimeout(function onTick()
    {
        clearCanvas();
        moveSnake();
        drawSnake();
        main();
    },100
    )
}

function restart(){
    if(has_game_ended()) {
        dx =10;
        dy=0;
        snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200}];
        main();
    }
}

//On Start, clear the canvas and draw the snake
document.getElementById('start').addEventListener('click', () => {main()});

document.addEventListener("keydown", changeDirection);

document.getElementById('retry').addEventListener('click', () => {restart()} );

// Draw a rectangle for each set of coordinates
function drawSnakePart(snakePart)
{
    gameBoard_ctx.fillStyle = 'lightblue';
    gameBoard_ctx.strokestyle = 'darkblue';
    gameBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    gameBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
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
    snake.pop(); //removes last element in array i.e. moving the snake (on the x axis)
}

function changeDirection(event)
{
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if(keyPressed === LEFT_KEY && !goingRight)
    {
        dx = -10;
        dy = 0;
    }

    if(keyPressed === UP_KEY && !goingDown)
    {
        dx = 0;
        dy = -10;
    }

    if(keyPressed === RIGHT_KEY && !goingLeft)
    {
        dx = 10;
        dy = 0;
    }

    if(keyPressed === DOWN_KEY && !goingUp)
    {
        dx = 0;
        dy = 10;
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
    const hitRightWall = snake[0].x > gameBoard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameBoard.height - 10;
   
    return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}

