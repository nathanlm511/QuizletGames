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

import imageUrl from "../../images/memory.jpg";
    
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
        this.state = {};
    }
    

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
                <div className="cardMedia">
                    <CardMedia
                    component="img"
                    alt="Memory"
                    height="140"
                    image={imageUrl}
                    title="Memory"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Concentration
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Think you got your flash cards memorized? See how quickly you can match them up.
                    </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary">PLAY</Button>
                    <div>{JSON.stringify(this.props.quizletData)}</div>
                </div>
            </Card>
        )
    }
}

GameCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(GameCard);