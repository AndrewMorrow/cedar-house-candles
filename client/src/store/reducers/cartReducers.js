import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

export const initialState = {
    isAuthenticated: false,
    cartItems: [],
};

export const reducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: action.payload,
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
            };

        default:
            return state;
    }
};
