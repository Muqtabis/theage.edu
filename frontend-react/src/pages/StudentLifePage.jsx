import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Trophy, 
    Palette, 
    Users, 
    ArrowRight, 
    Camera, 
    Image as ImageIcon, 
    Loader2, 
    ChevronLeft, 
    ChevronRight, 
    ExternalLink, 
    Sparkles 
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const ALBUM_API_URL = '/api/albums'; 
const activityIcons = [Trophy, Palette, Users];

const StudentLifePage = () => {
    const { content } = useSiteContent();
    const studentLife = content?.studentLife || {};

    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(ALBUM_API_URL);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) setAlbums(data);
                }
            } catch (err) {
                console.error("Error loading gallery:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAlbums();
    }, []);

    // Auto rotate featured slide
    useEffect(() => {
        if (albums.length < 2) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % albums.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [albums.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % Math.max(1, albums.length));
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + albums.length) % Math.max(1, albums.length));

    const activities = Array.isArray(studentLife.activities) && studentLife.activities.length > 0 ? studentLife.activities : [
        {
            title: "Athletics & Sports",
            desc: "Teamwork, sportsmanship, and healthy competition in athletics, football, basketball, and gymnastics.",
            tags: ["Basketball", "Football", "Athletics", "Yoga"]
        },
        {
            title: "Arts & Creativity",
            desc: "From the theatre stage to the painting studio, creativity thrives here. Express yourself through color and sound.",
            tags: ["Drama", "Visual Arts", "Vocal Choir", "Handicrafts"]
        },
        {
            title: "Clubs & Community",
            desc: "Debate, robotics, community service, and dozens more. Find your passion and lead the way.",
            tags: ["Robotics Lab", "Debate Society", "Eco-Club", "Science Olympiad"]
        }
    ];

    const currentAlbum = albums[currentSlide] || null;

    return (
        <div className="font-sans text-slate-800 bg-white w-full overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-slate-950 overflow-hidden text-white text-center">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>{studentLife.heroBadge || 'Campus Experience'}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        {studentLife.heroTitle || 'Life at The Age School'}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
                        {studentLife.heroSubtitle || 'A vibrant community where passions are ignited, friendships are forged, and memories are captured forever.'}
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. EXTRACURRICULAR ACTIVITIES
            ========================================== */}
            <section className="w-full py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Holistic Learning</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                            Beyond The Classroom
                        </h2>
                        <p className="text-slate-600 text-sm mt-2">Discover talents, build friendships, and achieve team excellence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {activities.map((item, index) => {
                            const IconComponent = activityIcons[index % activityIcons.length];
                            return (
                                <div 
                                    key={index} 
                                    className="p-8 rounded-3xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 shadow-xs">
                                            <IconComponent size={26} />
                                        </div>

                                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">{item.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">{item.desc}</p>
                                    </div>
                                    
                                    {Array.isArray(item.tags) && (
                                        <div className="flex gap-2 flex-wrap pt-4 border-t border-slate-200/80">
                                            {item.tags.map((tag, i) => (
                                                <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. LIVE GALLERY FEED
            ========================================== */}
            <section className="py-24 bg-slate-50 border-t border-slate-200/70 w-full">
                <div className="max-w-7xl mx-auto px-6">
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Camera size={18} className="text-indigo-600" />
                                <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs">Visual Chronicles</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Campus Photo Albums</h2>
                        </div>
                        {albums.length > 1 && (
                            <div className="flex gap-2">
                                <button 
                                    onClick={prevSlide} 
                                    className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs hover:bg-slate-900 hover:text-white transition-all"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={nextSlide} 
                                    className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs hover:bg-slate-900 hover:text-white transition-all"
                                    aria-label="Next slide"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                            <Loader2 className="animate-spin mx-auto text-indigo-600 mb-2" size={36} />
                            <p className="text-slate-500 text-sm">Loading photo collections...</p>
                        </div>
                    ) : albums.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                            <ImageIcon size={44} className="mx-auto text-slate-300 mb-2" />
                            <p className="text-slate-600 font-bold">No gallery albums yet.</p>
                            <p className="text-slate-400 text-xs mt-1">Check back soon for photo stories.</p>
                        </div>
                    ) : (
                        <div>
                            {/* Featured Spotlight Banner */}
                            {currentAlbum && (
                                <Link 
                                    to={`/gallery/${currentAlbum._id}`} 
                                    className="block relative rounded-3xl overflow-hidden h-[380px] md:h-[450px] shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 group mb-16"
                                >
                                    <img 
                                        src={currentAlbum.coverImage || "https://placehold.co/1200x600/1e293b/white?text=Album"} 
                                        alt={currentAlbum.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                                        <span className="text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">Featured Collection</span>
                                        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2 flex items-center gap-3">
                                            <span>{currentAlbum.title}</span>
                                            <ExternalLink size={20} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </h3>
                                        <p className="text-slate-200 text-sm max-w-xl line-clamp-2 mb-4">
                                            {currentAlbum.description}
                                        </p>
                                        <span className="text-xs font-bold text-amber-300 inline-flex items-center gap-1.5">
                                            <span>View {currentAlbum.images ? currentAlbum.images.length : 0} Photos in Album</span>
                                            <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </Link>
                            )}

                            {/* All Collections Grid */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-serif font-bold text-slate-900">All Collections ({albums.length})</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {albums.map((album) => (
                                    <Link 
                                        key={album._id} 
                                        to={`/gallery/${album._id}`} 
                                        className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200/80 flex flex-col"
                                    >
                                        <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                                            <img 
                                                src={album.coverImage || "https://placehold.co/600x400/indigo/white?text=Album"} 
                                                alt={album.title} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                            />
                                            <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5">
                                                <ImageIcon size={12} />
                                                <span>{album.images?.length || 0}</span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow justify-between">
                                            <div>
                                                <h4 className="font-serif font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                                                    {album.title}
                                                </h4>
                                                <p className="text-slate-500 text-xs line-clamp-2 mb-4">
                                                    {album.description}
                                                </p>
                                            </div>
                                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-800">
                                                <span>Browse Collection</span>
                                                <ArrowRight size={14} />
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
