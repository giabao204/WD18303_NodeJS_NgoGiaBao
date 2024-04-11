const express = require("express");
const multer = require("multer");
// const bodyParser = require("body-parser");

// const PostsController = require ("../controllers/api/PostsControllers.js");
// const ProductController = require ("../controllers/api/ProductController.js");
// const UserController = require ("../controllers/api/UserControllers.js");
const HopdongControllers = require ("../controller/HopDongController");
const PostControlller = require("../controller/MongoController")


const router = express.Router();

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
}).single("image");
  

router.get('/hopdong', HopdongControllers.getHopdong);
router.get('/hopdong/:id', HopdongControllers.getOneHopdong);
router.delete('/hopdong/:id', HopdongControllers.deleteHopdong);
router.post('/hopdong', HopdongControllers.createHopdong);
router.patch('/hopdong/:id', HopdongControllers.updateHopdong);
// router.get('/hopdong/:id', HopdongControllers.checkNgayKyHopdong);

router.post('/post', PostControlller.createPost)



module.exports = router;