import express from "express";
const router = express.Router();

// @desc        fetch all products
// @route       GET /api/products
// @access      Public
router.get("/", (req, res) => {
    console.log("All Products");
});

export default router;
