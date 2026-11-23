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
        <div className="font-sans text-slate-800 bg-white min-h-screen selection:bg-blue-600 selection:text-white">
            
            {/* HERO */}
            <section className="bg-slate-50 border-b border-slate-200/80 py-16 sm:py-24 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 inline-flex items-center gap-2 mb-4 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                        <MapPin size={14} className="text-blue-600" />
                        <span>Directory & Inquiries</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 tracking-tight">
                        Contact Administration
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        We welcome prospective families, alumni, and community inquiries.
                    </p>
                </div>
            </section>

            <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
                    
                    {/* FORM */}
                    <div className="lg:col-span-7">
                        <div className="card-minimal p-6 sm:p-10">
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">Institutional Inquiry Form</h2>
                            <p className="text-slate-500 text-xs mb-8">Official correspondence is addressed directly by the administrative registrar.</p>

                            {state.succeeded ? (
                                <div className="p-8 border border-slate-200 bg-slate-50 text-center rounded-xl">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                                        <CheckCircle size={22} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-base mb-1">Inquiry Recorded</h3>
                                    <p className="text-xs text-slate-600 mb-5">Your communication has been lodged. Our admissions desk will respond promptly.</p>
                                    <button 
                                        onClick={() => window.location.reload()} 
                                        className="btn-primary text-xs"
                                    >
                                        Submit Further Inquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1" htmlFor="name">
                                            Full Name
                                        </label>
                                        <input 
                                            id="name" 
                                            type="text" 
                                            name="name" 
                                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:border-blue-600 focus:outline-hidden transition-colors" 
                                            placeholder="Parent / Guardian / Scholar Name" 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input 
                                            id="email" 
                                            type="email" 
                                            name="email" 
                                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:border-blue-600 focus:outline-hidden transition-colors" 
                                            placeholder="name@example.com" 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1" htmlFor="phone">
                                            Contact Telephone
                                        </label>
                                        <input 
                                            id="phone" 
                                            type="tel" 
                                            name="phone" 
                                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:border-blue-600 focus:outline-hidden transition-colors" 
                                            placeholder="(+91) 00000 00000" 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1" htmlFor="message">
                                            Nature of Inquiry
                                        </label>
                                        <textarea 
                                            id="message" 
                                            name="message" 
                                            rows="5" 
                                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:border-blue-600 focus:outline-hidden resize-none transition-colors" 
                                            placeholder="Detail your inquiry regarding grade admission, curriculum, or bursaries..." 
                                            required 
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={state.submitting} 
                                        className="btn-primary w-full text-xs font-semibold py-3 justify-center"
                                    >
                                        {state.submitting ? "Transmitting..." : "Submit Inquiry"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* CONTACT CARD */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="card-minimal p-6 sm:p-8 space-y-5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 block">Directory Details</span>
                            
                            <div>
                                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Campus Location</h4>
                                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                                    {general.address || 'Basavakalyan, Bidar Dist., Karnataka, India - 585327'}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Telephone Switchboard</h4>
                                <a href={`tel:${general.phone || '+911234567890'}`} className="text-xs text-slate-800 font-medium hover:text-blue-600 transition-colors">
                                    {general.phone || '(+91) 12345 67890'}
                                </a>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Electronic Mail</h4>
                                <a href={`mailto:${general.email || 'info@theageschool.edu'}`} className="text-xs text-slate-800 font-medium hover:text-blue-600 transition-colors">
                                    {general.email || 'info@theageschool.edu'}
                                </a>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Office Hours</h4>
                                <p className="text-xs text-slate-700">Monday – Saturday: 08:30 – 16:30 IST</p>
                            </div>
                        </div>

                        {/* MAP */}
                        <div className="card-minimal overflow-hidden">
                            <div className="p-3 bg-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-600 border-b border-slate-100">
                                <span>Campus Location</span>
                                <a href="https://maps.google.com/?q=The+Age+School+Basavakalyan" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                                    Open Maps ↗
                                </a>
                            </div>
                            <div className="h-60 w-full">
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
