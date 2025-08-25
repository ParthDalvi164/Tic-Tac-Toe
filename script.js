let globalTryCount = 0;
let playerWon;

const gridBlockList = document.querySelectorAll(".grid-block");
let gameInst = document.getElementById("game-instructions");
document.getElementById("button-tryagain").style.display = "none";

gameInst.innerHTML = "X's chance";
gameInst.style.fontWeight = "bold";

gridBlockList.forEach(block => {
    block.addEventListener("click", (e) => {
        globalTryCount++;
        let currentBlock = document.getElementById(e.target.id);

        let symbol = (globalTryCount % 2 === 0) ? "O" : "X";
        currentBlock.src = (symbol === "X") ? "Ximage.jpg" : "Oimage.jpg";
        populateArray(currentBlock.id, symbol);

        if (checkGameOver(symbol)) {
            gameInst.innerHTML = symbol + " has won the game!";
            gameInst.style.color = "green";
            gameInst.style.fontWeight = "bold";
            document.getElementById("button-tryagain").style.display = "inline-block";
            disableAllImages();
            return; 
        }

        if (globalTryCount === 9) {
            gameInst.innerHTML = "This game was a draw!";
            document.getElementById("button-tryagain").style.display = "inline-block";
            disableAllImages();
        } else {
            gameInst.innerHTML = (symbol === "X") ? "O's chance" : "X's chance";
            gameInst.style.fontWeight = "bold";
        }
    });
})

let rows = 3;
let cols = 3;

let counter = 10;

let arr = new Array(rows).fill().map(() => new Array(cols).fill("0"));

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    arr[i][j] = String(counter); 
    counter++;
  }
}

function checkGameOver(symbol) {
   
    for (let i = 0; i < 3; i++) {
        if (arr[i][0] === symbol && arr[i][1] === symbol && arr[i][2] === symbol) return true;
    }
    
    for (let j = 0; j < 3; j++) {
        if (arr[0][j] === symbol && arr[1][j] === symbol && arr[2][j] === symbol) return true;
    }
    
    if (arr[0][0] === symbol && arr[1][1] === symbol && arr[2][2] === symbol) return true;
    if (arr[0][2] === symbol && arr[1][1] === symbol && arr[2][0] === symbol) return true;

    return false;
}


function populateArray(id, symbol) {
    let idClicked = parseInt(id[id.length - 1]);
    let x = Math.floor((idClicked - 1) / 3);
    let y = (idClicked - 1) % 3;

    arr[x][y] = symbol;
    console.log(arr);
}


function disableAllImages() {
    gridBlockList.forEach(img => {
        img.style.pointerEvents = "none";
    });
}