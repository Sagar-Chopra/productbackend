const express = require("express");
const router = express.Router();
const {
  productListing,
  addProduct,
  productDetails,
  deleteProduct,
  updateProduct
} = require("../controller/ProductController");
const { registration, signin } = require("../controller/UserController");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");

router.get("/", (req, res) => {
  res.send("hello from server");
});

// api for registration
router.post("/register", registration);

router.post("/signin", signin);

// get user data for contact us and home page

router.get("/getdata", authenticate, (req, res) => {
  console.log("about");
  res.send(req.rootUser);
});

// Api for Add product
router.post("/addproduct", upload.single('image'), addProduct);

// Api for product listing
router.get("/productlisting", productListing);

// api for product details
router.get("/productDetails/:id", productDetails);

// api for delete product
router.get("/deleteproduct/:id", deleteProduct);

// api for update product
router.patch("/updateproduct/:id", updateProduct);

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

router.get("/signin", (req, res) => {
  res.send("hello from login server");
});

router.get("/signup", (req, res) => {
  res.send("hello from signup server");
});

module.exports = router;
