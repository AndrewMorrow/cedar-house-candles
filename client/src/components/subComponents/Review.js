import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Store } from "../../store";
import { updateTotalPrice } from "../../store/actions/cartActions";

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function total(items) {
        return items
            .map((item) => item.price * item.cartQty)
            .reduce((sum, i) => sum + i, cart.shippingPrice);
    }

    const totalPrice = total(cart.cartItems);

    useEffect(() => {
        updateTotalPrice(totalPrice)(dispatch);
    }, [totalPrice, dispatch]);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cart.cartItems.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText
                            primary={product.name}
                            secondary={product.itemProductType}
                        />

                        <Typography variant="body2">
                            {product.cartQty} x ${ccyFormat(product.price)}
                        </Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Shipping" />
                    <Typography variant="subtitle1">
                        ${ccyFormat(cart.shippingPrice)}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        ${ccyFormat(totalPrice)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={7}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Shipping Info
                    </Typography>
                    <Typography gutterBottom>
                        {cart.shippingAddress.firstName &&
                            cart.shippingAddress.firstName}{" "}
                        {cart.shippingAddress.lastName &&
                            cart.shippingAddress.lastName}
                    </Typography>
                    <Typography gutterBottom>
                        {!cart.shippingAddress.address1 && (
                            <h6>No Shipping Address Available</h6>
                        )}
                        {cart.shippingAddress.address1}
                        <br />
                        {cart.shippingAddress.address2 &&
                            cart.shippingAddress.address2}
                        {cart.shippingAddress.address2 && <br />}
                        {cart.shippingAddress.city &&
                            `${cart.shippingAddress.city},`}{" "}
                        {cart.shippingAddress.addressState}{" "}
                        {cart.shippingAddress.postalCode}
                        <br />
                        {cart.shippingAddress.country}
                    </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={5}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Payment Method
                    </Typography>
                    <Grid container>{state.cart.paymentMethod}</Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
