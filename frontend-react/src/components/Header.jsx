import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, Award, Clock, Calendar, GraduationCap } from 'lucide-react';
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
    { to: '/about', label: 'About Us' },
    { to: '/academics', label: 'All 17 Classes' },
    { to: '/admissions', label: 'Admissions & Fees' },
    { to: '/student-life', label: 'Campus Life' },
    { to: '/news', label: 'Board Gazette' },
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
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90 text-slate-800'
            : 'bg-white text-slate-800 border-b border-slate-200/90'
        }`}
      >
        {/* TOP INSTITUTIONAL UTILITY STRIP */}
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-50/90 text-slate-700 text-[11px] py-1.5 px-4 sm:px-8 border-b border-blue-100 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <Award size={13} className="text-blue-600" />
                <span className="font-semibold text-blue-900">{general.affiliation || 'Karnataka State Board Recognized'}</span> • {general.affiliationCode || 'Code: 29050220001'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Clock size={12} className="text-blue-600" />
                {general.schoolHours || '08:30 AM – 03:45 PM'}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <a 
                href={`tel:${general.phone || '+911234567890'}`} 
                className="flex items-center gap-1.5 hover:text-blue-600 text-slate-700 transition-colors font-medium"
              >
                <Phone size={11} className="text-blue-600" />
                <span>{general.phone || '(+91) 12345 67890'}</span>
              </a>
              <span className="text-slate-300">•</span>
              <a 
                href={`mailto:${general.email || 'info@theageschool.edu'}`} 
                className="flex items-center gap-1.5 hover:text-blue-600 text-slate-700 transition-colors font-medium"
              >
                <Mail size={11} className="text-blue-600" />
                <span>{general.email || 'info@theageschool.edu'}</span>
              </a>
              <span className="text-slate-300">•</span>
              
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-white font-bold hover:bg-amber-600 transition-all px-3 py-0.5 rounded-full bg-amber-500 text-[11px] cursor-pointer shadow-2xs"
              >
                <Calendar size={11} />
                <span>Book Campus Tour</span>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* LOGO & INSTITUTIONAL TITLE */}
          <Link to="/home" className="flex items-center gap-3.5 group shrink-0">
            <img
              src={logo}
              alt="The Age School Crest"
              className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-xl border border-blue-100 shadow-xs group-hover:scale-105 transition-all duration-300 bg-white p-0.5"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-serif font-bold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                {general.schoolName || 'The Age School'}
              </span>
              <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-blue-600">
                Basavakalyan • Karnataka • Estd. 2012
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'text-blue-700 bg-blue-50 font-bold border border-blue-200/80 shadow-2xs'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Call icon on mobile */}
            <a
              href={`tel:${general.phone || '+911234567890'}`}
              className="sm:hidden w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 active:scale-95 transition-all"
              title="Call School Desk"
              aria-label="Call School Desk"
            >
              <Phone size={14} />
            </a>

            {/* Quick Consultation CTA */}
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="btn-secondary text-xs font-semibold hidden sm:inline-flex py-2 px-3.5"
            >
              <Calendar size={13} className="text-blue-600" />
              <span>Tour Campus</span>
            </button>

            {/* Desktop Apply CTA */}
            <Link
              to="/admissions"
              className="btn-primary text-xs font-bold hidden sm:inline-flex py-2 px-4.5"
            >
              <GraduationCap size={15} />
              <span>Apply Now</span>
              <ArrowRight size={13} />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-5 shadow-2xl animate-in slide-in-from-top-1 duration-150">
            <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Award size={14} className="text-blue-600" />
                {general.affiliation || 'Karnataka State Board'}
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                Admissions Open 2026-27
              </span>
            </div>

            <div className="grid grid-cols-1 divide-y divide-slate-100 mb-5">
              {navLinks.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3 text-sm font-semibold flex items-center justify-between transition-colors ${
                      active ? 'text-blue-700 font-bold bg-blue-50 px-3 rounded-lg' : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2">
                <Link
                  to="/admissions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 btn-primary py-3 text-xs text-center justify-center font-bold"
                >
                  <GraduationCap size={15} />
                  <span>Apply for Admission</span>
                </Link>
                <a
                  href={`tel:${general.phone || '+911234567890'}`}
                  className="btn-secondary py-3 px-4 text-xs text-center justify-center"
                >
                  <Phone size={14} className="text-blue-600" />
                  <span>Call</span>
                </a>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsInquiryModalOpen(true);
                }}
                className="btn-gold w-full py-2.5 text-xs text-center justify-center font-bold"
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
