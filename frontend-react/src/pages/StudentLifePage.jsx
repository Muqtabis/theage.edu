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
    Loader2,
    Sparkles,
    Shield,
    Heart,
    Zap
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const ALBUM_API_URL = '/api/albums'; 

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

    return (
        <div className="font-sans text-slate-800 bg-[#f8fafc] w-full overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
            
            {/* HERO */}
            <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 sm:py-24 md:py-32 border-b border-blue-800/40 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-3xl pointer-events-none animate-float" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-950 inline-flex items-center gap-2 mb-4 bg-amber-400 px-4 py-1.5 rounded-full shadow-lg shadow-amber-400/20">
                        <Sparkles size={16} />
                        {studentLife.heroBadge || 'Beyond Academics'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight">
                        <span>{studentLife.heroTitle || 'Life at The Age School'}</span>
                    </h1>
                    <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        {studentLife.heroSubtitle || 'A community where character is forged through sport, artistic discipline, fellowship, and civic duty.'}
                    </p>
                </div>
            </section>

            {/* THREE PILLARS (Lively Activities) */}
            <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-2xl mb-12 sm:mb-14">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block mb-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit">
                        Co-Curricular Excellence
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Holistic Personality Development</h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">Cultivating mind, body, and artistic expression through structured daily disciplines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            num: "01",
                            title: "Athletics & Physical Fitness",
                            desc: "Team sports, track events, and morning yoga instilling fitness, humility in victory, and resilience in defeat.",
                            tags: ["Basketball", "Cricket", "Athletics", "Morning Yoga", "Kho-Kho"],
                            color: "from-amber-400 to-orange-500",
                            cardBg: "bg-amber-50/40 hover:bg-amber-50/80 border-amber-200 hover:border-amber-400",
                            numColor: "text-amber-600",
                            tagClass: "bg-white text-amber-900 border-amber-200 hover:bg-amber-500 hover:text-white"
                        },
                        {
                            num: "02",
                            title: "Fine Arts, Music & Drama",
                            desc: "Creative self-expression through classical vocal traditions, dramatic performance, and painting studios.",
                            tags: ["Theatre Club", "Visual Arts", "Vocal Choir", "Handicrafts", "Classical Dance"],
                            color: "from-rose-400 to-pink-500",
                            cardBg: "bg-rose-50/40 hover:bg-rose-50/80 border-rose-200 hover:border-rose-400",
                            numColor: "text-rose-600",
                            tagClass: "bg-white text-rose-900 border-rose-200 hover:bg-rose-500 hover:text-white"
                        },
                        {
                            num: "03",
                            title: "Robotics, Debating & Clubs",
                            desc: "Active student-led councils, scientific inquiry olympiads, and bilingual public speaking forums.",
                            tags: ["Robotics Lab", "Debate Society", "Eco-Club", "Science Olympiad", "Civic Forum"],
                            color: "from-blue-500 to-cyan-500",
                            cardBg: "bg-blue-50/40 hover:bg-blue-50/80 border-blue-200 hover:border-blue-400",
                            numColor: "text-blue-600",
                            tagClass: "bg-white text-blue-900 border-blue-200 hover:bg-blue-600 hover:text-white"
                        }
                    ].map((act, i) => (
                        <div 
                            key={i} 
                            className={`p-7 sm:p-8 rounded-2xl border-2 ${act.cardBg} flex flex-col justify-between hover-lift relative overflow-hidden group shadow-xs hover:shadow-xl transition-all duration-300`}
                        >
                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${act.color}`} />
                            <div>
                                <span className={`text-base font-mono font-black ${act.numColor} block mb-3`}>{act.num}.</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">{act.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{act.desc}</p>
                            </div>
                            {Array.isArray(act.tags) && (
                                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/80">
                                    {act.tags.map((t, ti) => (
                                        <span 
                                            key={ti} 
                                            className={`text-[11px] font-bold px-3 py-1 border rounded-lg transition-colors shadow-2xs ${act.tagClass}`}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* THE FOUR HOUSES SYSTEM (Vibrant Heraldic Pride) */}
                <div className="mt-20 pt-16 border-t border-slate-200">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-700 block mb-2 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full w-fit">
                            Comradeship & Leadership
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">The Four Houses System</h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            Every scholar is initiated into one of our four institutional houses, fostering healthy competition, leadership, and lifelong brotherhood.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { 
                                name: "Ashoka House", 
                                cardTheme: "bg-amber-50/60 border-amber-300 hover:border-amber-500", 
                                barBg: "bg-gradient-to-r from-amber-400 to-amber-600",
                                badge: "text-amber-900 bg-amber-200 border-amber-300", 
                                motto: "Courage & Righteousness", 
                                desc: "Instilling moral leadership, resilience, and unyielding fortitude in service to society." 
                            },
                            { 
                                name: "Tagore House", 
                                cardTheme: "bg-blue-50/60 border-blue-300 hover:border-blue-500", 
                                barBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
                                badge: "text-blue-900 bg-blue-200 border-blue-300", 
                                motto: "Creativity & Wisdom", 
                                desc: "Celebrating artistic self-expression, literary fluency, and open-minded inquiry." 
                            },
                            { 
                                name: "Raman House", 
                                cardTheme: "bg-emerald-50/60 border-emerald-300 hover:border-emerald-500", 
                                barBg: "bg-gradient-to-r from-emerald-400 to-teal-600",
                                badge: "text-emerald-900 bg-emerald-200 border-emerald-300", 
                                motto: "Inquiry & Scientific Truth", 
                                desc: "Championing empirical logic, innovation, mathematics, and technological marvels." 
                            },
                            { 
                                name: "Kalam House", 
                                cardTheme: "bg-rose-50/60 border-rose-300 hover:border-rose-500", 
                                barBg: "bg-gradient-to-r from-rose-400 to-pink-600",
                                badge: "text-rose-900 bg-rose-200 border-rose-300", 
                                motto: "Vision & Dedication", 
                                desc: "Nurturing soaring aspirations, scientific patriotism, humility, and steadfast diligence." 
                            }
                        ].map((h, hi) => (
                            <div 
                                key={hi} 
                                className={`p-6 border-2 rounded-2xl hover-lift relative overflow-hidden transition-all duration-300 group shadow-xs hover:shadow-xl ${h.cardTheme}`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-2 ${h.barBg}`} />
                                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3 border ${h.badge}`}>
                                    House Division
                                </span>
                                <h3 className="font-bold text-xl text-slate-900 mb-1">{h.name}</h3>
                                <p className="text-xs italic text-slate-700 font-bold mb-3">"{h.motto}"</p>
                                <p className="text-xs text-slate-600 leading-relaxed">{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CAMPUS FACILITIES */}
                <div className="mt-20 pt-16 border-t border-slate-200">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block mb-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                            Campus Infrastructure
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Modern Facilities & Safety</h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            State-of-the-art infrastructure engineered to provide a healthy, safe, and academically stimulating habitat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs text-slate-700">
                        {[
                            { title: "Smart Interactive Classrooms", desc: "Equipped with interactive smart touch panels, high-res audio-visual aids, and ergonomic child-safe furniture.", icon: "01", bar: "bg-blue-600", text: "text-blue-600", bg: "bg-blue-50/50 border-blue-200" },
                            { title: "Composite Science & STEM Lab", desc: "Dedicated Physics, Chemistry, Biology, and Robotics experimentation apparatus adhering to state safety standards.", icon: "02", bar: "bg-emerald-600", text: "text-emerald-600", bg: "bg-emerald-50/50 border-emerald-200" },
                            { title: "Central Knowledge Library", desc: "Over 5,000 curated books, periodicals, daily national newspapers, reference encylopedias, and digital research bays.", icon: "03", bar: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-50/50 border-amber-200" },
                            { title: "GPS-Monitored Bus Fleet", desc: "Safe transport covering Basavakalyan and neighboring taluk routes with speed governors and female attendants.", icon: "04", bar: "bg-indigo-600", text: "text-indigo-600", bg: "bg-indigo-50/50 border-indigo-200" },
                            { title: "Athletic Grounds & Courts", desc: "Expansive play area for cricket, football, volleyball, badminton, kho-kho, yoga, and athletic track events.", icon: "05", bar: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-50/50 border-orange-200" },
                            { title: "Health Care & RO Purified Water", desc: "On-campus primary infirmary, periodic pediatric health checkups, and multi-stage commercial RO drinking water.", icon: "06", bar: "bg-teal-600", text: "text-teal-600", bg: "bg-teal-50/50 border-teal-200" }
                        ].map((fac, fi) => (
                            <div key={fi} className={`p-6 border-2 ${fac.bg} rounded-2xl hover-lift relative overflow-hidden group shadow-xs transition-all duration-300`}>
                                <div className={`absolute top-0 left-0 w-2 h-full ${fac.bar}`} />
                                <span className={`text-[11px] font-mono font-black ${fac.text} block mb-2`}>{fac.icon} / INFRASTRUCTURE</span>
                                <h4 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-blue-700 transition-colors">{fac.title}</h4>
                                <p className="text-slate-600 leading-relaxed text-xs">{fac.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COLLECTIONS DIRECTORY */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-200 gap-4">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-widest text-purple-700 block mb-1 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full w-fit">Archives</span>
                            <h2 className="text-3xl font-serif font-bold text-slate-900 mt-2">Campus Collections & Photo Albums</h2>
                        </div>
                        <span className="text-xs text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full">{albums.length} Catalogued Collections</span>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20 text-slate-400">
                            <Loader2 className="animate-spin mx-auto mb-2 text-amber-500" />
                            Loading collections...
                        </div>
                    ) : albums.length === 0 ? (
                        <p className="text-xs text-slate-400 py-12 text-center">No catalogued photo albums at this time.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {albums.map((album) => (
                                <Link 
                                    key={album._id} 
                                    to={`/gallery/${album._id}`}
                                    className="group border-2 border-slate-200 bg-white flex flex-col justify-between hover-lift overflow-hidden rounded-2xl transition-all shadow-xs hover:shadow-xl hover:border-blue-400"
                                >
                                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative border-b border-slate-200">
                                        <img 
                                            src={album.coverImage || "https://placehold.co/600x400"} 
                                            alt={album.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                        />
                                        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border border-white/20">
                                            {album.images?.length || 0} Photos
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-bold text-base text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                                            {album.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                                            {album.description}
                                        </p>
                                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                            <span>Open Collection</span>
                                            <ArrowRight size={13} />
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
