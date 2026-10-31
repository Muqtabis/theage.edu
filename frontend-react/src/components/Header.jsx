import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
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
    { to: '/academics', label: 'Academics' },
    { to: '/admissions', label: 'Admissions' },
    { to: '/student-life', label: 'Campus Life' },
    { to: '/news', label: 'Dispatches & Events' },
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
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-b border-slate-200/90 py-3'
          : 'bg-white border-b border-slate-200/80 py-4'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* LOGO & INSTITUTIONAL TITLE */}
        <Link to="/home" className="flex items-center gap-3.5 group shrink-0">
          <img
            src={logo}
            alt="The Age School Crest"
            className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-sm border border-slate-200 shadow-2xs group-hover:opacity-95 transition-opacity"
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-bold text-[#0b192c] tracking-tight group-hover:text-[#1e3e62] transition-colors leading-tight">
              {general.schoolName || 'The Age School'}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Basavakalyan • Karnataka
            </span>
          </div>
        </Link>

        {/* REFINED EDITORIAL NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
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

        {/* DIGNIFIED CALL TO ACTION */}
        <div className="flex items-center gap-4">
          <Link
            to="/admissions"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase text-white bg-[#0b192c] hover:bg-[#1e3e62] border border-[#0b192c] transition-colors shadow-2xs"
          >
            <span>Inquire & Apply</span>
            <ArrowRight size={13} className="text-[#c5a880]" />
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-950 rounded-sm hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col divide-y divide-slate-100 mb-6">
            {navLinks.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3.5 text-sm font-semibold tracking-wide flex items-center justify-between ${
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
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0b192c] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs"
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
