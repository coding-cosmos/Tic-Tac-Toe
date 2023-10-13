const gameBoard = (function(){
    const row = 3;
    const col = 3;
    const board = [];

    // create an array (3 x 3)
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for(let j = 0 ; j< col; j++){
            board[i].push('')
        }        
    }

    // change value of cell
    const changeValue = (row,col,marker)=>{
        board[row][col] = marker;
    }

    // return the board
    const getBoard = ()=>board;

    return{
        getBoard,
        changeValue,
    }

})();


function Player(name,marker){
    return {
        name,
        marker,
    };
}

const gameController = (function(){
    // playerOne , playerTwo
    // setPlayers()
    // playRound()
    // changeActivePlayer()
    // checkWinner()
    // activePlayer
    const board = gameBoard;
    
    let playerOne = "me";
    let playerTwo = "other";
    let activePlayer = playerOne;

    const setPlayers = (playerOne,playerTwo)=>{
        this.playerOne =  playerOne;
        this.playerTwo = playerTwo;
    }

    const changeActivePlayer = ()=>{
        activePlayer = activePlayer === playerOne ? playerTwo:playerOne;
    }
    
    const playRound = ([row,col],marker)=>{
        // play one move
       board.changeValue(row,col,activePlayer.marker||marker);
       //check if there is a win
       
       if(checkWinner()){
        return {
            finish: true,
            activePlayer,
        }
       }else{
        changeActivePlayer();
        return{
            finish:false,
        }
       }
    }

    const checkWinner = ()=>{
        let boardMatrix = board.getBoard();
        console.log(boardMatrix);
        if( // row
            ((boardMatrix[0][0] === boardMatrix[0][1])&&(boardMatrix[0][0] === boardMatrix[0][2])&&(boardMatrix[0][0])!=='')||
            ((boardMatrix[1][0] === boardMatrix[1][1])&&(boardMatrix[1][0] === boardMatrix[1][2])&&(boardMatrix[1][0]!==''))||
            ((boardMatrix[2][0] === boardMatrix[2][1])&&(boardMatrix[2][0] === boardMatrix[2][2])&&(boardMatrix[2][0]!==''))||
            //col
            ((boardMatrix[0][0] === boardMatrix[1][0])&&(boardMatrix[0][0] === boardMatrix[2][0])&&(boardMatrix[0][0]!==''))||
            ((boardMatrix[0][1] === boardMatrix[1][1])&&(boardMatrix[0][1] === boardMatrix[2][1])&&(boardMatrix[0][1]!==''))||
            ((boardMatrix[0][2] === boardMatrix[1][2])&&(boardMatrix[0][2] === boardMatrix[2][2])&&(boardMatrix[0][2]!==''))||
            //diagonal
           ( (boardMatrix[0][0] === boardMatrix[1][1])&&(boardMatrix[0][0] === boardMatrix[2][2])&&(boardMatrix[0][0]!== ''))||
            ((boardMatrix[0][2] === boardMatrix[1][1])&&(boardMatrix[0][2] === boardMatrix[2][0])&&(boardMatrix[0][2] !== ''))
        ){
            return true;
        }else{
            return false;
        }
    }

    return{
        setPlayers,
        playRound,
    }


})();
// const screenController = (function(){
//     const board = gameBoard.getBoard();
//     board.forEach((row,rowIndex)=>{
//         row.forEach((col,colIndex)=>{
//             // console.log(rowIndex+","+colIndex);
//         })
//     })


// })();

