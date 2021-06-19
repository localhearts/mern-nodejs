const express = require('express')
const router = express.Router();

const { registerUsers,loginUsers } = require('../controller/authController')

router.route('/register').post(registerUsers)
router.route('/login').post(loginUsers)

module.exports = router;