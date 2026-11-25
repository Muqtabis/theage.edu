import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, Award, Clock, Calendar } from 'lucide-react';
import logo from '../assets/theagelogo.jpg';
import { useSiteContent } from '../context/ContentContext';
import QuickInquiryModal from './QuickInquiryModal';

const Header = () => {
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const location = useLocation();
  const { content } = useSiteContent();
  const general = content?.general || {};

  const updateHeaderHeight = () => {
    if (headerRef.current) {
      const h = headerRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height', `${Math.ceil(h)}px`);
    }
  };

  useEffect(() => {
    updateHeaderHeight();
    const handleResize = () => updateHeaderHeight();
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
      requestAnimationFrame(updateHeaderHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    updateHeaderHeight();
  }, [isMobileMenuOpen, location.pathname]);

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/academics', label: 'Academics & Classes' },
    { to: '/admissions', label: 'Admissions' },
    { to: '/student-life', label: 'Campus Life' },
    { to: '/news', label: 'Gazette & News' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80'
            : 'bg-white border-b border-slate-200/80'
        }`}
      >
        {/* MINIMALIST TOP UTILITY BAR */}
        <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Award size={13} className="text-blue-400" />
                {general.affiliation || 'Karnataka State Board Recognized'} • {general.affiliationCode || 'Code: 29050220001'}
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock size={12} className="text-slate-400" />
                {general.schoolHours || '08:30 AM – 03:45 PM'}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <a 
                href={`tel:${general.phone || '+911234567890'}`} 
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone size={11} className="text-blue-400" />
                <span>{general.phone || '(+91) 12345 67890'}</span>
              </a>
              <span className="text-slate-700">•</span>
              <a 
                href={`mailto:${general.email || 'info@theageschool.edu'}`} 
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail size={11} className="text-blue-400" />
                <span>{general.email || 'info@theageschool.edu'}</span>
              </a>
              <span className="text-slate-700">•</span>
              
              {/* Quick Inquiry modal button */}
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-white font-medium hover:bg-blue-500 transition-colors px-2.5 py-0.5 rounded-full bg-blue-600 text-[10px] cursor-pointer"
              >
                <Calendar size={11} />
                <span>Book Campus Tour</span>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* LOGO & INSTITUTIONAL TITLE */}
          <Link to="/home" className="flex items-center gap-3 group shrink-0">
            <img
              src={logo}
              alt="The Age School Crest"
              className="w-10 h-10 md:w-11 md:h-11 object-contain rounded-lg border border-slate-200 shadow-2xs group-hover:border-slate-400 transition-all duration-200"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight">
                {general.schoolName || 'The Age School'}
              </span>
              <span className="text-[10px] md:text-[11px] font-medium tracking-wide uppercase text-slate-500">
                Basavakalyan • Karnataka
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'text-blue-600 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Call icon on mobile */}
            <a
              href={`tel:${general.phone || '+911234567890'}`}
              className="sm:hidden w-8 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 active:bg-slate-200 transition-colors"
              title="Call School Desk"
              aria-label="Call School Desk"
            >
              <Phone size={14} />
            </a>

            {/* Quick Consultation CTA */}
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="btn-secondary text-xs font-semibold hidden sm:inline-flex cursor-pointer"
            >
              <span>Consultation</span>
            </button>

            {/* Desktop Apply CTA */}
            <Link
              to="/admissions"
              className="btn-primary text-xs font-semibold hidden sm:inline-flex"
            >
              <span>Apply Now</span>
              <ArrowRight size={13} />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 shadow-lg animate-in slide-in-from-top-1 duration-150">
            <div className="mb-3 pb-2.5 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Award size={13} className="text-blue-600" />
                {general.affiliation || 'Karnataka State Board'}
              </span>
              <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Admissions Open 2026-27
              </span>
            </div>

            <div className="grid grid-cols-1 divide-y divide-slate-100 mb-4">
              {navLinks.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2.5 text-sm font-medium flex items-center justify-between transition-colors ${
                      active ? 'text-blue-600 font-semibold bg-blue-50/60 px-2.5 rounded-md' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Link
                  to="/admissions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 btn-primary py-2.5 text-xs text-center justify-center"
                >
                  <span>Apply for Admission</span>
                </Link>
                <a
                  href={`tel:${general.phone || '+911234567890'}`}
                  className="btn-secondary py-2.5 px-3.5 text-xs text-center justify-center"
                >
                  <Phone size={13} />
                  <span>Call</span>
                </a>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsInquiryModalOpen(true);
                }}
                className="btn-secondary w-full py-2.5 text-xs text-center justify-center text-blue-600 border-blue-200 bg-blue-50/40"
              >
                <Calendar size={13} />
                <span>Book Campus Tour Consultation</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)} 
      />
    </>
  );
};

export default Header;
