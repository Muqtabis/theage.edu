const express = require('express');
const router = express.Router();
const {
  getContent,
  updateContent,
  uploadContentImage,
  resetContent,
} = require('../controllers/contentController');
const { upload } = require('../config/storage');

router.route('/')
  .get(getContent)
  .put(updateContent);

router.post('/upload-image', upload.single('image'), uploadContentImage);
router.post('/reset', resetContent);

module.exports = router;
