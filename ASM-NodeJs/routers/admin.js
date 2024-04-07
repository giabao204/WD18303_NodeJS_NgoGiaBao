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
}).single("images");


const HomeControllers = require ("../controllers/admin/HomeController");
const ProductController = require ("../controllers/admin/ProductController");

const router = express.Router();

router.get('/', HomeControllers.adminHome);
router.get('/product', ProductController.getProduct);
router.get('/product-add', ProductController.getAddProduct);
router.post('/product-add',upload, ProductController.postAddProduct );

module.exports = router;