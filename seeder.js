import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/userSeeds.js";
import products from "./data/productSeeds.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import connectDB from "./config/db.js";
import Order from "./models/OrderModel.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);
        console.log("Data Imported");
        process.exit();
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed");
        process.exit();
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
