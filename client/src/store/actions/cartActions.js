import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_SAVE_PAYMENT_METHOD,
} from "./types";

export const addToCart = (product) => async (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: product,
    });
};

export const removeFromCart = (id) => async (dispatch) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });
};

export const savePaymentMethod = (method) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: method,
    });

    // localStorage.setItem("paymentMethod", JSON.stringify(method));
};
