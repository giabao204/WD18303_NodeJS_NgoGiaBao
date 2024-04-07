const express = require('express');
const HomeControllers = require("../controllers/client/HomeController");
const router = express.Router();

router.get('/', HomeControllers.home);
router.get('/shop', HomeControllers.shop);
router.get('/single/:id', HomeControllers.single); // Đảm bảo rằng route này trỏ đúng vào hàm xử lý 'single'
router.get('/store', HomeControllers.store); // Đây có vẻ như một sai sót, bạn có thể muốn trỏ vào một hàm xử lý khác

module.exports = router;
