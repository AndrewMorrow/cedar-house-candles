import React, { useContext, useEffect } from "react";
import { getProduct } from "../../store/actions/productActions";
import { Store } from "../../store";

const ProductDetail = ({ match }) => {
    const { state, dispatch } = useContext(Store);
    const {
        product: { product },
    } = state;
    const productId = match.params.id;

    useEffect(() => {
        getProduct(productId)(dispatch);
        // eslint-disable-next-line
    }, []);
    return (
        <main>
            <h1>{product.name}</h1>
        </main>
    );
};

export default ProductDetail;
