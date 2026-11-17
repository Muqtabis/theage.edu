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
  ArrowRight
} from 'lucide-react';
import logo from '../assets/theagelogo.jpg';
import { useSiteContent } from '../context/ContentContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();
  const general = content?.general || {};

  return (
    <footer className="bg-[#07111e] text-slate-300 pt-16 pb-12 border-t border-[#c5a880]/30 font-sans">
      <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMN 1: Masthead & Crest */}
          <div className="space-y-4">
            <Link to="/home" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="The Age School Crest" 
                className="h-11 w-11 object-contain rounded-xs border border-slate-700 bg-white" 
              /> 
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-white tracking-tight">
                  {general.schoolName || 'The Age School'}
                </span>
                <span className="text-[10px] text-[#c5a880] uppercase tracking-[0.2em] font-medium">
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

          {/* COLUMN 2: Institutional Directory */}
          <div>
            <h4 className="font-serif font-bold text-white mb-4 text-sm tracking-wide">
              Directory
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/home" className="hover:text-white transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Our Vision & Trustees</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">Academic Pathways & Curriculum</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions & Tuition Schedule</Link></li>
              <li><Link to="/student-life" className="hover:text-white transition-colors">Campus Life & Activities</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Official Gazette & Events</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: Administrative Offices */}
          <div>
            <h4 className="font-serif font-bold text-white mb-4 text-sm tracking-wide">
              Administrative Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-[#c5a880] shrink-0" />
                <span>{general.address || 'Basavakalyan, Bidar Dist., Karnataka, India - 585327'}</span>
              </li>
              <li>
                <a href={`tel:${general.phone || '+911234567890'}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone size={15} className="text-[#c5a880] shrink-0" />
                  <span>{general.phone || '(+91) 12345 67890'}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${general.email || 'info@theageschool.edu'}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail size={15} className="text-[#c5a880] shrink-0" />
                  <span>{general.email || 'info@theageschool.edu'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Affiliation & Accreditations */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-white mb-2 text-sm tracking-wide">
              Accreditation
            </h4>
            
            <div className="bg-[#0b192c] p-4 border border-slate-800 rounded-sm hover:border-[#c5a880]/40 transition-colors">
              <span className="text-[10px] text-[#c5a880] uppercase tracking-wider font-bold block mb-1">
                Official Recognition
              </span>
              <p className="text-xs font-semibold text-white">
                {general.affiliation || 'State Board of Education'}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {general.affiliationCode || 'Code: 29050220001'}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Recognized under the Department of Public Instruction, Government of Karnataka.
            </p>
          </div>
        </div>

        {/* Bottom Bar with discreet Staff Login */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} {general.schoolName || 'The Age School'}. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Campus Inquiries</Link>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <Link to="/admissions" className="hover:text-slate-300 transition-colors">Bursary Terms</Link>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            {/* Discreet Admin Login */}
            <Link 
              to="/login" 
              className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5 text-slate-500 hover:text-slate-200 group"
              title="Authorized Personnel Access"
            >
              <Shield size={12} className="group-hover:text-[#c5a880] transition-colors" />
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
    className="w-9 h-9 rounded-sm bg-[#0b192c] border border-slate-800 text-slate-400 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-[#c5a880] hover:bg-[#152336] hover:scale-110 hover:-translate-y-0.5 hover:shadow-md"
  >
    {icon}
  </a>
);

export default Footer;
