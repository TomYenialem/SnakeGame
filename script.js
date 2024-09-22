

document.addEventListener('keydown',(e)=>{
  e.preventDefault()
})


const canvas = document.getElementById("myCanvas");

let highScore=parseInt(document.querySelector('.high-score').innerHTML);
let scores=[]
let score = document.querySelector(".score").innerHTML;
let finalscore = parseInt(score);

let restart = document.querySelector(".btn");

const scale = 20;
const row = canvas.height / scale;
const cols = canvas.width / scale;

const randomSnake = [
  {
    x: Math.floor(Math.random() * cols) * scale,
    y: Math.floor(Math.random() * row) * scale,
  },
];

let food = {
  x: Math.floor(Math.random() * cols) * scale,
  y: Math.floor(Math.random() * row) * scale,
};

const ctx = canvas.getContext("2d");
let direction = "right";
let gameInterval;

restart.addEventListener("click", reset);

function reset() {
  document.querySelector(".score").innerHTML = 0;
  finalscore = 0;
   randomSnake.length = 1; // Reset snake size to 1
  randomSnake[0] = {
    x: Math.floor(Math.random() * cols) * scale,
    y: Math.floor(Math.random() * row) * scale,
  };
  direction = "right"; 



  food = {
    x: Math.floor(Math.random() * cols) * scale,
    y: Math.floor(Math.random() * row) * scale,
  };
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(moves, 100); 
}


// reset by key

document.addEventListener('keydown',(e)=>{
  if(e.key==='Enter'){
reset()
  }
})






function gameOver() {
  clearInterval(gameInterval);
  ctx.font = "50px Arial";
  ctx.fillStyle = "#f3033f;";
  ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
    if (finalscore > highScore) {
      highScore = finalscore;
      document.querySelector(".high-score").innerHTML = highScore;
    }

}




function keyDowns(e) {
  
  if (e.keyCode == 37 && direction != "right") direction = "left";
  if (e.keyCode == 38 && direction != "down") direction = "up";
  if (e.keyCode == 39 && direction != "left") direction = "right";
  if (e.keyCode == 40 && direction != "up") direction = "down";
}






document.addEventListener("keydown", keyDowns);


// select mode
let normal=document.querySelector('#select');
let easy = document.querySelector(".easy");
let hard = document.querySelector(".hard");

select.addEventListener("change", (e) => {
if(gameInterval){
  clearInterval(gameInterval)
}

  if (e.target.value === "hard") {
  gameInterval = setInterval(moves, 50);
  }
  else if(e.target.value==='easy'){
      gameInterval = setInterval(moves, 200);
  }
  else if(e.target.value==='normal'){
    gameInterval=setInterval(moves,100)
  }
});

 gameInterval = setInterval(moves, 100);









function moves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < randomSnake.length; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(randomSnake[i].x, randomSnake[i].y, scale, scale);
  }


  ctx.fillStyle = "#be123c";

 
  ctx.beginPath();
  ctx.arc(food.x + scale / 2, food.y + scale / 2, scale / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  let snakeX = randomSnake[0].x;
  let snakeY = randomSnake[0].y;

  if (direction == "right") snakeX += scale;
  if (direction == "left") snakeX -= scale;
  if (direction == "up") snakeY -= scale;
  if (direction == "down") snakeY += scale;

  if (snakeX > canvas.width) snakeX = 0;
  if (snakeY > canvas.height) snakeY = 0;
  if (snakeX < 0) snakeX = canvas.width;
  if (snakeY < 0) snakeY = canvas.height;

  // Check self-collision
  for (let i = 1; i < randomSnake.length; i++) {
    if (snakeX === randomSnake[i].x && snakeY === randomSnake[i].y) {
      gameOver();
      return;
    }
  }

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * cols) * scale,
      y: Math.floor(Math.random() * row) * scale,
    };
    finalscore++;
    document.querySelector(".score").innerHTML = finalscore;
  } else {
    randomSnake.pop();
  }

  let newBox = { x: snakeX, y: snakeY };
  randomSnake.unshift(newBox);
}





// help




let helpButton=document.querySelector('.modal');
let heldpDetails=document.querySelector('.help')
helpButton.addEventListener('click',()=>{
heldpDetails.classList.add('open')

})



// close button


let close=document.querySelector('.close')
close.addEventListener('click',()=> heldpDetails.classList.remove('open'))