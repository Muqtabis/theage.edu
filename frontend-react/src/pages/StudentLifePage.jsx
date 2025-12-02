import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Palette, ArrowRight, Camera, Image as ImageIcon, Loader2, FolderOpen, ChevronLeft, ChevronRight, ExternalLink, ArrowLeft, Clock, Calendar, Zap } from 'lucide-react';

const ALBUM_API_URL = '/api/albums'; 

const StudentLifePage = () => {
    // --- 1. LOGIC & DATA STATE (UNCHANGED) ---
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    // --- 2. FETCH DATA (Logic Unchanged) ---
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(ALBUM_API_URL);
                if (response.ok) {
                    const data = await response.json();
                    setAlbums(data);
                }
            } catch (err) {
                console.error("Error loading gallery:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAlbums();
    }, []);

    // --- 3. SLIDESHOW LOGIC (UNCHANGED) ---
    useEffect(() => {
        if (albums.length < 3) return; 
        const timer = setInterval(() => {
            setCurrentSlide((prev) => {
                const next = prev + 2;
                return next >= albums.length ? 0 : next;
            });
        }, 5000); 
        return () => clearInterval(timer);
    }, [albums.length]);

    // Manual Controls for Slideshow (Logic Unchanged)
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 2 >= albums.length ? 0 : prev + 2));
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 2 < 0 ? Math.max(0, albums.length - 2) : prev - 2));
    };

    // Helper to safely get album for slideshow
    const getSlideAlbum = (index) => {
        if (!albums.length) return null;
        const safeIndex = index % albums.length;
        return albums[safeIndex] || null; 
    };

    // --- STATIC DATA (Activities - Color Scheme Updated) ---
    const activities = [
        {
            title: "Athletics & Sports",
            description: "Teamwork, sportsmanship, and healthy competition. Our Lions roar with pride in every game.",
            icon: Trophy,
            color: "bg-indigo-600",
            tags: ["Basketball", "Soccer", "Swimming"]
        },
        {
            title: "Arts & Creativity",
            description: "From the theatre stage to the painting studio, creativity thrives here. Express yourself through color and sound.",
            icon: Palette,
            color: "bg-violet-600",
            tags: ["Drama", "Visual Arts", "Choir"]
        },
        {
            title: "Clubs & Community",
            description: "Debate, robotics, community service, and dozens more. Find your tribe and lead the way.",
            icon: Users,
            color: "bg-fuchsia-600",
            tags: ["Robotics", "Debate", "Eco-Club"]
        }
    ];

    // Get slides for featured section
    const album1 = getSlideAlbum(currentSlide);
    const album2 = getSlideAlbum(currentSlide + 1);

    // --- RENDER LOGIC ---
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
                <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
                <p className="text-lg font-light tracking-wider animate-pulse">Loading Gallery...</p>
            </div>
        );
    }

    return (
        <div className="font-sans text-slate-800 bg-white w-full overflow-x-hidden">
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
            `}</style>

            {/* ==========================================
                1. HERO SECTION (DARK HEADER)
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-indigo-950 overflow-hidden w-full text-white">
                <div className="absolute inset-0 z-0 opacity-50" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517430332-ac7f3698858a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"}}>
                    <div className="absolute inset-0 bg-indigo-950/90"></div>
                </div>

                <div className="relative z-10 w-full text-center"> 
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/50 bg-indigo-500/10 text-indigo-300 text-sm font-bold tracking-wide mb-6 animate-fade-in-up backdrop-blur-sm">
                            <Zap size={14} className="text-violet-400 fill-violet-400" />
                            <span className="text-indigo-200 text-sm font-medium tracking-wide uppercase">Campus Experience</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in-up delay-100">
                            Life at The Age School
                        </h1>
                        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                            A vibrant community where passions are ignited, friendships are forged, and memories are captured forever.
                        </p>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. STUDENT ACTIVITIES (Clean Grid)
            ========================================== */}
            <section className="w-full py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Extracurriculars</h2>
                        <p className="text-slate-600">Find your passion beyond the classroom.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {activities.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="group relative p-8 rounded-3xl border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${item.color}`}>
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                                    </div>

                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
                                    
                                    <div className="flex gap-2 flex-wrap pt-3 border-t border-gray-100">
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className={`text-xs font-medium px-3 py-1 rounded-full text-white ${item.color} shadow-sm`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. LIVE GALLERY FEED (Modern Slider/Grid)
            ========================================== */}
            <section className="py-24 bg-slate-50 border-t border-slate-200 w-full">
                <div className="max-w-7xl mx-auto px-6">
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Camera size={20} className="text-violet-600" />
                                <span className="text-violet-600 font-bold uppercase tracking-wider text-sm">Latest Collections</span>
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900">Gallery Feed</h2>
                        </div>
                        {albums.length > 2 && (
                            <div className="flex gap-3 mt-6 md:mt-0">
                                <button onClick={prevSlide} className="p-3 rounded-full bg-white border border-gray-300 text-indigo-600 shadow-sm hover:bg-violet-600 hover:text-white transition-all">
                                    <ChevronLeft size={24} />
                                </button>
                                <button onClick={nextSlide} className="p-3 rounded-full bg-white border border-gray-300 text-indigo-600 shadow-sm hover:bg-violet-600 hover:text-white transition-all">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Loading State Check */}
                    {isLoading ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                            <Loader2 className="animate-spin mx-auto text-violet-600" size={40} />
                        </div>
                    ) : albums.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No gallery albums uploaded yet.</p>
                        </div>
                    ) : (
                        <div>
                            {/* --- FEATURED SLIDESHOW --- */}
                            <div className="flex flex-col md:flex-row gap-8 mb-16">
                                {/* Slide 1 */}
                                {album1 && (
                                    <Link to={`/gallery/${album1._id}`} className="w-full md:w-1/2 group relative rounded-2xl overflow-hidden h-[400px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
                                        <img src={album1.coverImage || "https://placehold.co/600x400/indigo/white?text=Album"} alt={album1.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex flex-col justify-end p-8">
                                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                                {album1.title} <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-300" />
                                            </h3>
                                            <span className="text-violet-300 text-sm font-bold flex items-center gap-1">View Album <ArrowRight size={14} /></span>
                                        </div>
                                    </Link>
                                )}
                                
                                {/* Slide 2 */}
                                {album2 && (
                                    <Link to={`/gallery/${album2._id}`} className="w-full md:w-1/2 group relative rounded-2xl overflow-hidden h-[400px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hidden md:block">
                                        <img src={album2.coverImage || "https://placehold.co/600x400/indigo/white?text=Album"} alt={album2.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex flex-col justify-end p-8">
                                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                                {album2.title} <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-300" />
                                            </h3>
                                            <span className="text-violet-300 text-sm font-bold flex items-center gap-1">View Album <ArrowRight size={14} /></span>
                                        </div>
                                    </Link>
                                )}
                            </div>

                            {/* --- ALL COLLECTIONS GRID --- */}
                            <h3 className="text-xl font-bold text-slate-900 mb-6 mt-12">All Collections</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {albums.map((album, index) => (
                                    <Link key={album._id || index} to={`/gallery/${album._id}`} className="group relative aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100">
                                        {/* Image */}
                                        <img src={album.coverImage || "https://placehold.co/600x400/indigo/white?text=Album"} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{album.title}</h3>
                                            <div className="flex items-center gap-2 text-violet-300 text-sm mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                                <ImageIcon size={14} /> <span>View Collection</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default StudentLifePage;