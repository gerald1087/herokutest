import React, { Component } from 'react'
import axios from 'axios'
import AuthHeader from "./components/AuthHeader"
import Footer from './layouts/Footer'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = (theme => ({

    root: {

        width: 500,
        height: 200,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

class AllReviews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            review: []
        }
    }

    componentDidMount() {
        let movieId = this.props.match.params.id
        axios.get("http://localhost:3005/api/comments/" + movieId)
            .then(({ data }) => {
                this.setState(
                    {
                        review: data
                    });
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <AuthHeader />
                </div>
                <div>
                    {this.state.review.map((review, index) => {
                        return (
                            <Card className={classes.root}>

                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {review.comment}
                                    </Typography>
                                    <br />
                                    <Typography variant="h6" component="h6">
                                        {review.createdAt}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
}

export default withStyles(useStyles)(AllReviews)
