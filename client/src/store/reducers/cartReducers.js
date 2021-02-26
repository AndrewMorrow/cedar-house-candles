import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

export const initialState = {
    isAuthenticated: false,
    cartItems: [],
};

export const reducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                console.log(existItem);
                existItem.cartQty++;
                return state;
                // return {
                //     ...state,
                //     cartItems: state.cartItems.map((x) =>
                //         x._id === existItem._id ? item : x
                //     ),
                // };
            } else {
                item.cartQty++;
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
