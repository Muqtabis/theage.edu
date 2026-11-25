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
    Sparkles
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
        <div className="font-sans text-[#0b192c] bg-[#faf8f5] selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            
            {/* ==========================================
                1. FULL-WIDTH CINEMATIC HERO SLIDER
            ========================================== */}
            <InteractiveHeroSlider 
                admissionsBadge={home.heroBadge || general.admissionsBadge} 
                onOpenModal={() => setIsModalOpen(true)}
            />

            {/* ==========================================
                OFFICIAL NOTICE MARQUEE TICKER
            ========================================== */}
            <div className="bg-[#0b192c] text-white py-3 px-4 sm:px-8 border-b border-[#c5a880]/30">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
                        <span className="shrink-0 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-[#c5a880] text-[#071322] rounded-full">
                            OFFICIAL GAZETTE
                        </span>
                        <p className="text-xs font-medium text-slate-200 truncate">
                            {general.noticeMarquee || 'ADMISSIONS OPEN FOR SESSION 2026-2027: Pre-Nursery to Grade XII (Science & Commerce) • Schedule Campus Tour'}
                        </p>
                    </div>
                    <Link 
                        to="/news" 
                        className="shrink-0 text-xs font-bold text-[#c5a880] hover:text-white flex items-center gap-1 group"
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
                3. ANIMATED METRICS BANNER
            ========================================== */}
            <AnimatedStatCounter />

            {/* ==========================================
                4. INSTITUTIONAL PHILOSOPHY & PILLARS
            ========================================== */}
            <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-2xl mb-14">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#8c7355] block mb-2 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#c5a880]" />
                        Pillars of Excellence
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#0b192c] tracking-tight">
                        A Framework Built on Academic Supremacy & Moral Bearing.
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                        We balance disciplined scholarship with creative inquiry, ensuring students master foundational concepts while developing independent critical judgment.
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
                                className="academic-card p-6 sm:p-7 flex flex-col justify-between group cursor-default"
                            >
                                <div>
                                    <div className="w-11 h-11 rounded-lg bg-[#0b192c] text-[#c5a880] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                                        <Icon size={22} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-[#0b192c] group-hover:text-[#8c7355] transition-colors mb-2.5">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                                <div className="pt-6 mt-6 border-t border-[#e8e4dc] text-[11px] font-semibold text-slate-500 flex items-center justify-between">
                                    <span className="px-2.5 py-0.5 rounded-md bg-[#faf8f5] text-[#0b192c] border border-[#e8e4dc]">{pillar.tag}</span>
                                    <ArrowRight size={13} className="text-[#c5a880] group-hover:translate-x-1 transition-transform" />
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
                7. THE FOUR HOUSES SYSTEM
            ========================================== */}
            <section className="py-20 sm:py-28 bg-[#faf8f5] border-b border-[#e8e4dc]">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#8c7355] block mb-2">
                            House Tradition
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0b192c]">
                            The Four Houses System
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            Every scholar is initiated into one of our four institutional houses, fostering healthy competition, leadership, and lifelong fellowship.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { 
                                name: "Ashoka House", 
                                motto: "Courage & Righteousness", 
                                color: "border-amber-400 bg-amber-50/40 text-amber-900",
                                desc: "Instilling moral leadership, resilience, and unyielding fortitude in service to society." 
                            },
                            { 
                                name: "Tagore House", 
                                motto: "Creativity & Wisdom", 
                                color: "border-blue-400 bg-blue-50/40 text-blue-900",
                                desc: "Celebrating artistic self-expression, literary fluency, and open-minded inquiry." 
                            },
                            { 
                                name: "Raman House", 
                                motto: "Inquiry & Scientific Truth", 
                                color: "border-emerald-400 bg-emerald-50/40 text-emerald-900",
                                desc: "Championing empirical logic, innovation, mathematics, and technological marvels." 
                            },
                            { 
                                name: "Kalam House", 
                                motto: "Vision & Dedication", 
                                color: "border-purple-400 bg-purple-50/40 text-purple-900",
                                desc: "Nurturing soaring aspirations, scientific patriotism, humility, and steadfast diligence." 
                            }
                        ].map((h, hi) => (
                            <div 
                                key={hi} 
                                className="academic-card p-6 flex flex-col justify-between group"
                            >
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#0b192c] text-[#c5a880] inline-block mb-3">
                                        House Division
                                    </span>
                                    <h3 className="font-serif font-bold text-xl text-[#0b192c] mb-1 group-hover:text-[#8c7355] transition-colors">{h.name}</h3>
                                    <p className="text-xs text-[#8c7355] font-semibold italic mb-3">"{h.motto}"</p>
                                    <p className="text-xs text-slate-600 leading-relaxed">{h.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                8. CAMPUS MOMENTS (PHOTO SLIDER)
            ========================================== */}
            <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-end mb-8 sm:mb-12">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#8c7355] block mb-2">
                            Campus Chronicle
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0b192c]">Life & Learning in Pictures</h2>
                    </div>
                    {slideshowPhotos.length > 1 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={prevSlide} 
                                className="w-9 h-9 border border-[#e8e4dc] bg-white rounded-lg flex items-center justify-center text-[#0b192c] hover:bg-[#faf8f5] hover:border-[#c5a880] transition-colors cursor-pointer shadow-2xs"
                                aria-label="Previous photo"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="w-9 h-9 border border-[#e8e4dc] bg-white rounded-lg flex items-center justify-center text-[#0b192c] hover:bg-[#faf8f5] hover:border-[#c5a880] transition-colors cursor-pointer shadow-2xs"
                                aria-label="Next photo"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative h-[340px] sm:h-[440px] md:h-[500px] w-full border-2 border-[#e8e4dc] bg-[#071322] overflow-hidden rounded-2xl group img-zoom-box shadow-lg">
                    {isGalleryLoading ? (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Loader2 size={32} className="animate-spin text-[#c5a880]" />
                        </div>
                    ) : slideshowPhotos.length > 0 ? (
                        <div className="relative w-full h-full overflow-hidden">
                            <img 
                                src={slideshowPhotos[currentIndex]?.src} 
                                alt={slideshowPhotos[currentIndex]?.title || 'Campus Moment'} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/90 via-[#071322]/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a880] mb-1">Campus Record</span>
                                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2">
                                    {slideshowPhotos[currentIndex]?.title || 'Campus Life'}
                                </h3>
                                <Link 
                                    to="/student-life" 
                                    className="text-xs font-semibold text-[#c5a880] hover:text-white transition-colors inline-flex items-center gap-1.5"
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
                9. TESTIMONIALS SLIDER
            ========================================== */}
            <TestimonialsSlider />

            {/* ==========================================
                10. DISPATCHES & CALENDAR
            ========================================== */}
            <section className="py-20 sm:py-28 bg-[#faf8f5] border-b border-[#e8e4dc]">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Notice & Bulletins Column */}
                        <div className="lg:col-span-7 academic-card p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-3 border-b border-[#e8e4dc] mb-6">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#0b192c] flex items-center gap-2">
                                        <Award size={14} className="text-[#c5a880]" />
                                        Official School Bulletins
                                    </span>
                                    <Link to="/news" className="text-xs font-bold text-[#8c7355] hover:text-[#0b192c]">
                                        View All
                                    </Link>
                                </div>

                                {latestNews ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-1.5 text-xs text-[#8c7355] font-semibold">
                                            <Clock size={12} />
                                            <span>{latestNews.date || 'Recent Notification'}</span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0b192c] hover:text-[#8c7355] transition-colors">
                                            {latestNews.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                                            {latestNews.content}
                                        </p>
                                        <Link to="/news" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8c7355] hover:text-[#0b192c] transition-colors pt-2">
                                            <span>Read Full Dispatch</span>
                                            <ArrowRight size={13} />
                                        </Link>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 py-8">Official bulletins will be posted here as they are published.</p>
                                )}
                            </div>

                            <div className="pt-6 mt-6 border-t border-[#e8e4dc] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                                <span>Published under Directorate of Academics</span>
                                <Link to="/news" className="font-semibold text-slate-700 hover:text-[#0b192c]">
                                    Archives & Circulars →
                                </Link>
                            </div>
                        </div>

                        {/* Calendar / Events Column */}
                        <div className="lg:col-span-5 academic-card p-6 sm:p-8 flex flex-col justify-between bg-white">
                            <div>
                                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#e8e4dc]">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#0b192c] flex items-center gap-2">
                                        <Calendar size={14} className="text-[#c5a880]" />
                                        Upcoming Academic Dates
                                    </span>
                                </div>

                                {nearestEvent ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-[#faf8f5] border border-[#e8e4dc] rounded-xl">
                                            <div className="w-14 h-14 rounded-lg bg-[#0b192c] text-[#c5a880] flex flex-col items-center justify-center shrink-0 border border-[#c5a880]/40">
                                                <span className="text-xl font-serif font-bold leading-none">
                                                    {new Date(nearestEvent.eventDate).getDate()}
                                                </span>
                                                <span className="text-[10px] font-bold uppercase tracking-tight mt-0.5">
                                                    {new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-bold text-[#0b192c] block leading-tight">
                                                    {nearestEvent.title}
                                                </span>
                                                <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                    <MapPin size={11} className="text-[#c5a880] shrink-0" />
                                                    {nearestEvent.location || 'Main Campus Auditorium'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-6">
                                        <h4 className="text-sm font-bold text-[#0b192c] mb-1">Term Examination Dates</h4>
                                        <p className="text-xs text-slate-500">Scheduled events and parent-teacher consultations will be announced here.</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 mt-6 border-t border-[#e8e4dc]">
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
