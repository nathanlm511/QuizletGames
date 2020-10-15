import React, { useState, useEffect } from "react";
import { fire } from "../../Auth/firebase";
import TicTacToe from "../TicTacToe/TicTacToe";

import './Redirect.css';

export default () => {
  const [exist, setExist] = useState(0);
  useEffect(() => {
    getURL();
  }, []);
  const getURL = () => {
    const key = window.location.pathname.substr(1);
    console.log(key);
    fire
      .database()
      .ref("game")
      .child(key)
      .once("value")
      .then((snap) => {
        if (snap.exists()) {
          setExist(2);
        } else setExist(1);
      });
  };

  return (
    <div className="redirect-container">
      {exist === 0 && (
        <div className="tic-tac-toe-header">
          <p>Loading Game..</p>
          <a href="/">Go Back?</a>
        </div>
      )}
      {exist === 1 && (
        <div className="tic-tac-toe-header">
          <p>URL not found</p>
          <a href="/">Go Back?</a>
        </div>
      )}
      <div className='tic-tac-toe-content'> 
         {exist === 2 && <TicTacToe />}
      </div>
    </div>
  );
};
