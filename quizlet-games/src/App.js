import React from 'react';
import './App.css';

import HomePage from './Components/HomePage/HomePage';
import Concentration from './Concentration';
import CssBaseline from '@material-ui/core/CssBaseline';

import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Switch>
        <Route path="/concentration" component={Concentration} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
