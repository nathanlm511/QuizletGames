import React from "react";
import "./App.css";

import HomePage from './Components/HomePage/HomePage';
import Concentration from './Concentration';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Test } from "./Components/Test";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Switch>
        <Route path="/concentration" component={Concentration} />
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/test" component={Test} />
      </Switch>
    </div>
  );
}

export default App;
