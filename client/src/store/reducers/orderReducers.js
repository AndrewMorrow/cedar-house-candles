import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
} from "../actions/types";

export const initialState = {
    orderItems: [],
    shippingAddress: {},
    loading: true,
};

export const reducer = function (state = initialState, action) {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            };
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,

                order: action.payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
