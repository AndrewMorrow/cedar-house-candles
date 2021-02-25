import { GET_PRODUCTS } from "../actions/types";

export const initialState = {
    products: [],
    product: {},
};

export const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };

        default:
            return state;
    }
};
