import React, { useContext, useEffect } from "react";
import { Store } from "../../store";
import { getOrderDetails } from "../../store/actions/orderActions";

const OrderDetail = ({ match }) => {
    const { state, dispatch } = useContext(Store);
    const orderId = match.params.id;

    const { order } = state;

    useEffect(() => {
        if (!order || order._id !== orderId) {
            getOrderDetails(orderId)(dispatch);
        }
        // eslint-disable-next-line
    }, []);

    return order.loading ? (
        <h1>Loading... </h1>
    ) : state.error ? (
        <h1>{state.error}</h1>
    ) : (
        <>
            <h1>
                Order Details Here
                {order._id}
            </h1>{" "}
        </>
    );
};

export default OrderDetail;
