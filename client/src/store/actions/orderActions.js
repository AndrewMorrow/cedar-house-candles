import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from "./types";
import axios from "axios";

export const createOrder = (order) => (dispatch) => {
    dispatch({
        ORDER_CREATE_REQUEST,
    });
    axios
        .post("/api/orders", order)
        .then((res) => {
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: res });
        })
        .catch((err) => dispatch({ ORDER_CREATE_FAIL, payload: err.response }));
};

export const getOrderDetails = (id) => (dispatch) => {
    dispatch({
        ORDER_DETAILS_REQUEST,
    });
    axios
        .get(`/api/orders/${id}`)
        .then((res) => {
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: res });
        })
        .catch((err) =>
            dispatch({ ORDER_DETAILS_FAIL, payload: err.response })
        );
};
