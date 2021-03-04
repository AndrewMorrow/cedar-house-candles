import {
    ADD_TO_CART,
    CART_SAVE_PAYMENT_METHOD,
    REMOVE_FROM_CART,
    CART_SAVE_SHIPPING_ADDRESS,
    UPDATE_TOTAL_PRICE,
    CLEAR_CART,
    CHANGE_CART_QTY,
} from "../actions/types";

export const initialState = {
    isAuthenticated: false,
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    paymentMethod: "Paypal",
    shippingAddress: localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {},
    shippingPrice: 8,
    totalPrice: 0,
};

export const reducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload.product;
            const itemCartQty = action.payload.qty;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // console.log(existItem);
                existItem.cartQty++;
                return state;
            } else {
                item.cartQty = itemCartQty;
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

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };

        case CHANGE_CART_QTY:
            const eItem = action.payload.item;
            const itemExists = state.cartItems.find((x) => x._id === eItem._id);

            if (itemExists) {
                // console.log(itemExists);
                itemExists.cartQty = action.payload.qty;
                return state;
            }
            return state;

        case UPDATE_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload,
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };

        default:
            return state;
    }
};
