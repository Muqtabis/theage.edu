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
    ShieldCheck 
} from 'lucide-react';
import heroBg from '../assets/theageheader.jpg';

const heroSlides = [
    {
        id: 0,
        badge: 'Admissions Open 2026–27: Nursery to Grade XII',
        titlePart1: 'Future Ready.',
        titlePart2: 'Values Driven.',
        subtitle: 'A distinguished K-12 institution in Basavakalyan cultivating academic mastery, ethical conviction, and civic leadership.',
        image: heroBg,
        highlightTag: 'Main Academic Campus',
        caption: 'Basavakalyan • Chartered 2012',
        primaryCta: { label: 'Apply for Admission', to: '/admissions' },
        secondaryCta: { label: 'Explore All 17 Classes', to: '/academics' }
    },
    {
        id: 1,
        badge: 'STEM & Robotics Laboratories',
        titlePart1: 'Hands-On Science.',
        titlePart2: 'Modern Innovation.',
        subtitle: 'State-of-the-art physics, chemistry, biology, and robotics centers preparing scholars for competitive exams from early grades.',
        image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        highlightTag: 'Composite STEM Center',
        caption: 'Advanced Prototyping & Lab Stations',
        primaryCta: { label: 'Explore Laboratories', to: '/student-life' },
        secondaryCta: { label: 'Inspect Curriculum', to: '/academics' }
    },
    {
        id: 2,
        badge: 'Holistic Character & Leadership',
        titlePart1: 'Disciplined Mind.',
        titlePart2: 'Compassionate Heart.',
        subtitle: 'The Four Houses system, morning yoga, competitive athletics, and community service instilling humility and moral resilience.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        highlightTag: 'The Four Houses',
        caption: 'Ashoka • Tagore • Raman • Kalam',
        primaryCta: { label: 'Campus Life & Houses', to: '/student-life' },
        secondaryCta: { label: 'Meet Leadership', to: '/about' }
    }
];

const InteractiveHeroSlider = ({ admissionsBadge }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6500);
        return () => clearInterval(timer);
    }, [isPaused]);

    const next = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prev = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    const slide = heroSlides[currentSlide];

    return (
        <section 
            className="relative w-full pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 bg-gradient-to-b from-slate-50/90 via-white to-white overflow-hidden border-b border-slate-200/80"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Slide Stepper Pills (Apple-style segmented control) */}
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200/60">
                    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
                        {heroSlides.map((s, idx) => {
                            const isActive = currentSlide === idx;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? 'bg-slate-900 text-white shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                >
                                    <span className="text-[10px] opacity-70">0{idx + 1}</span>
                                    <span>{s.titlePart1}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Next / Previous Controls */}
                    <div className="hidden sm:flex items-center gap-1">
                        <button
                            onClick={prev}
                            className="w-8 h-8 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={15} />
                        </button>
                        <button
                            onClick={next}
                            className="w-8 h-8 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </div>
                </div>

                {/* Main Hero Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[460px]">
                    
                    {/* Left Column: Text & CTAs */}
                    <div className="lg:col-span-7 max-w-2xl animate-in fade-in duration-300 key={currentSlide}">
                        
                        {/* Admissions Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 mb-6 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            <span>{admissionsBadge || slide.badge}</span>
                        </div>

                        {/* Masthead Headline */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.08] mb-6">
                            <span>{slide.titlePart1}</span> <br />
                            <span className="text-blue-600">{slide.titlePart2}</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
                            {slide.subtitle}
                        </p>

                        {/* Interactive CTAs */}
                        <div className="flex flex-wrap items-center gap-3.5">
                            <Link 
                                to={slide.primaryCta.to} 
                                className="btn-primary group"
                            >
                                <span>{slide.primaryCta.label}</span>
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            
                            <Link 
                                to={slide.secondaryCta.to} 
                                className="btn-secondary"
                            >
                                <span>{slide.secondaryCta.label}</span>
                            </Link>
                        </div>

                        {/* Quick Stats Badges with Hover Glow */}
                        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap gap-3 text-xs text-slate-600">
                            <span className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50/70 hover:border-blue-300 px-3 py-1 rounded-md border border-slate-200 transition-colors cursor-default">
                                <Award size={13} className="text-blue-600" />
                                100% Board Results
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50/70 hover:border-blue-300 px-3 py-1 rounded-md border border-slate-200 transition-colors cursor-default">
                                <Users size={13} className="text-blue-600" />
                                1:20 Teacher Ratio
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50/70 hover:border-blue-300 px-3 py-1 rounded-md border border-slate-200 transition-colors cursor-default">
                                <MapPin size={13} className="text-blue-600" />
                                Basavakalyan Campus
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Hero Visual in Device Frame with Smooth Hover Zoom */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group img-zoom-box">
                            <img 
                                key={slide.image}
                                src={slide.image} 
                                alt={slide.titlePart1} 
                                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                            
                            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/80 flex items-center justify-between text-xs shadow-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                    <span className="font-semibold text-slate-900">{slide.highlightTag}</span>
                                </div>
                                <span className="text-slate-500 font-mono text-[11px]">{slide.caption}</span>
                            </div>
                        </div>

                        {/* Interactive Slide Progress Indicators */}
                        <div className="flex justify-center gap-1.5 mt-4">
                            {heroSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                        idx === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                                    }`}
                                    aria-label={`Jump to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default InteractiveHeroSlider;
