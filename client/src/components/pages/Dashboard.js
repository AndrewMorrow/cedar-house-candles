import React, { useEffect, useContext } from "react";
import { Store } from "../../store";
import API from "../../utils/apiHelper.js";
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
} from "@material-ui/core";
import { listMyOrders } from "../../store/actions/orderActions";
import BackdropComp from "../subComponents/BackdropComp";

const useStyles = makeStyles((theme) => ({
    itemImage: {
        height: "100px",
    },
    paperCon: {
        marginTop: theme.spacing(3),
        backgroundColor: "#efd9d1",
        borderRadius: "1.25rem",
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(4),
        },
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
    // const user = state.auth.user;
    const { order } = state;

    useEffect(() => {
        if (!state.auth.isAuthenticated) props.history.push("/login");

        API.getUser()
            .then((res) => {})
            .catch((err) => {});
    }, [state, props]);

    useEffect(() => {
        // dispatch({
        //     type: ORDER_LIST_MY_RESET,
        // });
        if (state.auth.isAuthenticated) {
            listMyOrders()(dispatch);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <main>
            {order.loading ? (
                <BackdropComp />
            ) : (
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
                                        {order.orders &&
                                        order.orders.length > 0 ? (
                                            order.orders.map((item) => (
                                                <>
                                                    <TableRow key={item._id}>
                                                        <TableCell align="center">
                                                            <div>
                                                                <Link
                                                                    to={`/order/${item._id}`}
                                                                >
                                                                    <Typography variant="h6">
                                                                        {
                                                                            item._id
                                                                        }
                                                                    </Typography>
                                                                </Link>
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
            )}
        </main>
    );
};

export default Dashboard;
