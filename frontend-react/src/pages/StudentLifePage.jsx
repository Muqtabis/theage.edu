import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Music, Users, Zap, Palette, Mic2, Globe, Cpu, Camera, ArrowRight, Image as ImageIcon, Loader2, FolderOpen, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const ALBUM_API_URL = 'http://localhost:5000/api/albums';

const StudentLifePage = () => {
    // --- 1. DATA STATE ---
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // --- 2. SLIDESHOW STATE ---
    const [currentSlide, setCurrentSlide] = useState(0);

    // --- 3. FETCH DATA (Logic Unchanged) ---
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

    // --- 4. SLIDESHOW LOGIC (Logic Unchanged) ---
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
        // Use modulo for wrapping if index is too high
        const safeIndex = index % albums.length;
        // Only return if the album exists at the calculated index
        return albums[safeIndex] || null; 
    };

    // --- STATIC DATA (Activities Unchanged) ---
    const activities = [
        {
            title: "Athletics & Sports",
            description: "Teamwork, sportsmanship, and healthy competition. From the field to the court, our Lions roar with pride.",
            image: "https://placehold.co/600x800/e0f1fe/08539c?text=Athletics",
            icon: Trophy,
            color: "bg-indigo-600",
            tags: ["Basketball", "Soccer", "Swimming"]
        },
        {
            title: "Arts & Creativity",
            description: "From the theatre stage to the painting studio, creativity thrives here. Express yourself through color and sound.",
            image: "https://placehold.co/600x800/fef3c7/92400e?text=Arts+%26+Music",
            icon: Palette,
            color: "bg-violet-500",
            tags: ["Drama", "Visual Arts", "Choir"]
        },
        {
            title: "Clubs & Community",
            description: "Debate, robotics, community service, and dozens more. Find your tribe and lead the way.",
            image: "https://placehold.co/600x800/b9e5fd/0c457e?text=Student+Clubs",
            icon: Users,
            color: "bg-fuchsia-500",
            tags: ["Robotics", "Debate", "Eco-Club"]
        }
    ];

    // Helper for safe rendering of images
    const renderSlide = (album) => (
        <Link to={`/gallery/${album._id}`} className="w-full md:w-1/2 group relative rounded-2xl overflow-hidden h-[400px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
            <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {album.title} <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-300" />
                </h3>
                <span className="text-violet-300 text-sm font-bold flex items-center gap-1">View Album <ArrowRight size={14} /></span>
            </div>
        </Link>
    );

    return (
        // ✅ FULL WIDTH: Added w-full and removed top-level padding/container reliance
        <div className="font-sans text-slate-800 bg-gray-50 w-full overflow-x-hidden">
            {/* Animation Styles */}
            <style>{`/* ... styles ... */`}</style>

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-indigo-950 overflow-hidden w-full">
                <div className="absolute inset-0 z-0">{/* Background Effects (Unchanged) */}</div>

                <div className="relative z-10 w-full text-center">
                    <div className="max-w-7xl mx-auto px-6"> {/* Internal padding kept for text readability */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-700/50 backdrop-blur-md mb-6">
                            <Zap size={14} className="text-violet-400 fill-violet-400" />
                            <span className="text-indigo-100 text-sm font-medium tracking-wide uppercase">Campus Experience</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight animate-fade-in-up">
                            Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">The Age School</span>
                        </h1>
                        <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
                            A vibrant community where passions are ignited, friendships are forged, and memories are captured forever.
                        </p>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. STUDENT ACTIVITIES (Edge-to-Edge Content)
            ========================================== */}
            <section className="w-full py-20"> {/* Removed container/px-6 */}
                <div className="max-w-7xl mx-auto px-6"> {/* Content Wrapper with max-width and center alignment */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {activities.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">{item.title}</h3>
                                            <p className="text-indigo-100 leading-relaxed mb-6 opacity-90">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. LIVE GALLERY FEED (Edge-to-Edge Grid)
            ========================================== */}
            <section className="py-24 bg-slate-50 border-t border-slate-200 w-full">
                <div className="max-w-7xl mx-auto px-6"> {/* Content Wrapper with max-width and center alignment */}
                    
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Camera size={20} className="text-violet-600" />
                                <span className="text-violet-600 font-bold uppercase tracking-wider text-sm">Captured Moments</span>
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900">From Our Gallery</h2>
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

                    {/* Loading State */}
                    {isLoading ? (
                         <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-violet-600" size={40} /></div>
                    ) : albums.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No gallery albums uploaded yet.</p>
                        </div>
                    ) : (
                        <div>
                            {/* --- FEATURED SLIDESHOW --- */}
                            <div className="flex flex-col md:flex-row gap-8 mb-16">
                                {/* Slide 1: Added check for 'album' existing before rendering */}
                                {getSlideAlbum(currentSlide) && renderSlide(getSlideAlbum(currentSlide))}
                                
                                {/* Slide 2: Added check for 'album' existing before rendering */}
                                {getSlideAlbum(currentSlide + 1) && renderSlide(getSlideAlbum(currentSlide + 1))}
                            </div>

                            {/* --- FULL ALBUM GRID --- */}
                            <h3 className="text-xl font-bold text-indigo-900 mb-6">All Collections</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {albums.map((album, index) => (
                                    <Link key={album._id || index} to={`/gallery/${album._id}`} className="group relative aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                        <img src={album.coverImage || "https://placehold.co/600x400/indigo/white?text=Album"} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{album.title}</h3>
                                            <div className="flex items-center gap-2 text-violet-300 text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
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