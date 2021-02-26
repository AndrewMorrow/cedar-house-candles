import React, { useContext, useEffect } from 'react';
import { Store } from '../../store';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { getProducts } from '../../store/actions/productActions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Container, Tooltip } from '@material-ui/core';

import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        alignItems: 'center',
    },
    gridList: {
        width: 500,
        height: 450,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

const Landing = (props) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const {
        product: { products },
    } = state;

    console.log({ state, props });

    useEffect(() => {
        getProducts()(dispatch);
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.main}>
                <Container>
                    <Typography
                        variant="h2"
                        component="h2"
                        align="center"
                        className={classes.title}
                    >
                        <b>Collection</b>
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
                            products.map((product) => (
                                
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
                                            aria-label={`info about ${product.name}`}
                                            className={classes.icon}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                                </GridListTile>
                            ))}
                    </GridList>
                </Container>
                <Container>
                    <Typography
                        variant="h2"
                        component="h2"
                        align="center"
                        className={classes.title}
                    >
                        <b>Best Seller</b>
                    </Typography>
                </Container>
                <Container className={classes.container}>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile
                            key="Subheader"
                            cols={2}
                            style={{ height: 'auto' }}
                        ></GridListTile>
                        {products.map((tile) => (
                            <GridListTile key={tile.image}>
                                <img src={tile.image} alt={tile.name} />
                                <GridListTileBar
                                    title={tile.name}
                                    actionIcon={
                                        <IconButton
                                            aria-label={`info about ${tile.name}`}
                                            className={classes.icon}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Container>
            </main>
        </React.Fragment>
    );
};

export default Landing;
