import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = (product) => async (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: product,
    });
};

export const removeFromCart = () => {
    console.log("remove from cart function");
};
