var express = require('express');
var router = express.Router();
authController = require('../controllers/authController');

router.route('/login')
	.get(authController.loginPage)
	.post(authController.authorization)

router.route('/register')
	.get(authController.registerPage)
	.post(authController.registration)

module.exports = router;