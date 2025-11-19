const express = require('express');
const router = express.Router();
const { getStudents, createStudent, deleteStudent } = require('../controllers/studentController');

router.route('/')
    .get(getStudents) 
    .post(createStudent);

router.route('/:id').delete(deleteStudent);

module.exports = router;