import React, { useContext, useEffect } from "react";
import { Store } from "../../store";
// import { Link } from "react-router-dom";
import { getProducts } from "../../store/actions/productActions";

const Landing = (props) => {
    const { state, dispatch } = useContext(Store);
    const {
        product: { products },
    } = state;

    useEffect(() => {
        getProducts()(dispatch);
        // eslint-disable-next-line
    }, []);

    console.log({ state, props });

    return (
        <main>
            {products &&
                products.length > 0 &&
                products.map((product) => <h1>{product.name}</h1>)}
        </main>
    );
};

export default Landing;
