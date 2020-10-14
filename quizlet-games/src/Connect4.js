import React, { Component } from 'react'
import './Connect4.css';

class Connect4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [],
            currentPlayer: null,
            player1: null,
            player2: null,
            gameWon: false
        };
        this.playerTurn = this.playerTurn.bind(this);
    }

    // Start the game.
    startGame() {
        board = [];
        for (i = 0; i < 6; i++) {
            row = [];
            for (j = 0; j <7; j++) {
                row.push(null)
            }
            board.push(row);
        }

        this.setState(
            {
                board,
                currentPlayer: this.state.player1,
                gameWon: false
            }
        );
    }

    switchPlayer() {
        if (this.state.currentPlayer == this.state.player1) {
            return this.state.player2;
        } else {
            return this.state.player1;
        }
    }

    // Play the game.
    playerTurn(position) {
        if (!this.state.gameWon) {
            board = this.state.board;
            for (i = 5; i >= 0; i--) {
                if (!board[i][position]) {
                    board[i][position] = this.state.currentPlayer;
                    break;
                }
            }
        } else {
            result = this.checkWin(board);
            if (result == this.state.player1) {
                this.setState({board, gameWon: true});
            } else if (result == this.state.player2) {
                this.setState({board, gameWon: true});
            } else {
                this.setState({board, currentPlayer: this.switchPlayer() });
            }
        }
    }

    checkWin(board) {
        return this.verticalWin(board) || this.horizontalWin(board) || this.diagonalRightWin(board) || this.diagonalLeftWin(board);
    }

    verticalWin(board) {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 7; j++) {
                if (board[i][j]) {
                    if (board[i][j] == board[i + 1][j] && board[i][j] == board[i + 2][j] && board[i][j] == board[i + 3][j]) {
                        return board[i][j];
                    }
                }
            }
        }
    }

    horizontalWin(board) {
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 4; j++) {
                if (board[i][j]) {
                    if (board[i][j] == board[i + 1][j] && board[i][j] == board[i + 2][j] && board[i][j] == board[i + 3][j]) {
                        return board[i][j];
                    }
                }
            }
        }
    }

    diagonalRightWin(board) {
        for (i = 3; i < 6; i++) {
            for (j = 0; j < 4; j++) {
                if (board[i][j]) {
                    if (board[i][j] == board[i - 1][j + 1] && board[i][j] == board[i - 2][j + 2] && board[i][j] == board[i - 3][j + 3]) {
                        return board[i][j];
                    }
                }
            }
        }
    }

    diagonalLeftWin(board) {
        for (i = 3; i < 6; i++) {
            for (j = 3; j < 7; j++) {
                if (board[i][j]) {
                    if (board[i][j] == board[i - 1][j - 1] && board[i][j] == board[i - 2][j - 2] && board[i][j] == board[i - 3][j - 3]) {
                        return board[i][j];
                    }
                }
            }
        }
    }

    render() {
        return (
            <div>
                <div
                className="start"
                onClick={() => {this.startGame()}}> New Game 
                </div>
                <table>
                    <tbody>
                        {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.playerTurn} /> ))}
                    </tbody>
                </table>
            </div>
        );
    };
}

export default Connect4;

