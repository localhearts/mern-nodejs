const express = require('express')
const router = express.Router();

const { registerUsers, loginUsers, logoutUser, forgotPassword, resetPassword, getUserProfile, changePassword } = require('../controller/authController')
const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/register').post(registerUsers)
router.route('/login').post(loginUsers)
router.route('/logout').get(logoutUser)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/change').put(isAuthenticatedUser,changePassword)

module.exports = router;