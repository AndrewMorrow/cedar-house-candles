import {
    initialState as initialStateAuth,
    reducer as reducerAuth,
} from "./authReducers";
import {
    initialState as initialStateError,
    reducer as reducerError,
} from "./errorReducers";
import {
    initialState as initialStateProduct,
    reducer as reducerProduct,
} from "./productReducers";
import {
    initialState as initialStateCart,
    reducer as reducerCart,
} from "./cartReducers";
import {
    initialState as initialStateOrder,
    reducer as reducerOrder,
} from "./orderReducers";

/*
    Combine Reducer function based on https://github.com/ankita1010/react-combine-reducers.
    Modified by: Graydon Scates
*/
const rootReducer = (reducers) => {
    const keys = Object.keys(reducers);
    const values = Object.values(reducers);
    let globalState;
    let combinedReducers = {};

    keys.forEach((key, i) => {
        globalState = { ...globalState, [key]: values[i][1] };
    });

    values.forEach((val, i) => {
        combinedReducers = { ...combinedReducers, [keys[i]]: val[0] };
    });

    return [
        (state, action) => {
            let hasStateChanged = false;
            let newState = {};
            let nextStateForCurrentKey = {};

            keys.forEach((key, i) => {
                const currentReducer = combinedReducers[key];
                const prevStateForCurrentKey = state[key];

                nextStateForCurrentKey = currentReducer(
                    prevStateForCurrentKey,
                    action
                );
                hasStateChanged =
                    hasStateChanged ||
                    nextStateForCurrentKey !== prevStateForCurrentKey;
                newState[key] = nextStateForCurrentKey;
            });

            return hasStateChanged ? newState : state;
        },
        globalState,
    ];
};

export default rootReducer({
    auth: [reducerAuth, initialStateAuth],
    error: [reducerError, initialStateError],
    product: [reducerProduct, initialStateProduct],
    cart: [reducerCart, initialStateCart],
    order: [reducerOrder, initialStateOrder],
});
