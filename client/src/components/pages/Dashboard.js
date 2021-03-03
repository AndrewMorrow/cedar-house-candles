import React, { useEffect, useContext } from "react";
import { Store } from "../../store";
import { logoutUser } from "../../store/actions/authActions";
import API from "../../utils/apiHelper.js";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { listMyOrders } from "../../store/actions/orderActions";

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
        minWidth: 600,
    },
}));

const Dashboard = (props) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const user = state.auth.user;
    const { order } = state;

    useEffect(() => {
        if (!state.auth.isAuthenticated) props.history.push("/login");

        API.getUser()
            .then((res) => console.log({ res }))
            .catch((err) => console.log({ err }));
    }, [state, props]);

    useEffect(() => {
        if (state.auth.isAuthenticated) {
            listMyOrders()(dispatch);
        }
    }, []);

    const onLogoutClick = (e) => {
        e.preventDefault();

        logoutUser(props.history)(dispatch);
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
                                        <TableCell align="center" colSpan={5}>
                                            <Typography
                                                variant="h4"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                Order History
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Order ID
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Order Date
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Status
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.orders && order.orders.length > 0 ? (
                                        order.orders.map((item) => (
                                            <>
                                                <TableRow key={item._id}>
                                                    <TableCell align="center">
                                                        <div>
                                                            <Typography variant="h6">
                                                                {item._id}
                                                            </Typography>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Typography variant="h6">
                                                            {new Date(
                                                                item.createdAt
                                                            ).toLocaleDateString()}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant="h6">
                                                            {item.paymentResult
                                                                ? item
                                                                      .paymentResult
                                                                      .status
                                                                : `NOT COMPLETED`}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))
                                    ) : (
                                        <h5 style={{ marginLeft: "1rem" }}>
                                            No order history for this user
                                        </h5>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </Grid>
            </Grid>
        </main>
    );
};

export default Dashboard;
