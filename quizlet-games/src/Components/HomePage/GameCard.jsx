import React, { Component } from 'react'
import './GameCard.css';
import PropTypes from 'prop-types';
import { CardActionArea,
    CardContent,
    Typography,
    CardMedia,
    Card,
    CardActions,
    Button
    } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const imageUrl = require("../../images/memory.jpg");
    
const useStyles = {
    root: {
      maxWidth: 345,
      naxHeight: 100,
      display: "flex",
      flexDirection: "column"
    }
};
  
class GameCard extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    handleClick = () => {
        var isValid = true;
        // check if empty
        if (JSON.stringify(this.props.quizletData) == JSON.stringify({})) {
            isValid = false;
        }
        // iterate across and check that each card is valid
        for (var card in this.props.quizletData) {
            if (this.props.quizletData[card] === undefined) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            window.localStorage.setItem('Cards', JSON.stringify(this.props.quizletData));
            window.location = '/concentration';
        }
        else {
            alert('Quizlet cards are invalid');
        }
    }

    render() {
        const { classes } = this.props;
        const images = require.context('../../images', true);
        let img = images('./' + this.props.game.photo);
        return (
            <Card className={classes.root} >
                <div className="cardMedia">
                    <CardMedia
                    component="img"
                    alt="Memory"
                    height="140"
                    image={img}
                    title="Memory"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.game.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.game.description}
                    </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" onClick={this.handleClick}>PLAY</Button>
                </div>
            </Card>
        )
    }
}

GameCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(GameCard);