import React, { useEffect, useContext } from "react";
import { Store } from "../../store";
import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        // maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        // margin: theme.spacing(4, 0, 2),
    },
}));

const PlaceOrder = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    useEffect(() => {
        console.log(state.cart.paymentMethod);
    }, []);

    return (
        <main>
            <Grid container justify="center">
                <Grid item xs={12} md={6}>
                    <Typography
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1rem",
                        }}
                        variant="h4"
                        className={classes.title}
                    >
                        Order Items
                    </Typography>

                    <div className={classes.demo}>
                        <List style={{ padding: "0" }}>
                            {cart.cartItems.map((item) => (
                                <ListItem style={{ borderBottom: "1px solid" }}>
                                    <Link to={`product/${item._id}`}>
                                        <img
                                            src={item.image}
                                            alt={item.description}
                                            style={{
                                                height: "40px",
                                            }}
                                        />
                                    </Link>
                                    <Link
                                        style={{
                                            color: "black",
                                            fontweight: "bold",
                                        }}
                                        to={`product/${item._id}`}
                                    >
                                        <ListItemText
                                            inset
                                            primary={item.name}
                                        />
                                    </Link>
                                    <ListItemText
                                        inset
                                        primary={item.itemProductType}
                                    />
                                    <ListItemText
                                        inset
                                        primary={`${item.cartQty} x $${
                                            item.price
                                        } = $${item.cartQty * item.price}  `}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </main>
    );
};

export default PlaceOrder;
