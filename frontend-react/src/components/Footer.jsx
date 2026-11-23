import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  Shield, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import logo from '../assets/theagelogo.jpg';
import { useSiteContent } from '../context/ContentContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();
  const general = content?.general || {};

  return (
    <footer className="bg-gradient-to-b from-blue-950 via-slate-950 to-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t-2 border-amber-400/40 font-sans relative overflow-hidden">
      {/* Educational spectrum accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 via-emerald-400 to-rose-500" />

      <div className="container mx-auto px-4 sm:px-8 max-w-7xl relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* COLUMN 1: Masthead & Crest */}
          <div className="space-y-4">
            <Link to="/home" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="The Age School Crest" 
                className="h-12 w-12 object-contain rounded-xl border-2 border-amber-400/60 bg-white shadow-md group-hover:scale-105 transition-transform" 
              /> 
              <div className="flex flex-col">
                <span className="text-xl font-serif font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {general.schoolName || 'The Age School'}
                </span>
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-black">
                  Basavakalyan • Karnataka
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              {general.tagline || 'Cultivating intellectual clarity, disciplined moral conviction, and leadership in the heart of Karnataka.'}
            </p>

            <div className="flex gap-2 pt-2">
              <SocialLink href={general.socialFacebook || "https://facebook.com"} icon={<Facebook size={15} />} hoverColor="hover:bg-blue-600 hover:text-white hover:border-blue-500" />
              <SocialLink href={general.socialTwitter || "https://twitter.com"} icon={<Twitter size={15} />} hoverColor="hover:bg-sky-500 hover:text-white hover:border-sky-400" />
              <SocialLink href={general.socialInstagram || "https://instagram.com"} icon={<Instagram size={15} />} hoverColor="hover:bg-pink-600 hover:text-white hover:border-pink-500" />
              <SocialLink href={general.socialLinkedin || "https://linkedin.com"} icon={<Linkedin size={15} />} hoverColor="hover:bg-blue-700 hover:text-white hover:border-blue-600" />
            </div>
          </div>

          {/* COLUMN 2: Directory */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Institutional Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link to="/home" className="hover:text-amber-300 transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-amber-300 transition-colors">About Our Vision & Mentors</Link></li>
              <li><Link to="/academics" className="hover:text-amber-300 transition-colors">All 17 Classes & Syllabi</Link></li>
              <li><Link to="/admissions" className="hover:text-amber-300 transition-colors">Admissions & Fee Schedule</Link></li>
              <li><Link to="/student-life" className="hover:text-amber-300 transition-colors">Campus Life & The Four Houses</Link></li>
              <li><Link to="/news" className="hover:text-amber-300 transition-colors">Circulars, News & Board Gazette</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: Administrative Desk */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Administrative Desk
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 text-amber-400 shrink-0" />
                <span>{general.address || 'Basavakalyan, Bidar Dist., Karnataka, India - 585327'}</span>
              </li>
              <li>
                <a href={`tel:${general.phone || '+911234567890'}`} className="flex items-center gap-2.5 hover:text-amber-300 transition-colors font-medium">
                  <Phone size={16} className="text-amber-400 shrink-0" />
                  <span>{general.phone || '(+91) 12345 67890'}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${general.email || 'info@theageschool.edu'}`} className="flex items-center gap-2.5 hover:text-amber-300 transition-colors font-medium">
                  <Mail size={16} className="text-amber-400 shrink-0" />
                  <span>{general.email || 'info@theageschool.edu'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Recognition & Affiliation */}
          <div className="space-y-4">
            <h4 className="font-bold text-white mb-2 text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Board Accreditation
            </h4>
            
            <div className="bg-blue-900/40 p-4 border-2 border-blue-700/60 rounded-xl hover:border-amber-400/80 transition-colors shadow-sm">
              <span className="text-[10px] text-amber-300 uppercase tracking-wider font-black block mb-1">
                Official Recognition
              </span>
              <p className="text-xs font-bold text-white">
                {general.affiliation || 'Department of School Education, Karnataka'}
              </p>
              <p className="text-[11px] text-blue-200 font-mono mt-1">
                {general.affiliationCode || 'Code: 29050220001'}
              </p>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Recognized K-12 institution preparing scholars for State SSLC and PUC Examinations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} {general.schoolName || 'The Age School'}. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link to="/contact" className="hover:text-amber-300 transition-colors">Campus Inquiries</Link>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <Link to="/admissions" className="hover:text-amber-300 transition-colors">Admissions 2026-27</Link>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            {/* Discreet Admin Login */}
            <Link 
              to="/login" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-500 group"
              title="Authorized Personnel Access"
            >
              <Shield size={12} className="group-hover:text-amber-400 transition-colors" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, hoverColor }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xs ${hoverColor}`}
  >
    {icon}
  </a>
);

export default Footer;
