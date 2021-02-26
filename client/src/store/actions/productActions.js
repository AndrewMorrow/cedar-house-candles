import { GET_PRODUCTS, GET_PRODUCT } from "./types";

export const getProducts = () => async (dispatch) => {
    try {
        console.log("getProducts");
        const res = await fetch("/api/products");
        const data = await res.json();

        dispatch({
            type: GET_PRODUCTS,
            payload: data,
        });
    } catch (error) {
        console.error(error);
    }
};

export const getProduct = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        console.log(data);
        dispatch({
            type: GET_PRODUCT,
            payload: data,
        });
    } catch (error) {
        console.error(error);
    }
};
