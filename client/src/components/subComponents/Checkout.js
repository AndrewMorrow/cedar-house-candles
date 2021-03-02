import React, { useState, useContext, useEffect } from "react";
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
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { Store } from "../../store";
import { createOrder } from "../../store/actions/orderActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

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

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout({ history }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const [activeStep, setActiveStep] = useState(0);

    const { cart, order } = state;

    useEffect(() => {
        if (order.success) {
            // console.log(order);
            // history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line
    }, [order.success]);

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function total(items) {
        return items
            .map((item) => item.price * item.cartQty)
            .reduce((sum, i) => sum + i, cart.shippingPrice);
    }

    const totalPrice = total(cart.cartItems);

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm handleNext={handleNext} />;
            case 1:
                return <PaymentForm />;
            case 2:
                return <Review totalPrice={cart.totalPrice} />;
            default:
                throw new Error("Unknown step");
        }
    }

    const handleNext = (e) => {
        // console.log(e);
        setActiveStep(activeStep + 1);
        if (e.target.innerText.toLowerCase() === "place order") {
            createOrder({
                userId: state.auth.user.id ? state.auth.user.id : {},
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            })(dispatch);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is{" "}
                                    {order.order && order.order.data._id}.
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Order summary
                                </Typography>
                                <List disablePadding>
                                    {cart.cartItems.map((product) => (
                                        <ListItem
                                            className={classes.listItem}
                                            key={product.name}
                                        >
                                            <ListItemText
                                                primary={product.name}
                                                secondary={
                                                    product.itemProductType
                                                }
                                            />

                                            <Typography variant="body2">
                                                {product.cartQty} x $
                                                {ccyFormat(product.price)}
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
                                        <Typography
                                            variant="subtitle1"
                                            className={classes.total}
                                        >
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
                                                cart.shippingAddress
                                                    .firstName}{" "}
                                            {cart.shippingAddress.lastName &&
                                                cart.shippingAddress.lastName}
                                        </Typography>
                                        <Typography gutterBottom>
                                            {!cart.shippingAddress.address1 && (
                                                <h6>
                                                    No Shipping Address
                                                    Available
                                                </h6>
                                            )}
                                            {cart.shippingAddress.address1}
                                            <br />
                                            {cart.shippingAddress.address2 &&
                                                `${cart.shippingAddress.address2} 
                        <br />`}
                                            {cart.shippingAddress.city &&
                                                `${cart.shippingAddress.city},`}{" "}
                                            {cart.shippingAddress.addressState}{" "}
                                            {cart.shippingAddress.postalCode}
                                            <br />
                                            {cart.shippingAddress.country}
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
                                            Payment Method
                                        </Typography>
                                        <Grid container>
                                            {state.cart.paymentMethod}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1
                                            ? "Place order"
                                            : "Next"}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
