var express = require('express');
var router = express.Router();

var VimeoWelcomeController = require('../controllers/VimeoWelcome')
var uploadVideoController = require('../controllers/UploadVideo')


router.get('/', VimeoWelcomeController.helloVimeo)
router.post('/upload', uploadVideoController.uploadVideo)
router.get('/videos', uploadVideoController.getAllVideos)

module.exports = router;