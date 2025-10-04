const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");
const sanitizeHtml = require("sanitize-html");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const DATA_FILE = path.join(__dirname, "../../data/gallery-data.json");
const UPLOADS_DIR = path.join(__dirname, "../../uploads");

// --- Middleware ---
const IS_ADMIN = true;
const checkAdmin = (req, res, next) => {
    if (IS_ADMIN) next();
    else res.status(403).json({ error: 'Forbidden: Admin access required.' });
};

// --- Helper functions ---
const readData = async () => {
    try {
        await fs.access(DATA_FILE);
        const data = await fs.readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        await fs.writeFile(DATA_FILE, JSON.stringify({ albums: [] }, null, 2));
        return { albums: [] };
    }
};

const writeData = async (data) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- Multer setup ---
const storage = multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (['image/jpeg','image/png','image/gif'].includes(file.mimetype)) cb(null, true);
        else cb(new Error("Invalid file type"), false);
    }
});

// --- Routes ---
router.get("/session", (req, res) => {
    res.json({ isAdmin: IS_ADMIN });
});

router.get("/albums", async (req, res) => {
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

router.get("/albums/:id", async (req, res) => {
    const data = await readData();
    const album = data.albums.find(a => a.id === req.params.id);
    if (album) res.json(album);
    else res.status(404).json({ error: 'Album not found' });
});

router.post("/albums", checkAdmin, async (req, res) => {
    const data = await readData();
    const { name, eventDate, description } = req.body;

    const newAlbum = {
        id: uuidv4(),
        name: sanitizeHtml(name),
        eventDate: sanitizeHtml(eventDate),
        description: sanitizeHtml(description),
        photos: []
    };

    data.albums.unshift(newAlbum);
    await writeData(data);
    res.status(201).json(newAlbum);
});

router.post("/albums/:id/photos", checkAdmin, upload.array('photos', 50), async (req, res) => {
    if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded.' });

    const data = await readData();
    const albumIndex = data.albums.findIndex(a => a.id === req.params.id);

    if (albumIndex === -1) {
        req.files.forEach(file => fs.unlink(file.path));
        return res.status(404).json({ error: 'Album not found.' });
    }

    const newPhotos = req.files.map(file => ({
        id: uuidv4(),
        src: `/uploads/${file.filename}`,
        caption: sanitizeHtml(req.body.caption || file.originalname)
    }));

    data.albums[albumIndex].photos.unshift(...newPhotos);
    await writeData(data);
    res.status(201).json({ message: `${req.files.length} photos added successfully.` });
});

router.delete("/photos/:photoId", checkAdmin, async (req, res) => {
    const data = await readData();
    const { photoId } = req.params;
    let photoFound = false;
    let fileToDelete = null;

    for (const album of data.albums) {
        const idx = album.photos.findIndex(p => p.id === photoId);
        if (idx > -1) {
            const [deleted] = album.photos.splice(idx, 1);
            fileToDelete = path.join(UPLOADS_DIR, path.basename(deleted.src));
            photoFound = true;
            break;
        }
    }

    if (photoFound) {
        await writeData(data);
        if (fileToDelete) {
            try { await fs.unlink(fileToDelete); } 
            catch(err) { console.error("Error deleting file:", err); }
        }
        res.status(200).json({ message: 'Photo deleted.' });
    } else {
        res.status(404).json({ error: 'Photo not found.' });
    }
});

router.get("/featured-photos", async (req, res) => {
    try {
        const data = await readData();
        const allPhotos = data.albums.flatMap(album =>
            album.photos.map(photo => ({ ...photo, createdAt: photo.id.split('-')[0] }))
        );
        allPhotos.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        const featuredPhotos = allPhotos.slice(0, 5).map(({ createdAt, ...rest }) => rest);
        res.json(featuredPhotos);
    } catch (err) {
        console.error("Error fetching featured photos:", err);
        res.status(500).json({ error: 'Failed to get featured photos.' });
    }
});

module.exports = router;
