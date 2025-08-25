class TicTacToe {
    constructor(gridBlockList, gameInst, restartBtn) {
        this.gridBlockList = gridBlockList;
        this.gameInst = gameInst;
        this.restartBtn = restartBtn;

        this.rows = 3;
        this.cols = 3;
        this.globalTryCount = 0;

        this.board = new Array(this.rows).fill().map(() => new Array(this.cols).fill(null));

        this.gameInst.innerHTML = "X's chance";
        this.gameInst.style.fontWeight = "bold";
        this.restartBtn.style.display = "none";
    }

    playMove(block) {
        this.globalTryCount++;
        let symbol = (this.globalTryCount % 2 === 0) ? "O" : "X";

        block.src = (symbol === "X") ? "Ximage.jpg" : "Oimage.jpg";
        this.populateArray(block.id, symbol);

        if (this.checkGameOver(symbol)) {
            this.gameInst.innerHTML = symbol + " has won the game!";
            this.gameInst.style.color = "green";
            this.gameInst.style.fontWeight = "bold";
            this.restartBtn.style.display = "inline-block";
            this.disableAllImages();
            return;
        }

        if (this.globalTryCount === 9) {
            this.gameInst.innerHTML = "This game was a draw!";
            this.restartBtn.style.display = "inline-block";
            this.disableAllImages();
            return;
        }
        
        this.gameInst.innerHTML = (symbol === "X") ? "O's chance" : "X's chance";
    }

    populateArray(id, symbol) {
        let idClicked = parseInt(id[id.length - 1]);
        let x = Math.floor((idClicked - 1) / 3);
        let y = (idClicked - 1) % 3;
        this.board[x][y] = symbol;
    }

    checkGameOver(symbol) {
        
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] === symbol && this.board[i][1] === symbol && this.board[i][2] === symbol) return true;
        }
        
        for (let j = 0; j < 3; j++) {
            if (this.board[0][j] === symbol && this.board[1][j] === symbol && this.board[2][j] === symbol) return true;
        }
       
        if (this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol) return true;
        if (this.board[0][2] === symbol && this.board[1][1] === symbol && this.board[2][0] === symbol) return true;

        return false;
    }

    disableAllImages() {
        this.gridBlockList.forEach(img => {
            img.style.pointerEvents = "none";
        });
    }
}

const gridBlockList = document.querySelectorAll(".grid-block");
const gameInst = document.getElementById("game-instructions");
const restartBtn = document.getElementById("button-tryagain");

const game = new TicTacToe(gridBlockList, gameInst, restartBtn);

gridBlockList.forEach(block => {
    block.addEventListener("click", (e) => {
        game.playMove(e.target);
    });
});
