import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Trophy, 
    Palette, 
    Users, 
    ArrowRight, 
    Camera, 
    ChevronLeft, 
    ChevronRight, 
    Loader2 
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
            title: "Athletics & Physical Discipline",
            desc: "Team sports, track events, and morning yoga instilling fitness, humility in victory, and resilience in defeat.",
            tags: ["Basketball", "Football", "Athletics", "Yoga"]
        },
        {
            title: "Fine Arts, Music & Theatre",
            desc: "Creative self-expression through classical vocal traditions, dramatic performance, and painting studios.",
            tags: ["Drama", "Visual Arts", "Vocal Choir", "Handicrafts"]
        },
        {
            title: "Debating, Robotics & Societies",
            desc: "Active student-led councils, scientific inquiry olympiads, and bilingual public speaking forums.",
            tags: ["Robotics Lab", "Debate Society", "Eco-Club", "Science Olympiad"]
        }
    ];

    const currentAlbum = albums[currentSlide] || null;

    return (
        <div className="font-sans text-slate-800 bg-[#fbfbfb] w-full overflow-x-hidden selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            
            {/* HERO */}
            <section className="bg-[#0b192c] text-white py-24 md:py-32 border-b border-[#c5a880]/20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a880] block mb-3">
                        {studentLife.heroBadge || 'Beyond Academics'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                        {studentLife.heroTitle || 'Life at The Age School'}
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
                        {studentLife.heroSubtitle || 'A community where character is forged through sport, artistic discipline, fellowship, and civic duty.'}
                    </p>
                </div>
            </section>

            {/* THREE PILLARS */}
            <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="max-w-2xl mb-14">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Activities</span>
                    <h2 className="text-3xl font-serif font-bold text-[#0b192c]">The Co-Curricular Program</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {activities.map((act, i) => (
                        <div key={i} className="bg-white p-8 border border-slate-200/90 rounded-sm flex flex-col justify-between">
                            <div>
                                <span className="text-[11px] font-mono font-bold text-[#c5a880] block mb-3">0{i+1}.</span>
                                <h3 className="text-xl font-serif font-bold text-[#0b192c] mb-3">{act.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6">{act.desc}</p>
                            </div>
                            {Array.isArray(act.tags) && (
                                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                                    {act.tags.map((t, ti) => (
                                        <span key={ti} className="text-[10px] font-semibold px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* COLLECTIONS DIRECTORY */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-200 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-1">Archives</span>
                            <h2 className="text-3xl font-serif font-bold text-[#0b192c]">Campus Collections & Albums</h2>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{albums.length} Catalogued Collections</span>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading collections...</div>
                    ) : albums.length === 0 ? (
                        <p className="text-xs text-slate-400 py-12 text-center">No catalogued photo albums at this time.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {albums.map((album) => (
                                <Link 
                                    key={album._id} 
                                    to={`/gallery/${album._id}`}
                                    className="group border border-slate-200 bg-[#fdfbf7] flex flex-col justify-between hover:border-[#0b192c] transition-colors"
                                >
                                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative border-b border-slate-200">
                                        <img 
                                            src={album.coverImage || "https://placehold.co/600x400"} 
                                            alt={album.title} 
                                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
                                        />
                                        <div className="absolute bottom-3 right-3 bg-[#0b192c] text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                            {album.images?.length || 0} Photographs
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-serif font-bold text-base text-[#0b192c] mb-1 group-hover:text-[#1e3e62] transition-colors">
                                            {album.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                                            {album.description}
                                        </p>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a880] inline-flex items-center gap-1">
                                            <span>Open Collection</span>
                                            <ArrowRight size={11} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default StudentLifePage;
