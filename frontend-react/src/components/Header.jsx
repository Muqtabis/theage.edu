import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, Award, Clock, GraduationCap } from 'lucide-react';
import logo from '../assets/theagelogo.jpg';
import { useSiteContent } from '../context/ContentContext';

const Header = () => {
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      setScrolled(window.scrollY > 20);
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
    { to: '/news', label: 'Circulars & Gazette' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      {/* VIBRANT TOP ACCENT LINE (Educational spectrum) */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-amber-400 via-emerald-500 to-rose-500" />

      {/* TOP UTILITY BAR (Official Institutional Details) */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-blue-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-blue-100">
              <Award size={13} className="text-amber-400" />
              {general.affiliation || 'Karnataka State Board Recognized'} • {general.affiliationCode || 'Code: 29050220001'}
            </span>
            <span className="text-blue-300/40">•</span>
            <span className="flex items-center gap-1.5 text-blue-200">
              <Clock size={12} className="text-amber-400" />
              {general.schoolHours || '08:30 AM – 03:45 PM'}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a 
              href={`tel:${general.phone || '+911234567890'}`} 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors group"
            >
              <Phone size={11} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{general.phone || '(+91) 12345 67890'}</span>
            </a>
            <span className="text-blue-300/40">•</span>
            <a 
              href={`mailto:${general.email || 'info@theageschool.edu'}`} 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors group"
            >
              <Mail size={11} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{general.email || 'info@theageschool.edu'}</span>
            </a>
            <span className="text-blue-300/40">•</span>
            <Link 
              to="/admissions" 
              className="inline-flex items-center gap-1.5 text-slate-950 font-extrabold hover:brightness-110 transition-all px-3 py-0.5 rounded-full bg-amber-400 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping inline-block" />
              <span>Admissions Open 2026-27</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* LOGO & TITLE */}
        <Link to="/home" className="flex items-center gap-3 group shrink-0">
          <div className="relative">
            <img
              src={logo}
              alt="The Age School Crest"
              className="w-11 h-11 md:w-13 md:h-13 object-contain rounded-lg border-2 border-amber-400/40 shadow-xs group-hover:border-blue-600 group-hover:scale-105 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-bold text-blue-950 tracking-tight group-hover:text-blue-700 transition-colors leading-tight">
              {general.schoolName || 'The Age School'}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-600">
              Basavakalyan • Karnataka • Est. {general.establishedYear || '2012'}
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
                className={`px-3.5 py-2 rounded-lg text-[13px] font-bold tracking-tight transition-all duration-200 whitespace-nowrap ${
                  active
                    ? 'text-blue-700 bg-blue-50 border border-blue-200/80 shadow-xs'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Call on mobile */}
          <a
            href={`tel:${general.phone || '+911234567890'}`}
            className="sm:hidden w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 active:scale-95"
            title="Call School Desk"
            aria-label="Call School Desk"
          >
            <Phone size={16} />
          </a>

          {/* Desktop Apply CTA */}
          <Link
            to="/admissions"
            className="shimmer-btn btn-amber hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wide uppercase transition-all duration-300"
          >
            <GraduationCap size={15} />
            <span>Apply Now</span>
            <ArrowRight size={13} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="mb-3 pb-2.5 border-b border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <Award size={14} className="text-amber-500" />
              {general.affiliation || 'Karnataka State Board'}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Admissions Open
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
                  className={`py-2.5 text-sm font-bold flex items-center justify-between transition-colors ${
                    active ? 'text-blue-700 font-extrabold bg-blue-50/60 px-3 rounded-md' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </Link>
              );
            })}
          </div>

          <div className="flex gap-2">
            <Link
              to="/admissions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3 btn-amber text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-md"
            >
              <GraduationCap size={16} />
              <span>Inquire / Apply</span>
            </Link>
            <a
              href={`tel:${general.phone || '+911234567890'}`}
              className="flex items-center justify-center gap-1 px-4 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold"
            >
              <Phone size={14} />
              <span>Call</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
