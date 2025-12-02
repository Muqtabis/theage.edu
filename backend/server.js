const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Required for path checking
const connectDB = require('./config/db');

// Import Routes
const newsRoutes = require('./routes/newsRoutes');
const albumRoutes = require('./routes/albumRoutes');
const eventRoutes = require('./routes/eventRoutes');
const resultRoutes = require('./routes/resultRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');

// --- 1. Load Environment Variables (Robust Check) ---
// Tries Root folder (../.env) first, then Backend folder (.env)
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
    : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

// Increase payload limit for large files (PDFs/Images)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static uploads (for older files before Cloudinary migration)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 3. Routes ---
app.use('/api/news', newsRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);

// Health Check (CRITICAL for Render to pass the status check)
app.get('/health', (req, res) => res.status(200).send('API is awake'));

// --- 4. Production Deploy Logic (Robust Pathing) ---
if (process.env.NODE_ENV === 'production') {
    // Check multiple paths to find the frontend build
    const nestedPath = path.join(__dirname, 'frontend-react', 'dist');     // Path 1: inside backend (local structure)
    const siblingPath = path.join(__dirname, '..', 'frontend-react', 'dist'); // Path 2: next to backend (Render structure)

    let frontendPath = null;

    // Determine the correct path based on folder existence
    if (fs.existsSync(nestedPath)) {
        frontendPath = nestedPath;
        console.log(`Serving Frontend from NESTED path: ${frontendPath}`);
    } else if (fs.existsSync(siblingPath)) {
        frontendPath = siblingPath;
        console.log(`Serving Frontend from SIBLING path: ${frontendPath}`);
    }

    if (frontendPath) {
        // 1. Serve static files
        app.use(express.static(frontendPath));
        
        // 2. Handle all other routes by serving index.html
        app.get(/(.*)/, (req, res) => {
            res.sendFile(path.resolve(frontendPath, 'index.html'));
        });
    } else {
        console.error("CRITICAL ERROR: Could not find 'dist' folder. Ensure the build command ran correctly.");
    }
} else {
    app.get('/', (req, res) => {
        res.send('Dev Mode');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});