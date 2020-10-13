import React, { Component } from 'react'
import './Concentration.css';

import { Paper,
    Container,
    Card
    } from '@material-ui/core';


class Concentration extends Component {

    constructor() {
        super();
        this.state = {
            firstCard: null,
            secondCard: null,
            pairs: []
        };
        var data = JSON.parse(window.localStorage.getItem('Cards'));
        var importedPairs = [];
        for (var key in data) {
            let value = data[key];
            importedPairs.push({word: key, match: value});
            importedPairs.push({word: value, match: key});
        }
        this.state.pairs = importedPairs;
    }

    handleClick = (e) => {
        let card = e.target;
        if (card.classList.contains("card-flipped")) {
            return;
        }
        if (this.state.firstCard != null && this.state.secondCard != null) {
            // flip both 
            this.state.firstCard.innerHTML = "";
            this.state.secondCard.innerHTML = "";
            this.state.firstCard.classList.remove("card-flipped");
            this.state.secondCard.classList.remove("card-flipped");
            this.state.firstCard = null;
            this.state.secondCard = null;
        }
        if (this.state.firstCard != null) {
            if (this.state.firstCard == card) {
                //flip same first card over on its back again
                card.innerHTML = "";
                this.state.firstCard.classList.remove("card-flipped");
                this.state.firstCard = null;
            }
            else {
                card.innerHTML = card.getAttribute("word");
                card.classList.add("card-flipped");
                if (this.state.firstCard.getAttribute("match") == card.getAttribute("word") && 
                    this.state.firstCard.getAttribute("word") == card.getAttribute("match")) {
                    // a match: reset state, turn green
                    this.state.firstCard.classList.add("green");
                    card.classList.add("green");
                    this.state.firstCard = null;
                }
                else {
                    this.state.secondCard = card;
                }
            }
        }
        else {
            // flip first card over
            this.state.firstCard = card;
            card.innerHTML = card.getAttribute("word");
            this.state.firstCard.classList.add("card-flipped");
        }
    }
    

    render() {
        return (
            <Container maxWidth="large">
                <div>
                    <h1>Concentration</h1>
                    <p>Match your flash cards. Try to remember what you already flipped!</p>
                </div>
                <Paper className="concentration-container">
                    {this.state.pairs
                    .sort(() => Math.random() - 0.5)
                    .map((e) => {
                        return (
                            <div 
                                className = "card"
                                word = {e.word}
                                match = {e.match}
                                onClick={this.handleClick}></div>
                        );
                    })}
                </Paper>
            </Container>
        )
    }
}

export default Concentration;