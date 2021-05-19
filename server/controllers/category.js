const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorhandler");

const getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category)
            return res.status(400).json({
                error: "Category does not exit",
            });
        req.category = category;
        next();
    });
};

const getAllCategory = (req, res) => {
    Category.find().exec((err, data) => {
        if (err)
            return res.status(400).json({
                error: errorHandler(err),
            });
        res.json(data);
    });
};

const readCategory = (req, res) => {
    return res.json(req.category);
};

const createCategory = (req, res) => {
    console.log(req.body);
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err)
            return res.status(400).json({
                error: errorHandler(err),
            });
        res.json({ data });
    });
};

const updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err)
            return res.status(400).json({
                error: errorHandler(err),
            });
        res.json({ data });
    });
};

const deleteCategory = (req, res, id) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err)
            return res.status(400).json({
                error: errorHandler(err),
            });
        res.json({ data, message: "Category deleted successfully" });
    });
};

module.exports = {
    createCategory,
    getCategoryById,
    readCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
};
