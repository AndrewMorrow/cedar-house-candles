import React, { useContext, useEffect } from "react";
import { Store } from "../../store";
// import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { getProducts } from "../../store/actions/productActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Container, Paper, Tooltip, Grid } from "@material-ui/core";

import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles((theme) => ({
    main: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",

        alignItems: "center",
    },
    gridList: {
        maxWidth: 600,
    },
    container: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        padding: "1rem",
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
    title: {
        margin: theme.spacing(4, 0, 2),
        fontFamily: "Old Standard TT",
        color: "#3B3D3D",
    },
    paper: {
        backgroundColor: "#efd9d1",
        borderRadius: "1.25rem",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(4),
        },
        display: "flex",
        justifyContent: "center",
    },
    infoWrapper: {
        border: "3px double",
        borderRadius: "15px",
        // padding: "1rem",

        backgroundColor: "#f4eeed",
        maxWidth: "800px",
    },
    // collectionWrapper: {
    //     marginRight: "10px",
    // },
}));

const Landing = (props) => {
    const { history } = props;
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const {
        product: { products },
    } = state;

    // console.log({ state, props });

    useEffect(() => {
        getProducts()(dispatch);
        // eslint-disable-next-line
    }, []);

    const handleButtonClick = (newRoute) => {
        history.push(newRoute);
    };

    return (
        <main className={classes.main}>
            <Container>
                <Paper className={classes.paper} elevation10>
                    <Grid
                        container
                        spacing="2"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Grid item md={6} className={classes.collectionWrapper}>
                            <div className={classes.infoWrapper}>
                                <Container>
                                    <Typography
                                        variant="h2"
                                        component="h2"
                                        align="center"
                                        className={classes.title}
                                    >
                                        <b>Autumn Collection</b>
                                    </Typography>
                                </Container>
                                <Container className={classes.container}>
                                    <GridList
                                        cellHeight={160}
                                        className={classes.gridList}
                                        cols={3}
                                    >
                                        {products &&
                                            products.length > 0 &&
                                            products
                                                .filter(
                                                    (item) =>
                                                        item.productCollection ===
                                                        "Autumn"
                                                )
                                                .map((product) => (
                                                    <GridListTile
                                                        key={product.image}
                                                        cols={product.cols || 1}
                                                    >
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                        />
                                                        <GridListTileBar
                                                            title={product.name}
                                                            actionIcon={
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleButtonClick(
                                                                            `/product/${product._id}`
                                                                        )
                                                                    }
                                                                    aria-label={`info about ${product.name}`}
                                                                    className={
                                                                        classes.icon
                                                                    }
                                                                >
                                                                    <InfoIcon />
                                                                </IconButton>
                                                            }
                                                        />
                                                    </GridListTile>
                                                ))}
                                    </GridList>
                                </Container>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className={classes.infoWrapper}>
                                <Container>
                                    <Typography
                                        variant="h2"
                                        component="h2"
                                        align="center"
                                        className={classes.title}
                                    >
                                        <b>Best Sellers</b>
                                    </Typography>
                                </Container>
                                <Container className={classes.container}>
                                    <GridList
                                        cellHeight={158}
                                        className={classes.gridList}
                                    >
                                        <GridListTile
                                            key="Subheader"
                                            cols={2}
                                            style={{ height: "auto" }}
                                        ></GridListTile>
                                        {products
                                            .filter((item) => item.isBestSeller)
                                            .map((tile) => (
                                                <GridListTile key={tile.image}>
                                                    <img
                                                        src={tile.image}
                                                        alt={tile.name}
                                                    />
                                                    <GridListTileBar
                                                        title={tile.name}
                                                        actionIcon={
                                                            <IconButton
                                                                onClick={() =>
                                                                    handleButtonClick(
                                                                        `/product/${tile._id}`
                                                                    )
                                                                }
                                                                aria-label={`info about ${tile.name}`}
                                                                className={
                                                                    classes.icon
                                                                }
                                                            >
                                                                <InfoIcon />
                                                            </IconButton>
                                                        }
                                                    />
                                                </GridListTile>
                                            ))}
                                    </GridList>
                                </Container>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </main>
    );
};

export default Landing;
