import React from "react";
import "./TicTacToe.css";
import { fire } from "../../Auth/firebase";

import { Button, Paper, TextField} from '@material-ui/core';

function Square(props) {
  return (
    <div className="square" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <>
        {this.props.disabled ? (
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
          />
        ) : (
          <Square value={this.props.squares[i]} />
        )}
      </>
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

const initialState = {
  history: [
    {
      squares: Array(9).fill(""),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
  isX: false,
  showReset: false,
};

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      cards: [],
      currentCard: 0,
      answer: ""
    };
    var data = JSON.parse(window.localStorage.getItem('Cards'));
    var importedCards = [];
    for (var key in data) {
        let value = data[key];
        importedCards.push({question: value, answer: key});
    }
    this.state.cards = importedCards;
    this.state.currentCard = Math.floor(Math.random() * Math.floor(importedCards.length));
    console.log(this.state.cards);
    this.checkQuestion = this.checkQuestion.bind(this);
  }

  componentDidMount() {
    const key = window.location.pathname.substr(1);
    if (localStorage.getItem(key)) {
      this.setState({
        isX: true,
      });
    }
    fire
      .database()
      .ref("game")
      .child(key)
      .on("value", (snap) => {
        if (snap.exists()) {
          if (snap.val().newGame) {
            console.log("new!");
          } else {
            this.setState({
              history: snap.val().history,
              stepNumber: snap.val().stepNumber,
              xIsNext: snap.val().xIsNext,
              showReset: snap.val().showReset,
            });
          }
        }
      });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState(
      {
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      },
      () => {
        console.log(this.state.history);
        fire
          .database()
          .ref("game")
          .child(window.location.pathname.substr(1))
          .set({
            history: this.state.history,
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext,
          });
      }
    );
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  reset() {
    fire
      .database()
      .ref("game")
      .child(window.location.pathname.substr(1))
      .set(initialState);
  }

  checkQuestion() {
    if (this.state.answer == this.state.cards[this.state.currentCard].answer) {
      alert('Correct! Now make a move :)');
      this.setState({currentCard: Math.floor(Math.random() * Math.floor(this.state.cards.length)), answer: ""});
    }
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const noWin = history.length > 9;
    const showCode = history.length < 3;

    let showReset = false;
    let status;
    let toDisable = this.state.isX === this.state.xIsNext;

    if (winner) {
      status = winner + " wins!";
      showReset = true;
    } else if (noWin) {
      status = "No Winners";
      showReset = true;
    } else {
      if (toDisable) {
        status = "It's your turn!";
      } else {
        status = "Waiting for opponent... ";
      }
    }

    return (
      <div className="game">
        <Paper className="tic-tac-toe-header">
        {showCode && (
            <div className="share">
              <b>Share this URL to play with a friend:  </b>
                <a href={window.location.href}>
                  {window.location.host}/{window.location.pathname.substr(1)}
                </a>
            </div>
          )}
          <div>
            Write the answer to: <span>{this.state.cards[this.state.currentCard].question}</span>
          </div>
          <div className="tic-tac-toe-form-container">
            <form className="ticForm"> 
              <TextField
                variant="filled"
                value={this.state.answer}
                onChange={(e) => {this.setState({answer: e.target.value})}}
                label="Enter answer"
                >
              </TextField>
            </form>
            <Button variant='contained' color="primary" onClick={this.checkQuestion}>{"Submit"}</Button>
          </div>
        </Paper>
          
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            disabled={toDisable}
            className="board"
          />
          <div className="info">
            {this.state.isX ? <div>You're X</div> : <div>You're O</div>}

            <b>{status}</b>
          </div>

          {showReset && (
            <Button
              color="primary"
              variant="contained"
              className="ticButton"
              onClick={() => this.reset()}
            >
              reset
            </Button>
          )}
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
