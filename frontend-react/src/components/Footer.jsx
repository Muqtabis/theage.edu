import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Changed bg-white to bg-slate-900 (Dark) and text colors to white/gray
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-indigo-500">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand & Socials */}
          <div className="md:col-span-2 space-y-6">
            <Link to="/home" className="flex items-center gap-3 group">
              {/* Added brightness filter so logo pops on dark bg */}
              <img src="src/assets/theagelogo.jpg" alt="Logo" className="h-10 w-auto brightness-200 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all" /> 
              
              {/* White Text for Dark Mode */}
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                The Age School
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-sans">
              Empowering the next generation with knowledge, character, and leadership skills in the heart of Karnataka.
            </p>

            {/* Dark Mode Social Icons */}
            <div className="flex gap-4">
              <SocialIcon 
                href="https://facebook.com" 
                icon={<Facebook size={20} />} 
                colorClass="hover:text-white hover:bg-blue-600 bg-slate-800" 
              />
              <SocialIcon 
                href="https://twitter.com" 
                icon={<Twitter size={20} />} 
                colorClass="hover:text-white hover:bg-sky-500 bg-slate-800" 
              />
              <SocialIcon 
                href="https://instagram.com" 
                icon={<Instagram size={20} />} 
                colorClass="hover:text-white hover:bg-pink-600 bg-slate-800" 
              />
              <SocialIcon 
                href="https://linkedin.com" 
                icon={<Linkedin size={20} />} 
                colorClass="hover:text-white hover:bg-blue-700 bg-slate-800" 
              />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 font-sans">Explore</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-sans">
              <li><Link to="/about" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Admissions</Link></li>
              <li><Link to="/academics" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Academics</Link></li>
              <li><Link to="/campus" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Campus Life</Link></li>
            </ul>
          </div>

          {/* 3. Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 font-sans">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-sans">
              <li className="flex items-start gap-3 group">
                <div className="mt-1 text-indigo-400 group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <span>Basavakalyan, Bidar,<br />Karnataka, 585327</span>
              </li>
              <li>
                <a href="tel:+911234567890" className="flex items-center gap-3 group hover:text-white transition-colors">
                  <div className="text-indigo-400 group-hover:text-white transition-colors">
                     <Phone size={18} />
                  </div>
                  (+91) 12345 67890
                </a>
              </li>
              <li>
                <a href="mailto:info@theageschool.edu" className="flex items-center gap-3 group hover:text-white transition-colors">
                  <div className="text-indigo-400 group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  info@theageschool.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-sans">
          <p>&copy; {currentYear} The Age School. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

// Helper: Social Icon adapted for Dark Mode
const SocialIcon = ({ href, icon, colorClass }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`p-2 rounded-full text-slate-400 transition-all duration-300 ${colorClass}`}
  >
    {icon}
  </a>
);

export default Footer;