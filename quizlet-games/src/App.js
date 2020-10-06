import React from 'react';
import './App.css';

import Home from './Home';
import Concentration from './Concentration';

import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/concentration" component={Concentration} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
