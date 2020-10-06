import React, { Component } from 'react'

import { Link } from "react-router-dom";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            pairs: [],
            grid: []
        };
    }
      

    render() {
        return (
            <div>
                <Link to="/concentration">Play</Link>
                <div>testsetestsetsetesetst</div>
            </div>
        )
    }
}

export default Home;