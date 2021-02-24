import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../store";
import { Link } from "react-router-dom";

const Landing = (props) => {
    const { state } = useContext(Store);
    const [products, setProducts] = useState([]);

    console.log({ state, props });

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await fetch("/api/products");
            setProducts(productsData);
        };
        fetchProducts();
        console.log(products);
    }, []);

    return <main>Home</main>;
};

export default Landing;
