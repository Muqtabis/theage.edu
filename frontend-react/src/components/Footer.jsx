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
  Shield,
  Award 
} from 'lucide-react';
import logo from '../assets/theagelogo.jpg';
import { useSiteContent } from '../context/ContentContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();
  const general = content?.general || {};

  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-12 border-t border-slate-200 font-sans relative">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* COLUMN 1: Masthead & Crest */}
          <div className="space-y-4">
            <Link to="/home" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="The Age School Crest" 
                className="h-11 w-11 object-contain rounded-xl border border-blue-100 bg-white p-0.5 shadow-xs group-hover:scale-105 transition-transform" 
              /> 
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                  {general.schoolName || 'The Age School'}
                </span>
                <span className="text-[10px] text-blue-600 uppercase tracking-widest font-bold">
                  Basavakalyan • Karnataka
                </span>
              </div>
            </Link>
            
            <p className="text-slate-500 text-xs leading-relaxed font-sans">
              {general.tagline || 'Cultivating intellectual clarity, disciplined moral conviction, and leadership in the heart of Karnataka.'}
            </p>

            <div className="flex gap-2 pt-2">
              <SocialLink href={general.socialFacebook || "https://facebook.com"} icon={<Facebook size={14} />} />
              <SocialLink href={general.socialTwitter || "https://twitter.com"} icon={<Twitter size={14} />} />
              <SocialLink href={general.socialInstagram || "https://instagram.com"} icon={<Instagram size={14} />} />
              <SocialLink href={general.socialLinkedin || "https://linkedin.com"} icon={<Linkedin size={14} />} />
            </div>
          </div>

          {/* COLUMN 2: Directory */}
          <div>
            <h4 className="font-serif font-semibold text-slate-900 mb-4 text-sm tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Academic Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><Link to="/home" className="hover:text-blue-600 transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Our Vision & Faculty</Link></li>
              <li><Link to="/academics" className="hover:text-blue-600 transition-colors">All 17 Classes & Curriculum</Link></li>
              <li><Link to="/admissions" className="hover:text-blue-600 transition-colors">Admissions & Fee Schedule</Link></li>
              <li><Link to="/student-life" className="hover:text-blue-600 transition-colors">Campus Life & Houses</Link></li>
              <li><Link to="/news" className="hover:text-blue-600 transition-colors">Gazette & Notifications</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: Administrative Desk */}
          <div>
            <h4 className="font-serif font-semibold text-slate-900 mb-4 text-sm tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Campus Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-blue-600 shrink-0" />
                <span>{general.address || 'Basavakalyan, Bidar Dist., Karnataka, India - 585327'}</span>
              </li>
              <li>
                <a href={`tel:${general.phone || '+911234567890'}`} className="flex items-center gap-2.5 hover:text-blue-600 transition-colors">
                  <Phone size={15} className="text-blue-600 shrink-0" />
                  <span>{general.phone || '(+91) 12345 67890'}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${general.email || 'info@theageschool.edu'}`} className="flex items-center gap-2.5 hover:text-blue-600 transition-colors">
                  <Mail size={15} className="text-blue-600 shrink-0" />
                  <span>{general.email || 'info@theageschool.edu'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Recognition & Affiliation */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-slate-900 mb-2 text-sm tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Institutional Accreditation
            </h4>
            
            <div className="bg-white p-4 border border-blue-200/80 rounded-2xl shadow-xs">
              <span className="text-[10px] text-blue-700 uppercase tracking-wider font-bold block mb-1">
                Official Recognition
              </span>
              <p className="text-xs font-bold text-slate-900">
                {general.affiliation || 'Department of School Education, Karnataka'}
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">
                {general.affiliationCode || 'Code: 29050220001'}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Karnataka State Board recognized institution preparing scholars for SSLC and Pre-University examinations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} {general.schoolName || 'The Age School'}. All rights reserved.</p>
          <div className="flex gap-5 items-center">
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Inquiries</Link>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <Link to="/admissions" className="hover:text-blue-600 transition-colors">Admissions 2026-27</Link>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <Link 
              to="/login" 
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-500"
              title="Authorized Personnel Access"
            >
              <Shield size={12} className="text-blue-600" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center transition-all hover:text-white hover:bg-blue-600 hover:border-blue-600 shadow-2xs"
  >
    {icon}
  </a>
);

export default Footer;
