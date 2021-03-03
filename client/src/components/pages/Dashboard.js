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
const orders = [
    {
        _id: "1234",
        name: "blah1",
        price: 12,
        paidAt: "02/15/2021",
    },
    {
        _id: "5688",
        name: "blah5",
        price: 5,
        paidAt: "01/25/2021",
    },
];

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

    useEffect(() => {
        if (!state.auth.isAuthenticated) props.history.push("/login");

        API.getUser()
            .then((res) => console.log({ res }))
            .catch((err) => console.log({ err }));
    }, [state, props]);

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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders && orders.length > 0 ? (
                                        orders.map((item) => (
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
                                                            {item.paidAt}
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
