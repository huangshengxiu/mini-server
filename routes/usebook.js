var express = require('express');
var useBookController = require('../controllers/usebook.js');
var router = express.Router();

/* GET home page. */
router.get('/getUseBook', useBookController.getUseBook);
router.get('/inUseBook', useBookController.inUseBook);
router.get('/addUseBook', useBookController.addUseBook);
router.get('/deleteUseBook', useBookController.deleteUseBook);
router.get('/deleteAllUseBook', useBookController.deleteAllUseBook);

module.exports = router;