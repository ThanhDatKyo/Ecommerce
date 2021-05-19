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
const {
    createCategory,
    getCategoryById,
    readCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
} = require("../controllers/category");
const {
    createProduct,
    getProductById,
    getAllProduct,
    readProduct,
    updateProduct,
    deleteProduct,
    listRelatedProduct,
} = require("../controllers/product");

const { userSignupValidator } = require("../validator");

router.get("/hello", requireSignin, (req, res) => {
    res.send("hello there");
});

/* ---------------- 
        AUTH 
-------------------*/
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

/* ---------------- 
        USER 
-------------------*/
router.param("userId", getUserById);
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({ user: req.profile });
});

/* ---------------- 
        CATEGORY 
-------------------*/
router.post(
    "/category/create/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    createCategory
);
router.param("categoryId", getCategoryById);
router.get("/category/:categoryId", readCategory);
router.get("/categories", getAllCategory);
router.put(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateCategory
);
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    deleteCategory
);

/* ---------------- 
        PRODUCT 
-------------------*/
router.param("productId", getProductById);
router.post(
    "/product/create/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    createProduct
);
router.get("/product/:productId", readProduct);
router.get("/products", getAllProduct);
router.get("/products/related/:productId", listRelatedProduct);
router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateProduct
);
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    deleteProduct
);

module.exports = router;
