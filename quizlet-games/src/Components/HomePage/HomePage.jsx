import React from "react";
import { useState } from "react";
import { fire } from "../../Auth/firebase";
import "./HomePage.css";
import { Login } from "../Login/Login";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [studyValues, setStudyValues] = useState([]);
  const [parsedValue, setParsedValues] = useState({});
  const [user, setUser] = useState("");
  const [signUpDisplay, setSignUpDisplay] = useState(true);

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
  const handleLogOut = () => {
    fire.auth().signOut();
    setSignUpDisplay(!signUpDisplay);
  };

  const bodyDisplay = () => {
    if (signUpDisplay) {
      return (
        <>
          <textarea
            className="text-box"
            placeholder="Enter data here"
            onChange={handleChange}
          />
          <div className="games">
            <p className="single">Single Player</p>
            <button onClick={startGame}>Start</button>

            <p className="multi">Multiplayer</p>
          </div>
        </>
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

  const navDisplay = () => {
    if (user) {
      return (
        <nav className="titleCard">
          <h2 className="title">Quizlet Games</h2>
          <button onClick={handleLogOut}>Log Out</button>
        </nav>
      );
    } else {
      return (
        <nav className="titleCard">
          <h2 className="title">Quizlet Games</h2>
          <button
            onClick={() => {
              setSignUpDisplay(!signUpDisplay);
            }}
          >
            Sign Up or Log In
          </button>
        </nav>
      );
    }
  };
  return (
    <>
      {navDisplay()}

      <div className="App">{bodyDisplay()}</div>
    </>
  );
};

export default HomePage;
