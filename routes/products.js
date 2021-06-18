const express = require('express')
const router = express.Router();

const { getProduct,createProduct,getSingleProduct,updateProduct } = require('../controller/productController')

router.route('/admin/products/create').post(createProduct);
router.route('/admin/products/:id').put(updateProduct)

router.route('/products').get(getProduct);
router.route('/products/:id').get(getSingleProduct);


module.exports = router;