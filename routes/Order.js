import express from "express";
const router = express.Router();
import Order from "../models/OrderModel.js";
import { catchError } from "../middleware/errorMiddleware.js";

// @desc        Create new Order
// @route       POST /api/orders
// @access      Private
router.get(
    "/",
    catchError(async (req, res) => {
        const { orderItems, paymentMethod } = req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("no order items");
        } else {
            const order = new Order({
                user: req.user._id,
                orderItems,
                paymentMethod,
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    })
);

export default router;
