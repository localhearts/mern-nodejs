const express = require('express')
const router = express.Router();

const { getProduct,createProduct } = require('../controller/productController')

router.route('/products/create').post(createProduct);

router.route('/products').get(getProduct);

module.exports = router;