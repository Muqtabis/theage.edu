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
    ArrowUpRight
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
        <div className="font-sans text-slate-800 bg-[#fbfbfb] selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            
            {/* ==========================================
                1. INSTITUTIONAL HERO
            ========================================== */}
            <section className="relative w-full min-h-[92vh] flex items-center bg-[#06111f] overflow-hidden">
                {/* Background image with refined cinematic scrim */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroImageSource} 
                        alt="The Age School Campus Grounds" 
                        className="w-full h-full object-cover object-center brightness-[0.7] contrast-[1.12] scale-102 hover:scale-100 transition-transform duration-1000 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/98 via-[#06111f]/85 to-[#06111f]/45" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06111f] via-transparent to-transparent" />
                    {/* Subtle grid pattern for architectural precision */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
                </div>

                {/* AMBIENT GLOWING MESH ORBS */}
                <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute bottom-16 right-10 w-[450px] h-[450px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-float" />
                <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-32">
                    <div className="max-w-2xl">
                        
                        {/* Institutional Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#0b1d38]/90 backdrop-blur-md border border-amber-400/60 rounded-full mb-6 shadow-[0_0_25px_rgba(245,158,11,0.3)] animate-float">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-200">
                                {home.heroBadge || general.admissionsBadge || 'Admissions Open for Academic Year 2026–27'}
                            </span>
                        </div>

                        {/* Masthead Headline with Radiant Gradient Sheen */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white mb-6 leading-[1.08] tracking-tight">
                            <span className="text-gradient-gold">
                                {home.heroTitleLine1 || 'Future Ready.'}
                            </span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 italic font-normal">
                                {home.heroTitleHighlight || 'Values Driven.'}
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-10 max-w-xl">
                            {home.heroSubtitle || 'A distinguished K-12 institution in Basavakalyan cultivating academic supremacy, ethical conviction, and civic leadership.'}
                        </p>

                        {/* Action Buttons with High-Impact Color */}
                        <div className="flex flex-wrap items-center gap-4">
                            <Link 
                                to="/admissions" 
                                className="shimmer-btn btn-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-sm flex items-center gap-2.5"
                            >
                                <span>{home.ctaApplyText || 'Apply for Admission'}</span>
                                <ArrowRight size={15} />
                            </Link>
                            
                            <Link 
                                to="/academics" 
                                className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[0.18em] rounded-sm border border-white/30 hover:border-amber-400/60 hover:text-amber-200 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 shadow-sm"
                            >
                                <span>Explore All 17 Classes</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* OFFICIAL URGENT NOTICE TICKER */}
            <div className="bg-gradient-to-r from-[#06111f] via-[#0d2247] to-[#06111f] text-white border-b border-amber-500/25 py-3.5 px-4 sm:px-8 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xs flex items-center gap-1.5 shadow-xs font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            OFFICIAL GAZETTE
                        </span>
                        <p className="text-xs text-amber-100 font-medium truncate">
                            {general.noticeMarquee || 'ADMISSIONS OPEN FOR SESSION 2026-2027: Pre-Nursery to Grade XII (Science & Commerce) • Schedule Campus Tour • SSLC Board Preparatory Clinics Commencing Soon'}
                        </p>
                    </div>
                    <Link 
                        to="/news" 
                        className="group shrink-0 text-xs font-bold text-amber-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                        <span>View All Circulars</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* ==========================================
                2. INSTITUTIONAL METRICS (Vibrant Color Accents)
            ========================================== */}
            <div className="bg-gradient-to-b from-[#06111f] to-[#0a1b32] text-white border-y border-amber-500/20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { 
                                value: home.statsStudents || '500+', 
                                label: 'Enrolled Scholars', 
                                sub: 'Early Childhood to Senior',
                                numColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-indigo-300',
                                badgeBg: 'bg-blue-500/10 border-blue-400/30 text-blue-300',
                                hoverGlow: 'hover:border-blue-400/50 glow-blue'
                            },
                            { 
                                value: home.statsPassRate || '100%', 
                                label: 'Board Examination Record', 
                                sub: 'KSEAB SSLC & PUC State',
                                numColor: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400',
                                badgeBg: 'bg-amber-500/10 border-amber-400/30 text-amber-300',
                                hoverGlow: 'hover:border-amber-400/50 glow-gold'
                            },
                            { 
                                value: home.statsFaculty || '35+', 
                                label: 'Dedicated Faculty', 
                                sub: 'Post-Graduate Educators',
                                numColor: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-300',
                                badgeBg: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300',
                                hoverGlow: 'hover:border-emerald-400/50 glow-emerald'
                            },
                            { 
                                value: home.statsYears || '12+', 
                                label: 'Years of Distinction', 
                                sub: 'Chartered 2012',
                                numColor: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-fuchsia-300',
                                badgeBg: 'bg-purple-500/10 border-purple-400/30 text-purple-300',
                                hoverGlow: 'hover:border-purple-400/50 glow-purple'
                            },
                        ].map((stat, idx) => (
                            <div 
                                key={idx} 
                                className={`hover-lift bg-[#0b1c36]/80 hover:bg-[#0e2447] p-6 rounded-sm border border-white/10 ${stat.hoverGlow} transition-all duration-300 group`}
                            >
                                <span className={`text-3xl sm:text-4xl font-serif font-bold block mb-1.5 ${stat.numColor}`}>
                                    {stat.value}
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200/90 block mb-1">
                                    {stat.label}
                                </span>
                                <span className="text-[10px] text-slate-400 block font-sans">
                                    {stat.sub}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ==========================================
                3. PRINCIPLES OF EXCELLENCE (Interactive Pillars)
            ========================================== */}
            <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="max-w-3xl mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 block mb-2">
                        Institutional Philosophy
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#06111f] tracking-tight">
                        A Framework Built on Academic Rigor & Ethical Bearing.
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed mt-4">
                        We blend disciplined scholarship with progressive inquiry, ensuring students master foundational knowledge while developing independent critical thinking.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: BookOpen,
                            title: home.bento1Title || 'Applied STEM & Technology',
                            desc: home.bento1Desc || 'Modern robotics, laboratory experimentation, and computational thinking starting from the primary years.',
                            tag: 'Laboratory Studies',
                            color: 'from-blue-600 to-indigo-600',
                            iconBg: 'bg-blue-50 text-blue-600 border-blue-200 group-hover:from-blue-600 group-hover:to-indigo-600',
                            badge: 'bg-blue-50 text-blue-700 border-blue-200'
                        },
                        {
                            icon: Shield,
                            title: home.bento2Title || 'Character & Moral Values',
                            desc: home.bento2Desc || 'Integrity, humility, empathy, and social responsibility woven into the daily rhythm of campus life.',
                            tag: 'Ethical Guidance',
                            color: 'from-amber-500 to-orange-500',
                            iconBg: 'bg-amber-50 text-amber-600 border-amber-200 group-hover:from-amber-500 group-hover:to-orange-500',
                            badge: 'bg-amber-50 text-amber-700 border-amber-200'
                        },
                        {
                            icon: Compass,
                            title: home.bento3Title || 'Global Perspective',
                            desc: home.bento3Desc || 'A state curriculum elevated with national standards, preparing scholars for higher education and competitive examinations.',
                            tag: 'Scholastic Breadth',
                            color: 'from-emerald-500 to-teal-600',
                            iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:from-emerald-500 group-hover:to-teal-600',
                            badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        },
                        {
                            icon: GraduationCap,
                            title: home.bento4Title || 'Individual Mentorship',
                            desc: home.bento4Desc || 'Every child is recognized as unique. Personalized academic interventions ensure no student is left behind.',
                            tag: 'Mentor Ratio: 12:1',
                            color: 'from-purple-600 to-indigo-600',
                            iconBg: 'bg-purple-50 text-purple-600 border-purple-200 group-hover:from-purple-600 group-hover:to-indigo-600',
                            badge: 'bg-purple-50 text-purple-700 border-purple-200'
                        }
                    ].map((pillar, pi) => {
                        const Icon = pillar.icon;
                        return (
                            <div 
                                key={pi} 
                                className="hover-lift bg-white p-8 border border-slate-200/90 hover:border-slate-300 rounded-sm shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                            >
                                {/* Top gradient hover reveal */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div>
                                    <div className={`w-14 h-14 rounded-sm border flex items-center justify-center transition-all duration-300 mb-6 group-hover:bg-gradient-to-br group-hover:text-white group-hover:scale-110 group-hover:rotate-3 shadow-2xs ${pillar.iconBg}`}>
                                        <Icon size={24} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-[#06111f] group-hover:text-blue-900 transition-colors mb-2">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border ${pillar.badge}`}>{pillar.tag}</span>
                                    <ArrowRight size={13} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1.5 transition-all duration-300" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ==========================================
                4. ACADEMIC WINGS & CLASS STRUCTURE (Expanded Directory)
            ========================================== */}
            <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 block mb-2">
                                Institutional Continuum
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#06111f]">
                                Progressive Class Structures & Wings
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                                Every single class—from early childhood playgroups to high school board examinations and pre-university science/commerce streams—is guided by specialized faculty and syllabus benchmarks.
                            </p>
                        </div>
                        <Link 
                            to="/academics" 
                            className="text-xs font-bold uppercase tracking-wider text-blue-900 hover:text-blue-700 transition-colors flex items-center gap-1.5 self-start md:self-auto bg-white px-5 py-2.5 border border-blue-200 hover:border-blue-400 rounded-sm shadow-2xs hover:shadow-sm"
                        >
                            <span>Open Detailed Class Directory</span>
                            <ArrowRight size={14} className="text-amber-500" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { 
                                wing: "Pre-Primary Wing (ECCE)", 
                                age: "Ages 2.5 to 6 Years", 
                                classes: ["Playgroup / Toddlers", "Nursery", "Lower KG (LKG)", "Upper KG (UKG)"],
                                desc: "Montessori & play-based early foundation: phonics, sensory exploration, and joyful number sense in vibrant classrooms.",
                                tag: "Early Childhood Care",
                                cardBg: "bg-gradient-to-br from-amber-50/70 via-white to-orange-50/30 border-amber-200/80 hover:border-amber-400",
                                topColor: "from-amber-400 via-orange-400 to-amber-600",
                                badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
                                pillHover: "hover:bg-amber-600 hover:text-white"
                            },
                            { 
                                wing: "Primary School Wing", 
                                age: "Classes I to V (Ages 6 to 11)", 
                                classes: ["Class I", "Class II", "Class III", "Class IV", "Class V (Primary Capstone)"],
                                desc: "Formal literacy, three-language formula (Kannada, English, Hindi), mental arithmetic, and environmental sciences.",
                                tag: "Foundational Literacy",
                                cardBg: "bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/30 border-blue-200/80 hover:border-blue-400",
                                topColor: "from-blue-500 via-indigo-500 to-blue-600",
                                badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
                                pillHover: "hover:bg-blue-600 hover:text-white"
                            },
                            { 
                                wing: "Middle School Wing", 
                                age: "Classes VI to VIII (Ages 11 to 14)", 
                                classes: ["Class VI", "Class VII", "Class VIII (Middle Capstone)"],
                                desc: "Subject-specialist mentoring: Physics, Chemistry & Biology laboratory experiments, linear algebra, and world history.",
                                tag: "STEM & Departmental Science",
                                cardBg: "bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30 border-emerald-200/80 hover:border-emerald-400",
                                topColor: "from-emerald-400 via-teal-500 to-emerald-600",
                                badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
                                pillHover: "hover:bg-emerald-600 hover:text-white"
                            },
                            { 
                                wing: "Secondary School Wing (SSLC)", 
                                age: "Classes IX & X (Ages 14 to 16)", 
                                classes: ["Class IX (Foundation)", "Class X (KSEAB State Board Exam)"],
                                desc: "Rigorous secondary board syllabus completion, 3 Pre-Board model series, remedial doubt clinics, and 100% pass record.",
                                tag: "Board Examination Center",
                                cardBg: "bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/30 border-indigo-200/80 hover:border-indigo-400",
                                topColor: "from-indigo-500 via-purple-500 to-blue-600",
                                badgeBg: "bg-indigo-100 text-indigo-900 border-indigo-300",
                                pillHover: "hover:bg-indigo-600 hover:text-white"
                            },
                            { 
                                wing: "Senior Secondary / PUC Science", 
                                age: "Classes XI & XII (Ages 16 to 18)", 
                                classes: ["Class XI (PCMB/PCMC)", "Class XII (State PUC Board)"],
                                desc: "Physics, Chemistry, Math, Biology / Computer Science with integrated entrance training for KCET, NEET, and JEE.",
                                tag: "Pre-University Science",
                                cardBg: "bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/30 border-sky-200/80 hover:border-sky-400",
                                topColor: "from-sky-400 via-cyan-500 to-blue-600",
                                badgeBg: "bg-sky-100 text-sky-900 border-sky-300",
                                pillHover: "hover:bg-sky-600 hover:text-white"
                            },
                            { 
                                wing: "Senior Secondary / PUC Commerce & Arts", 
                                age: "Classes XI & XII (Ages 16 to 18)", 
                                classes: ["Class XI (Commerce/Arts)", "Class XII (Commerce/Arts)"],
                                desc: "Accountancy, Business Studies, Economics, History, and Political Science with CA Foundation and CLAT mentoring.",
                                tag: "Pre-University Commerce & Arts",
                                cardBg: "bg-gradient-to-br from-purple-50/70 via-white to-pink-50/30 border-purple-200/80 hover:border-purple-400",
                                topColor: "from-purple-500 via-pink-500 to-rose-500",
                                badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
                                pillHover: "hover:bg-purple-600 hover:text-white"
                            }
                        ].map((div, i) => (
                            <div 
                                key={i} 
                                className={`hover-lift p-7 border rounded-sm flex flex-col justify-between transition-all duration-300 group shadow-xs hover:shadow-xl relative overflow-hidden ${div.cardBg}`}
                            >
                                {/* Top Accent Gradient Line */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${div.topColor} opacity-90`} />

                                <div>
                                    <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-wider">
                                        <span className={`px-2.5 py-0.5 rounded-full border font-sans font-bold shadow-2xs ${div.badgeBg}`}>{div.tag}</span>
                                        <span className="bg-white/80 px-2 py-0.5 border border-slate-200 rounded-full text-slate-700 font-medium">{div.age}</span>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-[#06111f] mb-2 group-hover:text-blue-900 transition-colors">
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
                                                className={`text-[11px] font-semibold text-slate-700 bg-white/90 px-2.5 py-1 rounded-sm border border-slate-200 transition-all duration-200 cursor-default shadow-2xs ${div.pillHover}`}
                                            >
                                                {cName}
                                            </span>
                                        ))}
                                    </div>
                                    <Link 
                                        to="/academics" 
                                        className="text-xs font-bold text-blue-900 hover:text-blue-700 inline-flex items-center gap-1.5 transition-colors group-hover:underline"
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
                5. CAMPUS MOMENTS (Dignified Photo Showcase)
            ========================================== */}
            <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Campus Chronicle</span>
                        <h2 className="text-3xl font-serif font-bold text-[#0b192c]">Life & Learning in Pictures</h2>
                    </div>
                    {slideshowPhotos.length > 1 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={prevSlide} 
                                className="w-10 h-10 border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-[#0b192c] hover:text-white transition-all duration-200 hover:scale-105 shadow-xs cursor-pointer"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="w-10 h-10 border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-[#0b192c] hover:text-white transition-all duration-200 hover:scale-105 shadow-xs cursor-pointer"
                                aria-label="Next"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative h-[420px] md:h-[480px] w-full border border-slate-300 bg-[#07111e] overflow-hidden rounded-xs group shadow-lg">
                    {isGalleryLoading ? (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Loader2 size={32} className="animate-spin text-[#c5a880]" />
                        </div>
                    ) : slideshowPhotos.length > 0 ? (
                        <div className="relative w-full h-full overflow-hidden">
                            <img 
                                src={slideshowPhotos[currentIndex]?.src} 
                                alt={slideshowPhotos[currentIndex]?.title || 'Campus Moment'} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07111e]/95 via-[#07111e]/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5a880] mb-1">Campus Record</span>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                                    {slideshowPhotos[currentIndex]?.title || 'Campus Life'}
                                </h3>
                                <Link 
                                    to="/student-life" 
                                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5 group/link"
                                >
                                    <span>Browse All Collections</span>
                                    <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                            <p className="text-sm">Campus photo archives will appear here.</p>
                            <Link to="/student-life" className="mt-2 text-xs text-[#c5a880] underline">View student life gallery</Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                6. OFFICIAL DISPATCHES & CALENDAR
            ========================================== */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* News Column */}
                        <div className="lg:col-span-7">
                            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880] block">Official Bulletin</span>
                                    <h3 className="text-2xl font-serif font-bold text-[#0b192c]">Latest Dispatches</h3>
                                </div>
                                <Link to="/news" className="text-xs font-semibold text-[#0b192c] hover:text-[#c5a880] transition-colors">
                                    Archive ↗
                                </Link>
                            </div>

                            {latestNews ? (
                                <div className="hover-lift bg-[#fdfbf7] p-6 border border-slate-200 hover:border-blue-400/50 rounded-xs shadow-xs hover:shadow-xl transition-all duration-300 group">
                                    <div className="h-64 bg-slate-100 overflow-hidden border border-slate-200 rounded-xs mb-4 relative">
                                        {latestNews.imageUrl && (
                                            <img 
                                                src={latestNews.imageUrl} 
                                                alt={latestNews.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                                            />
                                        )}
                                        <div className="absolute top-3 left-3 bg-[#0b192c]/85 backdrop-blur-xs text-[#c5a880] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xs border border-white/10">
                                            Official Dispatch
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                                        <Clock size={13} className="text-[#8c7355]" />
                                        <span>{latestNews.date || 'Recent Notification'}</span>
                                    </div>
                                    <h4 className="text-xl font-serif font-bold text-[#0b192c] group-hover:text-blue-900 transition-colors mb-2">
                                        {latestNews.title}
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                                        {latestNews.content}
                                    </p>
                                    <Link to="/news" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b192c] hover:text-blue-700 transition-colors">
                                        <span>Read Full Dispatch</span>
                                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 py-8">Official bulletins will be posted here as they are published.</p>
                            )}
                        </div>

                        {/* Calendar / Notice Column */}
                        <div className="lg:col-span-5 hover-lift bg-gradient-to-br from-[#06111f] via-[#0c234b] to-[#081830] text-white p-8 md:p-10 rounded-sm border border-blue-400/30 hover:border-amber-400/60 shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                            {/* Ambient glow in corner */}
                            <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8 pb-3 border-b border-blue-400/20">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">Academic Calendar</span>
                                    <Calendar size={18} className="text-amber-400 group-hover:rotate-6 transition-transform" />
                                </div>

                                {nearestEvent ? (
                                    <div>
                                        <div className="flex items-center gap-4 mb-5 p-4 bg-white/5 border border-amber-400/30 group-hover:border-amber-400/60 rounded-sm backdrop-blur-sm transition-colors shadow-2xs">
                                            <span className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                                                {new Date(nearestEvent.eventDate).getDate()}
                                            </span>
                                            <div>
                                                <span className="text-lg font-bold block text-white leading-tight">
                                                    {new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'long' })}
                                                </span>
                                                <span className="text-xs text-amber-200/80 font-medium">
                                                    Academic Session {new Date(nearestEvent.eventDate).getFullYear()}
                                                </span>
                                            </div>
                                        </div>

                                        <h4 className="text-xl font-serif font-bold mb-3 text-white group-hover:text-amber-200 transition-colors">
                                            {nearestEvent.title}
                                        </h4>

                                        <p className="text-xs text-slate-300 flex items-center gap-2 mb-6">
                                            <MapPin size={14} className="text-amber-400 shrink-0" />
                                            <span>{nearestEvent.location || 'Main Campus Auditorium'}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="py-6">
                                        <h4 className="text-lg font-serif font-bold mb-2">Upcoming Term Examination Dates</h4>
                                        <p className="text-xs text-slate-400">Scheduled events and parent-teacher consultations will be announced here.</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-blue-400/20 relative z-10">
                                <Link 
                                    to="/contact" 
                                    className="shimmer-btn btn-gold w-full py-3.5 text-slate-950 text-xs font-bold uppercase tracking-wider text-center block rounded-sm shadow-md"
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
