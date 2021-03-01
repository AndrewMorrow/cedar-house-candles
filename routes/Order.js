import express from "express";
const router = express.Router();
import Order from "../models/OrderModel.js";
import { catchError } from "../middleware/errorMiddleware.js";

// @desc        Create new Order
// @route       POST /api/orders
// @access      Public
router.post("/", async (req, res) => {
    try {
        const {
            orderItems,
            // shippingAddress,
            paymentMethod,
            // itemsPrice,
            shippingPrice,
            totalPrice,
        } = req.body;
        // console.log(orderItems);
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("no order items");
        } else {
            const order = new Order({
                // user: req.user._id,
                orderItems,
                // shippingAddress,
                paymentMethod,
                // itemsPrice,
                shippingPrice,
                // totalPrice,
            });
            console.log(orderItems);
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (err) {
        console.log(err);
    }
});

export default router;
