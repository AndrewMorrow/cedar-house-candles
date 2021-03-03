import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
} from "./types";
import axios from "axios";

export const createOrder = (order) => (dispatch) => {
    dispatch({
        type: ORDER_CREATE_REQUEST,
    });
    axios
        .post("/api/orders", order)
        .then((res) => {
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: res.data });
        })
        .catch((err) =>
            dispatch({ type: ORDER_CREATE_FAIL, payload: err.response })
        );
};

export const getOrderDetails = (id) => (dispatch) => {
    dispatch({
        type: ORDER_DETAILS_REQUEST,
    });
    axios
        .get(`/api/orders/order/${id}`)
        .then((res) => {
            console.log(res);
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: res.data });
        })
        .catch((err) =>
            dispatch({ type: ORDER_DETAILS_FAIL, payload: err.response })
        );
};

export const payOrder = (orderId, paymentResult) => (dispatch) => {
    dispatch({
        type: ORDER_PAY_REQUEST,
    });
    axios
        .put(`/api/orders/order/${orderId}/pay`, paymentResult)
        .then((res) => {
            dispatch({ type: ORDER_PAY_SUCCESS, payload: res.data });
        })
        .catch((err) =>
            dispatch({ type: ORDER_PAY_FAIL, payload: err.response })
        );
};

export const listMyOrders = () => (dispatch) => {
    dispatch({
        type: ORDER_LIST_MY_REQUEST,
    });

    axios
        .get(`/api/orders/myorders`)
        .then((res) => {
            dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: res.data });
        })
        .catch((err) =>
            dispatch({ type: ORDER_LIST_MY_FAIL, payload: err.response })
        );
};
