const express = require('express');
const methodOverride = require('method-override');
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
router.get('/edit-product/:id', ProductController.editProduct);
router.post('/edit-product/:id', ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);

module.exports = router;