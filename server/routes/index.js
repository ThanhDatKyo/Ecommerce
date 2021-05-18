const express = require("express");
const router = express.Router();
const {
    signup,
    signin,
    signout,
    requireSignin,
    isAuth,
    isAdmin,
} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { create } = require("../controllers/category");

const { userSignupValidator } = require("../validator");

router.get("/hello", requireSignin, (req, res) => {
    res.send("hello there");
});

//auth
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//user
router.param("userId", getUserById);
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({ user: req.profile });
});

//category
router.post("/category/create/:userId", isAdmin, create);

module.exports = router;
