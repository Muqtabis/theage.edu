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
    Sparkles,
    ArrowUpRight
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const ContactPage = () => {
    const { content } = useSiteContent();
    const general = content?.general || {};
    const [state, handleSubmit] = useForm("meorjaja"); 

    return (
        <div className="font-sans text-slate-800 bg-white min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-slate-950 overflow-hidden text-white text-center">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container relative z-10 mx-auto px-6 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={13} className="text-amber-400" />
                        <span>Get in Touch</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        We'd Love to Hear From You
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
                        Have admissions inquiries, questions about academics, or looking to schedule an on-campus tour? Reach out today.
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. CONTACT FORM & INFO CARDS
            ========================================== */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* LEFT COLUMN: FORM */}
                    <div className="lg:col-span-7">
                        <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-xs">
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">Send Us a Direct Message</h2>
                            <p className="text-slate-500 text-sm mb-8">Our administrative office typically replies within 24 hours.</p>

                            {state.succeeded ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-in fade-in">
                                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-emerald-950 mb-2">Message Delivered!</h3>
                                    <p className="text-emerald-700 text-sm mb-6">Thank you for writing to us. Our admissions desk will contact you shortly.</p>
                                    <button 
                                        onClick={() => window.location.reload()} 
                                        className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold transition shadow-xs"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2" htmlFor="name">
                                            Parent / Student Full Name
                                        </label>
                                        <input 
                                            id="name" 
                                            type="text" 
                                            name="name" 
                                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm text-slate-800" 
                                            placeholder="Enter your full name" 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input 
                                            id="email" 
                                            type="email" 
                                            name="email" 
                                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm text-slate-800" 
                                            placeholder="you@example.com" 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2" htmlFor="phone">
                                            Contact Number
                                        </label>
                                        <input 
                                            id="phone" 
                                            type="tel" 
                                            name="phone" 
                                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm text-slate-800" 
                                            placeholder="(+91) 98765 43210" 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2" htmlFor="message">
                                            Inquiry Message
                                        </label>
                                        <textarea 
                                            id="message" 
                                            name="message" 
                                            rows="5" 
                                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm text-slate-800 resize-none" 
                                            placeholder="Tell us what you are looking for (grade level, admission, transportation, etc.)" 
                                            required 
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={state.submitting} 
                                        className="w-full flex justify-center items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl transition duration-200 text-sm shadow-md disabled:opacity-50 cursor-pointer"
                                    >
                                        <Send size={16} />
                                        <span>{state.submitting ? "Sending..." : "Submit Inquiry"}</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: CONTACT DETAILS & EMBEDDED MAP */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Office Info Card */}
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                            <h3 className="text-xl font-serif font-bold text-slate-900">Campus Information</h3>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Physical Campus</h4>
                                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                                        {general.address || 'Basavakalyan, Bidar Dist., Karnataka, India - 585327'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Phone Line</h4>
                                    <a href={`tel:${general.phone || '+911234567890'}`} className="text-sm font-medium text-slate-800 hover:text-indigo-600 transition">
                                        {general.phone || '(+91) 12345 67890'}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-violet-50 text-violet-600 rounded-xl shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Email Communications</h4>
                                    <a href={`mailto:${general.email || 'info@theageschool.edu'}`} className="text-sm font-medium text-slate-800 hover:text-indigo-600 transition">
                                        {general.email || 'info@theageschool.edu'}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Office Hours</h4>
                                    <p className="text-sm font-medium text-slate-800">
                                        Monday – Saturday: 8:30 AM – 4:30 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Google Map iframe container */}
                        <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-white">
                            <div className="p-4 bg-slate-100 flex items-center justify-between border-b border-slate-200">
                                <span className="text-xs font-bold uppercase text-slate-600 flex items-center gap-2">
                                    <Building2 size={16} className="text-indigo-600" />
                                    <span>Main Campus Map</span>
                                </span>
                                <a 
                                    href="https://maps.google.com/?q=The+Age+School+Basavakalyan" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                                >
                                    <span>Open in Google Maps</span>
                                    <ArrowUpRight size={13} />
                                </a>
                            </div>

                            <div className="h-64 w-full bg-slate-200">
                                <iframe 
                                    title="School Location Map"
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
