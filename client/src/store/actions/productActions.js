import { GET_PRODUCTS } from "./types";

export const getProducts = () => async (dispatch) => {
    try {
        console.log("getProducts");
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log(data);
        dispatch({
            type: GET_PRODUCTS,
            payload: data,
        });
    } catch (error) {
        console.error(error);
    }
};
