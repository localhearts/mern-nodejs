const express = require('express')
const router = express.Router();

const { 
    getProduct,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct 
} = require('../controller/productController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/admin/products/create').post(createProduct);
router.route('/admin/products/:id').put(updateProduct).delete(deleteProduct);

router.route('/products').get(isAuthenticatedUser,getProduct);
router.route('/products/:id').get(getSingleProduct);


module.exports = router;