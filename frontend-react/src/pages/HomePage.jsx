import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Calendar, Loader2, ChevronLeft, ChevronRight, Camera, Image as ImageIcon, ExternalLink, ArrowRight, Clock } from 'lucide-react';
import heroBg from '../assets/theageheader.jpg'; // Ensure this path is correct

// ==========================================
// CONFIGURATION & LOGIC (UNCHANGED)
// ==========================================
const API_BASE_URL = '/api';

const useTopContent = () => {
    const [data, setData] = useState({
        latestNews: null,
        nearestEvent: null,
        isLoading: true
    });

    useEffect(() => {
        const fetchRealData = async () => {
            try {
                const [newsRes, eventsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/news`),
                    fetch(`${API_BASE_URL}/events`)
                ]);

                const newsData = await newsRes.json();
                const eventsData = await eventsRes.json();

                let mostRecentNews = null;
                if (Array.isArray(newsData) && newsData.length > 0) {
                    const sortedNews = newsData
                        .filter(item => item.status !== 'draft') 
                        .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
                    mostRecentNews = sortedNews[0];
                }

                let upcomingEvent = null;
                if (Array.isArray(eventsData) && eventsData.length > 0) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const sortedEvents = eventsData
                        .filter(event => new Date(event.eventDate) >= today)
                        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                    upcomingEvent = sortedEvents[0];
                }

                setData({
                    latestNews: mostRecentNews,
                    nearestEvent: upcomingEvent,
                    isLoading: false
                });

            } catch (error) {
                console.error("Error fetching top content:", error);
                setData({ latestNews: null, nearestEvent: null, isLoading: false });
            }
        };

        fetchRealData();
    }, []);

    return data;
};

const HomePage = () => {
    // Logic Hooks
    const { latestNews, nearestEvent, isLoading } = useTopContent(); 
    const [albums, setAlbums] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGalleryLoading, setIsGalleryLoading] = useState(true);

    // Album Fetching Logic
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/albums`);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setAlbums(data);
                }
            } catch (err) {
                console.error("Error fetching albums:", err);
                setAlbums([]); 
            } finally {
                setIsGalleryLoading(false);
            }
        };
        fetchAlbums();
    }, []);

    // Auto-Play Logic
    useEffect(() => {
        if (albums.length < 3) return; 
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 2;
                return nextIndex >= albums.length ? 0 : nextIndex;
            });
        }, 5000); 
        return () => clearInterval(timer);
    }, [albums.length]);

    // Manual Controls
    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const next = prev - 2;
            return next < 0 ? Math.max(0, albums.length - 2) : next;
        });
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => {
            const next = prev + 2;
            return next >= albums.length ? 0 : next;
        });
    };

    const getAlbumAtIndex = (index) => {
        if (albums.length === 0) return null;
        const safeIndex = index % albums.length;
        return albums[safeIndex];
    };

    return (
        <div className="font-sans text-slate-800 bg-gray-50">
            {/* Custom Animation Styles */}
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
                .delay-300 { animation-delay: 0.3s; }
            `}</style>

            {/* ==========================================
                SECTION 1: MODERN HERO WITH CURVE
            ========================================== */}
            <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-indigo-950">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroBg} 
                        alt="The Age School" 
                        className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite]" 
                    />
                    {/* Deep Purple Gradient Overlay - Pure and Dark */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/90 via-indigo-950/80 to-indigo-950/95 mix-blend-multiply" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 text-center">
                    {/* Badge: Lavender / Light Violet */}
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/50 text-indigo-200 text-sm font-bold tracking-wider mb-6 animate-fade-in-up backdrop-blur-sm">
                        EST. 2012 • EXCELLENCE IN EDUCATION
                    </span>
                    
                    {/* Headline: White to Lavender Gradient */}
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-lg animate-fade-in-up delay-100">
                        Welcome to <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-violet-400">
                            The Age School
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto font-light animate-fade-in-up delay-200">
                        Nurturing young minds to ask big questions and build a brighter future.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
                        {/* Primary Action: Bright Violet/Purple Button */}
                        <Link to="/admissions" className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2">
                            Apply Now
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/about" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1">
                            Discover More
                        </Link>
                    </div>
                </div>

                {/* Decorative Curve Bottom */}
                <div className="absolute bottom-0 left-0 w-full leading-none z-20">
                    <svg className="block w-full h-24 md:h-48 text-gray-100" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* ==========================================
                SECTION 2: FLOATING FEATURES
            ========================================== */}
            <section className="relative z-30 -mt-20 pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1: Indigo Accent */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-indigo-500 group">
                            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Sparkles size={28} className="text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Curiosity First</h3>
                            <p className="text-gray-600 leading-relaxed">Inspiring students to ask the "why" and "how," fostering a lifelong love for discovery.</p>
                        </div>

                        {/* Feature 2: Violet Accent */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-violet-600 group">
                            <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Award size={28} className="text-violet-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Holistic Growth</h3>
                            <p className="text-gray-600 leading-relaxed">Academics, arts, and athletics integrated perfectly to shape well-rounded individuals.</p>
                        </div>

                        {/* Feature 3: Slate/Blue Accent */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-slate-600 group">
                            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Calendar size={28} className="text-slate-700" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Active Community</h3>
                            <p className="text-gray-600 leading-relaxed">A vibrant ecosystem of students, teachers, and parents working together.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                SECTION 3: NEWS & EVENTS
            ========================================== */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-bold text-indigo-900 mb-4 tracking-tight">Latest Updates</h2>
                            <p className="text-lg text-gray-600">Stay informed with the most recent announcements and upcoming schedule.</p>
                        </div>
                        <Link to="/news" className="hidden md:flex items-center text-violet-700 font-bold hover:text-violet-800 transition-colors mt-4 md:mt-0">
                            View All Updates <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
                            <p className="text-gray-500">Loading updates...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            
                            {/* LEFT: LATEST NEWS (Large Card) */}
                            <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100">
                                <div className="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
                                <div className="p-8 h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="px-4 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wide">News</span>
                                        <span className="text-gray-400 text-sm flex items-center">
                                            <Clock size={14} className="mr-1" />
                                            {latestNews ? (latestNews.date || new Date(latestNews.createdAt).toLocaleDateString()) : '-'}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-violet-700 transition-colors">
                                        {latestNews ? latestNews.title : 'No Recent News'}
                                    </h3>
                                    
                                    <p className="text-gray-600 mb-8 line-clamp-3 flex-grow leading-relaxed">
                                        {latestNews ? (latestNews.content || latestNews.description) : 'No content available at the moment.'}
                                    </p>
                                    
                                    <Link to="/news" className="inline-flex items-center font-bold text-violet-600 hover:text-violet-800 transition-colors">
                                        Read Full Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* RIGHT: UPCOMING EVENT (Large Card) */}
                            <div className="relative bg-indigo-950 text-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col">
                                {/* Abstract Decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600 opacity-30 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
                                
                                <div className="p-8 relative z-10 h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="px-4 py-1 rounded-full bg-indigo-600 text-indigo-100 text-xs font-bold uppercase tracking-wide shadow-lg border border-indigo-500">Upcoming Event</span>
                                        <span className="text-indigo-200 text-sm font-medium">
                                            Don't miss out
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-6 mb-6">
                                        {nearestEvent && (
                                            <div className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 min-w-[80px]">
                                                <span className="block text-3xl font-bold text-violet-300">
                                                    {new Date(nearestEvent.eventDate).getDate()}
                                                </span>
                                                <span className="block text-xs uppercase text-indigo-200 tracking-wider">
                                                    {new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                                {nearestEvent ? nearestEvent.title : 'No Events Scheduled'}
                                            </h3>
                                            <p className="text-indigo-200 text-sm flex items-center">
                                                <Calendar size={14} className="mr-2" />
                                                {nearestEvent ? new Date(nearestEvent.eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) : ''}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-indigo-100 mb-8 line-clamp-2 flex-grow leading-relaxed opacity-90">
                                        {nearestEvent ? (nearestEvent.location || nearestEvent.description) : 'Check back later for updates.'}
                                    </p>

                                    <Link to="/news" className="w-full py-3 bg-white text-indigo-950 rounded-xl font-bold text-center hover:bg-indigo-50 transition-colors shadow-lg">
                                        View Calendar
                                    </Link>
                                </div>
                            </div>

                        </div>
                    )}
                    
                    <div className="md:hidden text-center mt-8">
                        <Link to="/news" className="text-violet-700 font-bold hover:underline">View All Updates</Link>
                    </div>
                </div>
            </section>

            {/* ==========================================
                SECTION 4: ALBUMS (Light Theme)
            ========================================== */}
            <section className="py-24 bg-gray-100 text-slate-800 relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="container relative z-10 mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-bold mb-4 text-indigo-900"><span className="text-violet-600">Campus</span> Moments</h2>
                            <p className="text-gray-700 max-w-xl">A glimpse into the vibrant life at The Age School. From cultural fests to science fairs.</p>
                        </div>
                        
                        {/* Navigation Arrows */}
                        {albums.length > 2 && (
                            <div className="flex gap-3 mt-6 md:mt-0">
                                <button onClick={prevSlide} className="p-3 rounded-full bg-white border border-gray-300 text-indigo-600 shadow-sm hover:bg-gray-50 hover:border-violet-400 hover:text-violet-600 transition-all">
                                    <ChevronLeft size={24} />
                                </button>
                                <button onClick={nextSlide} className="p-3 rounded-full bg-white border border-gray-300 text-indigo-600 shadow-sm hover:bg-gray-50 hover:border-violet-400 hover:text-violet-600 transition-all">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>

                    {isGalleryLoading ? (
                        <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
                            <Loader2 className="animate-spin mx-auto text-violet-600 mb-4" size={40} />
                            <p className="text-gray-600">Loading albums...</p>
                        </div>
                    ) : albums.length > 0 ? (
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* SLIDE 1 */}
                            {getAlbumAtIndex(currentIndex) && (
                                <Link to={`/gallery/${getAlbumAtIndex(currentIndex)._id || getAlbumAtIndex(currentIndex).id}`} className="w-full md:w-1/2 group relative rounded-2xl overflow-hidden h-[400px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
                                    {getAlbumAtIndex(currentIndex).images?.length > 0 ? (
                                        <img src={getAlbumAtIndex(currentIndex).images[0].src || getAlbumAtIndex(currentIndex).images[0]} alt={getAlbumAtIndex(currentIndex).title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center"><ImageIcon className="text-gray-500" size={64} /></div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                            {getAlbumAtIndex(currentIndex).title}
                                            <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-300" />
                                        </h3>
                                        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                            <span className="text-gray-300 text-sm flex items-center gap-2"><Camera size={16} /> {getAlbumAtIndex(currentIndex).images?.length || 0} Photos</span>
                                            <span className="text-violet-300 text-sm font-bold flex items-center gap-1">View Album <ArrowRight size={14} /></span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* SLIDE 2 */}
                            {getAlbumAtIndex(currentIndex + 1) && (
                                <Link to={`/gallery/${getAlbumAtIndex(currentIndex + 1)._id || getAlbumAtIndex(currentIndex + 1).id}`} className="w-full md:w-1/2 group relative rounded-2xl overflow-hidden h-[400px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hidden md:block">
                                    {getAlbumAtIndex(currentIndex + 1).images?.length > 0 ? (
                                        <img src={getAlbumAtIndex(currentIndex + 1).images[0].src || getAlbumAtIndex(currentIndex + 1).images[0]} alt={getAlbumAtIndex(currentIndex + 1).title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center"><ImageIcon className="text-gray-500" size={64} /></div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                            {getAlbumAtIndex(currentIndex + 1).title}
                                            <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-300" />
                                        </h3>
                                        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                            <span className="text-gray-300 text-sm flex items-center gap-2"><Camera size={16} /> {getAlbumAtIndex(currentIndex + 1).images?.length || 0} Photos</span>
                                            <span className="text-violet-300 text-sm font-bold flex items-center gap-1">View Album <ArrowRight size={14} /></span>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                            <Camera size={48} className="mx-auto text-gray-500 mb-4" />
                            <p className="text-gray-600">No albums uploaded yet.</p>
                        </div>
                    )}
                    
                    <div className="text-center mt-12">
                        <Link to="/student-life" className="inline-block px-8 py-3 rounded-full border border-indigo-300 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors font-semibold shadow-md">
                            Explore Full Gallery
                        </Link>
                    </div>
                    {/* Section 5: FINAL CALL TO ACTION (Contact Us) */}
            <section className="py-20 bg-indigo-900 w-full relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
                    <h2 className="text-4xl font-extrabold text-white mb-4">
                        Ready to Join The Age School?
                    </h2>
                    <p className="text-indigo-200 text-lg mb-8 max-w-3xl mx-auto">
                        We're here to answer your questions about admissions, academics, and campus life.
                    </p>
                    
                    {/* Contact Button */}
                    <Link 
                        to="/contact" 
                        className="inline-flex items-center gap-3 px-10 py-4 bg-violet-600 text-white text-xl font-bold rounded-full shadow-xl hover:bg-violet-700 hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-1"
                    >
                        Contact Our Team
                        <ArrowRight size={24} />
                    </Link>
                </div>
                {/* Decorative Element */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            </section>
                </div>
            </section>
        </div>
    );
};

export default HomePage;