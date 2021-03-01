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
    Paper,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
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
        minWidth: 500,
    },
}));

const PlaceOrder = ({ history }) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    useEffect(() => {
        console.log(state.cart.paymentMethod);
    }, []);

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function subtotal(items) {
        return items
            .map((item) => item.price * item.cartQty)
            .reduce((sum, i) => sum + i, 8);
    }

    const invoiceSubtotal = subtotal(cart.cartItems);

    const handleButtonClick = (newRoute) => {
        history.push(newRoute);
    };

    return (
        <main>
            <Grid container>
                <Grid container item sm={12}>
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
                                                Order Details
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
                                    {cart.cartItems &&
                                        cart.cartItems.length > 0 &&
                                        cart.cartItems.map((item) => (
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
                                                        <div>
                                                            <Typography variant="h6">
                                                                {item.name}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {
                                                                    item.itemProductType
                                                                }
                                                            </Typography>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.cartQty}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        ${ccyFormat(item.price)}
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                    <TableRow>
                                        <TableCell
                                            rowSpan={1}
                                            colSpan={2}
                                            align="right"
                                        >
                                            Shipping
                                        </TableCell>
                                        <TableCell align="center">$8</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell rowSpan={3} />
                                        <TableCell align="right" colSpan={1}>
                                            Subtotal
                                        </TableCell>
                                        <TableCell align="right">
                                            ${ccyFormat(invoiceSubtotal)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                onClick={() =>
                                                    handleButtonClick(
                                                        `/ordersummary`
                                                    )
                                                }
                                                disabled={
                                                    cart.cartItems.length ===
                                                        0 && true
                                                }
                                                variant="contained"
                                            >
                                                Place Order
                                            </Button>
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

export default PlaceOrder;
