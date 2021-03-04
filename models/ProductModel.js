import mongoose from "mongoose";

// schema for array of reviews
const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
});

// schema for array of product types
const typesSchema = mongoose.Schema({
    name: { type: String, required: true },
});
const noteProfileSchema = mongoose.Schema({
    top: { type: String },
    middle: { type: String },
    bottom: { type: String },
});

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        cols: {
            type: Number,
            required: true,
            default: 1,
        },
        reviews: [reviewSchema],
        productTypes: [typesSchema],
        isBestSeller: {
            type: Boolean,
            default: false,
        },
        cartQty: {
            type: Number,
            default: 0,
        },
        itemProductType: {
            type: String,
            required: true,
        },
        productCollection: {
            type: String,
        },
        noteProfileTop: {
            type: String,
        },
        noteProfileMiddle: {
            type: String,
        },
        noteProfileBottom: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
