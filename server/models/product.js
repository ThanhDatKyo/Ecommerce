const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
            maxlength: 32,
        },
        description: {
            type: String,
            require: true,
            maxlength: 2000,
        },
        price: {
            type: Number,
            trim: true,
            require: true,
            maxlength: 32,
        },
        category: {
            type: ObjectId,
            ref: "Category",
            require: true,
            maxlength: 32,
        },
        quantity: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            require: false,
            type: Boolean,
        },
    },
    { timestamps: true }
);

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

module.exports = mongoose.model("Product", productSchema);
