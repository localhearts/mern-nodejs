const express = require('express')
const router = express.Router();

const { registerUsers, loginUsers, logoutUser, forgotPassword, resetPassword, getUserProfile, changePassword, updateUserProfile, getAllUser, getUserDetails, updateUser, deleteUser } = require('../controller/authController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/register').post(registerUsers)
router.route('/login').post(loginUsers)
router.route('/logout').get(logoutUser)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/change').put(isAuthenticatedUser,changePassword)
router.route('/me/update').put(isAuthenticatedUser,updateUserProfile)

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUser)
router.route('/admin/users/:id')
    .get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)
    .put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)




module.exports = router;