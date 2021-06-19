const express = require('express')
const router = express.Router();

const { registerUsers, loginUsers, logoutUser } = require('../controller/authController')

router.route('/register').post(registerUsers)
router.route('/login').post(loginUsers)
router.route('/logout').get(logoutUser)

module.exports = router;