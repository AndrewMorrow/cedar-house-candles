import express from "express";
const router = express.Router();
import Order from "../models/OrderModel.js";
import { catchError } from "../middleware/errorMiddleware.js";
import passport from "passport";

// Middleware to use when routes require authenticated user.
const requiresAuth = passport.authenticate("jwt", { session: false });

// @desc        Create new Order
// @route       POST /api/orders
// @access      Public
router.post(
    "/",
    catchError(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            // itemsPrice,
            shippingPrice,
            totalPrice,
            userId,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("no order items");
        } else {
            if (userId && userId.length !== 0) {
                const order = new Order({
                    user: userId,
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    shippingPrice,
                    totalPrice,
                });

                const createdOrder = await order.save();
                res.status(201).json(createdOrder);
            } else {
                const order = new Order({
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    shippingPrice,
                    totalPrice,
                });

                const createdOrder = await order.save();
                res.status(201).json(createdOrder);
            }
        }
    })
);

// @desc        Update order to paid
// @route       GET /api/orders/:id/pay
// @access      Public
router.put(
    "/order/:id/pay",
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

// @desc        Get orders by user
// @route       GET /api/orders/myorders
// @access      Private
router.get(
    "/myorders",
    requiresAuth,
    catchError(async (req, res) => {
        const orders = await Order.find({
            user: req.user._id,
        });
        if (orders) {
            res.json(orders);
        } else {
            res.status(404);
            throw new Error("No Orders Found");
        }
    })
);

// @desc        Get order by id
// @route       GET /api/orders/:id
// @access      Public
router.get(
    "/order/:id",
    catchError(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    })
);

export default router;
