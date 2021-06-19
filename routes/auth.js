const express = require('express')
const router = express.Router();

const { registerUsers, loginUsers, logoutUser, forgotPassword, resetPassword } = require('../controller/authController')

router.route('/register').post(registerUsers)
router.route('/login').post(loginUsers)
router.route('/logout').get(logoutUser)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

module.exports = router;