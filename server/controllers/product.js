const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorhandler");

const createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err)
            return res
                .status(400)
                .json({ error: "Image could not be updated" });

        //check for all fields
        const { name, description, price, category, quantity, shipping } =
            fields;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
        )
            return res.status(400).json({
                error: "All fields are required",
            });

        let product = new Product(fields);

        if (files.photo) {
            // console.log("FILES PHOTO", files.photo);
            if (files.photo.size > 1000000)
                return res.status(400).json({
                    error: "Image should be less than 1mb in size",
                });

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err)
                return res.status(400).json({
                    error: errorHandler(err),
                });
            res.json({ result });
        });
    });
};

const getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product)
            return res.status(400).json({
                error: "Product not found",
            });
        req.product = product;
        next();
    });
};

const getAllProduct = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err)
                return res.status(400).json({
                    error: "Products not found",
                });
            res.json(products);
        });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */
const listRelatedProduct = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    //Find nhieu id use $ne
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, products) => {
            if (err)
                return res.status(400).json({
                    error: "Products not found",
                });
            res.json(products);
        });
};

const readProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

const updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err)
            return res
                .status(400)
                .json({ error: "Image could not be updated" });

        //check for all fields
        const { name, description, price, category, quantity, shipping } =
            fields;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
        )
            return res.status(400).json({
                error: "All fields are required",
            });

        let product = req.product;
        console.log("fields", fields);
        console.log("product", product);
        product = _.extend(product, fields);
        if (files.photo) {
            //1kb = 1000
            //1mb = 1000000
            // console.log("FILES PHOTO", files.photo);
            if (files.photo.size > 1000000)
                return res.status(400).json({
                    error: "Image should be less than 1mb in size",
                });

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err)
                return res.status(400).json({
                    error: errorHandler(err),
                });
            res.json({ result });
        });
    });
};

const deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, result) => {
        if (err)
            return res.status(400).json({
                error: "Product not found",
            });
        res.json({
            result,
            message: "Product deleted successfully",
        });
    });
};

module.exports = {
    createProduct,
    getProductById,
    readProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    listRelatedProduct,
};
