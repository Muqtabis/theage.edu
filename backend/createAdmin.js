const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/AdminModel');
const localConfig = require('./config');

dotenv.config({ path: '../.env' });
process.env.MONGO_URI = localConfig.MONGO_URI;

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // ⚠️ CHANGE THESE DETAILS TO YOUR DESIRED LOGIN
        const email = "admin@theage.edu";
        const password = "admin123"; 

        // Check if exists
        const userExists = await Admin.findOne({ email });
        if (userExists) {
            console.log('Admin already exists!');
            process.exit();
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        await Admin.create({
            email,
            password: hashedPassword
        });

        console.log('✅ Admin User Created Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();