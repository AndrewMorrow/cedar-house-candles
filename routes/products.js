import express from "express";
const router = express.Router();
import Product from "../models/ProductModel.js";
import { catchError } from "../middleware/errorMiddleware.js";

// @desc        fetch all products
// @route       GET /api/products
// @access      Public
router.get(
    "/",
    catchError(async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (err) {
            res.status(404);
            throw new Error("Product Not Found");
        }
    })
);

// @desc        fetch single product
// @route       GET /api/products/:id
// @access      Public
router.get(
    "/:id",
    catchError(async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    })
);

// @desc        Update order to paid
// @route       GET /api/orders/:id/pay
// @access      Public
router.put(
    "/product/:id/updateqty",
    catchError(async (req, res) => {
        const product = await Product.findById(req.params.id);
        const purchasedQty = req.body.qty;

        if (product) {
            if (
                product.countInStock > 0 &&
                product.countInStock - purchasedQty >= 0
            ) {
                product.countInStock = product.countInStock - purchasedQty;

                const updatedProduct = await product.save();

                res.json(updatedProduct);
            }
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    })
);

export default router;
