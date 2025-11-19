const Student = require('../models/StudentModel');

// @desc    Get all students
// @route   GET /api/students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ grade: 1 });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new student
// @route   POST /api/students
const createStudent = async (req, res) => {
    const { name, grade, admissionId, parentEmail, status } = req.body;

    if (!name || !grade || !admissionId) {
        return res.status(400).json({ message: 'Name, Grade, and Admission ID are required.' });
    }

    try {
        const student = await Student.create({ name, grade, admissionId, parentEmail, status });
        res.status(201).json(student);
    } catch (error) {
        // Log Mongoose validation error
        console.error("Student Creation Failed:", error.message);
        res.status(400).json({ message: 'Validation failed or Admission ID already exists.' });
    }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }
        res.status(200).json({ message: 'Student removed successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getStudents, createStudent, deleteStudent };