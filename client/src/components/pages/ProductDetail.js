import React, { useContext, useEffect, useState, useRef } from "react";
import { getProduct } from "../../store/actions/productActions";
import { Store } from "../../store";
import {
    Grid,
    Button,
    List,
    ListItem,
    Typography,
    Snackbar,
    Paper,
    MenuItem,
    Select,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { changeCartQty, addToCart } from "../../store/actions/cartActions.js";

const useStyles = makeStyles((theme) => ({
    root: {},
    image: {
        width: 450,
        height: 450,
    },
    img: {
        margin: "auto",
        display: "flex",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    info: {
        // display: "flex",
        alignItems: "flex-start",
    },
    productName: {
        margin: "0px 0px 1rem 0px",
        marginBottom: "2rem",
    },
    aboutTitle: {
        marginBottom: "1rem",
    },
    price: {
        fontSize: "1.3rem",
        marginRight: "2rem",
        fontWeight: "bold",
    },
    priceInfo: {
        display: "flex",
        marginBottom: "1rem",
        alignItems: "center",
    },

    listItem: {
        marginBottom: "1rem",
        paddingLeft: 0,
    },
    listHeader: {
        textDecoration: "underline",
        paddingLeft: 0,
    },
    description: {
        marginBottom: "1rem",
    },
    infoWrapper: {
        border: "3px double",
        borderRadius: "15px",
        padding: "10px",
        marginBottom: "2rem",
        backgroundColor: "#f4eeed",
    },
    marginBottom: {
        marginBottom: "1rem",
    },
    paper: {
        padding: theme.spacing(4),
        margin: "auto",
        maxWidth: 950,
        backgroundColor: "#efd9d1",
        borderRadius: "1.25rem",
        marginBottom: 20,
    },
    button: {
        height: "40px",
        color: "white",
        backgroundColor: "#999b84",

        "&:focus": {
            backgroundColor: "transparent",
        },
    },
}));

const ProductDetail = ({ match }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [selectValue, setSelectValue] = useState(1);
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
        addToCart(product, selectValue)(dispatch);
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };

    const handleChange = (event, eItem) => {
        setSelectValue(event.target.value);
        changeCartQty(event.target.value, eItem)(dispatch);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
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
                            <h2 className={classes.productName}>
                                {product.name}
                            </h2>
                            <Typography
                                className={classes.aboutTitle}
                                variant="h5"
                            >
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
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={selectValue}
                                    onChange={(e) => handleChange(e, product)}
                                    style={{ marginRight: "1rem" }}
                                >
                                    {[
                                        ...Array(product.countInStock).keys(),
                                    ].map((x) => (
                                        <MenuItem key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {product.countInStock !== 0 ? (
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        onClick={addToCartHandler}
                                    >
                                        <b> Add to Cart </b>
                                    </Button>
                                ) : (
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        disabled
                                    >
                                        <b> Out of Stock </b>
                                    </Button>
                                )}
                                <Snackbar
                                    open={snackOpen}
                                    autoHideDuration={1000}
                                    onClose={handleSnackClose}
                                    message="Product Added to Cart"
                                ></Snackbar>
                            </div>

                            <div>
                                <List>
                                    <ListItem className={classes.listHeader}>
                                        <Typography variant="button">
                                            Note Profile
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        Top: {product.noteProfileTop}
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        Middle: {product.noteProfileMiddle}
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        Bottom: {product.noteProfileBottom}
                                    </ListItem>
                                </List>
                            </div>
                            <Typography className={classes.marginBottom}>
                                9oz Soy Candle| 50-60 Hour Burn time| Cotton
                                Wick
                            </Typography>
                            <Typography>
                                All of our candles are hand-made in small
                                batches free of phthalate, lead, and zinc to
                                bring you a cozy, clean-burning product.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </main>
    );
};

export default ProductDetail;
