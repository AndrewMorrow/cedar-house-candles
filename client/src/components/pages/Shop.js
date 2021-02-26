import React, { useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { getProducts } from "../../store/actions/productActions";
import { Store } from "../../store";

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
    },
    cardMedia: {
        paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    cardAction: {
        justifyContent: "center",
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
}));

export default function Shop() {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const {
        product: { products },
    } = state;

    useEffect(() => {
        getProducts()(dispatch);
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />

            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {products &&
                            products.length > 0 &&
                            products.map((card) => (
                                <Grid item key={card._id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={card.image}
                                            title="Image title"
                                        />
                                        <CardContent
                                            className={classes.cardContent}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h2"
                                            >
                                                {card.name}
                                            </Typography>
                                            <Typography align="left">
                                                {card.description}
                                                <br />
                                                <br />
                                                Price: ${card.price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions
                                            className={classes.cardAction}
                                        ></CardActions>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}