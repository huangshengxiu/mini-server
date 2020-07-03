var express = require('express');
var storyController = require('../controllers/story.js');
var router = express.Router();

router.get('/searchStoryByName', storyController.searchStoryByName);
router.get('/searchStory', storyController.searchStory);
router.get('/searchStoryContent', storyController.searchStoryContent);

module.exports = router;