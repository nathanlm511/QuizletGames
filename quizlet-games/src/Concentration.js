import React, { Component } from 'react'
import './Concentration.css';

class Concentration extends Component {

    constructor() {
        super();
        this.state = {
            firstCard: null,
            secondCard: null,
            // dummy data
            pairs: [
                {
                    word: "A",
                    match: "1"
                },
                {
                    word: "1",
                    match: "A"
                },
                {
                    word: "B",
                    match: "2"
                },
                {
                    word: "2",
                    match: "B"
                },
                {
                    word: "C",
                    match: "3"
                },
                {
                    word: "3",
                    match: "C"
                },
                {
                    word: "D",
                    match: "4"
                },
                {
                    word: "4",
                    match: "D"
                },
            ]
        };
    }

    handleClick = (e) => {
        let card = e.target;
        if (this.state.firstCard != null && this.state.secondCard != null) {
            // flip both 
            this.state.firstCard.innerHTML = "";
            this.state.secondCard.innerHTML = "";
            this.state.firstCard = null;
            this.state.secondCard = null;
        }
        if (this.state.firstCard != null) {
            if (this.state.firstCard == card) {
                //flip same first card over on its back again
                card.innerHTML = "";
                this.state.firstCard = null;
            }
            else {
                card.innerHTML = card.getAttribute("word");
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
        }
    }
    

    render() {
        return (
            <div className="concentration-container">
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
            </div>
        )
    }
}

export default Concentration;