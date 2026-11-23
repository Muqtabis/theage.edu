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
  Shield 
} from 'lucide-react';
import logo from '../assets/theagelogo.jpg';
import { useSiteContent } from '../context/ContentContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();
  const general = content?.general || {};

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 font-sans relative">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* COLUMN 1: Masthead & Crest */}
          <div className="space-y-4">
            <Link to="/home" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="The Age School Crest" 
                className="h-10 w-10 object-contain rounded-lg border border-slate-800 bg-white group-hover:border-slate-700 transition-colors" 
              /> 
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight leading-tight">
                  {general.schoolName || 'The Age School'}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                  Basavakalyan • Karnataka
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-xs leading-relaxed">
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
            <h4 className="font-semibold text-white mb-4 text-xs uppercase tracking-wider">
              Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/home" className="hover:text-white transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Our Vision & Faculty</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">All 17 Classes & Curriculum</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions & Fee Schedule</Link></li>
              <li><Link to="/student-life" className="hover:text-white transition-colors">Campus Life & Houses</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Gazette & Notifications</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: Administrative Desk */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-xs uppercase tracking-wider">
              Campus Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-blue-400 shrink-0" />
                <span>{general.address || 'Basavakalyan, Bidar Dist., Karnataka, India - 585327'}</span>
              </li>
              <li>
                <a href={`tel:${general.phone || '+911234567890'}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone size={15} className="text-blue-400 shrink-0" />
                  <span>{general.phone || '(+91) 12345 67890'}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${general.email || 'info@theageschool.edu'}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail size={15} className="text-blue-400 shrink-0" />
                  <span>{general.email || 'info@theageschool.edu'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Recognition & Affiliation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white mb-2 text-xs uppercase tracking-wider">
              Recognition
            </h4>
            
            <div className="bg-slate-900 p-4 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-blue-400 uppercase tracking-wider font-semibold block mb-1">
                Official Affiliation
              </span>
              <p className="text-xs font-semibold text-white">
                {general.affiliation || 'Department of School Education, Karnataka'}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                {general.affiliationCode || 'Code: 29050220001'}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Karnataka State Board recognized institution preparing scholars for SSLC and Pre-University examinations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} {general.schoolName || 'The Age School'}. All rights reserved.</p>
          <div className="flex gap-5 items-center">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Inquiries</Link>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <Link to="/admissions" className="hover:text-slate-300 transition-colors">Admissions 2026-27</Link>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <Link 
              to="/login" 
              className="hover:text-slate-300 transition-colors flex items-center gap-1.5 text-slate-500"
              title="Authorized Personnel Access"
            >
              <Shield size={12} />
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
    className="w-8 h-8 rounded-md bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center transition-colors hover:text-white hover:border-slate-700"
  >
    {icon}
  </a>
);

export default Footer;
