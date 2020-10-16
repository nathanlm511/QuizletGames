import React, { useEffect } from "react";
import { useState } from "react";
import { db, fire } from "../../Auth/firebase";
import "./HomePage.css";
import { Login } from "../Login/Login";
import { Link } from "react-router-dom";

import Carousel from "react-material-ui-carousel";

import GameCard from "./GameCard";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Card,
  Paper,
  Button,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { auth } from "firebase";

const useStyles = makeStyles({
  titleCard: {
    width: "100%",
    backgroundColor: "#4257b2",
    color: "#ffffff",
    display: "flex",
    marginBottom: "30px",
    marginTop: "30px",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const HomePage = () => {
  const classes = useStyles();

  const [parsedValue, setParsedValues] = useState({});
  const [user, setUser] = useState("");
  const [signUpDisplay, setSignUpDisplay] = useState(true);
  const [cardDeckName, setCardDeckName] = useState("");

  useEffect(() => {
    const authListener = () => {
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          console.log(user);
        } else {
          setUser("");
        }
      });
    };
    authListener();
  }, []);

  const handleChange = (e) => {
    parser(e.target.value);
  };
  const parser = (str) => {
    let cards = str.split(";");
    let singleCards;
    let cardObject = {};
    // Problems: Accept all delimeters and options??? ie commas, tabs, spaces
    for (let i = 0; i < cards.length; i++) {
      singleCards = cards[i].split("\t");
      if (singleCards[0] != "") {
        cardObject[singleCards[0]] = singleCards[1];
      }
    }
    console.log(cardObject);
    setParsedValues(cardObject);
  };
  const startGame = () => {
    parser();
    //   Start selected game here
    window.location = "/concentration";
  };

  const handleLogOut = () => {
    fire.auth().signOut();
    setSignUpDisplay(!signUpDisplay);
  };

  const navDisplay = () => {
    if (user) {
      return (
        <AppBar position="static">
          <Toolbar>
            <h2 className="title">Quizlet Games</h2>
            <Button onClick={handleLogOut} color="inherit">
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      );
    } else {
      return (
        <AppBar position="static">
          <Toolbar>
            <h2 className="title">Quizlet Games</h2>
            <Button
              onClick={() => {
                setSignUpDisplay(!signUpDisplay);
              }}
              color="inherit"
            >
              Sign Up / Log In
            </Button>
          </Toolbar>
        </AppBar>
      );
    }
  };

  var singlePlayerGames = [
      {
        photo: "memory.jpg",
        link: "/concentration",
        name: "Concentration",
        description: "Think you got your flash cards memorized? See how quickly you can match them up."
      },
      {
        photo: "connect4.png",
        link: "/connect4",
        name: "Connect 4",
        description: "A classic game of tactics and strategy. Connect 4 in a row to win!"
      },
      {
        photo: "hangman.jpg",
        link: "/concentration",
        name: "Hangman (WIP)",
        description: "Guess the answer to the flashcard before the man is hung"
      }
  ]

  var multiPlayerGames = [
    {
      photo: "tic.png",
      link: "/menu",
      name: "Tic-Tac-Toe",
      description:
        "In this classic game of 3 in a row, answer questions to make a move before your opponent",
    },
    {
      photo: "connect4.png",
      link: "/concentration",
      name: "Rocket League",
      description:
        "Use racecars to dribble, pass, and shoot a ball into the goal!",
    },
    {
      photo: "hangman.jpg",
      link: "/concentration",
      name: "Pong (WIP)",
      description:
        "Keep the ball out of your goal. Move the paddle back and forth to block the ball",
    },
  ];

  const bodyDisplay = () => {
    if (signUpDisplay) {
      return (
        <Paper className="content-container">
          <div className="games">
            <div className="single-player-container">
              <p className="single">Single Player</p>
              <Carousel autoPlay={false}>
                {singlePlayerGames.map((game, i) => (
                  <GameCard game={game} quizletData={parsedValue} />
                ))}
              </Carousel>
            </div>
            <div className="multi-player-container">
              <p className="multi">Multiplayer</p>
              <Carousel autoPlay={false}>
                {multiPlayerGames.map((game, i) => (
                  <GameCard game={game} quizletData={parsedValue} />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="input-container">
            <div className="text-field--container">
              <TextField
                label="Exported Quizlet Data"
                multiline
                rows={8}
                fullWidth
                defaultValue="Enter your exported data here. Look at the the tooltip for help."
                onChange={handleChange}
                variant="outlined"
              />
            </div>
          </div>
        </Paper>
      );
    } else {
      return (
        <Login
          setUser={setUser}
          user={user}
          setSignUpDisplay={setSignUpDisplay}
        />
      );
    }
  };

  return (
    <>
      {navDisplay()}
      <div className="whitespace"></div>
      <div className="App">{bodyDisplay()}</div>
    </>
  );
};

export default HomePage;
