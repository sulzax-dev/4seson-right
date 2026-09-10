import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, ChevronDown, Menu, X } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white py-2.5 px-4 text-xs sm:text-sm hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="tel:4254665469" className="hover:text-brand-400 transition flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-500" />
              <span>(425) 466-5469</span>
            </a>
            <a href="mailto:4srsinc@gmail.com" className="hover:text-brand-400 transition flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand-500" />
              <span>4srsinc@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              <span>Mon - Sat: 8am – 7pm</span>
            </span>
            <span className="bg-brand-500/20 text-brand-400 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-brand-500/30">
              WA Lic# 4SEASSR801OR
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          
          {/* Desktop Layout (3-Column Centered Logo) */}
          <div className="hidden lg:flex items-center justify-between w-full">
            
            {/* Left Nav Links */}
            <div className="flex items-center space-x-8 font-semibold text-slate-700 text-sm flex-1 justify-end pr-8">
              <Link 
                to="/" 
                className={`hover:text-brand-500 transition-colors py-1 ${isActive('/') ? 'text-brand-500 font-bold border-b-2 border-brand-500' : ''}`}
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                className={`hover:text-brand-500 transition-colors py-1 ${isActive('/about') ? 'text-brand-500 font-bold border-b-2 border-brand-500' : ''}`}
              >
                About Us
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <Link 
                  to="/services" 
                  className={`hover:text-brand-500 transition-colors py-1 flex items-center gap-1.5 ${location.pathname.startsWith('/services') ? 'text-brand-500 font-bold' : ''}`}
                >
                  Our Services
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-slate-400 group-hover:text-brand-500" />
                </Link>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2 font-medium text-sm text-slate-700">
                  {servicesData.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="block px-5 py-2.5 hover:bg-brand-50 hover:text-brand-500 transition border-l-4 border-transparent hover:border-brand-500 text-xs font-semibold"
                    >
                      {service.title}
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      to="/services"
                      className="block px-5 py-2 text-brand-500 font-bold text-xs hover:underline"
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Centered Logo */}
            <div className="flex justify-center shrink-0 px-4">
              <Link to="/" className="flex items-center group py-1">
                <img 
                  src="/images/logo.jpg" 
                  alt="4 Seasons Right Services Logo" 
                  className="h-12 md:h-14 w-auto max-w-[220px] object-contain transition-transform group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Right Nav Links + CTA */}
            <div className="flex items-center space-x-6 font-semibold text-slate-700 text-sm flex-1 justify-start pl-8">
              <Link 
                to="/gallery" 
                className={`hover:text-brand-500 transition-colors py-1 ${isActive('/gallery') ? 'text-brand-500 font-bold border-b-2 border-brand-500' : ''}`}
              >
                Gallery
              </Link>

              <Link 
                to="/blog" 
                className={`hover:text-brand-500 transition-colors py-1 ${isActive('/blog') ? 'text-brand-500 font-bold border-b-2 border-brand-500' : ''}`}
              >
                Blog
              </Link>

              <Link 
                to="/contact" 
                className={`hover:text-brand-500 transition-colors py-1 ${isActive('/contact') ? 'text-brand-500 font-bold border-b-2 border-brand-500' : ''}`}
              >
                Contact Us
              </Link>

              <Link
                to="/contact"
                className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-glow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ml-2 shrink-0"
              >
                Book Estimate
              </Link>
            </div>

          </div>

          {/* Mobile Layout (Logo left, icons right) */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <Link to="/" className="flex items-center group py-1">
              <img 
                src="/images/logo.jpg" 
                alt="4 Seasons Right Services Logo" 
                className="h-10 w-auto max-w-[180px] object-contain"
              />
            </Link>

            <div className="flex items-center gap-3">
              <a 
                href="tel:4254665469" 
                className="bg-brand-50 text-brand-500 p-2 rounded-full border border-brand-200"
                aria-label="Call Now"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-700 hover:text-brand-500 p-2 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-2xl transition-all">
            <div className="flex flex-col space-y-4 font-semibold text-slate-700">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 ${isActive('/') ? 'text-brand-500 font-bold' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 ${isActive('/about') ? 'text-brand-500 font-bold' : ''}`}
              >
                About Us
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="w-full flex justify-between items-center py-1.5 text-left focus:outline-none"
                >
                  <span>Our Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-brand-500' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-brand-200 text-sm font-normal">
                    {servicesData.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-slate-600 hover:text-brand-500"
                      >
                        {service.title}
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-brand-500 font-semibold"
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 ${isActive('/gallery') ? 'text-brand-500 font-bold' : ''}`}
              >
                Gallery
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 ${isActive('/blog') ? 'text-brand-500 font-bold' : ''}`}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 ${isActive('/contact') ? 'text-brand-500 font-bold' : ''}`}
              >
                Contact Us
              </Link>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                <a 
                  href="tel:4254665469"
                  className="text-center font-bold text-slate-800 py-2 rounded-xl bg-slate-100 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-brand-500" />
                  <span>Call (425) 466-5469</span>
                </a>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-brand-500 text-white font-bold py-3 rounded-full shadow-glow uppercase text-xs tracking-wider"
                >
                  Book Free Estimate
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
