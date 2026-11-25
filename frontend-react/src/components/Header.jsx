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
            ? 'bg-[#0b192c]/95 backdrop-blur-md shadow-lg border-b border-[#c5a880]/30 text-white'
            : 'bg-[#0b192c] text-white border-b border-slate-800'
        }`}
      >
        {/* TOP INSTITUTIONAL UTILITY STRIP */}
        <div className="bg-[#071322] text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Award size={13} className="text-[#c5a880]" />
                {general.affiliation || 'Karnataka State Board Recognized'} • {general.affiliationCode || 'Code: 29050220001'}
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock size={12} className="text-[#c5a880]" />
                {general.schoolHours || '08:30 AM – 03:45 PM'}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <a 
                href={`tel:${general.phone || '+911234567890'}`} 
                className="flex items-center gap-1.5 hover:text-[#c5a880] transition-colors"
              >
                <Phone size={11} className="text-[#c5a880]" />
                <span>{general.phone || '(+91) 12345 67890'}</span>
              </a>
              <span className="text-slate-700">•</span>
              <a 
                href={`mailto:${general.email || 'info@theageschool.edu'}`} 
                className="flex items-center gap-1.5 hover:text-[#c5a880] transition-colors"
              >
                <Mail size={11} className="text-[#c5a880]" />
                <span>{general.email || 'info@theageschool.edu'}</span>
              </a>
              <span className="text-slate-700">•</span>
              
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[#071322] font-bold hover:brightness-110 transition-all px-2.5 py-0.5 rounded-full bg-[#c5a880] text-[10px] cursor-pointer"
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
          <Link to="/home" className="flex items-center gap-3.5 group shrink-0">
            <img
              src={logo}
              alt="The Age School Crest"
              className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-lg border-2 border-[#c5a880]/50 shadow-sm group-hover:scale-105 transition-all duration-300 bg-white"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-serif font-bold text-white tracking-tight leading-tight group-hover:text-[#c5a880] transition-colors">
                {general.schoolName || 'The Age School'}
              </span>
              <span className="text-[10px] md:text-[11px] font-semibold tracking-widest uppercase text-[#c5a880]">
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
                      ? 'text-[#c5a880] bg-white/10 font-bold border border-[#c5a880]/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
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
              className="sm:hidden w-8 h-8 rounded-md bg-white/10 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] active:scale-95 transition-all"
              title="Call School Desk"
              aria-label="Call School Desk"
            >
              <Phone size={14} />
            </a>

            {/* Quick Consultation CTA */}
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="btn-glass text-xs font-semibold hidden sm:inline-flex py-2 px-3.5"
            >
              <Calendar size={13} className="text-[#c5a880]" />
              <span>Tour Campus</span>
            </button>

            {/* Desktop Apply CTA */}
            <Link
              to="/admissions"
              className="btn-gold text-xs font-bold hidden sm:inline-flex py-2 px-4.5"
            >
              <GraduationCap size={15} />
              <span>Apply Now</span>
              <ArrowRight size={13} />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#071322] border-b border-[#c5a880]/30 px-5 py-5 shadow-2xl animate-in slide-in-from-top-1 duration-150">
            <div className="mb-4 pb-3 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Award size={14} className="text-[#c5a880]" />
                {general.affiliation || 'Karnataka State Board'}
              </span>
              <span className="text-[10px] font-bold text-[#071322] bg-[#c5a880] px-2.5 py-0.5 rounded-full">
                Admissions Open 2026-27
              </span>
            </div>

            <div className="grid grid-cols-1 divide-y divide-slate-800/80 mb-5">
              {navLinks.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3 text-sm font-semibold flex items-center justify-between transition-colors ${
                      active ? 'text-[#c5a880] font-bold bg-white/5 px-3 rounded-lg' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2">
                <Link
                  to="/admissions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 btn-gold py-3 text-xs text-center justify-center font-bold"
                >
                  <GraduationCap size={15} />
                  <span>Apply for Admission</span>
                </Link>
                <a
                  href={`tel:${general.phone || '+911234567890'}`}
                  className="btn-glass py-3 px-4 text-xs text-center justify-center"
                >
                  <Phone size={14} />
                  <span>Call</span>
                </a>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsInquiryModalOpen(true);
                }}
                className="btn-glass w-full py-2.5 text-xs text-center justify-center text-[#c5a880] border-[#c5a880]/40"
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
