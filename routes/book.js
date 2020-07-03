var express = require('express');
var bookController = require('../controllers/book.js');
var router = express.Router();

/* GET home page. */
router.get('/searchBook', bookController.getSearchBook);
router.get('/getBookChapter', bookController.getBookDirectory);
router.get('/getBookContent', bookController.getBookChapterContent);
router.get('/getContent', bookController.getChapterContent);
router.get('/getbooklist', bookController.getBooklist);
router.get('/getIntroduction', bookController.getBookInt);
router.get('/getRecommend', bookController.getRecommend);

module.exports = router;