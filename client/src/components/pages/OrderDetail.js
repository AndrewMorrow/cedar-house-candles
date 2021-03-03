import React, { useState, useContext, useEffect } from "react";
import { Store } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { createOrder, getOrderDetails } from "../../store/actions/orderActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { payOrder } from "../../store/actions/orderActions";
import { ORDER_PAY_RESET } from "../../store/actions/types";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const OrderDetail = ({ match }) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const orderId = match.params.id;

    const { order } = state;

    useEffect(() => {
        if (!order || order._id !== orderId || order.success) {
            dispatch({ type: ORDER_PAY_RESET });
            getOrderDetails(orderId)(dispatch);
        }
        // eslint-disable-next-line
    }, [dispatch]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        payOrder(order.order._id, paymentResult)(dispatch);
    };

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    return order.loading ? (
        <h1>Loading... </h1>
    ) : (
        order.order && (
            <>
                <React.Fragment>
                    <CssBaseline />
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Typography
                                component="h1"
                                variant="h4"
                                align="center"
                            >
                                Order Detail
                            </Typography>
                            <React.Fragment>
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Your order number is{" "}
                                        {order.order && order.order._id}.
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Order summary
                                    </Typography>
                                    <List disablePadding>
                                        {order.order &&
                                            order.order.orderItems.map(
                                                (product) => (
                                                    <ListItem
                                                        className={
                                                            classes.listItem
                                                        }
                                                        key={product.name}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                product.name
                                                            }
                                                            // secondary={
                                                            //     product.itemProductType
                                                            // }
                                                        />

                                                        <Typography variant="body2">
                                                            {product.cartQty} x
                                                            $
                                                            {ccyFormat(
                                                                product.price
                                                            )}
                                                        </Typography>
                                                    </ListItem>
                                                )
                                            )}
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary="Shipping" />
                                            <Typography variant="subtitle1">
                                                $
                                                {order.order &&
                                                    ccyFormat(
                                                        order.order
                                                            .shippingPrice
                                                    )}
                                            </Typography>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary="Total" />
                                            <Typography
                                                variant="subtitle1"
                                                className={classes.total}
                                            >
                                                $
                                                {order.order &&
                                                    ccyFormat(
                                                        order.order.totalPrice
                                                    )}
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
                                                {order.order.shippingAddress
                                                    .firstName &&
                                                    order.order.shippingAddress
                                                        .firstName}{" "}
                                                {order.order.shippingAddress
                                                    .lastName &&
                                                    order.order.shippingAddress
                                                        .lastName}
                                            </Typography>
                                            <Typography gutterBottom>
                                                {!order.order.shippingAddress
                                                    .address1 && (
                                                    <h6>
                                                        No Shipping Address
                                                        Available
                                                    </h6>
                                                )}
                                                {
                                                    order.order.shippingAddress
                                                        .address1
                                                }
                                                <br />
                                                {order.order.shippingAddress
                                                    .address2 &&
                                                    order.order.shippingAddress
                                                        .address2}
                                                {order.order.shippingAddress
                                                    .address2 && <br />}
                                                {order.order.shippingAddress
                                                    .city &&
                                                    `${order.order.shippingAddress.city},`}{" "}
                                                {
                                                    order.order.shippingAddress
                                                        .addressState
                                                }{" "}
                                                {order.order.shippingAddress
                                                    .postalCode &&
                                                    order.order.shippingAddress
                                                        .postalCode}
                                                <br />
                                                {order.order.shippingAddress
                                                    .country &&
                                                    order.order.shippingAddress
                                                        .country}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            xs={12}
                                            sm={5}
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                className={classes.title}
                                            >
                                                Proceed to Payment
                                            </Typography>
                                            <Grid container>
                                                {order.loading && (
                                                    <h1>Loading...</h1>
                                                )}
                                                {order.order &&
                                                !order.order.isPaid ? (
                                                    <PayPalButton
                                                        amount={
                                                            order.order &&
                                                            order.order
                                                                .totalPrice
                                                        }
                                                        onSuccess={
                                                            successPaymentHandler
                                                        }
                                                    />
                                                ) : (
                                                    <h5>
                                                        Order has been paid!
                                                    </h5>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            </React.Fragment>
                        </Paper>
                    </main>
                </React.Fragment>
            </>
        )
    );
};

export default OrderDetail;