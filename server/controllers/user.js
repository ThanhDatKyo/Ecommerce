const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorhandler");
require("dotenv").config();

const getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user)
            return res.status(400).json({ err: "User not found" });
        req.profile = user;
        next();
    });
};
module.exports = {
    getUserById,
};
