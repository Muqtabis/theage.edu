import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, GraduationCap, MapPin } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const MobileQuickBar = () => {
  const { content } = useSiteContent();
  const general = content?.general || {};
  const phone = general.phone || '+911234567890';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2">
      <div className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto">
        {/* Direct Call */}
        <a 
          href={`tel:${phone}`} 
          className="flex flex-col items-center justify-center py-1 text-slate-700 hover:text-blue-600 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-600 mb-0.5 transition-transform group-active:scale-95">
            <Phone size={17} />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Call Desk</span>
        </a>

        {/* WhatsApp Inquiry */}
        <a 
          href={`https://wa.me/${cleanPhone}?text=Hello%20The%20Age%20School,%20I%20would%20like%20information%20regarding%20admissions.`}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex flex-col items-center justify-center py-1 text-slate-700 hover:text-emerald-600 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-600 mb-0.5 transition-transform group-active:scale-95">
            <MessageCircle size={17} />
          </div>
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Apply Now (High-Emphasis Action) */}
        <Link 
          to="/admissions" 
          className="flex flex-col items-center justify-center py-1 text-white group relative"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 shadow-md shadow-amber-500/30 flex items-center justify-center text-slate-950 mb-0.5 transition-transform group-active:scale-95 animate-bounce">
            <GraduationCap size={20} />
          </div>
          <span className="text-[10px] font-extrabold text-amber-700 tracking-tight">Apply '26</span>
        </Link>

        {/* Campus Map / Inquire */}
        <Link 
          to="/contact" 
          className="flex flex-col items-center justify-center py-1 text-slate-700 hover:text-indigo-600 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center text-indigo-600 mb-0.5 transition-transform group-active:scale-95">
            <MapPin size={17} />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Visit Us</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileQuickBar;
