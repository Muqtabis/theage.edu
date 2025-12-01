const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import Routes
const newsRoutes = require('./routes/newsRoutes');
const albumRoutes = require('./routes/albumRoutes');
const eventRoutes = require('./routes/eventRoutes');
const resultRoutes = require('./routes/resultRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');

// --- 1. Load Environment Variables ---
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- 2. Middleware & Dynamic CORS Configuration ---
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [
        'https://theage-edu-16ah.onrender.com',
        'https://theage.edu'
      ]
    : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Static Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 3. Integrate Backend API Routes ---
app.use('/api/news', newsRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);

// --- 4. Health Check Route ---
app.get('/health', (req, res) => {
    res.status(200).send('API is awake');
});

// --- 5. Monolithic / Production Deployment Setup ---
if (process.env.NODE_ENV === 'production') {
    // FIX 1: Use '../' to step out of backend folder to find frontend
    const frontendPath = path.join(__dirname, '../frontend-react/dist');

    // Serve static files
    app.use(express.static(frontendPath));

    // FIX 2: Reverted to regex /(.*)/ to avoid PathError on your specific Node version
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running in Development mode...');
    });
}

// --- 6. Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'Development'}`);
});