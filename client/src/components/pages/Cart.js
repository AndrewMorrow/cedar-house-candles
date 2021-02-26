import React, { useEffect, useContext } from "react";
import { Grid, Paper, Container } from "@material-ui/core";
import { Store } from "../../store";

const Cart = ({ match, location, history }) => {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    useEffect(() => {
        console.log(cart);
    }, []);

    return (
        <main>
            <Grid container>
                <Grid container item md={12}>
                    <Container maxWidth="md">
                        <Paper>Shopping cart item</Paper>
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
