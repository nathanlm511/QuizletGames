import React, { useState, useEffect } from "react";
import { fire } from "../../Auth/firebase";
import "./Menu.css";

import { Paper, TextField, Button, InputAdornment } from '@material-ui/core';

export default () => {
  const refURL = fire.database().ref("game");
  const [url, setURL] = useState("");
  const [urlList, setURLList] = useState([]);
  useEffect(() => {
    const getURL = () => {
      refURL.orderByChild("timestamp").on("value", (snap) => {
        var data = [];
        if (snap !== null) {
          snap.forEach((item) => {
            data.push({
              count: item.val().count,
              key: item.key,
              url: item.val().url,
            });
          });
          setURLList(data.reverse());
        }
      });
    };
    getURL();
  }, []);

  const submitURL = (event) => {
    window.location.href = url;
  };

  const createGame = () => {
    const key = Math.random().toString(36).substring(2, 7);
    refURL
      .child(key)
      .set({ newGame: true })
      .then(() => (window.location.href = key));
    localStorage.setItem(key, true);
  };

  return (
    <div className="menu-container">
      <Paper className="menu-paper">
        <div className="title-menu">Tic Tac Toe</div>
        <div>
          <form onSubmit={submitURL}>
            <TextField
              variant="filled"
              onChange={(e) => setURL(e.target.value)}
              value={url}
              label="Enter invite code"
              >
            </TextField>
          </form>
          <div className="buttons">
            <Button variant='contained' color="primary" type="submit">{"Join a lobby"}</Button>
            <span className="or">or</span>
            <Button variant='contained' color="primary" onClick={() => createGame()}>Create Game</Button>
          </div>
        </div>
        
      </Paper>
    </div>
  );
};
