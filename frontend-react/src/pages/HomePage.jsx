import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Calendar, 
    Loader2, 
    ChevronLeft, 
    ChevronRight, 
    ArrowRight, 
    Clock,
    BookOpen,
    GraduationCap,
    Shield,
    Compass,
    Award,
    MapPin,
    Users,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import InteractiveHeroSlider from '../components/InteractiveHeroSlider';
import HeadmasterWelcome from '../components/HeadmasterWelcome';
import AnimatedStatCounter from '../components/AnimatedStatCounter';
import GradeFinder from '../components/GradeFinder';
import CampusFacilitySwitcher from '../components/CampusFacilitySwitcher';
import TestimonialsSlider from '../components/TestimonialsSlider';
import FaqAccordion from '../components/FaqAccordion';
import QuickInquiryModal from '../components/QuickInquiryModal';

const API_BASE_URL = '/api';

const HomePage = () => {
    const { content } = useSiteContent();
    const home = content?.home || {};
    const general = content?.general || {};

    const [latestNews, setLatestNews] = useState(null);
    const [nearestEvent, setNearestEvent] = useState(null);
    const [slideshowPhotos, setSlideshowPhotos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGalleryLoading, setIsGalleryLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const [newsRes, eventsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/news`),
                    fetch(`${API_BASE_URL}/events`)
                ]);

                if (newsRes.ok) {
                    const newsData = await newsRes.json();
                    if (Array.isArray(newsData) && newsData.length > 0) {
                        const sortedNews = [...newsData].sort(
                            (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
                        );
                        setLatestNews(sortedNews[0]);
                    }
                }

                if (eventsRes.ok) {
                    const eventsData = await eventsRes.json();
                    if (Array.isArray(eventsData) && eventsData.length > 0) {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const futureEvents = eventsData
                            .filter(ev => new Date(ev.eventDate) >= today)
                            .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                        setNearestEvent(futureEvents[0] || eventsData[0]);
                    }
                }
            } catch (err) {
                console.error("Error fetching homepage feeds:", err);
            }
        };
        fetchContent();
    }, []);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/albums`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const photos = [];
                        data.forEach(album => {
                            if (album.coverImage && !album.coverImage.includes('placehold.co')) {
                                photos.push({ src: album.coverImage, title: album.title, id: album._id });
                            }
                            if (Array.isArray(album.images)) {
                                album.images.forEach(img => {
                                    photos.push({ src: img.src, title: album.title, id: album._id });
                                });
                            }
                        });
                        setSlideshowPhotos(photos.slice(0, 6));
                    }
                }
            } catch (err) {
                console.error("Error fetching albums:", err);
            } finally {
                setIsGalleryLoading(false);
            }
        };
        fetchAlbums();
    }, []);

    const nextSlide = () => setCurrentIndex(prev => (prev + 1) % Math.max(1, slideshowPhotos.length));
    const prevSlide = () => setCurrentIndex(prev => (prev - 1 + slideshowPhotos.length) % Math.max(1, slideshowPhotos.length));

    return (
        <div className="font-sans text-slate-900 bg-white selection:bg-blue-100 selection:text-blue-900">
            
            {/* ==========================================
                1. FULL-WIDTH CINEMATIC HERO SLIDER
            ========================================== */}
            <InteractiveHeroSlider 
                admissionsBadge={home.heroBadge || general.admissionsBadge} 
                onOpenModal={() => setIsModalOpen(true)}
            />

            {/* ==========================================
                OFFICIAL NOTICE MARQUEE TICKER (BRIGHT GRADIENT)
            ========================================== */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-2.5 sm:py-3 px-3 sm:px-8 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden w-full sm:w-auto">
                        <span className="shrink-0 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded-full shadow-2xs">
                            OFFICIAL GAZETTE
                        </span>
                        <p className="text-xs font-medium text-white truncate">
                            {general.noticeMarquee || 'ADMISSIONS OPEN FOR SESSION 2026-2027: Pre-Nursery to Grade XII (Science & Commerce) • Schedule Campus Tour'}
                        </p>
                    </div>
                    <Link 
                        to="/news" 
                        className="shrink-0 text-xs font-bold text-amber-200 hover:text-white flex items-center gap-1 group transition-colors"
                    >
                        <span>Official Gazette</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* ==========================================
                2. HEADMASTER WELCOME (THE ACADEMIC SOUL)
            ========================================== */}
            <HeadmasterWelcome />

            {/* ==========================================
                3. ANIMATED METRICS BANNER (HIGH DENSITY 2x2)
            ========================================== */}
            <AnimatedStatCounter />

            {/* ==========================================
                4. INSTITUTIONAL PHILOSOPHY & PILLARS (FILLED & RICH)
            ========================================== */}
            <section className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
                    <div className="max-w-2xl">
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-1.5 flex items-center gap-1.5">
                            <Sparkles size={14} className="text-blue-600" />
                            Pillars of Academic Supremacy
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight">
                            Holistic Framework Built on Rigor & Bearing.
                        </h2>
                    </div>
                    <Link 
                        to="/about" 
                        className="btn-secondary text-xs self-start md:self-auto py-2 px-3.5"
                    >
                        <span>Read Full Philosophy</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        {
                            icon: BookOpen,
                            title: home.bento1Title || 'Applied STEM & Technology',
                            desc: home.bento1Desc || 'Modern robotics, laboratory experimentation, and computational thinking starting from the primary years.',
                            tag: 'Laboratory Studies',
                            color: 'bg-blue-100 text-blue-600',
                            tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
                            bullets: ['Physics, Chemistry & Bio labs', 'Hands-on Arduino robotics', 'Math Olympiad mentorship']
                        },
                        {
                            icon: Shield,
                            title: home.bento2Title || 'Character & Moral Values',
                            desc: home.bento2Desc || 'Integrity, humility, empathy, and social responsibility woven into the daily rhythm of campus life.',
                            tag: 'Ethical Guidance',
                            color: 'bg-amber-100 text-amber-600',
                            tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
                            bullets: ['Daily moral assembly discourse', 'Community service outreach', 'Respect & personal discipline']
                        },
                        {
                            icon: Compass,
                            title: home.bento3Title || 'Global Perspective',
                            desc: home.bento3Desc || 'A state curriculum elevated with national standards, preparing scholars for higher education and competitive examinations.',
                            tag: 'Scholastic Breadth',
                            color: 'bg-purple-100 text-purple-600',
                            tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
                            bullets: ['Trilingual fluency training', 'National debate competitions', 'Competitive entrance prep']
                        },
                        {
                            icon: GraduationCap,
                            title: home.bento4Title || 'Individual Mentorship',
                            desc: home.bento4Desc || 'Every child is recognized as unique. Personalized academic interventions ensure no student is left behind.',
                            tag: 'Ratio 1:20',
                            color: 'bg-emerald-100 text-emerald-600',
                            tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                            bullets: ['Remedial doubt sessions', 'Regular parent consultations', 'Dedicated house wardens']
                        }
                    ].map((pillar, pi) => {
                        const Icon = pillar.icon;
                        return (
                            <div 
                                key={pi} 
                                className="academic-card p-4 sm:p-5 flex flex-col justify-between group cursor-default shadow-xs hover:shadow-md transition-all"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-xl ${pillar.color} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                                            <Icon size={20} strokeWidth={2} />
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pillar.tagColor}`}>{pillar.tag}</span>
                                    </div>

                                    <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 leading-snug">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                        {pillar.desc}
                                    </p>

                                    {/* Sub-bullets to fill space meaningfully with rich curriculum facts */}
                                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                        {pillar.bullets.map((b, bi) => (
                                            <div key={bi} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                                                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                                                <span>{b}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-600 flex items-center justify-between">
                                    <span>Learn curriculum details</span>
                                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ==========================================
                5. INTERACTIVE ALL 17 CLASSES EXPLORER
            ========================================== */}
            <GradeFinder />

            {/* ==========================================
                6. INTERACTIVE CAMPUS FACILITIES SHOWCASE
            ========================================== */}
            <CampusFacilitySwitcher onOpenModal={() => setIsModalOpen(true)} />

            {/* ==========================================
                7. THE FOUR HOUSES SYSTEM (COMPACT 2x2 ON MOBILE)
            ========================================== */}
            <section className="py-8 sm:py-14 bg-slate-50 border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-1">
                                House System & Heraldic Pride
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
                                The Four Houses Tradition
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                            Every scholar is initiated into one of four houses, fostering healthy competition, leadership, and lifelong fellowship.
                        </p>
                    </div>

                    {/* 2-column on mobile, 4-column on desktop - FILLS SPACE PERFECTLY */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                        {[
                            { 
                                name: "Ashoka House", 
                                motto: "Courage & Righteousness", 
                                border: "border-red-200 hover:border-red-400",
                                badge: "bg-red-50 text-red-700 border-red-200",
                                mottoColor: "text-red-700",
                                accent: "bg-red-500",
                                desc: "Moral leadership, resilience, and unyielding fortitude in service to society.",
                                values: ["Bravery", "Social Honor", "Integrity"]
                            },
                            { 
                                name: "Tagore House", 
                                motto: "Creativity & Wisdom", 
                                border: "border-amber-200 hover:border-amber-400",
                                badge: "bg-amber-50 text-amber-700 border-amber-200",
                                mottoColor: "text-amber-700",
                                accent: "bg-amber-500",
                                desc: "Artistic self-expression, literary fluency, and open-minded inquiry.",
                                values: ["Literature", "Fine Arts", "Eloquence"]
                            },
                            { 
                                name: "Raman House", 
                                motto: "Inquiry & Scientific Truth", 
                                border: "border-blue-200 hover:border-blue-400",
                                badge: "bg-blue-50 text-blue-700 border-blue-200",
                                mottoColor: "text-blue-700",
                                accent: "bg-blue-600",
                                desc: "Empirical logic, innovation, mathematics, and technological marvels.",
                                values: ["Empirical Logic", "STEM", "Discovery"]
                            },
                            { 
                                name: "Kalam House", 
                                motto: "Vision & Dedication", 
                                border: "border-emerald-200 hover:border-emerald-400",
                                badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
                                mottoColor: "text-emerald-700",
                                accent: "bg-emerald-600",
                                desc: "Soaring aspirations, scientific patriotism, humility, and steadfast diligence.",
                                values: ["Humility", "Diligence", "Patriotism"]
                            }
                        ].map((h, hi) => (
                            <div 
                                key={hi} 
                                className={`academic-card p-3.5 sm:p-5 flex flex-col justify-between group border ${h.border} shadow-xs hover:shadow-md transition-all`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className={`w-2.5 h-2.5 rounded-full ${h.accent}`} />
                                        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${h.badge}`}>
                                            House
                                        </span>
                                    </div>
                                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors leading-tight">
                                        {h.name}
                                    </h3>
                                    <p className={`text-[11px] sm:text-xs font-semibold italic mb-2 ${h.mottoColor}`}>"{h.motto}"</p>
                                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-3">{h.desc}</p>
                                </div>

                                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                                    {h.values.map((val, vi) => (
                                        <span key={vi} className="text-[9px] sm:text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md">
                                            {val}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                8. CAMPUS MOMENTS (PHOTO SLIDER - COMPACT)
            ========================================== */}
            <section className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-end mb-4 sm:mb-6">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-1">
                            Campus Chronicle
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">Life & Learning in Pictures</h2>
                    </div>
                    {slideshowPhotos.length > 1 && (
                        <div className="flex gap-1.5">
                            <button 
                                onClick={prevSlide} 
                                className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer shadow-2xs"
                                aria-label="Previous photo"
                            >
                                <ChevronLeft size={15} />
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer shadow-2xs"
                                aria-label="Next photo"
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative h-[260px] sm:h-[360px] md:h-[420px] w-full border border-slate-200 bg-slate-100 overflow-hidden rounded-2xl group img-zoom-box shadow-md">
                    {isGalleryLoading ? (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-blue-600" />
                        </div>
                    ) : slideshowPhotos.length > 0 ? (
                        <div className="relative w-full h-full overflow-hidden">
                            <img 
                                src={slideshowPhotos[currentIndex]?.src} 
                                alt={slideshowPhotos[currentIndex]?.title || 'Campus Moment'} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-8">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-0.5">Campus Record</span>
                                <h3 className="text-lg sm:text-2xl font-serif font-bold text-white mb-1.5">
                                    {slideshowPhotos[currentIndex]?.title || 'Campus Life'}
                                </h3>
                                <Link 
                                    to="/student-life" 
                                    className="text-xs font-semibold text-amber-300 hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    <span>Browse All Photo Collections</span>
                                    <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            Campus photo moments will appear here once albums are published.
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                9. TESTIMONIALS SLIDER
            ========================================== */}
            <TestimonialsSlider />

            {/* ==========================================
                10. DISPATCHES & CALENDAR (COMPACT & PACKED)
            ========================================== */}
            <section className="py-8 sm:py-14 bg-slate-50 border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                        
                        {/* Notice & Bulletins Column */}
                        <div className="lg:col-span-7 academic-card p-5 sm:p-6 flex flex-col justify-between bg-white shadow-xs">
                            <div>
                                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                                        <Award size={14} className="text-blue-600" />
                                        Official School Bulletins
                                    </span>
                                    <Link to="/news" className="text-xs font-bold text-blue-600 hover:text-blue-800">
                                        View All Circulars
                                    </Link>
                                </div>

                                {latestNews ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold">
                                            <Clock size={12} />
                                            <span>{latestNews.date || 'Recent Notification'}</span>
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug">
                                            {latestNews.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                                            {latestNews.content}
                                        </p>
                                        <Link to="/news" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors pt-1">
                                            <span>Read Full Dispatch</span>
                                            <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 py-4">Official bulletins will be posted here as they are published.</p>
                                )}
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                                <span>Directorate of Academics</span>
                                <Link to="/news" className="font-semibold text-slate-700 hover:text-blue-600">
                                    Archives & Circulars →
                                </Link>
                            </div>
                        </div>

                        {/* Calendar / Events Column */}
                        <div className="lg:col-span-5 academic-card p-5 sm:p-6 flex flex-col justify-between bg-white shadow-xs">
                            <div>
                                <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                                        <Calendar size={14} className="text-blue-600" />
                                        Academic Calendar & Dates
                                    </span>
                                </div>

                                {nearestEvent ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                                            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                                                <span className="text-lg font-serif font-bold leading-none">
                                                    {new Date(nearestEvent.eventDate).getDate()}
                                                </span>
                                                <span className="text-[9px] font-bold uppercase tracking-tight mt-0.5">
                                                    {new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs sm:text-sm font-bold text-slate-900 block leading-tight">
                                                    {nearestEvent.title}
                                                </span>
                                                <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                                    <MapPin size={11} className="text-blue-600 shrink-0" />
                                                    {nearestEvent.location || 'Main Campus Auditorium'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-4">
                                        <h4 className="text-xs font-bold text-slate-900 mb-0.5">Term Examination Dates</h4>
                                        <p className="text-[11px] text-slate-500">Scheduled events and parent consultations announced here.</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100">
                                <Link 
                                    to="/contact" 
                                    className="btn-secondary w-full text-center text-xs justify-center py-2"
                                >
                                    Inquire with Administration Desk
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                11. INTERACTIVE FAQ ACCORDION
            ========================================== */}
            <FaqAccordion />

            {/* Quick Inquiry Modal */}
            <QuickInquiryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />

        </div>
    );
};

export default HomePage;
