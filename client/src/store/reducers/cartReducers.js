import {
    ADD_TO_CART,
    CART_SAVE_PAYMENT_METHOD,
    REMOVE_FROM_CART,
} from "../actions/types";

export const initialState = {
    isAuthenticated: false,
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    paymentMethod: "",
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
                cartItems: state.cartItems.filter(
                    (item) => item._id !== action.payload
                ),
            };
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };

        default:
            return state;
    }
};
