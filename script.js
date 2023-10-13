const gameBoard = (function () {
  const row = 3;
  const col = 3;
  const board = [];

  // create an array (3 x 3)
  const initBoard = () => {
    for (let i = 0; i < row; i++) {
      board[i] = [];
      for (let j = 0; j < col; j++) {
        board[i].push("");
      }
    }
  };

  //initialize board
  initBoard();

  // change value of cell
  const changeValue = (row, col, marker) => {
    board[row][col] = marker;
  };

  // return the board
  const getBoard = () => board;

  return {
    initBoard,
    getBoard,
    changeValue,
  };
})();

function Player(name, marker) {
  return {
    name,
    marker,
  };
}

const gameController = (function () {
  const board = gameBoard;
  const playerOne = Player("playerOne", "X");
  const playerTwo = Player("playerTwo", "O");
  let roundCount = 0;

  let activePlayer = playerOne;

  const setRoundCount = (count)=>{
    roundCount = count;
  }

  const changeActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const playRound = ([row, col]) => {

    // play one move
    if (board.getBoard()[row][col] === "") {
      roundCount++;
      board.changeValue(row, col, activePlayer.marker);
    } else {
      return;
    }

    //check if there is a win
    if (checkWinner()) {
      return {
        finish: true,
        activePlayer,
      };
    } else {
      changeActivePlayer();
      return {
        finish: false,
        roundCount,
      };
    }
  };

  const checkWinner = () => {
    let boardMatrix = board.getBoard();

    if (
      // row
      (boardMatrix[0][0] === boardMatrix[0][1] &&
        boardMatrix[0][0] === boardMatrix[0][2] &&
        boardMatrix[0][0] !== "") ||
      (boardMatrix[1][0] === boardMatrix[1][1] &&
        boardMatrix[1][0] === boardMatrix[1][2] &&
        boardMatrix[1][0] !== "") ||
      (boardMatrix[2][0] === boardMatrix[2][1] &&
        boardMatrix[2][0] === boardMatrix[2][2] &&
        boardMatrix[2][0] !== "") ||
      //col
      (boardMatrix[0][0] === boardMatrix[1][0] &&
        boardMatrix[0][0] === boardMatrix[2][0] &&
        boardMatrix[0][0] !== "") ||
      (boardMatrix[0][1] === boardMatrix[1][1] &&
        boardMatrix[0][1] === boardMatrix[2][1] &&
        boardMatrix[0][1] !== "") ||
      (boardMatrix[0][2] === boardMatrix[1][2] &&
        boardMatrix[0][2] === boardMatrix[2][2] &&
        boardMatrix[0][2] !== "") ||
      //diagonal
      (boardMatrix[0][0] === boardMatrix[1][1] &&
        boardMatrix[0][0] === boardMatrix[2][2] &&
        boardMatrix[0][0] !== "") ||
      (boardMatrix[0][2] === boardMatrix[1][1] &&
        boardMatrix[0][2] === boardMatrix[2][0] &&
        boardMatrix[0][2] !== "")
    ) {
      return true;
    } else {
      return false;
    }
  };

  return {
    setRoundCount,
    playRound,
  };
})();

const screenController = (function () {
  const game = gameController;
  const board = gameBoard.getBoard();

  const boardDiv = document.querySelector(".board");
  const resultDiv = document.querySelector(".result");
  const playAgainBtn = document.querySelector("#reset");
  const nameInputs = document.querySelectorAll("div.name input");
  let playerOne;
  let playerTwo;

  // get playerOne and playerTwo
  nameInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.id == "playerOne") {
        playerOne = input.value;
      } else {
        playerTwo = input.value;
      }
    });
  });

  // store the result of each move
  let result = [];

  // update screen with board array data
  const updateScreen = () => {
    // make board empty initially
    boardDiv.textContent = "";

    // render the board
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const cell = document.createElement("div");
        cell.classList = "cell";
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;
        cell.textContent = col;
        boardDiv.appendChild(cell);
      });
    });

    // declare the winner
    if (result.finish == true) {
      const winner =
        result.activePlayer.name == "playerOne" ? playerOne||"Player One" : playerTwo||"Player Two";
      resultDiv.textContent = `Winner is ${winner} !!`;
      boardDiv.removeEventListener("click", clickHandlerBoard);
    }else{
        if(result.roundCount === 9){
            resultDiv.textContent = 'Draw !!';
        }
    }
  };

  // perform move on clicking the cell
  const clickHandlerBoard = (e) => {
    // get row and col of clicked cell
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    result = game.playRound([row, col]);

    updateScreen();
  };
  boardDiv.addEventListener("click", clickHandlerBoard);

  // reset the game
  playAgainBtn.addEventListener("click", () => {
    gameBoard.initBoard();
    updateScreen();
    resultDiv.textContent = "";
    boardDiv.addEventListener("click", clickHandlerBoard);
    game.setRoundCount(0);
  });

  // initial render
  updateScreen();
})();
