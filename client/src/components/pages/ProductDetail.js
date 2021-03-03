import React, { useContext, useEffect, useState } from 'react';
import { getProduct } from '../../store/actions/productActions';
import { Store } from '../../store';
import {
    Grid,
    Button,
    List,
    ListItem,
    Typography,
    Snackbar,
    Paper,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart } from '../../store/actions/cartActions';

const useStyles = makeStyles((theme) => ({
    root: {},
    image: {
        width: 450,
        height: 450,
    },
    img: {
        margin: 'auto',
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    info: {
        // display: "flex",
        alignItems: 'flex-start',
    },
    productName: {
        margin: '0px 0px 1rem 0px',
        marginBottom: '2rem',
    },
    aboutTitle: {
        marginBottom: '1rem',
    },
    price: {
        fontSize: '1.3rem',
        marginRight: '2rem',
        fontWeight: 'bold',
    },
    priceInfo: {
        display: 'flex',
        marginBottom: '1rem',
        alignItems: 'center',
    },
   
    listItem: {
        marginBottom: '1rem',
        paddingLeft: 0,
    },
    listHeader: {
        textDecoration: 'underline',
        paddingLeft: 0,
    },
    description: {
        marginBottom: '1rem',
    },
    infoWrapper: {
        border: '3px double',
        borderRadius: '15px',
        padding: '10px',
        marginBottom: '2rem',
        backgroundColor: '#f4eeed'
    },
    marginBottom: {
        marginBottom: '1rem',
    },
    paper: {
        padding: theme.spacing(4),
        margin: "auto",
        maxWidth: 950,
        backgroundColor: '#efd9d1',
        borderRadius: "1.25rem",
        marginBottom: 20,
    },
    button: {
        height: '40px',
        color: 'white',
        backgroundColor: '#999b84',
        
        '&:focus': {
            backgroundColor: 'transparent',
        },

    }
}));



const ProductDetail = ({ match }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { state, dispatch } = useContext(Store);
    const {
        product: { product },
    } = state;
    const productId = match.params.id;

    useEffect(() => {
        getProduct(productId)(dispatch);
        // console.log(product);
        // eslint-disable-next-line
        // console.log(state.cart.cartItems);
    }, []);

    const addToCartHandler = (e) => {
        e.preventDefault();
        addToCart(product)(dispatch);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <main>
            <Paper className={classes.paper}>
            <Grid container>
                <Grid item className={classes.image} md={6}>
                    <img
                        className={classes.img}
                        src={product.image}
                        alt={product.description}
                    />
                </Grid>
                <Grid
                    className={classes.info}
                    container
                    direction="column"
                    md={5}
                    alignContent="space-between"
                >
                    <div className={classes.infoWrapper}>
                        <h2 className={classes.productName}>{product.name}</h2>
                        <Typography className={classes.aboutTitle} variant="h5">
                            About this candle
                        </Typography>
                        <Typography
                            className={classes.description}
                            variant="body1"
                        >
                            {product.description}
                        </Typography>
                        <div className={classes.priceInfo}>
                            <p className={classes.price}>
                                Price: ${product.price}
                            </p>
                            <Button
                                className={classes.button}
                                variant="contained"
                                onClick={addToCartHandler}
                            >
                              <b>  Add to Cart </b>
                            </Button>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message='Product Added'
                            >
                            
                            </Snackbar>
                        </div>
                   
                    <div>
                        <List>
                            <ListItem className={classes.listHeader}>
                                <Typography variant="button">
                                    Note Profile
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                Top: Orange Peel, Peppercorn
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                Middle: Apple, Mandarin
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                Bottom: Vanilla, Tonka Bean
                            </ListItem>
                        </List>
                    </div>
                    <Typography className={classes.marginBottom}>
                        9oz Soy Candle| 50-60 Hour Burn time| Cotton Wick
                    </Typography>
                    <Typography>
                        All of our candles are hand-made in small batches free
                        of phthalate, lead, and zinc to bring you a cozy,
                        clean-burning product.
                    </Typography>
                    </div>
                </Grid>
            </Grid>

            </Paper>
        </main>
    );
};

export default ProductDetail;
