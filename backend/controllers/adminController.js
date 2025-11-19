const Admin = require('../models/AdminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    // Uses a secret key from your .env file (we will add this later)
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// @desc    Register a new admin (Run this once via Postman or temporary frontend code)
// @route   POST /api/admin/register
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
        email,
        password: hashedPassword,
    });

    if (admin) {
        res.status(201).json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid admin data' });
    }
};

// @desc    Authenticate admin & get token
// @route   POST /api/admin/login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // Check for admin email
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

module.exports = { registerAdmin, loginAdmin };