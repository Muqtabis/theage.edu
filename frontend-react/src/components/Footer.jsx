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
  ShieldCheck, 
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
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t-2 border-indigo-500/30 font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        
        {/* Main Grid: 4 balanced columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* COLUMN 1: Brand & Identity */}
          <div className="space-y-5">
            <Link to="/home" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-11 w-11 object-contain rounded-xl brightness-110 group-hover:scale-105 transition-transform" 
              /> 
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-white tracking-tight">
                  {general.schoolName || 'The Age School'}
                </span>
                <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                  Karnataka, India
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              {general.tagline || 'Empowering the next generation with knowledge, character, and leadership skills in the heart of Karnataka.'}
            </p>

            <div className="flex gap-2.5 pt-2">
              <SocialIcon href={general.socialFacebook || "https://facebook.com"} icon={<Facebook size={16} />} colorClass="hover:bg-blue-600" />
              <SocialIcon href={general.socialTwitter || "https://twitter.com"} icon={<Twitter size={16} />} colorClass="hover:bg-sky-500" />
              <SocialIcon href={general.socialInstagram || "https://instagram.com"} icon={<Instagram size={16} />} colorClass="hover:bg-pink-600" />
              <SocialIcon href={general.socialLinkedin || "https://linkedin.com"} icon={<Linkedin size={16} />} colorClass="hover:bg-blue-700" />
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs flex items-center gap-2">
              <GraduationCap size={16} className="text-indigo-400" /> Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/home" className="hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">About Our Vision</Link></li>
              <li><Link to="/academics" className="hover:text-white hover:translate-x-1 transition-all inline-block">Curriculum & Results</Link></li>
              <li><Link to="/admissions" className="hover:text-white hover:translate-x-1 transition-all inline-block">Admissions & Fees</Link></li>
              <li><Link to="/student-life" className="hover:text-white hover:translate-x-1 transition-all inline-block">Campus Life & Gallery</Link></li>
              <li><Link to="/news" className="hover:text-white hover:translate-x-1 transition-all inline-block">News & Announcements</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">Contact Us</h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-indigo-400 shrink-0" />
                <span>{general.address || 'Basavakalyan, Bidar Dist., Karnataka, India - 585327'}</span>
              </li>
              <li>
                <a href={`tel:${general.phone || '+911234567890'}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={18} className="text-indigo-400 shrink-0" />
                  <span>{general.phone || '(+91) 12345 67890'}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${general.email || 'info@theageschool.edu'}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail size={18} className="text-indigo-400 shrink-0" />
                  <span>{general.email || 'info@theageschool.edu'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Map & Affiliation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-1 uppercase tracking-wider text-xs">Our Campus</h4>
            
            {/* Embedded Google Map */}
            <div className="w-full h-36 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md relative group">
              <iframe 
                title="School Location"
                src={general.googleMapsIframe || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.646473634086!2d76.9455!3d17.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce89ac2335f60d%3A0x286358316719266e!2sBasavakalyan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Accreditations Trust Badge */}
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="p-2 bg-indigo-500/15 rounded-lg text-indigo-400 shrink-0">
                <Award size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Affiliation</p>
                <p className="text-sm font-semibold text-white truncate">{general.affiliation || 'State Board'}</p>
                <p className="text-[11px] text-slate-400 truncate">{general.affiliationCode || 'Code: 29050220001'}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar with discreet Admin Login */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; {currentYear} {general.schoolName || 'The Age School'}. All rights reserved.</p>
          <div className="flex gap-5 items-center">
            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <Link to="/admissions" className="hover:text-white transition-colors">Admissions Policy</Link>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            {/* Discreet Admin Login Link */}
            <Link 
              to="/login" 
              className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 text-slate-500 hover:text-slate-300"
              title="Staff & Administrator Portal"
            >
              <ShieldCheck size={13} className="text-slate-500" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon, colorClass }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center transition-all duration-200 hover:text-white hover:-translate-y-0.5 ${colorClass}`}
  >
    {icon}
  </a>
);

export default Footer;
