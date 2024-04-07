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

const ProductControllers = require ("../controllers/api/ProductController");

const router = express.Router();

router.get('/product', ProductControllers.getProduct);
router.get('/product/:id', ProductControllers.getOneProduct);
router.post('/product', upload, ProductControllers.postProducts);
router.put('/product/:id', upload, ProductControllers.updateProduct);
router.delete('/product/:id', ProductControllers.deleteProduct);

module.exports = router;