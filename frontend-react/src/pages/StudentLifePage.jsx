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

    return (
        <div className="font-sans text-slate-800 bg-white w-full overflow-x-hidden selection:bg-blue-600 selection:text-white">
            
            {/* HERO */}
            <section className="bg-slate-50 border-b border-slate-200/80 py-16 sm:py-24 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 inline-flex items-center gap-2 mb-4 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                        <Sparkles size={14} className="text-blue-600" />
                        <span>{studentLife.heroBadge || 'Beyond Academics'}</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 tracking-tight">
                        {studentLife.heroTitle || 'Life at The Age School'}
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        {studentLife.heroSubtitle || 'A community where character is forged through sport, artistic discipline, fellowship, and civic duty.'}
                    </p>
                </div>
            </section>

            {/* THREE PILLARS (Activities) */}
            <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-2xl mb-12 sm:mb-14">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                        Co-Curricular Excellence
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900">Holistic Development</h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">Cultivating mind, body, and artistic expression through structured daily disciplines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            num: "01",
                            title: "Athletics & Physical Fitness",
                            desc: "Team sports, track events, and morning yoga instilling fitness, humility in victory, and resilience in defeat.",
                            tags: ["Basketball", "Cricket", "Athletics", "Morning Yoga", "Kho-Kho"],
                        },
                        {
                            num: "02",
                            title: "Fine Arts, Music & Drama",
                            desc: "Creative self-expression through classical vocal traditions, dramatic performance, and painting studios.",
                            tags: ["Theatre Club", "Visual Arts", "Vocal Choir", "Handicrafts", "Classical Dance"],
                        },
                        {
                            num: "03",
                            title: "Robotics, Debating & Clubs",
                            desc: "Active student-led councils, scientific inquiry olympiads, and bilingual public speaking forums.",
                            tags: ["Robotics Lab", "Debate Society", "Eco-Club", "Science Olympiad", "Civic Forum"],
                        }
                    ].map((act, i) => (
                        <div 
                            key={i} 
                            className="card-minimal p-6 sm:p-7 flex flex-col justify-between group"
                        >
                            <div>
                                <span className="text-xs font-mono font-bold text-blue-600 block mb-3">{act.num}.</span>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{act.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6">{act.desc}</p>
                            </div>
                            {Array.isArray(act.tags) && (
                                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                                    {act.tags.map((t, ti) => (
                                        <span 
                                            key={ti} 
                                            className="text-[11px] font-medium px-2.5 py-0.5 border border-slate-200 rounded-md bg-slate-50 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
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
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                            House System
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The Four Houses</h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            Every scholar is initiated into one of our four institutional houses, fostering healthy competition, leadership, and camaraderie.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { 
                                name: "Ashoka House", 
                                motto: "Courage & Righteousness", 
                                desc: "Instilling moral leadership, resilience, and unyielding fortitude in service to society." 
                            },
                            { 
                                name: "Tagore House", 
                                motto: "Creativity & Wisdom", 
                                desc: "Celebrating artistic self-expression, literary fluency, and open-minded inquiry." 
                            },
                            { 
                                name: "Raman House", 
                                motto: "Inquiry & Scientific Truth", 
                                desc: "Championing empirical logic, innovation, mathematics, and technological marvels." 
                            },
                            { 
                                name: "Kalam House", 
                                motto: "Vision & Dedication", 
                                desc: "Nurturing soaring aspirations, scientific patriotism, humility, and steadfast diligence." 
                            }
                        ].map((h, hi) => (
                            <div 
                                key={hi} 
                                className="card-minimal p-6 flex flex-col justify-between group"
                            >
                                <div>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 inline-block mb-3">
                                        House Division
                                    </span>
                                    <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{h.name}</h3>
                                    <p className="text-xs text-blue-600 font-medium mb-3">"{h.motto}"</p>
                                    <p className="text-xs text-slate-600 leading-relaxed">{h.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CAMPUS FACILITIES */}
                <div className="mt-20 pt-16 border-t border-slate-200">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                            Campus Infrastructure
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Modern Facilities & Safety</h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            State-of-the-art infrastructure engineered to provide a healthy, safe, and academically stimulating habitat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { title: "Smart Interactive Classrooms", desc: "Equipped with interactive smart touch panels, high-res audio-visual aids, and ergonomic child-safe furniture.", icon: "01" },
                            { title: "Composite Science & STEM Lab", desc: "Dedicated Physics, Chemistry, Biology, and Robotics experimentation apparatus adhering to safety standards.", icon: "02" },
                            { title: "Central Knowledge Library", desc: "Over 5,000 curated books, periodicals, daily national newspapers, reference encylopedias, and research bays.", icon: "03" },
                            { title: "GPS-Monitored Bus Fleet", desc: "Safe transport covering Basavakalyan and neighboring routes with speed governors and attendants.", icon: "04" },
                            { title: "Athletic Grounds & Courts", desc: "Expansive play area for cricket, football, volleyball, badminton, kho-kho, yoga, and track events.", icon: "05" },
                            { title: "Health Care & RO Purified Water", desc: "On-campus primary infirmary, periodic pediatric health checkups, and commercial RO drinking water.", icon: "06" }
                        ].map((fac, fi) => (
                            <div key={fi} className="card-minimal p-6 group">
                                <span className="text-[11px] font-mono font-bold text-blue-600 block mb-2">{fac.icon} / INFRASTRUCTURE</span>
                                <h4 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">{fac.title}</h4>
                                <p className="text-slate-600 leading-relaxed text-xs">{fac.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COLLECTIONS DIRECTORY */}
            <section className="py-20 bg-slate-50/70 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-200 gap-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">Archives</span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Campus Collections & Photo Albums</h2>
                        </div>
                        <span className="text-xs text-slate-500 font-medium bg-white border border-slate-200 px-3 py-1 rounded-full">{albums.length} Collections</span>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20 text-slate-400">
                            <Loader2 className="animate-spin mx-auto mb-2 text-blue-600" />
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
                                    className="card-minimal flex flex-col justify-between overflow-hidden group"
                                >
                                    <div className="aspect-16/10 bg-slate-100 overflow-hidden relative border-b border-slate-100">
                                        <img 
                                            src={album.coverImage || "https://placehold.co/600x400"} 
                                            alt={album.title} 
                                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                                        />
                                        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs text-white px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-md">
                                            {album.images?.length || 0} Photos
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-bold text-base text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                            {album.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                                            {album.description}
                                        </p>
                                        <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
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
