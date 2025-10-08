const express = require('express');
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_USER = { username: "admin", password: "admin@123" };

// Admin login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        req.session.admin = true;
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});

// Admin session check
router.get('/session', (req, res) => {
    res.json({ isAdmin: req.session.admin || false });
});

// Admin logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

module.exports = router;
