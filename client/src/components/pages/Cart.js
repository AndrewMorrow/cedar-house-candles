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
    IconButton,
    Button,
    FormControl,
    MenuItem,
    Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Store } from "../../store";
import { TiShoppingCart } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
    changeCartQty,
    addToCart,
    removeFromCart,
} from "../../store/actions/cartActions.js";
import SelectComp from "../subComponents/SelectComp";
import DialogComp from "../subComponents/DialogComp";

const useStyles = makeStyles((theme) => ({
    itemImage: {
        height: "100px",
    },
    paper: {
        padding: theme.spacing(4),
        margin: "auto",
        maxWidth: 950,
        backgroundColor: "#efd9d1",
        borderRadius: "1.25rem",
        marginBottom: 20,
    },
    quantNum: {
        display: "flex",
        justifyContent: "center",
    },
    table: {
        minWidth: 600,
    },
    button: {
        color: "white",
        backgroundColor: "#999b84",

        "&:focus": {
            backgroundColor: "transparent",
        },
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
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const {
        cart: { cartItems },
    } = state;

    useEffect(() => {
        // console.log(cartItems);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        // eslint-disable-next-line
    }, [cartItems]);

    const invoiceSubtotal = subtotal(cartItems);

    const handleCartItemDelete = (id) => {
        removeFromCart(id)(dispatch);
    };

    const handleButtonClick = (newRoute) => {
        history.push(newRoute);
    };

    const handleChange = (event, eItem) => {
        changeCartQty(event.target.value, eItem)(dispatch);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    return (
        <main>
            <Paper className={classes.paper}>
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
                                            <TableCell
                                                align="center"
                                                colSpan={5}
                                            >
                                                <Typography
                                                    variant="h4"
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
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
                                            <TableCell align="right">
                                                <Typography variant="h6">
                                                    Price
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="h6">
                                                    Remove
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
                                                                    src={
                                                                        item.image
                                                                    }
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
                                                            <SelectComp
                                                                item={item}
                                                                handleChange={
                                                                    handleChange
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            $
                                                            {ccyFormat(
                                                                item.price
                                                            )}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                onClick={() =>
                                                                    handleCartItemDelete(
                                                                        item._id
                                                                    )
                                                                }
                                                            >
                                                                <FaTrashAlt
                                                                    size={20}
                                                                />
                                                            </IconButton>
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
                                            <TableCell
                                                align="right"
                                                colSpan={2}
                                            >
                                                Subtotal
                                            </TableCell>
                                            <TableCell align="right">
                                                ${ccyFormat(invoiceSubtotal)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {state.auth.isAuthenticated ? (
                                                    <Button
                                                        className={
                                                            classes.button
                                                        }
                                                        onClick={() =>
                                                            handleButtonClick(
                                                                `/checkout`
                                                            )
                                                        }
                                                        disabled={
                                                            cartItems.length ===
                                                                0 && true
                                                        }
                                                        variant="contained"
                                                    >
                                                        <b>
                                                            Proceed to Checkout
                                                        </b>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className={
                                                            classes.button
                                                        }
                                                        onClick={
                                                            handleDialogOpen
                                                        }
                                                        disabled={
                                                            cartItems.length ===
                                                                0 && true
                                                        }
                                                        variant="contained"
                                                    >
                                                        <b>
                                                            Proceed to Checkout
                                                        </b>
                                                    </Button>
                                                )}
                                                <DialogComp
                                                    handleDialogOpen={
                                                        handleDialogOpen
                                                    }
                                                    dialogOpen={dialogOpen}
                                                    handleDialogClose={
                                                        handleDialogClose
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
        </main>
    );
};

export default Cart;
