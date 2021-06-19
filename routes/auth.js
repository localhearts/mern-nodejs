const express = require('express')
const router = express.Router();

const { registerUsers } = require('../controller/authController')

router.route('/register').post(registerUsers)

module.exports = router;