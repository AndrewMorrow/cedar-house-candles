import React from 'react';
import { Container, Grid, Paper, Typography, Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#efd9d1',
        borderRadius: '1.25rem',
    },
   
    homeBtn: {
        textDecoration: 'none',
    },
    button: {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
        backgroundColor: '#999b84',

        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
    card: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        borderRadius: '1.25rem',
    },
}));

const OrderThanks = ({ match }) => {
    const classes = useStyles();

    const orderId = match.params.id;

    return (
        <main>
            <Container className={classes.container} maxWidth="sm">
                <Paper className={classes.paper}>
                    <Card className={classes.card}>
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
                                <Typography variant="body1" align='center'>
                                    We will notify by email as soon as the order
                                    has been shipped.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link to="/" className={classes.homeBtn}>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                    >
                                        Return to homepage
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </Container>
        </main>
    );
};

export default OrderThanks;
