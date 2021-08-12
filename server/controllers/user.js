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

const readUser = (req, res) => {
	req.profile.hashed_password = undefined;
	req.profile.salt = undefined;
	return res.json(req.profile);
};
const updateUser = (req, res) => {
	//use $set để update all những gì người dùng nhập vào. vd: email, name, ...
	User.findOneAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true },
		(err, user) => {
			if (err)
				return res.status(400).json({
					error: "You are not authorized to perform this action",
				});
			user.hashed_password = undefined;
			user.salt = undefined;
			res.json(user);
		}
	);
};
module.exports = {
	getUserById,
	readUser,
	updateUser,
};
