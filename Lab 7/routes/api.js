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
}).single("img");

const PostsControllers = require ("../controllers/api/PostController");
const ProductControllers = require ("../controllers/api/ProductController");
const UserControllers = require ("../controllers/api/UserController");

const router = express.Router();

router.get('/post', PostsControllers.getPost);

router.get('/post/:id', PostsControllers.getOnePost)

router.post('/post', PostsControllers.createPost);

router.put('/post/:id', PostsControllers.updatePost);

router.delete('/post/:id', PostsControllers.deletePost);



router.get('/product', ProductControllers.getPosts);

router.get('/product/:id', ProductControllers.getOneProduct);

router.post('/product', upload, ProductControllers.postProducts);

router.put('/product/:id', upload, ProductControllers.updateProduct);


router.post('/users', UserControllers.sginUpUser);

router.post('/login', UserControllers.Login);
module.exports = router;