const boxes = document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;

let winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


// let creat a function to initialise the game

function initGame(){

    currentPlayer="X";
    gameGrid = ["","","","","","","","",""];
    // new game on uI
    boxes.forEach((box,index)=>{
        box.innerText = "";
       // boxes[index].style.pointerEvents = "all";
       boxes[index].style.pointerEvents="all";
        // initialise box with css properties again
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;

}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    // UI update 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
let answer = "";
winningPositions.forEach((position) =>{
    // all three boxes should be non-empty and exactly same in val
    if((gameGrid[position[0]] !== "" ||  gameGrid[position[1]] !== "" ||  gameGrid[position[2]] !== ""  )&&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
           
     
        // check if winner is X
        if(gameGrid[position[0]]==="X"){
            answer="X";
        }
        else{
            answer="O";
        }
           // disable pointer
           boxes.forEach((box)=>{
            box.style.pointerEvents = "none";
           })
        // now we know X/O is winner 
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
});
// we havw winner
if(answer !=="")
{
    gameInfo.innerText=`Winner player - ${answer}`;
    newGameBtn.classList.add("active"); 
    return; 
}

//when there is no winner
let fillcount=0;
  gameGrid.forEach((box)=>{
    if(box !== "")
     fillcount++;
  });

  if(fillcount === 9)
  {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
    
}
function handleClick(index){
  if(gameGrid[index] ===""){
    boxes[index].innerText = currentPlayer;
    gameGrid[index]  =currentPlayer;
    boxes[index].style.pointerEvents = 'none';
    // swap turn 
    swapTurn();
    // check for win
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);


 