import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Sparkles, 
    Calendar, 
    Loader2, 
    ChevronLeft, 
    ChevronRight, 
    Camera, 
    Image as ImageIcon, 
    ArrowRight, 
    Clock,
    BookOpen,
    Globe,
    Heart,
    Zap,
    MapPin,
    GraduationCap,
    Shapes,
    BrainCircuit
} from 'lucide-react';
import heroBg from '../assets/theageheader.jpg';

// ==========================================
// 1. CONFIGURATION & LOGIC (UNCHANGED)
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

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
const HomePage = () => {
    const { latestNews, nearestEvent, isLoading } = useTopContent(); 
    const [albums, setAlbums] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGalleryLoading, setIsGalleryLoading] = useState(true);

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

    useEffect(() => {
        if (albums.length < 3) return; 
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 2;
                return nextIndex >= albums.length ? 0 : nextIndex;
            });
        }, 6000); 
        return () => clearInterval(timer);
    }, [albums.length]);

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
        <div className="font-sans text-slate-600 bg-white selection:bg-indigo-50 selection:text-indigo-600">
            
            {/* CSS Animation Styles */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fadeUp 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `}</style>

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative w-full h-[90vh] flex flex-col justify-center pb-12 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroBg} 
                        alt="The Age School Campus" 
                        className="w-full h-full object-cover object-center opacity-90 animate-[pulse_10s_ease-in-out_infinite]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/30" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center animate-fade-up">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
                            <Sparkles size={14} className="text-yellow-300 fill-yellow-300" />
                            <span className="text-xs font-bold text-white tracking-widest uppercase">Admissions Open 2025</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6 leading-[1.1] tracking-tight delay-100 animate-fade-up">
                            The future <br />
                            <span className="font-light text-indigo-200">begins here.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-200 font-light max-w-2xl mx-auto mb-10 leading-relaxed delay-200 animate-fade-up">
                            From Kindergarten to Class 10, we nurture curiosity and empower the next generation of leaders.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 delay-300 animate-fade-up">
                            <Link to="/admissions" className="px-8 py-4 bg-white text-slate-900 rounded-full text-sm font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                                Apply Now <ArrowRight size={16} />
                            </Link>
                            <Link to="/academics" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full text-sm font-bold hover:bg-white/10 backdrop-blur-sm transition-colors text-center">
                                View Curriculum
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. ACADEMIC PILLARS
            ========================================== */}
            <section className="py-24 px-6 container mx-auto">
                <div className="mb-16 text-center animate-fade-up">
                    <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4">Why choose us?</h2>
                    <div className="h-1 w-20 bg-indigo-600 rounded-full mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Card 1 */}
                    <div className="group p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 bg-white text-left">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                            <BookOpen size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Faculty</h3>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">Dedicated educators with years of experience mentoring students up to Class 10.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-8 rounded-3xl border border-slate-100 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-300 bg-white text-left">
                        <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-6 text-violet-600 group-hover:scale-110 transition-transform">
                            <Globe size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Modern Curriculum</h3>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">A balanced blend of academics, technology, and life skills.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="group p-8 rounded-3xl border border-slate-100 hover:border-pink-100 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 bg-white text-left">
                        <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 text-pink-600 group-hover:scale-110 transition-transform">
                            <Heart size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Student Care</h3>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">A safe, inclusive environment focused on mental and physical well-being.</p>
                    </div>

                    {/* Card 4 */}
                    <div className="group p-8 rounded-3xl border border-slate-100 hover:border-amber-100 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300 bg-white text-left">
                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform">
                            <Zap size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Innovation Lab</h3>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">Facilities for STEM and creative arts to spark imagination.</p>
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. LEARNING JOURNEY (K-10 Structure)
            ========================================== */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4">The Learning Journey</h2>
                        <p className="text-slate-500 font-light text-lg">Tailored educational pathways from Kindergarten to Class 10.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Stage 1: Kindergarten (Teal Theme) */}
                        <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-teal-200 transition-all hover:shadow-lg hover:shadow-teal-100/50 text-left">
                            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-teal-600">
                                <Shapes size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Kindergarten</h3>
                            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-4">LKG - UKG</p>
                            <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                                Focused on play-based learning, social development, and foundational literacy in a nurturing environment.
                            </p>
                            <Link to="/academics" className="text-teal-700 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Discover Early Years <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Stage 2: Primary (Indigo Theme) */}
                        <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-100/50 relative transform md:-translate-y-4 text-left">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                                <BrainCircuit size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Primary School</h3>
                            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Class 1 - Class 5</p>
                            <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                                Building strong fundamentals in Math, Science, and Languages while encouraging curiosity and critical thinking.
                            </p>
                            <Link to="/academics" className="text-indigo-700 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Explore Primary <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Stage 3: Secondary (Violet Theme) */}
                        <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-violet-200 transition-all hover:shadow-lg hover:shadow-violet-100/50 text-left">
                            <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-6 text-violet-600">
                                <GraduationCap size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Secondary School</h3>
                            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-4">Class 6 - Class 10</p>
                            <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                                Advanced concepts and rigorous academic preparation for Board examinations and future studies.
                            </p>
                            <Link to="/academics" className="text-violet-700 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Syllabus <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. NEWS & EVENTS (Left Aligned Headers)
            ========================================== */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div className="text-left w-full">
                            <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-3">Campus Board</h2>
                            <p className="text-slate-500 font-light">Latest announcements and upcoming events.</p>
                        </div>
                        <Link to="/news" className="text-indigo-600 text-sm font-bold flex items-center hover:underline whitespace-nowrap">
                            View Archive <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="h-64 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center">
                            <Loader2 className="animate-spin text-indigo-600" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* LEFT: NEWS (2/3 Width) */}
                            <div className="lg:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-slate-200 transition-all flex flex-col justify-between h-full text-left">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-white text-indigo-600 border border-indigo-100 text-[10px] font-bold uppercase tracking-wider rounded-full">News</span>
                                        <span className="text-slate-400 text-xs flex items-center gap-1">
                                            <Clock size={12} />
                                            {latestNews ? (latestNews.date || new Date(latestNews.createdAt).toLocaleDateString()) : '-'}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4 leading-tight">
                                        {latestNews ? latestNews.title : 'No Recent News'}
                                    </h3>
                                    <p className="text-slate-500 font-light leading-relaxed mb-6 line-clamp-3">
                                        {latestNews ? (latestNews.content || latestNews.description) : 'No updates available.'}
                                    </p>
                                </div>
                                <Link to="/news" className="text-indigo-600 text-sm font-bold flex items-center gap-2 group">
                                    Read Full Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* RIGHT: EVENT (1/3 Width) */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 flex flex-col justify-between relative overflow-hidden text-left">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Upcoming</span>
                                        <Calendar size={18} className="text-indigo-200" />
                                    </div>
                                    {nearestEvent ? (
                                        <div className="mb-6">
                                            <div className="text-5xl font-medium mb-1">{new Date(nearestEvent.eventDate).getDate()}</div>
                                            <div className="text-lg text-indigo-200 mb-6">{new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'long' })}</div>
                                            <h4 className="text-xl font-medium leading-snug">{nearestEvent.title}</h4>
                                            <div className="flex items-center mt-2 text-indigo-200 text-sm">
                                                <MapPin size={14} className="mr-2" />
                                                {nearestEvent.location || 'Main Campus'}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-6">
                                            <h4 className="text-xl font-medium">No Events</h4>
                                        </div>
                                    )}
                                </div>
                                <Link to="/news" className="relative z-10 w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-center text-sm font-semibold hover:bg-white/20 transition-colors">
                                    View Calendar
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                5. GALLERY SLIDER (Fixed Alignment)
            ========================================== */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    {/* Fixed Alignment: Items Center */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                        <div className="text-left w-full">
                            <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-2">School Life</h2>
                            <p className="text-slate-500 font-light">Moments captured.</p>
                        </div>
                        {albums.length > 2 && (
                            <div className="flex gap-2 shrink-0">
                                <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"><ChevronLeft size={20}/></button>
                                <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"><ChevronRight size={20}/></button>
                            </div>
                        )}
                    </div>

                    {isGalleryLoading ? (
                        <div className="h-80 bg-slate-50 rounded-2xl animate-pulse"></div>
                    ) : albums.length > 0 ? (
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Primary Image */}
                            {getAlbumAtIndex(currentIndex) && (
                                <Link to={`/gallery/${getAlbumAtIndex(currentIndex)._id || getAlbumAtIndex(currentIndex).id}`} className="block w-full md:w-2/3 h-[450px] rounded-3xl overflow-hidden relative group cursor-pointer">
                                    {getAlbumAtIndex(currentIndex).images?.length > 0 ? (
                                        <img src={getAlbumAtIndex(currentIndex).images[0].src || getAlbumAtIndex(currentIndex).images[0]} alt="Album" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><ImageIcon size={48} /></div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8 text-left">
                                        <div>
                                            <h3 className="text-white text-xl font-medium">{getAlbumAtIndex(currentIndex).title}</h3>
                                            <p className="text-slate-300 text-sm">{getAlbumAtIndex(currentIndex).images?.length || 0} Photos</p>
                                        </div>
                                    </div>
                                </Link>
                            )}
                            
                            {/* Secondary Image */}
                            {getAlbumAtIndex(currentIndex + 1) && (
                                <Link to={`/gallery/${getAlbumAtIndex(currentIndex + 1)._id || getAlbumAtIndex(currentIndex + 1).id}`} className="hidden md:block w-1/3 h-[450px] rounded-3xl overflow-hidden relative group cursor-pointer">
                                    {getAlbumAtIndex(currentIndex + 1).images?.length > 0 ? (
                                        <img src={getAlbumAtIndex(currentIndex + 1).images[0].src || getAlbumAtIndex(currentIndex + 1).images[0]} alt="Album" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><ImageIcon size={48} /></div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8 text-left">
                                        <div>
                                            <h3 className="text-white text-lg font-medium">{getAlbumAtIndex(currentIndex + 1).title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400">Gallery Empty</div>
                    )}
                </div>
            </section>

            {/* ==========================================
                6. FOOTER CTA (Centered)
            ========================================== */}
            <section className="bg-white py-24 px-6 text-center border-t border-slate-100">
                <div className="max-w-xl mx-auto animate-fade-up">
                    <h2 className="text-3xl font-medium text-slate-900 mb-4">Ready to shape the future?</h2>
                    <p className="text-slate-500 font-light mb-8">
                        Join a community dedicated to excellence. Admissions open for the upcoming academic year.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors">
                        Get Started <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;