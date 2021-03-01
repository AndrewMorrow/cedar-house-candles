import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Store } from "../../store";

const products = [
    { name: "Product 1", desc: "A nice thing", price: "$9.99" },
    { name: "Product 2", desc: "Another thing", price: "$3.45" },
    { name: "Product 3", desc: "Something else", price: "$6.51" },
    { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
    { name: "Shipping", desc: "", price: "Free" },
];
const addresses = [
    "1 Material-UI Drive",
    "Reactville",
    "Anytown",
    "99999",
    "USA",
];
const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: "Mr John Smith" },
    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
];

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
            .reduce((sum, i) => sum + i, 0);
    }

    const cartTotal = total(cart.cartItems);

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
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        ${ccyFormat(cartTotal)}
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
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(", ")}</Typography>
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
