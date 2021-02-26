import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

export const initialState = {
    isAuthenticated: false,
    cartItems: [],
};

export const reducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x === item);

            if (existItem) {
                return state;
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
            };

        default:
            return state;
    }
};
