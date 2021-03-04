import React from "react";
import { Container, Grid, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        // display: "flex",
        // justifyContent: "center",
    },
    container: {
        marginTop: "20vh",
    },
    homeBtn: {
        textDecoration: "none",
    },
}));

const OrderThanks = ({ match }) => {
    const classes = useStyles();

    const orderId = match.params.id;

    return (
        <main>
            <Container className={classes.container} maxWidth="sm">
                <Paper className={classes.paper}>
                    <Grid container justify="center" spacing="3">
                        <Grid item>
                            <Typography variant="h4">
                                Thank you for your order!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                Your order number is {orderId}.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                We will notify by email as soon as the order has
                                been shipped.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link to="/" className={classes.homeBtn}>
                                <Button variant="contained">
                                    Return to homepage
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </main>
    );
};

export default OrderThanks;
