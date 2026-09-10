import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import CanonicalManager from './components/CanonicalManager';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-brand-500 selection:text-white">
      <ScrollToTop />
      <CanonicalManager />
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Core Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Legacy .html Route Redirects */}
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/about.html" element={<Navigate to="/about" replace />} />
          <Route path="/services.html" element={<Navigate to="/services" replace />} />
          <Route path="/gallery.html" element={<Navigate to="/gallery" replace />} />
          <Route path="/blog.html" element={<Navigate to="/blog" replace />} />
          <Route path="/contact.html" element={<Navigate to="/contact" replace />} />

          {/* Service Legacy Redirects */}
          <Route path="/kitchen-remodeling.html" element={<Navigate to="/services/kitchen-remodeling" replace />} />
          <Route path="/bathroom-remodeling.html" element={<Navigate to="/services/bathroom-remodeling" replace />} />
          <Route path="/drywall-painting.html" element={<Navigate to="/services/drywall-painting" replace />} />
          <Route path="/flooring-carpentry.html" element={<Navigate to="/services/flooring-carpentry" replace />} />
          <Route path="/deck-siding.html" element={<Navigate to="/services/deck-siding" replace />} />
          <Route path="/roofing.html" element={<Navigate to="/services/roofing" replace />} />
          <Route path="/pressure-washing.html" element={<Navigate to="/services/pressure-washing" replace />} />
          <Route path="/new-construction.html" element={<Navigate to="/services/new-construction" replace />} />
          <Route path="/commercial-painting.html" element={<Navigate to="/services/commercial-painting" replace />} />
          <Route path="/general-remodeling.html" element={<Navigate to="/services/general-remodeling" replace />} />
          <Route path="/painting-interior.html" element={<Navigate to="/services/painting-interior" replace />} />
          <Route path="/painting-exterior.html" element={<Navigate to="/services/painting-exterior" replace />} />

          {/* Blog Legacy Redirects */}
          <Route path="/kitchen-remodeling-costs-guide-bellevue.html" element={<Navigate to="/blog/kitchen-remodeling-costs-guide-bellevue" replace />} />
          <Route path="/bathroom-remodeling-waterproofing-guide-bellevue.html" element={<Navigate to="/blog/bathroom-remodeling-waterproofing-guide-bellevue" replace />} />
          <Route path="/drywall-repair-guide-bellevue.html" element={<Navigate to="/blog/drywall-repair-guide-bellevue" replace />} />
          <Route path="/exterior-painting-weather-protection-bellevue.html" element={<Navigate to="/blog/exterior-painting-weather-protection-bellevue" replace />} />
          <Route path="/pacific-northwest-roofing-repair-replacement-guide.html" element={<Navigate to="/blog/pacific-northwest-roofing-repair-replacement-guide" replace />} />
          <Route path="/when-to-replace-flooring.html" element={<Navigate to="/blog/when-to-replace-flooring" replace />} />
          <Route path="/annual-home-maintenance-checklist.html" element={<Navigate to="/blog/annual-home-maintenance-checklist" replace />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
