const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const newsRoutes = require('./routes/newsRoutes'); 
const albumRoutes = require('./routes/albumRoutes');
const eventRoutes = require('./routes/eventRoutes');
const resultRoutes = require('./routes/resultRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path'); // Core module for path resolution

// --- 1. Load Environment Variables ---
// Load .env relative to the deployment root directory
dotenv.config({ path: path.resolve(__dirname, '..', '.env') }); 

// Connect to MongoDB
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

// --- 2. Middleware & Dynamic CORS Configuration ---
// Define allowed origins dynamically based on the environment
const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? ['https://your-live-frontend-domain.com', 'https://your-api-domain.onrender.com'] // NOTE: Replace with your actual live URLs
    : ['http://localhost:3000', 'http://localhost:5173']; 

app.use(cors({
    // Allow origins only if they are in the approved list
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Serve Static Uploads (for images)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// --- 3. Integrate Backend API Routes ---
app.use('/api/news', newsRoutes); 
app.use('/api/albums', albumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);

// --- 4. Health Check Route (For anti-sleep pings) ---
app.get('/health', (req, res) => {
    res.status(200).send('API is awake');
});

// --- 5. Monolithic / Production Deployment Setup ---

// Check if running in production mode (important for cloud hosting)
if (process.env.NODE_ENV === 'production') {
    // 1. Determine the path to the built React static files
    // Assumes React build output is in '../frontend-react/dist'
    const frontendPath = path.join(__dirname, '..', 'frontend-react', 'dist');

    // 2. Serve the static React files
    app.use(express.static(frontendPath));

    // 3. Serve index.html for all other GET requests (Catch-all route for React Router)
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(frontendPath, 'index.html'));
    });
} else {
    // Development route placeholder for the root '/' endpoint
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// --- 6. Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'Development'}`);
});