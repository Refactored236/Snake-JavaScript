// Get the gameboard
const gameBoard = document.getElementById("gameBoard");
// Set gameBoard 2D context
const gameBoard_ctx = gameBoard.getContext("2d");
const board_border = 'black';
const board_background = "white";
//Generate the initial snake
//Snakes head 200 to tail 160 (4 parts)
let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200}];
//Always initialize with clear Canvase
clearCanvas();
 
//On Start, clear the canvas and draw the snake
document.getElementById('start').addEventListener('click', () => {clearCanvas();
    drawSnake();});


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

