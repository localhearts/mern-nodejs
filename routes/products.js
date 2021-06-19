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

router.route('/admin/products/create').post(isAuthenticatedUser,createProduct);
router.route('/admin/products/:id')
    .put(isAuthenticatedUser,updateProduct)
    .delete(isAuthenticatedUser,deleteProduct);

router.route('/products').get(getProduct);
router.route('/products/:id').get(getSingleProduct);


module.exports = router;