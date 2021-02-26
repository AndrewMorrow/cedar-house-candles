import React, { useEffect, useContext } from "react";
import { Grid, Paper, Container } from "@material-ui/core";
import { Store } from "../../store";

const Cart = ({ match, location, history }) => {
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    useEffect(() => {
        const fetchCartItems = () => {
            console.log("fetch Items");
        };
        fetchCartItems();
    }, []);

    return (
        <main>
            <Grid container>
                <Grid container item md={12}>
                    <Container maxWidth="md">
                        {cartItems && cartItems.length > 0 ? (
                            <Paper>Shopping cart item</Paper>
                        ) : (
                            <h1>No items in your cart</h1>
                        )}
                    </Container>
                </Grid>
                <Grid container item md={6}>
                    Shopping cart
                </Grid>
                <Grid container item md={6}>
                    <Container maxWidth="md">Shopping cart</Container>
                </Grid>
            </Grid>
        </main>
    );
};

export default Cart;
