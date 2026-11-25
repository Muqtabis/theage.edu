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
            className="relative w-full min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-between bg-[#071322] overflow-hidden text-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* FULL-WIDTH CINEMATIC BACKGROUND IMAGE WITH SCRIM */}
            <div className="absolute inset-0 z-0">
                <img 
                    key={slide.image}
                    src={slide.image} 
                    alt="The Age School Campus Grounds" 
                    className="w-full h-full object-cover object-center brightness-[0.45] contrast-[1.1] scale-102 transition-all duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071322]/95 via-[#0b192c]/85 to-[#0b192c]/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-transparent" />
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
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                                    isActive
                                        ? 'bg-[#c5a880] text-[#071322] font-bold shadow-md'
                                        : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 border border-white/15'
                                }`}
                            >
                                <span className="text-[10px] opacity-75 font-mono">0{idx + 1}</span>
                                <span>{s.titlePart1.split('.')[0]}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="max-w-3xl animate-in fade-in duration-300 key={currentSlide}">
                    
                    {/* Admissions Beacon */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#c5a880]/50 text-[#c5a880] mb-6 text-xs font-bold tracking-wide backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-ping" />
                        <span>{admissionsBadge || slide.badge}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white tracking-tight leading-[1.1] mb-6">
                        <span>{slide.titlePart1}</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8d5b5] via-[#c5a880] to-[#e8d5b5]">
                            {slide.titlePart2}
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-8 sm:mb-10 max-w-2xl">
                        {slide.subtitle}
                    </p>

                    {/* High-Converting Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                        <Link 
                            to={slide.primaryCta.to} 
                            className="btn-gold group text-xs sm:text-sm"
                        >
                            <GraduationCap size={17} />
                            <span>{slide.primaryCta.label}</span>
                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link 
                            to={slide.secondaryCta.to} 
                            className="btn-glass text-xs sm:text-sm"
                        >
                            <BookOpen size={16} className="text-[#c5a880]" />
                            <span>{slide.secondaryCta.label}</span>
                        </Link>

                        {onOpenModal && (
                            <button
                                onClick={onOpenModal}
                                className="btn-glass text-xs sm:text-sm hidden sm:inline-flex"
                            >
                                <Calendar size={16} className="text-[#c5a880]" />
                                <span>Book Campus Tour</span>
                            </button>
                        )}
                    </div>

                </div>

            </div>

            {/* PRESTIGIOUS BOTTOM CREDENTIALS RIBBON */}
            <div className="relative z-10 w-full bg-[#050e18]/85 backdrop-blur-md border-t border-[#c5a880]/30 py-4 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full md:w-auto text-slate-300">
                        <div className="flex items-center gap-2">
                            <Award size={16} className="text-[#c5a880] shrink-0" />
                            <div>
                                <strong className="text-white block font-bold">100% Board Distinction</strong>
                                <span className="text-[10px] text-slate-400">KSEAB SSLC & PUC Exams</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-[#c5a880] shrink-0" />
                            <div>
                                <strong className="text-white block font-bold">1:20 Teacher Ratio</strong>
                                <span className="text-[10px] text-slate-400">Individual Student Mentorship</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <GraduationCap size={16} className="text-[#c5a880] shrink-0" />
                            <div>
                                <strong className="text-white block font-bold">All 17 Classes</strong>
                                <span className="text-[10px] text-slate-400">Playgroup to Grade XII</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-[#c5a880] shrink-0" />
                            <div>
                                <strong className="text-white block font-bold">Basavakalyan Campus</strong>
                                <span className="text-[10px] text-slate-400">Karnataka • Estd. 2012</span>
                            </div>
                        </div>
                    </div>

                    {/* Nav Controls */}
                    <div className="flex items-center gap-2 self-end md:self-auto">
                        <button
                            onClick={prev}
                            className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={next}
                            className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
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
