import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    UPDATE_TOTAL_PRICE,
    CHANGE_CART_QTY,
} from "./types";

export const addToCart = (product, qty) => async (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product,
            qty,
        },
    });
};

export const changeCartQty = (qty, item) => async (dispatch) => {
    dispatch({
        type: CHANGE_CART_QTY,
        payload: {
            qty,
            item,
        },
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

    localStorage.setItem("paymentMethod", JSON.stringify(method));
};

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const updateTotalPrice = (total) => async (dispatch) => {
    dispatch({
        type: UPDATE_TOTAL_PRICE,
        payload: total,
    });
};
