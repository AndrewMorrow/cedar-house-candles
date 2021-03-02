import express from "express";
const router = express.Router();
import Order from "../models/OrderModel.js";
import { catchError } from "../middleware/errorMiddleware.js";

// @desc        Create new Order
// @route       POST /api/orders
// @access      Public
router.post(
    "/",
    catchError(async (req, res) => {
        const {
            orderItems,
            // shippingAddress,
            paymentMethod,
            // itemsPrice,
            shippingPrice,
            totalPrice,
            userId,
        } = req.body;

        console.log(userId);
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("no order items");
        } else {
            const order = new Order({
                user: userId,
                orderItems,
                // shippingAddress,
                paymentMethod,
                // itemsPrice,
                shippingPrice,
                totalPrice,
            });
            // console.log(orderItems);
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    })
);

// @desc        Get order by id
// @route       GET /api/orders/:id
// @access      Private
router.get(
    "/:id",
    catchError(async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    })
);

export default router;
