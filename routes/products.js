const express = require('express')
const router = express.Router();

const { getProduct } = require('../controller/productController')

router.route('/products').get(getProduct);

module.exports = router;