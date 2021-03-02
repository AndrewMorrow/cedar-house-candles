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
    ORDER_PAY_RESET,
} from "./types";
import axios from "axios";

export const createOrder = (order) => (dispatch) => {
    dispatch({
        type: ORDER_CREATE_REQUEST,
    });
    axios
        .post("/api/orders", order)
        .then((res) => {
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: res });
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
        .get(`/api/orders/${id}`)
        .then((res) => {
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: res });
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
        .put(`/api/orders/${orderId}/pay`, paymentResult)
        .then((res) => {
            dispatch({ type: ORDER_PAY_SUCCESS, payload: res });
        })
        .catch((err) =>
            dispatch({ type: ORDER_PAY_FAIL, payload: err.response })
        );
};
