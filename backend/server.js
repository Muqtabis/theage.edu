const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

// Import Routes
const newsRoutes = require('./routes/newsRoutes');
const albumRoutes = require('./routes/albumRoutes');
const eventRoutes = require('./routes/eventRoutes');
const resultRoutes = require('./routes/resultRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contentRoutes = require('./routes/contentRoutes');

// --- 1. Load Environment Variables ---
const rootEnv = path.resolve(__dirname, '..', '.env');
const localEnv = path.resolve(__dirname, '.env');

if (fs.existsSync(rootEnv)) {
    dotenv.config({ path: rootEnv });
} else {
    dotenv.config({ path: localEnv });
}

// Connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- 2. Middleware ---
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://theage-edu-16ah.onrender.com', 'https://theage.edu']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5000', 'http://127.0.0.1:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(null, true); // Allow all in dev for ease of use
    },
    credentials: true,
}));

// Increase payload limit for large files (PDFs/Images)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static uploads (for older files before Cloudinary migration)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 3. Routes ---
app.use('/api/content', contentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);

// Health Check (CRITICAL for Render to pass status check)
app.get('/health', (req, res) => res.status(200).send('API is awake'));

// --- 4. Production Deploy Logic ---
if (process.env.NODE_ENV === 'production') {
    const nestedPath = path.join(__dirname, 'frontend-react', 'dist');
    const siblingPath = path.join(__dirname, '..', 'frontend-react', 'dist');

    let frontendPath = null;
    if (fs.existsSync(nestedPath)) {
        frontendPath = nestedPath;
    } else if (fs.existsSync(siblingPath)) {
        frontendPath = siblingPath;
    }

    if (frontendPath) {
        app.use(express.static(frontendPath));
        app.get(/(.*)/, (req, res) => {
            res.sendFile(path.resolve(frontendPath, 'index.html'));
        });
    } else {
        console.error("CRITICAL ERROR: Could not find 'dist' folder.");
    }
} else {
    app.get('/', (req, res) => {
        res.send('The Age School API running in dev mode');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
