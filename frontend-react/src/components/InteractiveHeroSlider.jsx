import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowRight, 
    ChevronLeft, 
    ChevronRight, 
    GraduationCap, 
    Award, 
    Users, 
    MapPin, 
    Microscope, 
    Sparkles, 
    ShieldCheck,
    Calendar,
    BookOpen
} from 'lucide-react';
import heroBg from '../assets/theageheader.jpg';

const heroSlides = [
    {
        id: 0,
        badge: 'Admissions Open 2026–27: Nursery to Grade XII',
        titlePart1: 'Where Ambition Meets Character.',
        titlePart2: 'Shaping Tomorrow’s Scholars & Leaders.',
        subtitle: 'A distinguished K-12 institution in Basavakalyan pioneering academic supremacy, trilingual fluency, and moral integrity from early childhood to Senior Secondary & PUC.',
        image: heroBg,
        highlightTag: 'Main Academic Campus',
        caption: 'Basavakalyan • Chartered 2012',
        primaryCta: { label: 'Apply for Admission', to: '/admissions' },
        secondaryCta: { label: 'Explore All 17 Classes', to: '/academics' }
    },
    {
        id: 1,
        badge: 'State-of-the-Art Science & Technology',
        titlePart1: 'Applied STEM & Robotics.',
        titlePart2: 'Laboratory Innovation from Primary Years.',
        subtitle: 'Dedicated physics, chemistry, biology, and robotics centers designed to bridge foundational theory with empirical discovery and competitive exam readiness.',
        image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        highlightTag: 'Composite STEM Center',
        caption: 'Advanced Prototyping & Lab Stations',
        primaryCta: { label: 'Explore Laboratories', to: '/student-life' },
        secondaryCta: { label: 'Inspect Curriculum', to: '/academics' }
    },
    {
        id: 2,
        badge: 'Character, Athletics & Fellowship',
        titlePart1: 'Disciplined Mind.',
        titlePart2: 'Enduring Moral Conviction.',
        subtitle: 'The Four Houses system, morning yoga, athletic track competitions, and civic leadership instilling humility, brotherhood, and unyielding fortitude.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        highlightTag: 'The Four Houses',
        caption: 'Ashoka • Tagore • Raman • Kalam',
        primaryCta: { label: 'Campus Life & Houses', to: '/student-life' },
        secondaryCta: { label: 'Meet Leadership', to: '/about' }
    }
];

const InteractiveHeroSlider = ({ admissionsBadge, onOpenModal }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const next = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prev = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    const slide = heroSlides[currentSlide];

    return (
        <section 
            className="relative w-full min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-between bg-slate-50 overflow-hidden text-slate-900"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* FULL-WIDTH NATURAL BRIGHT BACKGROUND IMAGE WITH GENTLE AIRY SCRIM */}
            <div className="absolute inset-0 z-0">
                <img 
                    key={slide.image}
                    src={slide.image} 
                    alt="The Age School Campus Grounds" 
                    className="w-full h-full object-cover object-center scale-102 transition-all duration-1000 ease-out" 
                />
                {/* Luminous, light scrim so the campus photo is bright and visible while text remains 100% readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/70 to-white/20 sm:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent/40" />
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-12 flex-grow flex flex-col justify-center">
                
                {/* Stepper Tabs */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-none pb-1">
                    {heroSlides.map((s, idx) => {
                        const isActive = currentSlide === idx;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setCurrentSlide(idx)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-xs ${
                                    isActive
                                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                                        : 'bg-white/90 text-slate-700 hover:bg-white hover:text-blue-600 border border-slate-200/90'
                                }`}
                            >
                                <span className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>0{idx + 1}</span>
                                <span>{s.titlePart1.split('.')[0]}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="max-w-3xl animate-in fade-in duration-300" key={currentSlide}>
                    
                    {/* Admissions Beacon */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-blue-700 mb-6 text-xs font-bold tracking-wide backdrop-blur-md shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        <span>{admissionsBadge || slide.badge}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                        <span>{slide.titlePart1}</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800">
                            {slide.titlePart2}
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-8 sm:mb-10 max-w-2xl">
                        {slide.subtitle}
                    </p>

                    {/* High-Converting Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                        <Link 
                            to={slide.primaryCta.to} 
                            className="btn-primary group text-xs sm:text-sm"
                        >
                            <GraduationCap size={17} />
                            <span>{slide.primaryCta.label}</span>
                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link 
                            to={slide.secondaryCta.to} 
                            className="btn-secondary text-xs sm:text-sm"
                        >
                            <BookOpen size={16} className="text-blue-600" />
                            <span>{slide.secondaryCta.label}</span>
                        </Link>

                        {onOpenModal && (
                            <button
                                onClick={onOpenModal}
                                className="btn-gold text-xs sm:text-sm hidden sm:inline-flex"
                            >
                                <Calendar size={16} />
                                <span>Book Campus Tour</span>
                            </button>
                        )}
                    </div>

                </div>

            </div>

            {/* PRESTIGIOUS BOTTOM CREDENTIALS RIBBON */}
            <div className="relative z-10 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-4 px-4 sm:px-8 shadow-xs">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full md:w-auto text-slate-700">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                                <Award size={16} className="text-amber-600" />
                            </div>
                            <div>
                                <strong className="text-slate-900 block font-bold">100% Board Distinction</strong>
                                <span className="text-[10px] text-slate-500">KSEAB SSLC & PUC Exams</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                                <Users size={16} className="text-blue-600" />
                            </div>
                            <div>
                                <strong className="text-slate-900 block font-bold">1:20 Teacher Ratio</strong>
                                <span className="text-[10px] text-slate-500">Individual Student Mentorship</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                                <GraduationCap size={16} className="text-emerald-600" />
                            </div>
                            <div>
                                <strong className="text-slate-900 block font-bold">All 17 Classes</strong>
                                <span className="text-[10px] text-slate-500">Playgroup to Grade XII</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                                <MapPin size={16} className="text-rose-600" />
                            </div>
                            <div>
                                <strong className="text-slate-900 block font-bold">Basavakalyan Campus</strong>
                                <span className="text-[10px] text-slate-500">Karnataka • Estd. 2012</span>
                            </div>
                        </div>
                    </div>

                    {/* Nav Controls */}
                    <div className="flex items-center gap-2 self-end md:self-auto">
                        <button
                            onClick={prev}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shadow-2xs"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={next}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shadow-2xs"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default InteractiveHeroSlider;
