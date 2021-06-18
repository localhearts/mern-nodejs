const express = require('express')
const router = express.Router();

const { getProduct,createProduct,getSingleProduct } = require('../controller/productController')

router.route('/products/create').post(createProduct);
router.route('/products').get(getProduct);
router.route('/products/:id').get(getSingleProduct);

module.exports = router;