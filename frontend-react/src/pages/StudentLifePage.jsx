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
            <section className="bg-[#0b192c] text-white py-24 md:py-32 border-b border-[#c5a880]/20 text-center relative overflow-hidden">
                {/* Ambient glowing mesh orbs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none animate-float" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] inline-flex items-center gap-2 mb-3 bg-[#c5a880]/10 px-3.5 py-1 rounded-full border border-[#c5a880]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
                        {studentLife.heroBadge || 'Beyond Academics'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        <span className="text-gradient-gold">{studentLife.heroTitle || 'Life at The Age School'}</span>
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
                    <p className="text-xs text-slate-500 mt-2">Cultivating mind, body, and artistic expression through structured daily disciplines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {activities.map((act, i) => (
                        <div 
                            key={i} 
                            className="bg-white p-8 border border-slate-200/90 rounded-sm flex flex-col justify-between hover-lift relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div>
                                <span className="text-[11px] font-mono font-bold text-[#c5a880] block mb-3">0{i+1}.</span>
                                <h3 className="text-xl font-serif font-bold text-[#0b192c] mb-3 group-hover:text-blue-900 transition-colors">{act.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6">{act.desc}</p>
                            </div>
                            {Array.isArray(act.tags) && (
                                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                                    {act.tags.map((t, ti) => (
                                        <span 
                                            key={ti} 
                                            className="text-[10px] font-semibold px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-[#0b192c] hover:text-[#c5a880] hover:border-[#0b192c] transition-colors"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* THE FOUR HOUSES SYSTEM */}
                <div className="mt-20 pt-16 border-t border-slate-200">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8c7355] block mb-2">Comradeship & Leadership</span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b192c]">The Four Houses System</h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            Every scholar is initiated into one of our four institutional houses, fostering healthy competition, leadership, and lifelong brotherhood.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { 
                                name: "Ashoka House", 
                                borderAccent: "hover:border-amber-500 hover:shadow-amber-500/20", 
                                barBg: "bg-amber-500",
                                badge: "text-amber-800 bg-amber-100/80 border-amber-300", 
                                motto: "Courage & Righteousness", 
                                desc: "Instilling moral leadership, resilience, and unyielding fortitude in service to society." 
                            },
                            { 
                                name: "Tagore House", 
                                borderAccent: "hover:border-blue-500 hover:shadow-blue-500/20", 
                                barBg: "bg-blue-600",
                                badge: "text-blue-800 bg-blue-100/80 border-blue-300", 
                                motto: "Creativity & Wisdom", 
                                desc: "Celebrating artistic self-expression, literary fluency, and open-minded inquiry." 
                            },
                            { 
                                name: "Raman House", 
                                borderAccent: "hover:border-emerald-500 hover:shadow-emerald-500/20", 
                                barBg: "bg-emerald-600",
                                badge: "text-emerald-800 bg-emerald-100/80 border-emerald-300", 
                                motto: "Inquiry & Scientific Truth", 
                                desc: "Championing empirical logic, innovation, mathematics, and technological marvels." 
                            },
                            { 
                                name: "Kalam House", 
                                borderAccent: "hover:border-rose-500 hover:shadow-rose-500/20", 
                                barBg: "bg-rose-500",
                                badge: "text-rose-800 bg-rose-100/80 border-rose-300", 
                                motto: "Vision & Dedication", 
                                desc: "Nurturing soaring aspirations, scientific patriotism, humility, and steadfast diligence." 
                            }
                        ].map((h, hi) => (
                            <div 
                                key={hi} 
                                className={`p-6 border border-slate-200 bg-white rounded-sm hover-lift relative overflow-hidden transition-all duration-300 group shadow-xs ${h.borderAccent}`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1.5 ${h.barBg}`} />
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs inline-block mb-3 border ${h.badge}`}>
                                    House Division
                                </span>
                                <h3 className="font-serif font-bold text-xl text-[#0b192c] mb-1 group-hover:text-slate-900">{h.name}</h3>
                                <p className="text-xs italic text-[#8c7355] font-medium mb-3">"{h.motto}"</p>
                                <p className="text-xs text-slate-600 leading-relaxed">{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CAMPUS FACILITIES */}
                <div className="mt-20 pt-16 border-t border-slate-200">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8c7355] block mb-2">Campus Environment</span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b192c]">Infrastructure & Scholar Safety</h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            State-of-the-art facilities engineered to provide a healthy, safe, and academically stimulating habitat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs text-slate-700">
                        {[
                            { title: "Smart Interactive Classrooms", desc: "Equipped with interactive smart displays, audio-visual technology, and ergonomic seating.", icon: "01" },
                            { title: "Composite Science & STEM Lab", desc: "Dedicated Physics, Chemistry, Biology, and Robotics experimentation apparatus.", icon: "02" },
                            { title: "Central Knowledge Library", desc: "Over 5,000 curated books, periodicals, daily national newspapers, and digital research bays.", icon: "03" },
                            { title: "GPS-Monitored Bus Fleet", desc: "Safe transport covering Basavakalyan and neighboring taluk routes with speed governors and female attendants.", icon: "04" },
                            { title: "Athletic Fields & Courts", desc: "Expansive play area for cricket, football, volleyball, badminton, kho-kho, and track events.", icon: "05" },
                            { title: "Health Care & RO Purified Water", desc: "On-campus primary infirmary, periodic pediatric health checkups, and multi-stage commercial RO water.", icon: "06" }
                        ].map((fac, fi) => (
                            <div key={fi} className="p-6 border border-slate-200 bg-white rounded-sm hover-lift relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-[#c5a880] transition-colors" />
                                <span className="text-[10px] font-mono font-bold text-[#c5a880] block mb-2">{fac.icon} / INFRASTRUCTURE</span>
                                <h4 className="font-serif font-bold text-sm text-[#0b192c] mb-1.5 group-hover:text-blue-900 transition-colors">{fac.title}</h4>
                                <p className="text-slate-600 leading-relaxed text-xs">{fac.desc}</p>
                            </div>
                        ))}
                    </div>
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
                                    className="group border border-slate-200 bg-[#fdfbf7] flex flex-col justify-between hover-lift overflow-hidden rounded-sm transition-all"
                                >
                                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative border-b border-slate-200">
                                        <img 
                                            src={album.coverImage || "https://placehold.co/600x400"} 
                                            alt={album.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                        />
                                        <div className="absolute bottom-3 right-3 glass-dark text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-xs border border-white/20">
                                            {album.images?.length || 0} Photographs
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-serif font-bold text-base text-[#0b192c] mb-1 group-hover:text-blue-900 transition-colors">
                                            {album.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                                            {album.description}
                                        </p>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a880] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                            <span>Open Collection</span>
                                            <ArrowRight size={12} />
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
