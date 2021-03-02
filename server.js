import dotenv from "dotenv";
import path from "path";
import express from "express";
import passport from "passport";
import connectDB from "./config/db.js";
// Middleware packages
import bodyParser from "body-parser";
// Routes
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/order.js";
import passConfig from "./config/passport.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

// connect to mongo
connectDB();

const app = express();

app.use(express.json());

// Middleware packages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport JWT setup.
app.use(passport.initialize());
// require("./config/passport")(passport);
passConfig(passport);

// Middleware to use when routes require authenticated user.
const requiresAuth = passport.authenticate("jwt", { session: false });

// Login and register routes here don't require authenticated user.
app.use("/api/auth", authRoutes);

// For all authenticated routes, make sure to use this
app.use("/api/users", requiresAuth, usersRoutes);

// Product data routes
app.use("/api/products", productRoutes);

// How to make only one route protected?
// order data routes
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);

// Custom Error handlers
// app.use(notFound);
// app.use(errorHandler);

// For production, serve compiled React app in client build directory.
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
