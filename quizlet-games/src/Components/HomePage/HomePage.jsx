import React from "react";
import { useState } from "react";
import "./HomePage.css";

import Carousel from 'react-material-ui-carousel'

import GameCard from './GameCard';

import { makeStyles } from '@material-ui/core/styles';
import { Container,
         Box,
         Card,
         Paper,
         Button,
         TextField
         } from '@material-ui/core';

const useStyles = makeStyles({
  titleCard: {
    width: '100%',
    backgroundColor: '#4257b2',
    color: '#ffffff',
    display:'flex',
    marginBottom: '30px',
    marginTop: '30px',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const HomePage = () => {
  const classes = useStyles();

  const [parsedValue, setParsedValues] = useState({});

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
      cardObject[singleCards[0]] = singleCards[1];
    }
    console.log(cardObject);
    setParsedValues(cardObject);
  };

  const startGame = () => {
    parser();
    //   Start selected game here
    window.location = "/concentration";
  };
  
  var items = [
      {
          name: "Random Name #1",
          description: "Probably the most random thing you have ever seen!"
      },
      {
          name: "Random Name #2",
          description: "Hello World!"
      }
  ]
  return (
    <div className="App">

      <Paper className={classes.titleCard}>
        <h2 className="title">Quizlet Games</h2>
      </Paper>

      <Paper className = "content-container">
        <div className="games">
          <div className="single-player-container">
            <p className="single">Single Player</p>
            <Carousel autoPlay={false}>
              {
                  items.map( (item, i) => <GameCard key={-i} quizletData={parsedValue}/> )
              }
            </Carousel>
          </div>
          <div className="multi-player-container">
            <p className="multi">Multiplayer</p>
            <Carousel autoPlay={false}>
              {
                  items.map( (item, i) => <GameCard key={i} quizletData={parsedValue}/> )
              }
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
    </div>
  );
};

export default HomePage
