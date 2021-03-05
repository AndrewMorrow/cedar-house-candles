import React, { useEffect, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { getProducts } from "../../store/actions/productActions";
import { Store } from "../../store";
import { Paper, Snackbar } from "@material-ui/core";
import { addToCart } from "../../store/actions/cartActions.js";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4eeed",
        cursor: "pointer",
    },

    cardMedia: {
        paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    cardAction: {
        justifyContent: "center",
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(4),
        margin: "auto",
        maxWidth: 950,
        backgroundColor: "#efd9d1",
        borderRadius: "1.25rem",
        marginBottom: 20,
    },
    descCont: {
        marginBottom: "1rem",
    },
}));

export default function Shop(props) {
    const { history } = props;
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const {
        product: { products },
    } = state;
    const [snackOpen, setSnackOpen] = useState(false);

    useEffect(() => {
        getProducts()(dispatch);
        // eslint-disable-next-line
    }, []);

    const handleButtonClick = (newRoute) => {
        history.push(newRoute);
    };

    const addToCartHandler = (product) => {
        addToCart(product, 1)(dispatch);
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <main>
                <Paper className={classes.paper} elevation10>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {products &&
                                products.length > 0 &&
                                products.map((card) => (
                                    <Grid
                                        item
                                        key={card._id}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                    >
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={card.image}
                                                title={card.name}
                                                onClick={() =>
                                                    handleButtonClick(
                                                        `/product/${card._id}`
                                                    )
                                                }
                                            />
                                            <CardContent
                                                className={classes.cardContent}
                                            >
                                                <div
                                                    className={classes.descCont}
                                                >
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="h2"
                                                        onClick={() =>
                                                            handleButtonClick(
                                                                `/product/${card._id}`
                                                            )
                                                        }
                                                    >
                                                        {card.name}
                                                    </Typography>
                                                    <Typography
                                                        align="left"
                                                        onClick={() =>
                                                            handleButtonClick(
                                                                `/product/${card._id}`
                                                            )
                                                        }
                                                    >
                                                        {card.description}
                                                    </Typography>
                                                </div>

                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    justify="center"
                                                >
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            className={
                                                                classes.prices
                                                            }
                                                            style={{
                                                                display: "flex",
                                                            }}
                                                            onClick={() =>
                                                                handleButtonClick(
                                                                    `/product/${card._id}`
                                                                )
                                                            }
                                                        >
                                                            <b>
                                                                Price: $
                                                                {card.price}
                                                            </b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {card.countInStock >
                                                        0 ? (
                                                            <Button
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                }}
                                                                variant="contained"
                                                                color="secondary"
                                                                size="small"
                                                                onClick={() =>
                                                                    addToCartHandler(
                                                                        card
                                                                    )
                                                                }
                                                            >
                                                                Add to Cart
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                }}
                                                                variant="text"
                                                                color="secondary"
                                                                size="small"
                                                            >
                                                                Out of Stock
                                                            </Button>
                                                        )}
                                                        <Snackbar
                                                            open={snackOpen}
                                                            autoHideDuration={
                                                                1000
                                                            }
                                                            onClose={
                                                                handleSnackClose
                                                            }
                                                            message="Product Added to Cart"
                                                        ></Snackbar>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Container>
                </Paper>
            </main>
        </React.Fragment>
    );
}
