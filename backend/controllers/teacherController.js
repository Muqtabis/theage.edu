const Teacher = require('../models/TeacherModel');

// @desc    Get all teachers
// @route   GET /api/teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ createdAt: -1 });
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new teacher
// @route   POST /api/teachers
const createTeacher = async (req, res) => {
    const { name, subject, email, qualification } = req.body;

    if (!name || !subject || !email) {
        return res.status(400).json({ message: 'Name, Subject, and Email are required.' });
    }

    try {
        const teacher = await Teacher.create({ name, subject, email, qualification });
        res.status(201).json(teacher);
    } catch (error) {
        console.error("Teacher Creation Failed:", error.message);
        res.status(400).json({ message: 'Validation failed or Email already exists.' });
    }
};

// @desc    Delete teacher
// @route   DELETE /api/teachers/:id
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }
        res.status(200).json({ message: 'Teacher removed successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTeachers, createTeacher, deleteTeacher };