import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-indigo-100 pt-16 pb-8 border-t border-indigo-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Column 1: Brand and Contact */}
          <div className="space-y-5">
            <Link to="/home" className="flex items-center space-x-3 group">
              {/* Your Logo */}
              <img src="src\assets\theagelogo.jpg" alt="The Age School Logo" className="h-10 w-auto" /> 
              <span className="text-2xl font-bold text-white tracking-tighter">The Age School</span>
            </Link>
            <p className="text-indigo-300 text-sm leading-relaxed">
            </p>
            
            <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 text-indigo-300">
                    <MapPin size={16} className="mt-0.5 text-teal-500 flex-shrink-0" />
                    <span>Basavakalyan, Bidar, Karnataka, 585327</span>
                </div>
                <a href="tel:+911234567890" className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors">
                    <Phone size={16} className="text-pink-500" /> (+91) 12345 67890
                </a>
                <a href="mailto:info@theageschool.edu" className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors">
                    <Mail size={16} className="text-teal-500" /> info@theageschool.edu
                </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-teal-500 rounded-full"></span>
                Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-teal-400 transition-colors">Admissions</Link></li>
              <li><Link to="/academics" className="hover:text-teal-400 transition-colors">Academics</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
                Follow Us
            </h4>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/theageschool/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 hover:bg-sky-500 hover:text-white transition-all duration-300 hover:-translate-y-0.5" 
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.instagram.com/theageschool?igsh=dmJ6M2Z5dTQxY3M1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 hover:bg-pink-600 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/the-age-school-92109a255" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 hover:bg-blue-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-indigo-900 pt-6 text-center text-indigo-400 text-sm">
          <p>&copy; {new Date().getFullYear()} The Age School. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;