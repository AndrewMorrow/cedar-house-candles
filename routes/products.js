import express from "express";
const router = express.Router();
import Product from "../models/ProductModel.js";

// @desc        fetch all products
// @route       GET /api/products
// @access      Public
router.get("/", async (req, res) => {
    try {
        console.log("All Products");
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(404);
        throw new Error("Product Not Found");
    }
});

export default router;
