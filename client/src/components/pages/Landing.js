import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../store';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

const Landing = (props) => {
    const classes = useStyles();
    const { state } = useContext(Store);
    const [products, setProducts] = useState([]);

    console.log({ state, props });

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products');
            const productData = await res.json();
            setProducts(productData);
        };
        fetchProducts();
        console.log(products);
    }, []);

    return (
        <main>
            <div className={classes.root}>
                <GridList
                    cellHeight={160}
                    className={classes.gridList}
                    cols={3}
                >
                    {products &&
                        products.length > 0 &&
                        products.map((product) => (
                            <GridListTile
                                key={product.image}
                                cols={product.cols || 1}
                            >
                                <img src={product.image} alt={product.name} />
                            </GridListTile>
                        ))}
                </GridList>
            </div>
        </main>
    );
};

export default Landing;
