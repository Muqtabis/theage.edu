import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import the Layout (Header/Footer wrapper)
import Layout from './components/Layout';

// Import ALL your pages
import LandingPage from './pages/LandingPage'; 
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage.jsx';
import StudentLifePage from './pages/StudentLifePage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import PortalPage from './pages/PortalPage';
import AlbumPage from './pages/AlbumPage';
import LoginPage from './pages/LoginPage';

// 🔒 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <Routes>

      {/* 1️⃣ Landing page WITHOUT Layout */}
      <Route path="/" element={<LandingPage />} />

      {/* 2️⃣ Login page WITHOUT Layout */}
      <Route path="/login" element={<LoginPage />} />

      {/* 3️⃣ Pages WITH Layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/student-life" element={<StudentLifePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/gallery/:albumId" element={<AlbumPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected portal inside layout OR outside — your choice */}
        <Route 
          path="/portal" 
          element={
            <ProtectedRoute>
              <PortalPage />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* 4️⃣ Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
