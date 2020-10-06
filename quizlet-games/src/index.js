// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// react-dom (what we'll use here)
import { BrowserRouter } from "react-router-dom"
ReactDOM.render(<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));
