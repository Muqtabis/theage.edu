require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises; // Use the promise-based version of fs
const multer = require('multer');
const sanitizeHtml = require('sanitize-html');
const { v4: uuidv4 } = require('uuid');

const app = express();
const adminRoutes = require('./routes/adminRoutes');
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'gallery-data.json');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const galleryRoutes = require('./routes/galleryRoutes');
// --- Middleware ---

// NOTE: Make sure you have a 'frontend' folder for your HTML/CSS/JS files
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Adjusted path for better structure
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.json());

app.use('/api', galleryRoutes);

// --- Simulated Authentication ---
const IS_ADMIN = true;
const checkAdmin = (req, res, next) => {
    if (IS_ADMIN) {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Admin access required.' });
    }
};

// --- Helper Functions for Data Handling ---
const readData = async () => {
    try {
        await fs.access(DATA_FILE);
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, create it and return default structure
        await fs.writeFile(DATA_FILE, JSON.stringify({ albums: [] }, null, 2));
        return { albums: [] };
    }
};

const writeData = async (data) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- Multer Configuration for Multiple Files ---
const storage = multer.diskStorage({
    destination: UPLOADS_DIR, // Use the absolute path
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'), false);
        }
    }
});

// --- API Routes ---

app.get('/api/session', (req, res) => {
    res.json({ isAdmin: IS_ADMIN });
});

app.get('/api/albums', async (req, res) => {
    const data = await readData();
    const albumsForGrid = data.albums.map(album => ({
        id: album.id,
        name: album.name,
        eventDate: album.eventDate,
        description: album.description,
        coverImage: album.photos.length > 0 ? album.photos[0].src : '/default-cover.png'
    }));
    res.json(albumsForGrid);
});

app.get('/api/albums/:id', async (req, res) => {
    const data = await readData();
    const album = data.albums.find(a => a.id === req.params.id); // Compare strings
    if (album) {
        res.json(album);
    } else {
        res.status(404).json({ error: 'Album not found' });
    }
});

app.post('/api/albums', checkAdmin, async (req, res) => {
    const data = await readData();
    const { name, eventDate, description } = req.body;

    const newAlbum = {
        id: uuidv4(), // CHANGED: Use UUID for new albums
        name: sanitizeHtml(name),
        eventDate: sanitizeHtml(eventDate),
        description: sanitizeHtml(description),
        photos: []
    };

    data.albums.unshift(newAlbum);
    await writeData(data);
    res.status(201).json(newAlbum);
});

app.post('/api/albums/:id/photos', checkAdmin, upload.array('photos', 50), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const data = await readData();
    const albumIndex = data.albums.findIndex(a => a.id === req.params.id); // Compare strings

    if (albumIndex === -1) {
        // Clean up uploaded files if album doesn't exist
        req.files.forEach(file => fs.unlink(file.path));
        return res.status(404).json({ error: 'Album not found.' });
    }

    // FIX: Removed the buggy and unused newAlbum block from here

    const newPhotos = req.files.map(file => ({
        id: uuidv4(), // Use UUID for photos
        src: `/uploads/${file.filename}`,
        caption: sanitizeHtml(req.body.caption || file.originalname)
    }));

    data.albums[albumIndex].photos.unshift(...newPhotos);
    await writeData(data);

    res.status(201).json({ message: `${req.files.length} photos added successfully.` });
});


app.delete('/api/photos/:photoId', checkAdmin, async (req, res) => {
    const data = await readData();
    const { photoId } = req.params; // CHANGED: Get ID as string
    let photoFound = false;
    let physicalFileToDelete = null;

    for (const album of data.albums) {
        const photoIndex = album.photos.findIndex(p => p.id === photoId); // Compare strings
        if (photoIndex > -1) {
            const [deletedPhoto] = album.photos.splice(photoIndex, 1);
            physicalFileToDelete = path.join(UPLOADS_DIR, path.basename(deletedPhoto.src));
            photoFound = true;
            break; // Exit loop once photo is found and removed
        }
    }

    if (photoFound) {
        await writeData(data);
        if (physicalFileToDelete) {
            try {
                await fs.unlink(physicalFileToDelete);
            } catch (err) {
                console.error("Error deleting physical file:", err);
                // Decide if you want to send an error back or just log it
            }
        }
        res.status(200).json({ message: 'Photo deleted.' });
    } else {
        res.status(404).json({ error: 'Photo not found.' });
    }
});


app.get('/api/featured-photos', async (req, res) => {
    try {
        const data = await readData();
        // Get all photos from all albums into a single list
        const allPhotos = data.albums.flatMap(album =>
            album.photos.map(photo => ({ ...photo, createdAt: photo.id.split('-')[0] })) // A simple way to get a timestamp from UUID v1 or similar
        );
        // Sort by creation time descending
        allPhotos.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        // Return the top 5, removing the temporary 'createdAt' field
        const featuredPhotos = allPhotos.slice(0, 5).map(({ createdAt, ...rest }) => rest);
        res.json(featuredPhotos);
    } catch (error) {
        console.error("Error fetching featured photos:", error);
        res.status(500).json({ error: 'Failed to get featured photos.' });
    }
});
// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(express.static(path.join(__dirname, '../frontend')));

// --- Hardcoded Admin User ---
const ADMIN_USER = { username: 'admin', password: 'admin123' };

// --- Admin Login API ---
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        req.session.admin = true;
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});

// Admin logout
app.post('/admin/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Protect Admin Dashboard
app.get('/admin/dashboard', (req, res) => {
    if (req.session.admin) {
        res.sendFile(path.join(__dirname,'../frontend/admin.html'));
    } else {
        res.redirect('/admin/login');
    }
});

// Serve Login Page
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/login.html'));
});

// Serve Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/home.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});