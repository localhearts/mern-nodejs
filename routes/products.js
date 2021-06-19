const express = require('express')
const router = express.Router();

const { 
    getProduct,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct 
} = require('../controller/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/products/create').post(isAuthenticatedUser,authorizeRoles('admin'),createProduct);
router.route('/admin/products/:id')
    .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

router.route('/products').get(getProduct);
router.route('/products/:id').get(getSingleProduct);


module.exports = router;