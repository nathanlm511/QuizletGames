import React, { useState, useEffect } from "react";
import { fire } from "../../Auth/firebase";
import "./Home.css";

export default () => {
  const refURL = fire.database().ref("game");
  const [url, setURL] = useState("");
  const [urlList, setURLList] = useState([]);
  useEffect(() => {
    getURL();
  }, []);

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

  const submitURL = (event) => {
    event.preventDefault();
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
    <div>
      <div className="title">tic tac toe</div>
      <div>
        <form onSubmit={submitURL}>
          <input
            onChange={(e) => setURL(e.target.value)}
            value={url}
            placeholder="Enter invite code"
          />
          <button>{">"}</button>
        </form>
      </div>
      <div className="button">
        <button onClick={() => createGame()}>Create New Game</button>
      </div>
    </div>
  );
};
