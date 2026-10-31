import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';

// Import ScrollToTop to guarantee pages always open at the top
import ScrollToTop from './components/ScrollToTop';

// Import Layout (Header/Footer wrapper)
import Layout from './components/Layout';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import StudentLifePage from './pages/StudentLifePage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import PortalPage from './pages/PortalPage';
import AlbumPage from './pages/AlbumPage';
import LoginPage from './pages/LoginPage';

// Protected Route Component for Admin Dashboard
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ContentProvider>
      <ScrollToTop />
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Navigate to="/login" replace />} />

        {/* Public pages with Header/Footer layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/student-life" element={<StudentLifePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/gallery/:albumId" element={<AlbumPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Protected portal inside layout */}
          <Route 
            path="/portal" 
            element={
              <ProtectedRoute>
                <PortalPage />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </ContentProvider>
  );
}
