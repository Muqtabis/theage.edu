import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Sparkles, 
    Calendar, 
    Loader2, 
    ChevronLeft, 
    ChevronRight, 
    Image as ImageIcon, 
    ArrowRight, 
    Clock,
    BookOpen,
    Globe,
    Heart,
    MapPin,
    GraduationCap,
    Shapes,
    BrainCircuit,
    ArrowUpRight, 
    PlayCircle,   
    Star,
    CheckCircle2,
    Award,
    Compass
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

    // Fetch News & Events
    useEffect(() => {
        const fetchNewsAndEvents = async () => {
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
                console.error("Error fetching homepage dynamic feeds:", err);
            }
        };
        fetchNewsAndEvents();
    }, []);

    // Fetch albums for gallery slideshow
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
                        setSlideshowPhotos(photos.slice(0, 8));
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

    // Auto slideshow
    useEffect(() => {
        if (slideshowPhotos.length < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % slideshowPhotos.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [slideshowPhotos.length]);

    const nextSlide = () => setCurrentIndex(prev => (prev + 1) % Math.max(1, slideshowPhotos.length));
    const prevSlide = () => setCurrentIndex(prev => (prev - 1 + slideshowPhotos.length) % Math.max(1, slideshowPhotos.length));

    const heroImageSource = home.heroImageUrl || heroBg;

    return (
        <div className="font-sans text-slate-800 bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* ==========================================
                1. HERO SECTION (High-Class Cinematic)
            ========================================== */}
            <section className="relative w-full min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-950">
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroImageSource} 
                        alt="The Age School Campus" 
                        className="w-full h-full object-cover object-center brightness-90 filter"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                {/* Decorative glow */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 max-w-7xl">
                    <div className="max-w-3xl">
                        
                        {/* Dynamic Admissions Pill */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 shadow-lg">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                            </span>
                            <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                                {home.heroBadge || general.admissionsBadge || 'Admissions Open 2025-26'}
                            </span>
                        </div>

                        {/* Hero Headline */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[1.05] tracking-tight">
                            {home.heroTitleLine1 || 'Future Ready.'} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-indigo-200">
                                {home.heroTitleHighlight || 'Values Driven.'}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-200 font-normal max-w-2xl mb-10 leading-relaxed drop-shadow-sm">
                            {home.heroSubtitle || 'A premier K-10 institution nurturing curiosity, character, and leadership in the heart of Karnataka.'}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <Link 
                                to="/admissions" 
                                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold rounded-full text-sm shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                            >
                                <span>{home.ctaApplyText || 'Apply Now'}</span>
                                <ArrowUpRight size={18} />
                            </Link>
                            
                            <Link 
                                to="/about" 
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full text-sm transition-all flex items-center gap-2"
                            >
                                <Compass size={18} className="text-indigo-300" />
                                <span>{home.ctaTourText || 'Explore Campus'}</span>
                            </Link>
                        </div>

                        {/* Stats Banner under Hero */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-white/15">
                            <div>
                                <span className="block text-3xl md:text-4xl font-serif font-bold text-white mb-0.5">
                                    {home.statsStudents || '500+'}
                                </span>
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Students</span>
                            </div>
                            <div>
                                <span className="block text-3xl md:text-4xl font-serif font-bold text-amber-300 mb-0.5">
                                    {home.statsPassRate || '100%'}
                                </span>
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Board Results</span>
                            </div>
                            <div>
                                <span className="block text-3xl md:text-4xl font-serif font-bold text-white mb-0.5">
                                    {home.statsFaculty || '35+'}
                                </span>
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Expert Faculty</span>
                            </div>
                            <div>
                                <span className="block text-3xl md:text-4xl font-serif font-bold text-white mb-0.5">
                                    {home.statsYears || '12+'}
                                </span>
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Years Legacy</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                2. QUICK SHORTCUT TILES
            ========================================== */}
            <div className="relative z-20 -mt-8 container mx-auto px-6 max-w-7xl">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-4 md:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 border border-slate-100">
                    {[
                        { icon: BookOpen, label: "Academic Pathways", sub: "Curriculum & standards", link: "/academics", color: "text-indigo-600", bg: "bg-indigo-50" },
                        { icon: Award, label: "Admissions & Fees", sub: "Apply for 2025-26", link: "/admissions", color: "text-amber-600", bg: "bg-amber-50" },
                        { icon: ImageIcon, label: "Photo Gallery", sub: "Campus life memories", link: "/student-life", color: "text-violet-600", bg: "bg-violet-50" },
                        { icon: MapPin, label: "Campus Visit", sub: "Contact & location", link: "/contact", color: "text-emerald-600", bg: "bg-emerald-50" },
                    ].map((item, idx) => (
                        <Link 
                            key={idx} 
                            to={item.link} 
                            className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-slate-50 transition-all group"
                        >
                            <div className={`p-3.5 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform shadow-xs`}>
                                <item.icon size={22} strokeWidth={2} />
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">
                                    {item.label}
                                </h4>
                                <p className="text-xs text-slate-400 truncate">{item.sub}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ==========================================
                3. BENTO GRID - WHY CHOOSE US
            ========================================== */}
            <section className="py-24 px-6 container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
                    <div className="max-w-2xl">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Our Distinction</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
                            Education Reimagined.
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mt-3">
                            We don't just teach the syllabus. We ignite curiosity, inspire character, and empower lifelong leaders.
                        </p>
                    </div>
                    <Link 
                        to="/about" 
                        className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-indigo-600 border-b-2 border-slate-900 hover:border-indigo-600 pb-1 transition-all text-sm"
                    >
                        Learn About Our Vision <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bento 1: Innovation Lab */}
                    <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group shadow-xl">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-colors" />
                        <div className="relative z-10 max-w-lg">
                            <div className="w-13 h-13 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10 text-amber-300">
                                <BrainCircuit size={28} />
                            </div>
                            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-2">STEM & Digital Excellence</span>
                            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                                {home.bento1Title || 'Innovation Lab'}
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                {home.bento1Desc || 'State-of-the-art facilities for Robotics, Coding, and STEM learning. We prepare students for the future with real-world hands-on projects.'}
                            </p>
                        </div>
                    </div>

                    {/* Bento 2: Holistic Growth */}
                    <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-8 md:p-10 text-slate-950 flex flex-col justify-between shadow-xl">
                        <div>
                            <div className="w-12 h-12 bg-slate-950/10 rounded-2xl flex items-center justify-center mb-6">
                                <Star size={24} className="text-slate-950" fill="currentColor" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">Beyond Academics</span>
                            <h3 className="text-2xl font-serif font-bold mb-2">
                                {home.bento2Title || 'Holistic Growth'}
                            </h3>
                            <p className="text-slate-800 font-medium text-sm">
                                {home.bento2Desc || 'Sports, Arts, and Academics in perfect balance.'}
                            </p>
                        </div>
                        <div className="mt-8 space-y-2.5">
                            {(home.bento2Tags || ['Yoga & Meditation', 'Visual Arts', 'Competitive Sports', 'Public Speaking']).map((tag, i) => (
                                <div key={i} className="bg-white/40 backdrop-blur-xs px-4 py-2.5 rounded-xl text-slate-900 font-semibold text-xs flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-slate-950" />
                                    <span>{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bento 3: Global Perspective */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-indigo-200 transition-all">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                            <Globe size={26} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {home.bento3Title || 'Global Perspective'}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {home.bento3Desc || 'Curriculum designed for the modern world, combining local heritage with global awareness.'}
                        </p>
                    </div>

                    {/* Bento 4: Student Care */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-pink-200 transition-all">
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6">
                            <Heart size={26} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {home.bento4Title || 'Student Care'}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {home.bento4Desc || 'Individual mentorship, mental health support & safe nurturing environment for every child.'}
                        </p>
                    </div>

                    {/* Bento 5: Academic Rigor */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all">
                        <div>
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6">
                                <GraduationCap size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-indigo-950 mb-2">
                                Board Excellence
                            </h3>
                            <p className="text-indigo-800/80 text-sm leading-relaxed">
                                Continuous evaluation, mock drills, and specialized coaching for board examination distinction.
                            </p>
                        </div>
                        <Link to="/academics" className="mt-6 text-indigo-600 font-bold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                            View Syllabus <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. ACADEMIC DIVISIONS (Level Cards)
            ========================================== */}
            <section className="py-20 bg-white border-y border-slate-200/60">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Learning Pathways</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                            Comprehensive K-10 Education
                        </h2>
                        <p className="text-slate-600 mt-3 text-base">
                            Structured across distinct learning phases tailored to each developmental milestone.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Kindergarten", sub: "LKG - UKG", icon: Shapes, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Play-based inquiry developing sensory, emotional, and social skills." },
                            { title: "Primary School", sub: "Class 1 - 5", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50", desc: "Building core literacy, numeracy, science concepts, and independent thought." },
                            { title: "Secondary School", sub: "Class 6 - 10", icon: GraduationCap, color: "text-violet-600", bg: "bg-violet-50", desc: "Rigorous curriculum, laboratory experiments, and exam coaching." }
                        ].map((level, idx) => (
                            <Link 
                                key={idx} 
                                to="/academics" 
                                className="group p-8 rounded-3xl bg-slate-50 hover:bg-slate-900 hover:text-white transition-all duration-300 border border-slate-200/60 hover:border-slate-800 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-4 rounded-2xl ${level.bg} ${level.color} group-hover:bg-white/10 group-hover:text-white transition-colors`}>
                                        <level.icon size={30} />
                                    </div>
                                    <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 group-hover:border-slate-700 group-hover:text-slate-300">
                                        {level.sub}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-3">{level.title}</h3>
                                <p className="text-slate-600 group-hover:text-slate-400 text-sm leading-relaxed mb-6">
                                    {level.desc}
                                </p>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:text-amber-300 transition-colors">
                                    Learn More <ArrowRight size={14} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                5. CAMPUS MOMENTS (Dynamic Gallery Slider)
            ========================================== */}
            <section className="py-24 px-6 container mx-auto max-w-7xl">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Campus Moments</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                            Life at The Age School
                        </h2>
                    </div>
                    {slideshowPhotos.length > 1 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={prevSlide} 
                                className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors shadow-xs"
                                aria-label="Previous photo"
                            >
                                <ChevronLeft size={18}/>
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors shadow-xs"
                                aria-label="Next photo"
                            >
                                <ChevronRight size={18}/>
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative h-[420px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200">
                    {isGalleryLoading ? (
                        <div className="w-full h-full flex items-center justify-center text-white/50">
                            <Loader2 size={36} className="animate-spin" />
                        </div>
                    ) : slideshowPhotos.length > 0 ? (
                        <div className="relative w-full h-full">
                            <img 
                                src={slideshowPhotos[currentIndex]?.src} 
                                alt={slideshowPhotos[currentIndex]?.title || 'Campus Moment'} 
                                className="w-full h-full object-cover transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                                <span className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-1">Photo Feature</span>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                                    {slideshowPhotos[currentIndex]?.title || 'Campus Activity'}
                                </h3>
                                <Link 
                                    to="/student-life" 
                                    className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors font-medium"
                                >
                                    Browse All Albums <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                            <ImageIcon size={44} className="mb-3 opacity-40" />
                            <p className="font-medium text-slate-300">Albums & photos will be showcased here.</p>
                            <Link to="/student-life" className="mt-3 text-indigo-400 text-sm font-semibold hover:underline">Visit Gallery Page</Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                6. LATEST UPDATES & EVENTS (Dynamic)
            ========================================== */}
            <section className="py-24 bg-white border-t border-slate-200/70">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Bulletin Board</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                                Latest News & Events
                            </h2>
                        </div>
                        <Link to="/news" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1.5">
                            View All News <ArrowRight size={15} />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Latest News Card */}
                        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-shadow">
                            <div>
                                <div className="h-56 bg-slate-200 rounded-2xl mb-6 overflow-hidden relative">
                                    {latestNews?.imageUrl ? (
                                        <img 
                                            src={latestNews.imageUrl} 
                                            alt={latestNews.title} 
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-indigo-900/10 text-indigo-600">
                                            <BookOpen size={40} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold text-indigo-700 uppercase tracking-wider shadow-xs">
                                        News Update
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 font-medium">
                                    <Clock size={14} />
                                    <span>{latestNews?.date || 'Recent Update'}</span>
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 hover:text-indigo-600 transition-colors">
                                    {latestNews ? latestNews.title : 'School Reopening & Academic Calendar'}
                                </h3>

                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                    {latestNews ? latestNews.content : 'Stay informed with our regular updates, curricular achievements, and notices for parents and students.'}
                                </p>
                            </div>

                            <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-center">
                                <Link to="/news" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1.5">
                                    Read Full Story <ArrowRight size={15} />
                                </Link>
                            </div>
                        </div>

                        {/* Upcoming Event Card */}
                        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-xl">
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-8">
                                    <Calendar size={13} />
                                    <span>Upcoming Event</span>
                                </div>

                                {nearestEvent ? (
                                    <div>
                                        <div className="flex items-baseline gap-3 mb-4">
                                            <span className="text-5xl md:text-6xl font-serif font-bold text-amber-300">
                                                {new Date(nearestEvent.eventDate).getDate()}
                                            </span>
                                            <div>
                                                <span className="text-xl font-bold block text-white">
                                                    {new Date(nearestEvent.eventDate).toLocaleString('default', { month: 'long' })}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {new Date(nearestEvent.eventDate).getFullYear()}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                                            {nearestEvent.title}
                                        </h3>
                                        <p className="text-slate-300 text-sm flex items-center gap-2 mb-6">
                                            <MapPin size={16} className="text-amber-400 shrink-0" />
                                            <span>{nearestEvent.location || 'Main Auditorium'}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="py-10">
                                        <h3 className="text-2xl font-serif font-bold mb-2">Annual Sports Meet & Exhibition</h3>
                                        <p className="text-slate-400 text-sm">Dates will be announced shortly. Check our news section for upcoming notifications.</p>
                                    </div>
                                )}
                            </div>

                            {/* Decorative background shapes */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

                            <div className="relative z-10 pt-8 border-t border-slate-800">
                                <Link 
                                    to="/contact" 
                                    className="inline-flex items-center justify-center w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold text-sm transition-all"
                                >
                                    Get In Touch For Event Details
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
