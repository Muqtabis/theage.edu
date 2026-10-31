import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
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
    { to: '/academics', label: 'Academics' },
    { to: '/admissions', label: 'Admissions' },
    { to: '/student-life', label: 'Campus Life' },
    { to: '/news', label: 'News & Events' },
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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO & BRAND */}
        <Link to="/home" className="flex items-center gap-3.5 group flex-shrink-0">
          <div className="relative">
            <img
              src={logo}
              alt="The Age School"
              className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -inset-1 rounded-xl bg-indigo-500/10 -z-10 blur-sm group-hover:bg-indigo-500/20 transition-all" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-serif group-hover:text-indigo-600 transition-colors">
              {general.schoolName || 'The Age School'}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 -mt-1 hidden sm:block">
              Basavakalyan • Karnataka
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-3.5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                  active
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE: PROFESSIONAL "APPLY NOW" CTA (ADMIN PORTAL IS HIDDEN AS REQUESTED) */}
        <div className="flex items-center gap-3">
          <Link
            to="/admissions"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-slate-900 hover:bg-indigo-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Sparkles size={15} className="text-amber-400" />
            <span>Apply Now</span>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-white" />
          </Link>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl px-5 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 mb-5">
            {navLinks.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Link
            to="/admissions"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            <Sparkles size={16} className="text-amber-300" />
            <span>Apply for Admission</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
