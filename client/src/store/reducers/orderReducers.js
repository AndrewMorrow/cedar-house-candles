import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_RESET,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
} from "../actions/types";

export const initialState = {
    orderItems: [],
    shippingAddress: {},
    loading: false,
    orders: [],
    success: false,
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
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ORDER_PAY_RESET:
            return {};

        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true,
            };
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ORDER_LIST_MY_RESET:
            return {
                ...state,
                loading: true,
                orders: [],
            };

        default:
            return state;
    }
};
