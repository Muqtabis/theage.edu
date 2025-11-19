const express = require('express');
const router = express.Router();
const { getResults, uploadResult, deleteResult } = require('../controllers/resultController');
const upload = require('../config/multerConfig');

router.route('/')
    .get(getResults)
    .post(upload.single('file'), uploadResult); // 'file' is the form field name

router.route('/:id').delete(deleteResult);

module.exports = router;