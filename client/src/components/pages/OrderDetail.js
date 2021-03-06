import React, { useContext, useEffect } from "react";
import { Store } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { getOrderDetails } from "../../store/actions/orderActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { PayPalButton } from "react-paypal-button-v2";
import { payOrder } from "../../store/actions/orderActions";
import BackdropComp from "../subComponents/BackdropComp";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        backgroundColor: "#efd9d1",
        borderRadius: "1.25rem",
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(4),
        },
    },
    card: {
        borderRadius: "1.25rem",
        padding: theme.spacing(4),
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
    listItem: {
        paddingLeft: "0",
        paddingRight: "0",
    },
}));

const OrderDetail = ({ match }) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const orderId = match.params.id;

    const { order } = state;

    useEffect(() => {
        // dispatch({ type: ORDER_PAY_RESET });

        getOrderDetails(orderId)(dispatch);

        // eslint-disable-next-line
    }, [order.success]);

    const successPaymentHandler = (paymentResult) => {
        payOrder(order.order._id, paymentResult)(dispatch);
    };

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    return order.loading || !order.order ? (
        <BackdropComp />
    ) : (
        order.order && (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Card className={classes.card}>
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            style={{ marginBottom: "1rem" }}
                        >
                            Order Detail
                        </Typography>
                        <React.Fragment>
                            <React.Fragment>
                                {order.order.isPaid ? (
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        align="center"
                                    >
                                        Please proceed with payment below to
                                        complete order.
                                    </Typography>
                                )}
                                {order.order.isPaid ? (
                                    <Typography variant="subtitle1">
                                        Your order number is{" "}
                                        {order.order && order.order._id}.
                                    </Typography>
                                ) : (
                                    <></>
                                )}
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    align="center"
                                >
                                    Order summary
                                </Typography>
                                <List disablePadding>
                                    {order.order &&
                                        order.order.orderItems.map(
                                            (product) => (
                                                <ListItem
                                                    className={classes.listItem}
                                                    key={product.name}
                                                >
                                                    <ListItemText
                                                        primary={product.name}
                                                        // secondary={
                                                        //     product.itemProductType
                                                        // }
                                                    />

                                                    <Typography variant="body2">
                                                        {product.cartQty} x $
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
                                                    order.order.shippingPrice
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
                                            {order.order.shippingAddress.city &&
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
                                        {!order.order.isPaid ? (
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                className={classes.title}
                                            >
                                                Proceed to payment
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                className={classes.title}
                                            >
                                                Payment Complete
                                            </Typography>
                                        )}
                                        <Grid container>
                                            {order.loading && <BackdropComp />}
                                            {order.order &&
                                            !order.order.isPaid ? (
                                                <PayPalButton
                                                    amount={
                                                        order.order &&
                                                        order.order.totalPrice
                                                    }
                                                    onSuccess={
                                                        successPaymentHandler
                                                    }
                                                />
                                            ) : (
                                                <h4>
                                                    Thank you for your payment!
                                                </h4>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </React.Fragment>
                    </Card>
                </Paper>
            </main>
        )
    );
};

export default OrderDetail;
