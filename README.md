# The Age School (`theage.edu`)

Full-stack institutional website and live Content Management System (CMS) for **The Age School** (Basavakalyan, Bidar District, Karnataka, India).

Built with a React + Vite + Tailwind CSS frontend and an Express + MongoDB + Cloudinary backend, featuring an Oxford Navy (`#0b192c`), Heritage Gold (`#c5a880`), and Warm Parchment (`#fdfbf7`) academic design system paired with `Playfair Display`, `Cormorant Garamond`, and `Plus Jakarta Sans`.

---

## Features

### Public Institutional Portal
* **Home (`HomePage.jsx`)**: Full-bleed campus hero, live urgent notice ticker, institutional metric strip, four core educational pillars, wing-by-wing academic structure overview, campus gallery slideshow, and live bulletins/events feed.
* **About School (`AboutPage.jsx`)**: Founding narrative, President & Vice President messages, institutional timeline, and dynamic Faculty Directory (`/api/teachers`).
* **Classes & Academics (`AcademicsPage.jsx`)**: Searchable, filterable, expandable class-by-class curriculum matrix covering **17 individual classes/streams** across five wings:
  * **Pre-Primary (ECCE)**: Playgroup / Toddlers, Nursery, Lower Kindergarten (LKG), Upper Kindergarten (UKG)
  * **Primary School**: Class I – Class V
  * **Middle School**: Class VI – Class VIII
  * **Secondary School (SSLC)**: Class IX & Class X
  * **Senior Secondary / PUC**: Classes XI & XII (Science PCMB/PCMC, Commerce SEBA/CEBA, Humanities & Arts)
  * Each expandable class entry includes age eligibility, class timings, student-teacher ratio, pedagogical overview, prescribed subjects, milestones, and assessment methodology, alongside the Campus Bell Schedule and Official Board Gazette & Results (`/api/results`).
* **Admissions & Fees (`AdmissionsPage.jsx`)**: Four-step enrollment roadmap, six-tier fee schedule (Pre-Primary through Senior Secondary / PUC), statutory age eligibility table (as of June 1st), admission document checklist, and financial aid notice.
* **Campus Life & Albums (`StudentLifePage.jsx`, `AlbumPage.jsx`)**: Co-curricular programs, the Four Houses System (`Ashoka`, `Tagore`, `Raman`, `Kalam`), campus infrastructure & safety overview, and interactive photo collections (`/api/albums`).
* **Circulars & Gazette (`NewsPage.jsx`)**: Official news dispatches and upcoming event calendar (`/api/news`, `/api/events`) with article reader modal.
* **Contact Us (`ContactPage.jsx`)**: Administrative inquiry form (`@formspree/react`), switchboard details, office hours, and embedded campus map.
* **Navigation & UX (`Header.jsx`, `Footer.jsx`, `ScrollToTop.jsx`)**: Official top utility bar with State Board recognition/school code, automatic scroll-to-top on route changes, and discreet footer **Staff Login** keeping admin access hidden from the public header.

### Administrative Governance & Live CMS (`/login` → `/portal`)
Protected behind `/login` (`LoginPage.jsx` → `POST /api/admin/login`), `PortalPage.jsx` provides:
* **Website CMS**: Live-edit general identity/contact details, notice marquee, home stats & pillars, leadership messages & timeline, admissions fees/steps/bursaries, class-by-class subjects/timings/ratios/overviews, and campus activities via `/api/content`.
* **Events Manager**: Create, update, and remove upcoming school events with cover images.
* **News & Bulletins**: Publish and delete school notices and dispatches with Cloudinary-hosted images.
* **Gallery & Albums**: Create photo albums and upload/manage collection images on Cloudinary.
* **Results & Reports**: Upload official board/term scorecards and gazette documents (images or raw PDFs).
* **Faculty & Staff Directory**: Add and manage teaching staff profiles displayed on the About page.
* **Student Directory**: Maintain student admission records, grades, status, and profile photos.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 7, React Router DOM 7, Tailwind CSS 4, Lucide React, `@formspree/react` |
| **Backend** | Node.js (CommonJS), Express 5, Mongoose 8, JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| **Database & Media** | MongoDB, Cloudinary (`cloudinary`, `multer`, `multer-storage-cloudinary`) |

---

## Project Structure

```text
theage.edu/
├── package.json                  # Root backend dependencies & deploy/start scripts
├── .gitignore
├── backend/
│   ├── server.js                 # Express app, CORS, API routes, /health, prod static serving
│   ├── createAdmin.js            # One-time CLI helper to seed an admin account
│   ├── config/
│   │   ├── db.js                 # Mongoose MongoDB connection
│   │   ├── storage.js            # Cloudinary Multer storage (images & raw PDFs)
│   │   └── multerConfig.js       # Legacy disk upload configuration (/uploads)
│   ├── models/                   # Mongoose schemas (Admin, Album, Content, Event, News, Result, Student, Teacher)
│   ├── controllers/              # Route handlers
│   └── routes/                   # REST API route definitions
└── frontend-react/
    ├── package.json              # Frontend dependencies & Vite scripts
    ├── vite.config.js            # Vite config (port 5173, /api & /uploads proxy to :5000)
    ├── index.html                # Fonts, Tailwind theme tokens, document shell
    └── src/
        ├── App.jsx               # Route definitions & ProtectedRoute guard
        ├── main.jsx              # React root & optional dynamic Google Maps script loader
        ├── context/
        │   └── ContentContext.jsx # Dynamic CMS state + defaultClasses & defaultContent fallbacks
        ├── components/
        │   ├── Header.jsx        # Top institutional utility bar & navigation masthead
        │   ├── Footer.jsx        # Directory, accreditation card & discreet Staff Login link
        │   ├── Layout.jsx        # Dynamic header-height offset wrapper
        │   ├── PageHeader.jsx
        │   ├── ImageModal.jsx
        │   └── ScrollToTop.jsx   # Resets window scroll to top on route navigation
        └── pages/
            ├── HomePage.jsx
            ├── AboutPage.jsx
            ├── AcademicsPage.jsx
            ├── AdmissionsPage.jsx
            ├── StudentLifePage.jsx
            ├── NewsPage.jsx
            ├── AlbumPage.jsx
            ├── ContactPage.jsx
            ├── LoginPage.jsx
            └── PortalPage.jsx
```

---

## Environment Variables

Create a `.env` file in the **project root** (`theage.edu/.env`). Both `backend/server.js` and `frontend-react/vite.config.js` (`envDir: '../'`) load from the root `.env`.

```env
# Server
PORT=5000
NODE_ENV=development

# Database & Auth
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=your_strong_jwt_secret

# Cloudinary (Image & PDF uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional Frontend Key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

> **Note:** `.env` is ignored by `.gitignore`. Never commit secrets or credentials to version control.

---

## Getting Started (Local Development)

### Prerequisites
* Node.js (v18+ recommended) and `npm`
* A MongoDB database URI
* A Cloudinary account for media and PDF uploads

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/Muqtabis/theage.edu.git
cd theage.edu

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend-react
npm install
cd ..
```

### 2. Seed an Admin Account (First-Time Setup)

Edit the credentials in `backend/createAdmin.js` (and ensure `backend/config.js` or `.env` provides your `MONGO_URI`), then run from inside `backend/`:

```bash
cd backend
node createAdmin.js
cd ..
```

### 3. Run in Development Mode

Open two terminals in the repository root:

```bash
# Terminal 1: Start Express API server on http://localhost:5000
npm run dev

# Terminal 2: Start React + Vite dev server on http://localhost:5173
cd frontend-react
npm run dev
```

Vite automatically proxies `/api` and `/uploads` requests to `http://localhost:5000`.

* **Public site:** `http://localhost:5173`
* **Admin login:** `http://localhost:5173/login`

---

## Production Build & Deployment

From the project root:

```bash
# Build the React frontend into frontend-react/dist
npm run render-build

# Start the Express server in production mode (serves API + frontend-react/dist)
NODE_ENV=production npm start
```

Available scripts:
* **Root (`package.json`)**: `npm start` (`node backend/server.js`), `npm run dev` (`nodemon backend/server.js`), `npm run render-build` (builds `frontend-react`).
* **Frontend (`frontend-react/package.json`)**: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.

---

## API Endpoints Summary

| Base Path | Methods | Description |
| :--- | :--- | :--- |
| `/health` | `GET` | Health check (`200 API is awake`) |
| `/api/content` | `GET`, `PUT` | Fetch and update dynamic site & class CMS content |
| `/api/content/upload-image` | `POST` | Upload CMS asset image to Cloudinary |
| `/api/content/reset` | `POST` | Reset CMS document to schema defaults |
| `/api/admin/login`, `/api/admin/register` | `POST` | Admin authentication (returns JWT) & registration |
| `/api/news` | `GET`, `POST`, `DELETE /:id` | School bulletins & announcements |
| `/api/events` | `GET`, `POST`, `PUT /:id`, `DELETE /:id` | Campus calendar events |
| `/api/albums` | `GET`, `GET /:id`, `POST`, `DELETE /:id`, `POST /upload-photo`, `DELETE /:albumId/photos/:photoId` | Gallery albums and photos |
| `/api/results` | `GET`, `POST`, `DELETE /:id` | Examination results & PDF/image gazettes |
| `/api/teachers` | `GET`, `POST`, `DELETE /:id` | Faculty directory records |
| `/api/students` | `GET`, `POST`, `DELETE /:id` | Student directory records |
