import React from "react";
import { useState } from "react";
import "./HomePage.css";

export const HomePage = () => {
  const [studyValues, setStudyValues] = useState([]);
  const [parsedValue, setParsedValues] = useState({});

  const handleChange = (e) => {
    setStudyValues(e.target.value);
  };
  const parser = () => {
    let cards = studyValues.split(";");
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
  return (
    <div className="App">
      <div className="titleCard">
        <h2 className="title">Quizlet Games</h2>
      </div>
      <textarea
        className="text-box"
        placeholder="Enter data here"
        onChange={handleChange}
      ></textarea>
      <div className="games">
        <p className="single">Single Player</p>
        <button onClick={startGame}>Start</button>

        <p className="multi">Multiplayer</p>
      </div>
    </div>
  );
};

export default HomePage
