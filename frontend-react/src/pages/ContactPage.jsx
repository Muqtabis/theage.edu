import React, { useState, useEffect, } from 'react'; 
import { useForm } from '@formspree/react'; 
// Removed PageHeader to use custom hero
import { Send, Mail, MapPin, Phone, CheckCircle, Car, MapPin as PinIcon, Sun, Moon, MessageSquare } from 'lucide-react';

// ==========================================
// MAP CONFIGURATION & LOGIC (UNCHANGED)
// ==========================================
const DEFAULT_SCHOOL_COORDS = { lat: 17.866025529658344, lng: 76.95108130579983 };

const lightStyle = []; 
const darkStyle = [
  { elementType: 'geometry', stylers: [{color: '#242f3e'}] },
  { elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}] },
  { elementType: 'labels.text.fill', stylers: [{color: '#746855'}] },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  }
];

let globalMapInstance; 
let globalMarkerInstance;

function initMap() {
    console.log("Global initMap called.");
}
window.initMap = initMap; 

// --- Custom Hook for Map Functionality ---
const useMapControls = (mapContainerId) => {
    const [currentCoords, setCurrentCoords] = useState(DEFAULT_SCHOOL_COORDS);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (!window.google || !window.google.maps) {
            console.error("Google Maps API not loaded yet.");
            return;
        }

        const mapElement = document.getElementById(mapContainerId);
        if (!mapElement || globalMapInstance) return;

        const map = new window.google.maps.Map(mapElement, {
            center: DEFAULT_SCHOOL_COORDS,
            zoom: 15,
            styles: lightStyle,
            disableDefaultUI: true,
        });
        globalMapInstance = map;

        const marker = new window.google.maps.Marker({
            position: DEFAULT_SCHOOL_COORDS,
            map: map,
            title: 'The Age School',
        });
        globalMarkerInstance = marker;

        map.addListener("click", (mapsMouseEvent) => {
            const newCoords = mapsMouseEvent.latLng.toJSON();
            globalMarkerInstance.setPosition(newCoords);
            map.setCenter(newCoords); 
            setCurrentCoords(newCoords); 
        });

    }, [mapContainerId]);

    const toggleMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        
        if (globalMapInstance) {
            globalMapInstance.setOptions({ styles: newDarkMode ? darkStyle : lightStyle });
        }
    };
    
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${currentCoords.lat},${currentCoords.lng}`;

    return { directionsUrl, toggleMode, isDarkMode };
};

const ContactPage = () => {
    const [state, handleSubmit] = useForm("meorjaja"); 
    // Hook connection
    const { directionsUrl, toggleMode, isDarkMode } = useMapControls('map-in-address-card');

    return (
        <div className="font-sans text-slate-800 bg-gray-50 min-h-screen">
            {/* Animation Styles */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
            `}</style>

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-indigo-950 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                        <MessageSquare size={14} className="text-teal-300 fill-teal-300" />
                        <span className="text-white text-sm font-bold tracking-wide uppercase">We'd love to hear from you</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight animate-fade-in-up">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">Touch</span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
                        Have a question about admissions, academics, or student life? Reach out to us and we'll get back to you shortly.
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. MAIN CONTENT (Floating Layout)
            ========================================== */}
            <section className="container mx-auto px-6 py-20 -mt-10 relative z-20">
                {/* Success State for Form */}
                {state.succeeded ? (
                     <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-teal-100">
                        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-teal-500" size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Message Sent Successfully!</h2>
                        <p className="text-slate-500 text-lg">Thank you for reaching out. Our admissions team will review your message and respond within 24 hours.</p>
                        <button onClick={() => window.location.reload()} className="mt-8 px-6 py-3 bg-indigo-900 text-white rounded-full hover:bg-indigo-800 transition-colors">
                            Send Another Message
                        </button>
                     </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        
                        {/* LEFT COLUMN: CONTACT FORM */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 h-fit animate-fade-in-up delay-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none" 
                                        placeholder="John Doe"
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none" 
                                        placeholder="john@example.com"
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Your Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows="5" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none resize-none" 
                                        placeholder="How can we help you?"
                                        required
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    disabled={state.submitting}
                                    className="w-full flex justify-center items-center px-6 py-4 bg-gradient-to-r from-indigo-900 to-purple-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} className="mr-2" />
                                    {state.submitting ? "Sending..." : "Send Message"}
                                </button>
                                
                                {state.errors && state.errors.length > 0 && (
                                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center">
                                        <span className="mr-2">⚠️</span> Please verify your details and try again.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* RIGHT COLUMN: MAP & INFO */}
                        <div className="space-y-6 animate-fade-in-up delay-200">
                            
                            {/* INFO CARDS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone</p>
                                        <p className="text-slate-800 font-bold">(+91) 12345 67890</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email</p>
                                        <p className="text-slate-800 font-bold">info@theageschool.edu</p>
                                    </div>
                                </div>
                            </div>

                            {/* MAP CARD */}
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Our Campus</h4>
                                            <p className="text-xs text-slate-500">Basavakalyan, Karnataka</p>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={toggleMode}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-slate-600 hover:bg-gray-100 transition-colors shadow-sm"
                                    >
                                        {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                                    </button>
                                </div>

                                {/* Map Logic Div */}
                                <div className="relative h-[350px] w-full group">
                                     <div 
                                        id="map-in-address-card" 
                                        className="h-full w-full"
                                    ></div>
                                    
                                    {/* Overlay Instruction */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-2">
                                        <PinIcon size={12} /> Click map to pin location
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50">
                                    <a 
                                        href={directionsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-md transition-all duration-300 group"
                                    >
                                        <Car size={20} className="mr-2" />
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </section>
        </div>
    );
};

export default ContactPage;