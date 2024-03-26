const express = require('express');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({
    storage: storage,
}).single("productImage");

const ProductController = require ("../controllers/admin/ProductsControllers");

const router = express.Router();

router.get('/list-product', ProductController.getProduct);

router.get('/add-product', ProductController.addProduct);
router.post('/add-product', upload, ProductController.postAddProduct);

module.exports = router;