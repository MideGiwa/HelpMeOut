const express = require('express');
const { streamVideo, uploadVideo } = require('../controllers/videoController');
const router = express.Router();

// Get User Profile...
router.get('/stream-video/:filename', streamVideo);

router.post('/uploadVideo', uploadVideo);


module.exports = router;
