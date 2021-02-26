import React, { useEffect, useContext } from "react";
import {
    Grid,
    Paper,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Store } from "../../store";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    itemImage: {
        height: "100px",
    },
    paperCon: {
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
    },
    quantNum: {
        display: "flex",
        justifyContent: "center",
    },
    table: {
        minWidth: 700,
    },
}));

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function subtotal(items) {
    return items
        .map((item) => item.price * item.cartQty)
        .reduce((sum, i) => sum + i, 0);
}

const Cart = ({ match, location, history }) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    useEffect(() => {
        console.log(cartItems);
    }, []);

    const invoiceSubtotal = subtotal(cartItems);

    return (
        <main>
            <Grid container>
                <Grid container item md={12}>
                    <Container maxWidth="md">
                        <TableContainer component={Paper}>
                            <Table
                                className={classes.table}
                                aria-label="spanning table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>
                                            <Typography
                                                variant="h4"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <TiShoppingCart />
                                                Shopping Cart
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Image
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Qty.
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Price
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems && cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <>
                                                <TableRow key={item._id}>
                                                    <TableCell align="center">
                                                        <Link
                                                            to={`/product/${item._id}`}
                                                        >
                                                            <img
                                                                className={
                                                                    classes.itemImage
                                                                }
                                                                src={item.image}
                                                                alt={
                                                                    item.description
                                                                }
                                                            />
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography>
                                                            {item.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.cartQty}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        ${ccyFormat(item.price)}
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))
                                    ) : (
                                        <h5 style={{ marginLeft: "1rem" }}>
                                            No items in your cart
                                        </h5>
                                    )}
                                    <TableRow>
                                        <TableCell rowSpan={3} />
                                        <TableCell align="right" colSpan={2}>
                                            Subtotal
                                        </TableCell>
                                        <TableCell align="center">
                                            ${ccyFormat(invoiceSubtotal)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </Grid>
            </Grid>
        </main>
    );
};

export default Cart;
