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

// Load Env
dotenv.config({ path: path.resolve(__dirname, '.env') });
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Production CORS
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

// INCREASE LIMIT (Prevents large PDFs from being cut off)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => res.status(200).send('API is awake'));

// Production Deploy Logic
if (process.env.NODE_ENV === 'production') {
    // 1. Correct Path to Frontend
    const frontendPath = path.join(__dirname, '../frontend-react/dist');
    app.use(express.static(frontendPath));

    // 2. Correct Regex Route
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => res.send('Dev Mode'));
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});