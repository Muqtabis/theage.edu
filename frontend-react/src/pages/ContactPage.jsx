import React from 'react';
import { useForm } from '@formspree/react';
import { 
    Send, 
    Mail, 
    MapPin, 
    Phone, 
    CheckCircle, 
    Clock, 
    Building2,
    ArrowUpRight
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const ContactPage = () => {
    const { content } = useSiteContent();
    const general = content?.general || {};
    const [state, handleSubmit] = useForm("meorjaja"); 

    return (
        <div className="font-sans text-slate-800 bg-[#fbfbfb] min-h-screen selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            
            {/* HERO */}
            <section className="bg-[#0b192c] text-white py-24 md:py-32 border-b border-[#c5a880]/20 text-center relative overflow-hidden">
                {/* Ambient glowing mesh orbs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none animate-float" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] inline-flex items-center gap-2 mb-3 bg-[#c5a880]/10 px-3.5 py-1 rounded-full border border-[#c5a880]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
                        Directory & Inquiries
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        <span className="text-gradient-gold">Contact the Administration</span>
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
                        We welcome prospective families, alumni, and community inquiries.
                    </p>
                </div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* FORM */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-8 md:p-10 border border-slate-200 rounded-sm hover-lift relative overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-[#c5a880] to-emerald-500 opacity-80" />
                            <h2 className="text-2xl font-serif font-bold text-[#0b192c] mb-2">Institutional Inquiry Form</h2>
                            <p className="text-slate-500 text-xs mb-8">Official correspondence is addressed directly by the administrative registrar.</p>

                            {state.succeeded ? (
                                <div className="p-8 border border-emerald-300 bg-emerald-50/70 text-center rounded-sm">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                                        <CheckCircle size={24} />
                                    </div>
                                    <h3 className="font-serif font-bold text-emerald-950 text-lg mb-2">Inquiry Recorded</h3>
                                    <p className="text-xs text-emerald-700 mb-5">Your communication has been lodged with the office. Our admissions desk will respond promptly.</p>
                                    <button 
                                        onClick={() => window.location.reload()} 
                                        className="px-6 py-2.5 bg-[#0b192c] text-white text-xs font-bold uppercase tracking-wider shimmer-btn"
                                    >
                                        Submit Further Inquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="name">
                                            Full Name
                                        </label>
                                        <input 
                                            id="name" 
                                            type="text" 
                                            name="name" 
                                            className="w-full px-4 py-3 border border-slate-300 rounded-sm text-xs focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/40 outline-none transition-all" 
                                            placeholder="Parent / Guardian / Scholar Name" 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input 
                                            id="email" 
                                            type="email" 
                                            name="email" 
                                            className="w-full px-4 py-3 border border-slate-300 rounded-sm text-xs focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/40 outline-none transition-all" 
                                            placeholder="name@example.com" 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="phone">
                                            Contact Telephone
                                        </label>
                                        <input 
                                            id="phone" 
                                            type="tel" 
                                            name="phone" 
                                            className="w-full px-4 py-3 border border-slate-300 rounded-sm text-xs focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/40 outline-none transition-all" 
                                            placeholder="(+91) 00000 00000" 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="message">
                                            Nature of Inquiry
                                        </label>
                                        <textarea 
                                            id="message" 
                                            name="message" 
                                            rows="5" 
                                            className="w-full px-4 py-3 border border-slate-300 rounded-sm text-xs focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/40 outline-none resize-none transition-all" 
                                            placeholder="Detail your inquiry regarding grade admission, curriculum, or bursaries..." 
                                            required 
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={state.submitting} 
                                        className="w-full py-3.5 bg-[#0b192c] hover:bg-[#1e3e62] text-white text-xs font-bold uppercase tracking-[0.16em] transition cursor-pointer shimmer-btn rounded-sm"
                                    >
                                        {state.submitting ? "Transmitting..." : "Deliver Official Inquiry"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* CONTACT CARD */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#fdfbf7] p-8 border border-slate-200 space-y-6 hover-lift rounded-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a880]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880] block">Institutional Directory</span>
                            
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Campus Location</h4>
                                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                                    {general.address || 'Basavakalyan, Bidar Dist., Karnataka, India - 585327'}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Telephone Switchboard</h4>
                                <a href={`tel:${general.phone || '+911234567890'}`} className="text-xs text-slate-800 font-medium hover:text-[#c5a880] transition-colors">
                                    {general.phone || '(+91) 12345 67890'}
                                </a>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Electronic Mail</h4>
                                <a href={`mailto:${general.email || 'info@theageschool.edu'}`} className="text-xs text-slate-800 font-medium hover:text-[#c5a880] transition-colors">
                                    {general.email || 'info@theageschool.edu'}
                                </a>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Office Hours</h4>
                                <p className="text-xs text-slate-700">Monday – Saturday: 08:30 – 16:30 IST</p>
                            </div>
                        </div>

                        {/* MAP */}
                        <div className="border border-slate-200 bg-white hover-lift rounded-sm overflow-hidden">
                            <div className="p-3 bg-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600 border-b">
                                <span>Campus Geographic Map</span>
                                <a href="https://maps.google.com/?q=The+Age+School+Basavakalyan" target="_blank" rel="noreferrer" className="text-[#0b192c] hover:text-[#c5a880] transition-colors font-medium">
                                    Open Maps ↗
                                </a>
                            </div>
                            <div className="h-64 w-full">
                                <iframe 
                                    title="Campus Map"
                                    src={general.googleMapsIframe || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.646473634086!2d76.9455!3d17.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce89ac2335f60d%3A0x286358316719266e!2sBasavakalyan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"} 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default ContactPage;
