import React, { Component } from 'react';
import './Connect4.css';

class Connect4 extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          board: [],
          currentPlayer: null,
          player1: 1,
          player2: 2,
          gameWon: false,
          message: ''
        };
        
        this.playerTurn = this.playerTurn.bind(this);
      }
      
      // Start the game.
      startGame() {
        var board = [];
        for (var i = 0; i < 6; i++) {
          var row = [];
          for (var j = 0; j < 7; j++) { 
              row.push(null); 
            }
          board.push(row);
        }
        
        this.setState(
        {
          board,
          currentPlayer: this.state.player1,
          gameWon: false,
          message: ''
        }
       );
      }
      
      switchPlayer() {
        if (this.state.currentPlayer === this.state.player1) {
            return this.state.player2;
        } else {
            return this.state.player1;
        }
      }

      // Play the game.
      playerTurn(position) {
        if (!this.state.gameWon) {
          var board = this.state.board;
          for (var i = 5; i >= 0; i--) {
            if (!board[i][position]) {
              board[i][position] = this.state.currentPlayer;
              break;
            }
          }
    
          var result = this.checkWin(board);
          if (result === this.state.player1) {
            this.setState({ board, gameWon: true, message: 'Player 1 (blue) wins!' });
          } else if (result === this.state.player2) {
            this.setState({ board, gameWon: true, message: 'Player 2 (purple) wins!' });
          } else {
            this.setState({ board, currentPlayer: this.switchPlayer() });
          }
        } else {
          this.setState({ message: 'Something went wrong -- please start a new game.' });
        }
      }

      checkWin(board) {
        return this.verticalWin(board) || this.horizontalWin(board) || this.diagonalRightWin(board) || this.diagonalLeftWin(board);
      }
      
      verticalWin(board) {
        for (var i = 3; i < 6; i++) {
          for (var j = 0; j < 7; j++) {
            if (board[i][j]) {
              if (board[i][j] === board[i - 1][j] &&
                  board[i][j] === board[i - 2][j] &&
                  board[i][j] === board[i - 3][j]) {
                return board[i][j];    
              }
            }
          }
        }
      }
      
      horizontalWin(board) {
        for (var i = 0; i < 6; i++) {
          for (var j = 0; j < 4; j++) {
            if (board[i][j]) {
              if (board[i][j] === board[i][j + 1] && 
                  board[i][j] === board[i][j + 2] &&
                  board[i][j] === board[i][j + 3]) {
                return board[i][j];
              }
            }
          }
        }
      }
      
      diagonalRightWin(board) {
        for (var i = 3; i < 6; i++) {
          for (var j = 0; j < 4; j++) {
            if (board[i][j]) {
              if (board[i][j] === board[i - 1][j + 1] &&
                  board[i][j] === board[i - 2][j + 2] &&
                  board[i][j] === board[i - 3][j + 3]) {
                return board[i][j];
              }
            }
          }
        }
      }
      
      diagonalLeftWin(board) {
        for (var i = 3; i < 6; i++) {
          for (var j = 3; j < 7; j++) {
            if (board[i][j]) {
              if (board[i][j] === board[i - 1][j - 1] &&
                  board[i][j] === board[i - 2][j - 2] &&
                  board[i][j] === board[i - 3][j - 3]) {
                return board[i][j];
              }
            }
          }
        }
      }

      componentWillMount() {
        this.startGame();
      }
      
      render() {
        return (
          <div>
            <div className="new-game-button" 
            onClick={() => {this.startGame()}}> New Game 
            </div>
            
            <table>
              <tbody>
                {this.state.board.map((row, i) => (<Row key={i} row={row} playerTurn={this.playerTurn} />))}
              </tbody>
            </table>
            
            <p className="message"> {this.state.message} </p>
          </div>
        );
      }
}

export default Connect4;

// Display components:
const Row = ({ row, playerTurn }) => {
    return (
      <tr>
        {row.map((slot, i) => <Slot key={i} value={slot} columnIndex={i} playerTurn={playerTurn} />)}
      </tr>
    );
  };
  
  const Slot = ({ value, columnIndex, playerTurn }) => {
    let color = 'white';
    if (value === 1) {
      color = 'blue';
    } else if (value === 2) {
      color = 'purple';
    }
      
    return (
      <td>
        <div className="slot" onClick={() => {playerTurn(columnIndex)}}>
          <div className={color}> 
          </div>
        </div>
      </td>
    );
  };
