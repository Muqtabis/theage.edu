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
    Landmark,
    Award,
    Sparkles,
    MapPin,
    Users,
    CheckCircle2
} from 'lucide-react';
import heroBg from '../assets/theageheader.jpg';
import { useSiteContent } from '../context/ContentContext';

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

    const heroImageSource = home.heroImageUrl || heroBg;

    return (
        <div className="font-sans text-slate-800 bg-[#f8fafc] selection:bg-amber-400 selection:text-slate-950">
            
            {/* ==========================================
                1. VIBRANT INSTITUTIONAL HERO
            ========================================== */}
            <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 overflow-hidden">
                {/* Background image with colorful warm scrim */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroImageSource} 
                        alt="The Age School Campus Grounds" 
                        className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.08] scale-102 hover:scale-100 transition-transform duration-1000 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-blue-900/35" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent" />
                </div>

                {/* Joyful ambient glowing color orbs */}
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute bottom-16 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-float" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 md:py-36">
                    <div className="max-w-2xl">
                        
                        {/* High-visibility Admissions Beacon */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-amber-400 text-slate-950 rounded-full mb-6 shadow-lg shadow-amber-400/25 animate-float">
                            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
                            <span className="text-xs font-black uppercase tracking-wider">
                                {home.heroBadge || general.admissionsBadge || 'Admissions Open 2026–27: Nursery to Grade XII'}
                            </span>
                        </div>

                        {/* Masthead Headline */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white mb-6 leading-[1.08] tracking-tight">
                            <span className="text-white">
                                {home.heroTitleLine1 || 'Future Ready.'}
                            </span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 font-extrabold">
                                {home.heroTitleHighlight || 'Values Driven.'}
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-blue-100 leading-relaxed font-normal mb-8 sm:mb-10 max-w-xl">
                            {home.heroSubtitle || 'A distinguished K-12 institution in Basavakalyan cultivating academic supremacy, ethical conviction, and civic leadership.'}
                        </p>

                        {/* High-Converting Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                            <Link 
                                to="/admissions" 
                                className="shimmer-btn btn-amber px-7 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-xl shadow-amber-500/30 active:scale-95 transition-transform"
                            >
                                <GraduationCap size={18} />
                                <span>{home.ctaApplyText || 'Apply for Admission'}</span>
                                <ArrowRight size={16} />
                            </Link>
                            
                            <Link 
                                to="/academics" 
                                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border-2 border-white/40 hover:border-white transition-all duration-200 flex items-center gap-2 active:scale-95"
                            >
                                <span>Explore All 17 Classes</span>
                            </Link>
                        </div>

                        {/* Mobile Quick Highlights */}
                        <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap gap-4 text-xs font-semibold text-blue-100">
                            <span className="flex items-center gap-1.5 bg-blue-900/60 backdrop-blur-xs px-3 py-1 rounded-full border border-blue-700/50">
                                <Award size={13} className="text-amber-400" />
                                100% Board Results
                            </span>
                            <span className="flex items-center gap-1.5 bg-blue-900/60 backdrop-blur-xs px-3 py-1 rounded-full border border-blue-700/50">
                                <Users size={13} className="text-amber-400" />
                                1:20 Teacher Ratio
                            </span>
                            <span className="flex items-center gap-1.5 bg-blue-900/60 backdrop-blur-xs px-3 py-1 rounded-full border border-blue-700/50">
                                <MapPin size={13} className="text-amber-400" />
                                Basavakalyan Campus
                            </span>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                OFFICIAL VIBRANT NOTICE TICKER
            ========================================== */}
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-slate-950 py-3 px-4 sm:px-8 shadow-sm border-b border-amber-300">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
                        <span className="shrink-0 text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-red-600 text-white rounded-full flex items-center gap-1.5 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            OFFICIAL NOTICE
                        </span>
                        <p className="text-xs font-bold text-slate-900 truncate">
                            {general.noticeMarquee || 'ADMISSIONS OPEN FOR SESSION 2026-2027: Pre-Nursery to Grade XII (Science & Commerce) • Schedule Campus Tour • SSLC Preparatory Clinics Commencing Soon'}
                        </p>
                    </div>
                    <Link 
                        to="/news" 
                        className="group shrink-0 text-xs font-black text-blue-950 hover:text-blue-800 transition-colors flex items-center gap-1 underline decoration-2 decoration-blue-950/40"
                    >
                        <span>Official Circulars</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* ==========================================
                2. COLORFUL INSTITUTIONAL METRICS
            ========================================== */}
            <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        
                        {/* 1. Students - Blue */}
                        <div className="hover-lift p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:border-blue-500 transition-all duration-300 group shadow-xs">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform">
                                <GraduationCap size={22} />
                            </div>
                            <span className="text-3xl sm:text-4xl font-serif font-black text-blue-900 block mb-1">
                                {home.statsStudents || '500+'}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wide text-blue-700 block mb-1">
                                Enrolled Scholars
                            </span>
                            <span className="text-[11px] text-slate-500 block leading-tight">
                                Early Childhood to Senior Grade XII
                            </span>
                        </div>

                        {/* 2. Board Record - Amber */}
                        <div className="hover-lift p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 hover:border-amber-500 transition-all duration-300 group shadow-xs">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-3 shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                                <Award size={22} />
                            </div>
                            <span className="text-3xl sm:text-4xl font-serif font-black text-amber-900 block mb-1">
                                {home.statsPassRate || '100%'}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wide text-amber-700 block mb-1">
                                Board Pass Record
                            </span>
                            <span className="text-[11px] text-slate-500 block leading-tight">
                                KSEAB SSLC & PUC State Board
                            </span>
                        </div>

                        {/* 3. Faculty - Emerald */}
                        <div className="hover-lift p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 hover:border-emerald-500 transition-all duration-300 group shadow-xs">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                <Users size={22} />
                            </div>
                            <span className="text-3xl sm:text-4xl font-serif font-black text-emerald-900 block mb-1">
                                {home.statsFaculty || '35+'}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wide text-emerald-700 block mb-1">
                                Dedicated Faculty
                            </span>
                            <span className="text-[11px] text-slate-500 block leading-tight">
                                Post-Graduate Certified Educators
                            </span>
                        </div>

                        {/* 4. Distinction - Purple */}
                        <div className="hover-lift p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 hover:border-purple-500 transition-all duration-300 group shadow-xs">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                                <Shield size={22} />
                            </div>
                            <span className="text-3xl sm:text-4xl font-serif font-black text-purple-900 block mb-1">
                                {home.statsYears || '12+'}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wide text-purple-700 block mb-1">
                                Years of Excellence
                            </span>
                            <span className="text-[11px] text-slate-500 block leading-tight">
                                Chartered 2012 in Basavakalyan
                            </span>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                3. PRINCIPLES OF EXCELLENCE (Vibrant Pillars)
            ========================================== */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-3xl mb-12 sm:mb-16">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 block mb-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full w-fit">
                        Institutional Philosophy
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                        A Framework Built on Academic Rigor & Ethical Bearing.
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                        We blend disciplined scholarship with progressive inquiry, ensuring students master foundational knowledge while developing independent critical thinking.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: BookOpen,
                            title: home.bento1Title || 'Applied STEM & Technology',
                            desc: home.bento1Desc || 'Modern robotics, laboratory experimentation, and computational thinking starting from the primary years.',
                            tag: 'Laboratory Studies',
                            color: 'from-blue-600 to-cyan-500',
                            bg: 'bg-blue-50/70 border-blue-200',
                            badge: 'bg-blue-100 text-blue-800'
                        },
                        {
                            icon: Shield,
                            title: home.bento2Title || 'Character & Moral Values',
                            desc: home.bento2Desc || 'Integrity, humility, empathy, and social responsibility woven into the daily rhythm of campus life.',
                            tag: 'Ethical Guidance',
                            color: 'from-amber-500 to-orange-500',
                            bg: 'bg-amber-50/70 border-amber-200',
                            badge: 'bg-amber-100 text-amber-800'
                        },
                        {
                            icon: Compass,
                            title: home.bento3Title || 'Global Perspective',
                            desc: home.bento3Desc || 'A state curriculum elevated with national standards, preparing scholars for higher education and competitive examinations.',
                            tag: 'Scholastic Breadth',
                            color: 'from-emerald-500 to-teal-500',
                            bg: 'bg-emerald-50/70 border-emerald-200',
                            badge: 'bg-emerald-100 text-emerald-800'
                        },
                        {
                            icon: GraduationCap,
                            title: home.bento4Title || 'Individual Mentorship',
                            desc: home.bento4Desc || 'Every child is recognized as unique. Personalized academic interventions ensure no student is left behind.',
                            tag: 'Ratio 1:20',
                            color: 'from-purple-600 to-pink-500',
                            bg: 'bg-purple-50/70 border-purple-200',
                            badge: 'bg-purple-100 text-purple-800'
                        }
                    ].map((pillar, pi) => {
                        const Icon = pillar.icon;
                        return (
                            <div 
                                key={pi} 
                                className={`hover-lift p-7 sm:p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 flex flex-col justify-between group shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pillar.color}`} />

                                <div>
                                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center mb-6 shadow-md shadow-slate-200 group-hover:scale-110 transition-transform`}>
                                        <Icon size={24} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                                <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
                                    <span className={`px-2.5 py-1 rounded-full ${pillar.badge}`}>{pillar.tag}</span>
                                    <ArrowRight size={14} className="text-blue-600 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ==========================================
                4. ACADEMIC WINGS & CLASS STRUCTURE (Vibrant Directory)
            ========================================== */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block mb-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                                Academic Progression
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                                Progressive Class Structures & Wings
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                                Every single grade—from early childhood playgroup to SSLC board examinations and pre-university science & commerce—is structured with specialized pedagogy and dedicated faculty.
                            </p>
                        </div>
                        <Link 
                            to="/academics" 
                            className="btn-blue text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 self-start md:self-auto px-5 py-3 rounded-xl shadow-md active:scale-95"
                        >
                            <span>Open Detailed Class Directory</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { 
                                wing: "Pre-Primary Wing (ECCE)", 
                                age: "Ages 2.5 to 6 Years", 
                                classes: ["Playgroup", "Nursery", "Lower KG (LKG)", "Upper KG (UKG)"],
                                desc: "Montessori & play-based early foundation: phonics, sensory exploration, and joyful number sense in vibrant classrooms.",
                                tag: "Early Childhood Care",
                                color: "from-amber-400 to-orange-500",
                                cardBg: "bg-amber-50/40 hover:bg-amber-50/80 border-amber-200 hover:border-amber-400",
                                badge: "bg-amber-100 text-amber-900 border-amber-300",
                                pillHover: "hover:bg-amber-500 hover:text-white"
                            },
                            { 
                                wing: "Primary School Wing", 
                                age: "Classes I to V (Ages 6 to 11)", 
                                classes: ["Class I", "Class II", "Class III", "Class IV", "Class V (Capstone)"],
                                desc: "Formal literacy, three-language formula (Kannada, English, Hindi), mental arithmetic, and environmental sciences.",
                                tag: "Foundational Literacy",
                                color: "from-blue-500 to-indigo-600",
                                cardBg: "bg-blue-50/40 hover:bg-blue-50/80 border-blue-200 hover:border-blue-400",
                                badge: "bg-blue-100 text-blue-900 border-blue-300",
                                pillHover: "hover:bg-blue-600 hover:text-white"
                            },
                            { 
                                wing: "Middle School Wing", 
                                age: "Classes VI to VIII (Ages 11 to 14)", 
                                classes: ["Class VI", "Class VII", "Class VIII (Capstone)"],
                                desc: "Subject-specialist mentoring: Physics, Chemistry & Biology laboratory experiments, linear algebra, and world history.",
                                tag: "STEM & Departmental Science",
                                color: "from-emerald-500 to-teal-600",
                                cardBg: "bg-emerald-50/40 hover:bg-emerald-50/80 border-emerald-200 hover:border-emerald-400",
                                badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
                                pillHover: "hover:bg-emerald-600 hover:text-white"
                            },
                            { 
                                wing: "Secondary School Wing (SSLC)", 
                                age: "Classes IX & X (Ages 14 to 16)", 
                                classes: ["Class IX (Foundation)", "Class X (Board Exam)"],
                                desc: "Rigorous secondary board syllabus completion, 3 Pre-Board model series, remedial doubt clinics, and 100% pass record.",
                                tag: "Board Examination Center",
                                color: "from-indigo-500 to-purple-600",
                                cardBg: "bg-indigo-50/40 hover:bg-indigo-50/80 border-indigo-200 hover:border-indigo-400",
                                badge: "bg-indigo-100 text-indigo-900 border-indigo-300",
                                pillHover: "hover:bg-indigo-600 hover:text-white"
                            },
                            { 
                                wing: "Senior Secondary / PUC Science", 
                                age: "Classes XI & XII (Ages 16 to 18)", 
                                classes: ["Class XI (PCMB/PCMC)", "Class XII (State PUC Board)"],
                                desc: "Physics, Chemistry, Math, Biology / Computer Science with integrated entrance training for KCET, NEET, and JEE.",
                                tag: "Pre-University Science",
                                color: "from-cyan-500 to-blue-600",
                                cardBg: "bg-cyan-50/40 hover:bg-cyan-50/80 border-cyan-200 hover:border-cyan-400",
                                badge: "bg-cyan-100 text-cyan-900 border-cyan-300",
                                pillHover: "hover:bg-cyan-600 hover:text-white"
                            },
                            { 
                                wing: "Senior Secondary / PUC Commerce & Arts", 
                                age: "Classes XI & XII (Ages 16 to 18)", 
                                classes: ["Class XI (Commerce/Arts)", "Class XII (Commerce/Arts)"],
                                desc: "Accountancy, Business Studies, Economics, History, and Political Science with CA Foundation and CLAT mentoring.",
                                tag: "Pre-University Commerce",
                                color: "from-rose-500 to-pink-600",
                                cardBg: "bg-rose-50/40 hover:bg-rose-50/80 border-rose-200 hover:border-rose-400",
                                badge: "bg-rose-100 text-rose-900 border-rose-300",
                                pillHover: "hover:bg-rose-600 hover:text-white"
                            }
                        ].map((div, i) => (
                            <div 
                                key={i} 
                                className={`hover-lift p-6 sm:p-7 rounded-2xl border-2 flex flex-col justify-between transition-all duration-300 group shadow-xs hover:shadow-xl relative overflow-hidden ${div.cardBg}`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${div.color}`} />

                                <div>
                                    <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-wider">
                                        <span className={`px-2.5 py-0.5 rounded-full border shadow-2xs ${div.badge}`}>{div.tag}</span>
                                        <span className="text-slate-500 font-mono font-bold bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">{div.age}</span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                                        {div.wing}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                                        {div.desc}
                                    </p>
                                </div>
                                
                                <div className="pt-4 border-t border-slate-200/80">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                                        Covered Classes:
                                    </span>
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {div.classes.map((cName, ci) => (
                                            <span 
                                                key={ci} 
                                                className={`text-[11px] font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 transition-colors duration-200 cursor-default shadow-2xs ${div.pillHover}`}
                                            >
                                                {cName}
                                            </span>
                                        ))}
                                    </div>
                                    <Link 
                                        to="/academics" 
                                        className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 transition-colors group-hover:underline"
                                    >
                                        <span>Inspect Syllabus & Timings</span>
                                        <ArrowRight size={13} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                5. CAMPUS MOMENTS (Vibrant Photo Showcase)
            ========================================== */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-end mb-8 sm:mb-12">
                    <div>
                        <span className="text-xs font-extrabold uppercase tracking-widest text-purple-700 block mb-2 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full w-fit">
                            Campus Chronicle
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Life & Learning in Pictures</h2>
                    </div>
                    {slideshowPhotos.length > 1 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={prevSlide} 
                                className="w-10 h-10 border border-slate-300 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all shadow-xs cursor-pointer active:scale-95"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="w-10 h-10 border border-slate-300 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all shadow-xs cursor-pointer active:scale-95"
                                aria-label="Next"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full border border-slate-200 bg-slate-950 overflow-hidden rounded-2xl group shadow-lg">
                    {isGalleryLoading ? (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Loader2 size={32} className="animate-spin text-amber-400" />
                        </div>
                    ) : slideshowPhotos.length > 0 ? (
                        <div className="relative w-full h-full overflow-hidden">
                            <img 
                                src={slideshowPhotos[currentIndex]?.src} 
                                alt={slideshowPhotos[currentIndex]?.title || 'Campus Moment'} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">Campus Record</span>
                                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2">
                                    {slideshowPhotos[currentIndex]?.title || 'Campus Life'}
                                </h3>
                                <Link 
                                    to="/student-life" 
                                    className="text-xs font-bold text-blue-200 hover:text-white transition-colors inline-flex items-center gap-1.5"
                                >
                                    <span>Browse All Collections</span>
                                    <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            Campus photo moments will appear here once albums are published.
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                6. DISPATCHES & CALENDAR (Energetic Section)
            ========================================== */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Notice & Bulletins Column */}
                        <div className="lg:col-span-7 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-6">
                                    <span className="text-xs font-black uppercase tracking-wider text-blue-700 flex items-center gap-2">
                                        <Award size={15} className="text-amber-500" />
                                        Official School Bulletins
                                    </span>
                                    <Link to="/news" className="text-xs font-bold text-blue-600 hover:underline">
                                        View All
                                    </Link>
                                </div>

                                {latestNews ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit">
                                            <Clock size={13} />
                                            <span>{latestNews.date || 'Recent Notification'}</span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-blue-700 transition-colors">
                                            {latestNews.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                                            {latestNews.content}
                                        </p>
                                        <Link to="/news" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors pt-2">
                                            <span>Read Full Dispatch</span>
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 py-8">Official bulletins will be posted here as they are published.</p>
                                )}
                            </div>

                            <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                                <span>Published under Directorate of Academics</span>
                                <Link to="/news" className="font-bold text-slate-700 hover:text-blue-600">
                                    Archives & Circulars →
                                </Link>
                            </div>
                        </div>

                        {/* Calendar / Events Column */}
                        <div className="lg:col-span-5 hover-lift bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl border-2 border-blue-800 shadow-xl flex flex-col justify-between group relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6 pb-3 border-b border-blue-800">
                                    <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                                        <Calendar size={16} />
                                        Upcoming School Dates
                                    </span>
                                </div>

                                {nearestEvent ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex flex-col items-center justify-center shrink-0 shadow-md">
                                                <span className="text-2xl font-black leading-none">
                                                    {new Date(nearestEvent.eventDate).getDate()}
                                                </span>
                                                <span className="text-[10px] font-black uppercase tracking-tight">
                                                    {new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-base font-bold text-white block leading-tight">
                                                    {nearestEvent.title}
                                                </span>
                                                <span className="text-xs text-blue-200 flex items-center gap-1 mt-1">
                                                    <MapPin size={12} className="text-amber-400 shrink-0" />
                                                    {nearestEvent.location || 'Main Campus Auditorium'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-6">
                                        <h4 className="text-base font-bold mb-1">Term Examination Dates</h4>
                                        <p className="text-xs text-blue-200">Scheduled events and parent-teacher consultations will be announced here.</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 mt-6 border-t border-blue-800 relative z-10">
                                <Link 
                                    to="/contact" 
                                    className="shimmer-btn btn-amber w-full py-3.5 text-slate-950 text-xs font-black uppercase tracking-wider text-center block rounded-xl shadow-lg"
                                >
                                    Inquire with Administration Office
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
