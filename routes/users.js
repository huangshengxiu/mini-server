var express = require('express');
var userController = require('../controllers/user.js');
var router = express.Router();

/* GET users listing. */
router.post('/login', userController.getOpenId);
router.post('/checktoken', userController.checkToken);

module.exports = router;