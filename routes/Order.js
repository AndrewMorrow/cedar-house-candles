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

// @desc        Update order to paid
// @route       GET /api/orders/:id/pay
// @access      Private
router.put(
    "/:id/pay",
    catchError(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                // email_address: req.body.payer.email_address,
            };
            const updatedOrder = await order.save();

            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    })
);

export default router;
