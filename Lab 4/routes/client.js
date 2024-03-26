const express = require('express');

const HomeControllers = require ("../controllers/client/HomeControllres");

const router = express.Router();

router.get('/', HomeControllers.home);

router.get('/shop', HomeControllers.shop);

router.get('/shop/:productId', HomeControllers.shop);

module.exports = router;