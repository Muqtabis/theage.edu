import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, Award, Clock } from 'lucide-react';
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
    { to: '/about', label: 'About School' },
    { to: '/academics', label: 'Classes & Academics' },
    { to: '/admissions', label: 'Admissions & Fees' },
    { to: '/student-life', label: 'Campus Life' },
    { to: '/news', label: 'Circulars & Gazette' },
    { to: '/contact', label: 'Contact Us' },
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
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.08)] border-b border-slate-200'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      {/* TOP UTILITY BAR (Official Institutional Details) */}
      <div className="bg-[#0b192c] text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-[#c5a880]/30 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Award size={13} className="text-[#c5a880]" />
              {general.affiliation || 'Karnataka State Board Recognized'} • {general.affiliationCode || 'Code: 29050220001'}
            </span>
            <span className="text-[#c5a880]/50">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#c5a880]" />
              {general.schoolHours || '08:30 AM – 03:45 PM'}
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-300">
            <a 
              href={`tel:${general.phone || '+911234567890'}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={11} className="text-[#c5a880]" />
              <span>{general.phone || '(+91) 12345 67890'}</span>
            </a>
            <span className="text-[#c5a880]/50">•</span>
            <a 
              href={`mailto:${general.email || 'info@theageschool.edu'}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={11} className="text-[#c5a880]" />
              <span>{general.email || 'info@theageschool.edu'}</span>
            </a>
            <span className="text-[#c5a880]/50">•</span>
            <Link 
              to="/admissions" 
              className="text-[#c5a880] font-semibold hover:underline"
            >
              Admissions Open 2026-27
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN MASTHEAD */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* LOGO & INSTITUTIONAL TITLE */}
        <Link to="/home" className="flex items-center gap-3.5 group shrink-0">
          <img
            src={logo}
            alt="The Age School Crest"
            className="w-11 h-11 md:w-13 md:h-13 object-contain rounded-xs border border-slate-200 shadow-2xs group-hover:opacity-95 transition-opacity"
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-bold text-[#0b192c] tracking-tight group-hover:text-[#1e3e62] transition-colors leading-tight">
              {general.schoolName || 'The Age School'}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c7355]">
              Basavakalyan • Karnataka • Est. {general.establishedYear || '2012'}
            </span>
          </div>
        </Link>

        {/* REFINED EDITORIAL NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-1 text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap ${
                  active
                    ? 'text-[#0b192c] font-bold'
                    : 'text-slate-600 hover:text-[#0b192c]'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c5a880]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CALL TO ACTION */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/admissions"
            className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xs text-xs font-bold tracking-wider uppercase text-white bg-[#0b192c] hover:bg-[#1e3e62] border border-[#0b192c] transition-colors shadow-2xs"
          >
            <span>Inquire & Apply</span>
            <ArrowRight size={13} className="text-[#c5a880]" />
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-950 rounded-xs hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="mb-4 pb-3 border-b border-slate-100 flex flex-col gap-1 text-xs text-slate-600">
            <span className="font-semibold text-[#0b192c] flex items-center gap-1.5">
              <Award size={13} className="text-[#c5a880]" />
              {general.affiliation || 'State Board Recognized'} ({general.affiliationCode || 'Code: 29050220001'})
            </span>
            <span className="text-slate-500">{general.schoolHours || 'Mon-Fri: 8:30 AM – 3:45 PM | Sat: 8:30 AM – 12:30 PM'}</span>
          </div>

          <div className="flex flex-col divide-y divide-slate-100 mb-6">
            {navLinks.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 text-sm font-semibold tracking-wide flex items-center justify-between ${
                    active ? 'text-[#0b192c] font-bold' : 'text-slate-600'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />}
                </Link>
              );
            })}
          </div>

          <Link
            to="/admissions"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0b192c] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow-xs"
          >
            <span>Inquire for Admissions</span>
            <ArrowRight size={14} className="text-[#c5a880]" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
