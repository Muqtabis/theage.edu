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
            <section className="relative w-full min-h-[88vh] flex items-center bg-[#07111e] overflow-hidden">
                {/* Background image with refined cinematic scrim */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroImageSource} 
                        alt="The Age School Campus Grounds" 
                        className="w-full h-full object-cover object-center brightness-75 contrast-[1.05]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07111e]/95 via-[#07111e]/75 to-[#07111e]/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111e] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-32">
                    <div className="max-w-2xl">
                        
                        {/* Institutional Badge */}
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#0b192c]/80 border border-[#c5a880]/40 rounded-sm mb-6">
                            <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5eedc]">
                                {home.heroBadge || general.admissionsBadge || 'Admissions Open for Academic Year 2025–26'}
                            </span>
                        </div>

                        {/* Masthead Headline */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white mb-6 leading-[1.08] tracking-tight">
                            {home.heroTitleLine1 || 'Future Ready.'} <br />
                            <span className="text-[#c5a880] italic font-normal">
                                {home.heroTitleHighlight || 'Values Driven.'}
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-10 max-w-xl">
                            {home.heroSubtitle || 'A distinguished K-10 institution cultivating scholarship, moral conviction, and leadership in Basavakalyan.'}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <Link 
                                to="/admissions" 
                                className="px-7 py-3.5 bg-[#c5a880] hover:bg-[#b89463] text-[#07111e] text-xs font-bold uppercase tracking-[0.16em] rounded-sm transition-all flex items-center gap-2 shadow-sm"
                            >
                                <span>{home.ctaApplyText || 'Apply for Admission'}</span>
                                <ArrowRight size={14} />
                            </Link>
                            
                            <Link 
                                to="/about" 
                                className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.16em] rounded-sm border border-slate-300/40 transition-all flex items-center gap-2"
                            >
                                <span>{home.ctaTourText || 'Institutional Vision'}</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                2. INSTITUTIONAL METRICS (Minimalist Divider)
            ========================================== */}
            <div className="bg-[#0b192c] text-white border-y border-[#c5a880]/20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <div className="pt-4 md:pt-0 md:px-6 first:pl-0">
                            <span className="text-3xl sm:text-4xl font-serif font-bold text-white block mb-0.5">
                                {home.statsStudents || '500+'}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                                Enrolled Scholars
                            </span>
                        </div>

                        <div className="pt-4 md:pt-0 md:px-6">
                            <span className="text-3xl sm:text-4xl font-serif font-bold text-white block mb-0.5">
                                {home.statsPassRate || '100%'}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                                Board Examination Record
                            </span>
                        </div>

                        <div className="pt-4 md:pt-0 md:px-6">
                            <span className="text-3xl sm:text-4xl font-serif font-bold text-white block mb-0.5">
                                {home.statsFaculty || '35+'}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                                Dedicated Faculty
                            </span>
                        </div>

                        <div className="pt-4 md:pt-0 md:px-6">
                            <span className="text-3xl sm:text-4xl font-serif font-bold text-white block mb-0.5">
                                {home.statsYears || '12+'}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c5a880]">
                                Years of Distinction
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==========================================
                3. PRINCIPLES OF EXCELLENCE (Replaces "Vibe Bento")
            ========================================== */}
            <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="max-w-3xl mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">
                        Institutional Philosophy
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0b192c] tracking-tight">
                        A Framework Built on Academic Rigor & Ethical Bearing.
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed mt-4">
                        We blend disciplined scholarship with progressive inquiry, ensuring students master foundational knowledge while developing independent critical thinking.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Pillar 1 */}
                    <div className="bg-white p-8 border border-slate-200/90 rounded-sm shadow-2xs hover:border-[#c5a880] transition-colors flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center text-[#0b192c] mb-6">
                                <BookOpen size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-[#0b192c] mb-2">
                                {home.bento1Title || 'Applied STEM & Technology'}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {home.bento1Desc || 'Modern robotics, laboratory experimentation, and computational thinking starting from the primary years.'}
                            </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-[#0b192c] flex items-center gap-1.5">
                            <span>Laboratory Studies</span>
                            <ArrowRight size={12} className="text-[#c5a880]" />
                        </div>
                    </div>

                    {/* Pillar 2 */}
                    <div className="bg-white p-8 border border-slate-200/90 rounded-sm shadow-2xs hover:border-[#c5a880] transition-colors flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center text-[#0b192c] mb-6">
                                <Shield size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-[#0b192c] mb-2">
                                {home.bento2Title || 'Character & Moral Values'}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {home.bento2Desc || 'Integrity, humility, empathy, and social responsibility woven into the daily rhythm of campus life.'}
                            </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-[#0b192c] flex items-center gap-1.5">
                            <span>Ethical Guidance</span>
                            <ArrowRight size={12} className="text-[#c5a880]" />
                        </div>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-white p-8 border border-slate-200/90 rounded-sm shadow-2xs hover:border-[#c5a880] transition-colors flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center text-[#0b192c] mb-6">
                                <Compass size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-[#0b192c] mb-2">
                                {home.bento3Title || 'Global Perspective'}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {home.bento3Desc || 'A state curriculum elevated with national standards, preparing scholars for higher education and competitive examinations.'}
                            </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-[#0b192c] flex items-center gap-1.5">
                            <span>Scholastic Breadth</span>
                            <ArrowRight size={12} className="text-[#c5a880]" />
                        </div>
                    </div>

                    {/* Pillar 4 */}
                    <div className="bg-white p-8 border border-slate-200/90 rounded-sm shadow-2xs hover:border-[#c5a880] transition-colors flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center text-[#0b192c] mb-6">
                                <GraduationCap size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-[#0b192c] mb-2">
                                {home.bento4Title || 'Individual Mentorship'}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {home.bento4Desc || 'Every child is recognized as unique. Personalized academic interventions ensure no student is left behind.'}
                            </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-[#0b192c] flex items-center gap-1.5">
                            <span>Mentor Ratio: 12:1</span>
                            <ArrowRight size={12} className="text-[#c5a880]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. ACADEMIC DIVISIONS (Editorial Overview)
            ========================================== */}
            <section className="py-20 bg-white border-y border-slate-200/90">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">
                                Structured Learning
                            </span>
                            <h2 className="text-3xl font-serif font-bold text-[#0b192c]">
                                Three Stages of Academic Growth
                            </h2>
                        </div>
                        <Link 
                            to="/academics" 
                            className="text-xs font-bold uppercase tracking-wider text-[#0b192c] hover:text-[#c5a880] transition-colors flex items-center gap-1.5"
                        >
                            <span>View Full Curriculum Directory</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { 
                                stage: "Primary Foundation", 
                                grades: "Kindergarten – Grade 2", 
                                desc: "Cultivating language acquisition, sensory exploration, and joy in foundational numeracy through play and guided observation.",
                                focus: ["Foundational Literacy", "Spatial Numeracy", "Social Adaptation"]
                            },
                            { 
                                stage: "Middle Division", 
                                grades: "Grade 3 – Grade 7", 
                                desc: "Transition into structured disciplines. Science inquiry, linguistic depth in regional and English tongues, and cooperative sports.",
                                focus: ["Integrated Sciences", "Mathematics Lab", "Bilingual Expression"]
                            },
                            { 
                                stage: "Senior Secondary", 
                                grades: "Grade 8 – Grade 10", 
                                desc: "Rigorous board preparation, advanced physical laboratories, career guidance, and leadership roles in campus councils.",
                                focus: ["SSLC Board Excellence", "Career Counseling", "Scientific Method"]
                            }
                        ].map((div, i) => (
                            <div key={i} className="bg-[#fdfbf7] p-8 border border-slate-200 rounded-sm flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880] block mb-1">{div.grades}</span>
                                    <h3 className="text-xl font-serif font-bold text-[#0b192c] mb-3">{div.stage}</h3>
                                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{div.desc}</p>
                                </div>
                                <div className="space-y-1.5 pt-4 border-t border-slate-200/80">
                                    {div.focus.map((f, fi) => (
                                        <div key={fi} className="text-[11px] text-slate-600 font-medium flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-[#c5a880]" />
                                            <span>{f}</span>
                                        </div>
                                    ))}
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
                                className="w-10 h-10 border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-[#0b192c] hover:text-white transition-colors"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="w-10 h-10 border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-[#0b192c] hover:text-white transition-colors"
                                aria-label="Next"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative h-[420px] md:h-[480px] w-full border border-slate-300 bg-[#07111e] overflow-hidden">
                    {isGalleryLoading ? (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Loader2 size={32} className="animate-spin" />
                        </div>
                    ) : slideshowPhotos.length > 0 ? (
                        <div className="relative w-full h-full">
                            <img 
                                src={slideshowPhotos[currentIndex]?.src} 
                                alt={slideshowPhotos[currentIndex]?.title || 'Campus Moment'} 
                                className="w-full h-full object-cover transition-opacity duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07111e]/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5a880] mb-1">Campus Record</span>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                                    {slideshowPhotos[currentIndex]?.title || 'Campus Life'}
                                </h3>
                                <Link 
                                    to="/student-life" 
                                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                                >
                                    <span>Browse All Collections</span>
                                    <ArrowRight size={13} />
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
                                <div className="space-y-4">
                                    <div className="h-60 bg-slate-100 overflow-hidden border border-slate-200">
                                        {latestNews.imageUrl && (
                                            <img src={latestNews.imageUrl} alt="" className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                        <Clock size={13} />
                                        <span>{latestNews.date || 'Recent Notification'}</span>
                                    </div>
                                    <h4 className="text-xl font-serif font-bold text-[#0b192c] hover:text-[#1e3e62] transition-colors">
                                        {latestNews.title}
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                                        {latestNews.content}
                                    </p>
                                    <Link to="/news" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b192c] hover:text-[#c5a880] transition-colors pt-2">
                                        <span>Read Full Dispatch</span>
                                        <ArrowRight size={13} />
                                    </Link>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 py-8">Official bulletins will be posted here as they are published.</p>
                            )}
                        </div>

                        {/* Calendar / Notice Column */}
                        <div className="lg:col-span-5 bg-[#0b192c] text-white p-8 md:p-10 rounded-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-800">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5a880]">Academic Calendar</span>
                                    <Calendar size={18} className="text-[#c5a880]" />
                                </div>

                                {nearestEvent ? (
                                    <div>
                                        <div className="flex items-baseline gap-3 mb-4">
                                            <span className="text-5xl font-serif font-bold text-[#c5a880]">
                                                {new Date(nearestEvent.eventDate).getDate()}
                                            </span>
                                            <div>
                                                <span className="text-lg font-bold block text-white leading-tight">
                                                    {new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'long' })}
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">
                                                    {new Date(nearestEvent.eventDate).getFullYear()}
                                                </span>
                                            </div>
                                        </div>

                                        <h4 className="text-xl font-serif font-bold mb-3 text-white">
                                            {nearestEvent.title}
                                        </h4>

                                        <p className="text-xs text-slate-300 flex items-center gap-2 mb-6">
                                            <MapPin size={14} className="text-[#c5a880] shrink-0" />
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

                            <div className="pt-6 border-t border-slate-800">
                                <Link 
                                    to="/contact" 
                                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider text-center block transition-colors"
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
