import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = (id) => async (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: id,
    });
};

export const removeFromCart = () => {
    console.log("remove from cart function");
};
