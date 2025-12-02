import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle } from 'lucide-react';
import logo from '../assets/theagelogo.jpg';

const Header = () => {
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  const NavLink = ({ page, children, isButton = false }) => {
    const isActive =
      location.pathname === `/${page}` ||
      (page === 'home' && location.pathname === '/');

    if (isButton) {
      return (
        <Link
          to={`/${page}`}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-full shadow-sm 
                     hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-sm whitespace-nowrap"
        >
          <UserCircle size={18} />
          {children}
        </Link>
      );
    }

    return (
      <Link
        to={`/${page}`}
        className={`relative font-medium text-sm tracking-wide transition-colors duration-300 group whitespace-nowrap ${
          isActive ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-600'
        }`}
      >
        {children}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 rounded-full transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </Link>
    );
  };

  const MobileNavLink = ({ page, children, isButton = false }) => {
    const closeMenu = () => setIsMobileMenuOpen(false);

    if (isButton) {
      return (
        <Link
          to={`/${page}`}
          onClick={closeMenu}
          className="block w-full px-6 py-4 mt-4 bg-indigo-600 text-white text-center font-bold rounded-xl shadow-md"
        >
          {children}
        </Link>
      );
    }

    return (
      <Link
        to={`/${page}`}
        onClick={closeMenu}
        className="block px-6 py-3 text-lg font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border-l-4 border-transparent hover:border-indigo-500 transition-all"
      >
        {children}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-gray-200' : 'bg-white py-4 border-transparent'
      }`}
    >
      <nav className="w-full max-w-[1280px] mx-auto px-4 flex items-center justify-between">
        
        {/* LEFT — LOGO */}
        <div className="flex items-center justify-start lg:w-[280px] flex-shrink-0">
          <Link to="/home" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="The Age School Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
            {/* MATCHING FOOTER FONT STYLE */}
            <span className="text-xl md:text-2xl font-serif font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors whitespace-nowrap">
              The Age School
            </span>
          </Link>
        </div>

        {/* CENTER — NAV LINKS */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-8">
          <NavLink page="home">Home</NavLink>
          <NavLink page="about">About Us</NavLink>
          <NavLink page="academics">Academics</NavLink>
          <NavLink page="admissions">Admissions</NavLink>
          <NavLink page="student-life">Campus Life</NavLink>
          <NavLink page="news">News</NavLink>
          <NavLink page="contact">Contact</NavLink>
        </div>

        {/* RIGHT — PORTAL + MOBILE MENU */}
        <div className="flex items-center justify-end lg:w-[280px] gap-4 flex-shrink-0">
          <div className="hidden lg:block">
            <NavLink page="portal" isButton={true}>
              School Portal
            </NavLink>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            className="lg:hidden p-2 text-gray-600 focus:outline-none hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 flex flex-col p-4">
          <MobileNavLink page="home">Home</MobileNavLink>
          <MobileNavLink page="about">About Us</MobileNavLink>
          <MobileNavLink page="academics">Academics</MobileNavLink>
          <MobileNavLink page="admissions">Admissions</MobileNavLink>
          <MobileNavLink page="student-life">Campus Life</MobileNavLink>
          <MobileNavLink page="news">News & Events</MobileNavLink>
          <MobileNavLink page="contact">Contact</MobileNavLink>
          <MobileNavLink page="portal" isButton={true}>
            Access Portal
          </MobileNavLink>
        </div>
      )}
    </header>
  );
};

export default Header;