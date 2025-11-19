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
const localConfig = require('./config'); // 🚨 NEW: Import local configuration file
const path = require('path');

// 🚨 FIX 1: Load environment variables first (still good practice)
dotenv.config({ path: '../.env' }); 

// 🚨 FIX 2: Manually set the process variable using the imported local config
process.env.MONGO_URI = localConfig.MONGO_URI;

// Connect to MongoDB
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Integrate Routes
app.use('/api/news', newsRoutes); 
app.use('/api/albums', albumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the API at: http://localhost:${PORT}/api/news`);
});