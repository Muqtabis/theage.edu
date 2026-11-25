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
    Users
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import InteractiveHeroSlider from '../components/InteractiveHeroSlider';
import AnimatedStatCounter from '../components/AnimatedStatCounter';
import TuitionRangeSlider from '../components/TuitionRangeSlider';
import GradeFinder from '../components/GradeFinder';
import CampusFacilitySwitcher from '../components/CampusFacilitySwitcher';
import TestimonialsSlider from '../components/TestimonialsSlider';
import FaqAccordion from '../components/FaqAccordion';

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

    return (
        <div className="font-sans text-slate-800 bg-white selection:bg-blue-600 selection:text-white">
            
            {/* ==========================================
                1. INTERACTIVE MULTI-SLIDE HERO
            ========================================== */}
            <InteractiveHeroSlider 
                admissionsBadge={home.heroBadge || general.admissionsBadge} 
            />

            {/* ==========================================
                OFFICIAL NOTICE TICKER (Sleek Slate Strip)
            ========================================== */}
            <div className="bg-slate-50 border-b border-slate-200 py-3 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 bg-slate-900 text-white rounded-full">
                            Official Notice
                        </span>
                        <p className="text-xs font-medium text-slate-700 truncate">
                            {general.noticeMarquee || 'ADMISSIONS OPEN FOR SESSION 2026-2027: Pre-Nursery to Grade XII (Science & Commerce) • Schedule Campus Tour'}
                        </p>
                    </div>
                    <Link 
                        to="/news" 
                        className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                    >
                        <span>Official Gazette</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* ==========================================
                2. ANIMATED STATS COUNTER WITH HOVER INSIGHTS
            ========================================== */}
            <AnimatedStatCounter />

            {/* ==========================================
                3. INTERACTIVE GRADE RANGE SLIDER
            ========================================== */}
            <TuitionRangeSlider />

            {/* ==========================================
                4. INTERACTIVE GRADE & CURRICULUM FINDER
            ========================================== */}
            <GradeFinder />

            {/* ==========================================
                5. PRINCIPLES OF EXCELLENCE (4 Pillars with Hover Glow)
            ========================================== */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-2xl mb-12 sm:mb-16">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                        Institutional Philosophy
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
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
                        },
                        {
                            icon: Shield,
                            title: home.bento2Title || 'Character & Moral Values',
                            desc: home.bento2Desc || 'Integrity, humility, empathy, and social responsibility woven into the daily rhythm of campus life.',
                            tag: 'Ethical Guidance',
                        },
                        {
                            icon: Compass,
                            title: home.bento3Title || 'Global Perspective',
                            desc: home.bento3Desc || 'A state curriculum elevated with national standards, preparing scholars for higher education and competitive examinations.',
                            tag: 'Scholastic Breadth',
                        },
                        {
                            icon: GraduationCap,
                            title: home.bento4Title || 'Individual Mentorship',
                            desc: home.bento4Desc || 'Every child is recognized as unique. Personalized academic interventions ensure no student is left behind.',
                            tag: 'Ratio 1:20',
                        }
                    ].map((pillar, pi) => {
                        const Icon = pillar.icon;
                        return (
                            <div 
                                key={pi} 
                                className="card-interactive p-6 sm:p-7 flex flex-col justify-between group cursor-default"
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                                        <Icon size={20} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                                <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center justify-between">
                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">{pillar.tag}</span>
                                    <ArrowRight size={13} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ==========================================
                6. ACADEMIC WINGS & CLASS STRUCTURE
            ========================================== */}
            <section className="py-20 bg-slate-50/70 border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                                Academic Progression
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                                Progressive Class Structures & Wings
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                                Every single grade—from early childhood playgroup to SSLC board examinations and pre-university science & commerce—is structured with specialized pedagogy.
                            </p>
                        </div>
                        <Link 
                            to="/academics" 
                            className="btn-primary self-start md:self-auto text-xs"
                        >
                            <span>Open Detailed Class Directory</span>
                            <ArrowRight size={13} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { 
                                wing: "Pre-Primary Wing (ECCE)", 
                                age: "Ages 2.5 to 6 Years", 
                                classes: ["Playgroup", "Nursery", "Lower KG (LKG)", "Upper KG (UKG)"],
                                desc: "Montessori & play-based early foundation: phonics, sensory exploration, and joyful number sense.",
                                tag: "Early Childhood Care",
                            },
                            { 
                                wing: "Primary School Wing", 
                                age: "Classes I to V (Ages 6 to 11)", 
                                classes: ["Class I", "Class II", "Class III", "Class IV", "Class V"],
                                desc: "Formal literacy, three-language formula (Kannada, English, Hindi), arithmetic, and environmental sciences.",
                                tag: "Foundational Literacy",
                            },
                            { 
                                wing: "Middle School Wing", 
                                age: "Classes VI to VIII (Ages 11 to 14)", 
                                classes: ["Class VI", "Class VII", "Class VIII"],
                                desc: "Subject-specialist mentoring: Physics, Chemistry & Biology laboratory experiments, linear algebra, and history.",
                                tag: "STEM & Science",
                            },
                            { 
                                wing: "Secondary School Wing (SSLC)", 
                                age: "Classes IX & X (Ages 14 to 16)", 
                                classes: ["Class IX (Foundation)", "Class X (Board Exam)"],
                                desc: "Rigorous secondary board syllabus completion, 3 Pre-Board model series, and remedial clinics.",
                                tag: "Board Exam Center",
                            },
                            { 
                                wing: "Senior Secondary / PUC Science", 
                                age: "Classes XI & XII (Ages 16 to 18)", 
                                classes: ["Class XI (PCMB/PCMC)", "Class XII (State PUC Board)"],
                                desc: "Physics, Chemistry, Math, Biology / Computer Science with integrated entrance prep for KCET, NEET, and JEE.",
                                tag: "Pre-University Science",
                            },
                            { 
                                wing: "Senior Secondary / PUC Commerce & Arts", 
                                age: "Classes XI & XII (Ages 16 to 18)", 
                                classes: ["Class XI (Commerce/Arts)", "Class XII (Commerce/Arts)"],
                                desc: "Accountancy, Business Studies, Economics, History, and Political Science with CA Foundation mentorship.",
                                tag: "Pre-University Commerce",
                            }
                        ].map((div, i) => (
                            <div 
                                key={i} 
                                className="card-interactive p-6 sm:p-7 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">{div.tag}</span>
                                        <span className="font-mono text-slate-400">{div.age}</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {div.wing}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                                        {div.desc}
                                    </p>
                                </div>
                                
                                <div className="pt-4 border-t border-slate-100">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                                        Classes:
                                    </span>
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {div.classes.map((cName, ci) => (
                                            <span 
                                                key={ci} 
                                                className="text-[11px] font-medium text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 px-2.5 py-1 rounded-md border border-slate-200 transition-colors cursor-default"
                                            >
                                                {cName}
                                            </span>
                                        ))}
                                    </div>
                                    <Link 
                                        to="/academics" 
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 transition-colors group-hover:gap-2"
                                    >
                                        <span>View Syllabus & Timings</span>
                                        <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                7. INTERACTIVE CAMPUS FACILITIES SWITCHER
            ========================================== */}
            <CampusFacilitySwitcher />

            {/* ==========================================
                8. CAMPUS MOMENTS (Showcase Carousel)
            ========================================== */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-end mb-8 sm:mb-12">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                            Campus Chronicle
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Life & Learning in Pictures</h2>
                    </div>
                    {slideshowPhotos.length > 1 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={prevSlide} 
                                className="w-9 h-9 border border-slate-200 bg-white rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="w-9 h-9 border border-slate-200 bg-white rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                                aria-label="Next image"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full border border-slate-200 bg-slate-900 overflow-hidden rounded-2xl group img-zoom-box">
                    {isGalleryLoading ? (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-blue-400" />
                        </div>
                    ) : slideshowPhotos.length > 0 ? (
                        <div className="relative w-full h-full overflow-hidden">
                            <img 
                                src={slideshowPhotos[currentIndex]?.src} 
                                alt={slideshowPhotos[currentIndex]?.title || 'Campus Moment'} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 mb-1">Campus Record</span>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    {slideshowPhotos[currentIndex]?.title || 'Campus Life'}
                                </h3>
                                <Link 
                                    to="/student-life" 
                                    className="text-xs font-medium text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
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
                9. INTERACTIVE TESTIMONIALS SLIDER
            ========================================== */}
            <TestimonialsSlider />

            {/* ==========================================
                10. INTERACTIVE FAQ ACCORDION
            ========================================== */}
            <FaqAccordion />

            {/* ==========================================
                11. DISPATCHES & CALENDAR (Clean Slate Split)
            ========================================== */}
            <section className="py-20 bg-slate-50/70 border-t border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Notice & Bulletins Column */}
                        <div className="lg:col-span-7 card-interactive p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-6">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                                        <Award size={14} className="text-blue-600" />
                                        Official School Bulletins
                                    </span>
                                    <Link to="/news" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                                        View All
                                    </Link>
                                </div>

                                {latestNews ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Clock size={12} />
                                            <span>{latestNews.date || 'Recent Notification'}</span>
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                            {latestNews.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                                            {latestNews.content}
                                        </p>
                                        <Link to="/news" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors pt-2">
                                            <span>Read Full Dispatch</span>
                                            <ArrowRight size={13} />
                                        </Link>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 py-8">Official bulletins will be posted here as they are published.</p>
                                )}
                            </div>

                            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                                <span>Published under Directorate of Academics</span>
                                <Link to="/news" className="font-medium text-slate-700 hover:text-blue-600">
                                    Archives & Circulars →
                                </Link>
                            </div>
                        </div>

                        {/* Calendar / Events Column */}
                        <div className="lg:col-span-5 card-interactive p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                                        <Calendar size={14} className="text-blue-600" />
                                        Upcoming School Dates
                                    </span>
                                </div>

                                {nearestEvent ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                            <div className="w-14 h-14 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center shrink-0">
                                                <span className="text-xl font-bold leading-none">
                                                    {new Date(nearestEvent.eventDate).getDate()}
                                                </span>
                                                <span className="text-[10px] font-semibold uppercase tracking-tight mt-0.5">
                                                    {new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-semibold text-slate-900 block leading-tight">
                                                    {nearestEvent.title}
                                                </span>
                                                <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                    <MapPin size={11} className="text-blue-600 shrink-0" />
                                                    {nearestEvent.location || 'Main Campus Auditorium'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-6">
                                        <h4 className="text-sm font-semibold text-slate-900 mb-1">Term Examination Dates</h4>
                                        <p className="text-xs text-slate-500">Scheduled events and parent-teacher consultations will be announced here.</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 mt-6 border-t border-slate-100">
                                <Link 
                                    to="/contact" 
                                    className="btn-secondary w-full text-center text-xs justify-center"
                                >
                                    Inquire with Administration Desk
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
