import React, { useState, useEffect } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    Star, 
    Quote, 
    Award,
    Sparkles 
} from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "The individual attention my daughter received for her Class X board preparations was remarkable. The faculty conducted remedial doubt sessions until every single concept in mathematics and science was crystal clear. She scored 94% in the state board examinations.",
        author: "Mr. Rajshekhar Patil",
        role: "Parent of Ananya Patil",
        grade: "Class X (SSLC Board Distinction)",
        year: "Admitted 2018"
    },
    {
        id: 2,
        quote: "Starting in Lower KG, I was worried about my son learning English and Kannada together. The Age School's teachers made reading fun through phonics and sensory games. Today in Class 3, he reads chapter books with total confidence.",
        author: "Mrs. Fatima Begum",
        role: "Parent of Zayan Ahmed",
        grade: "Class III (Primary Wing)",
        year: "Admitted 2021"
    },
    {
        id: 3,
        quote: "What sets The Age School apart is the focus on moral discipline alongside STEM education. The robotics lab and regular assembly talks give students both technological edge and ethical grounding for competitive exams.",
        author: "Dr. Anand Kulkarni",
        role: "Parent of Rohan Kulkarni",
        grade: "Class XI (PUC Science PCMC)",
        year: "Admitted 2016"
    },
    {
        id: 4,
        quote: "The school bus route is punctual, GPS tracked, and the female attendants ensure complete peace of mind. As working parents, knowing our child is safe and learning in an attentive environment means everything.",
        author: "Mrs. Shridevi Biradar",
        role: "Parent of Aditya Biradar",
        grade: "Class V (Primary Capstone)",
        year: "Admitted 2020"
    }
];

const TestimonialsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const next = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    const prev = () => setCurrentIndex((prev + 1) % testimonials.length);

    const current = testimonials[currentIndex];

    return (
        <section 
            className="py-8 sm:py-14 bg-slate-50 border-b border-slate-200/80"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-3">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-1 flex items-center gap-1.5">
                            <Sparkles size={14} className="text-blue-600" />
                            Voices of Our Community
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight">
                            Parent & Scholar Experiences
                        </h2>
                    </div>

                    {/* Nav Controls */}
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={prev}
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer shadow-2xs"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={15} />
                        </button>
                        <button
                            onClick={next}
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer shadow-2xs"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </div>
                </div>

                {/* Card */}
                <div className="academic-card p-5 sm:p-7 md:p-8 bg-white relative overflow-hidden shadow-xs">
                    <Quote size={52} className="absolute top-4 right-4 text-blue-600/10 pointer-events-none" />

                    <div className="flex items-center gap-1 mb-3 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                        ))}
                        <span className="text-xs font-bold text-amber-700 ml-1.5">5.0 Parent Rating</span>
                    </div>

                    <p className="text-sm sm:text-lg font-serif italic text-slate-800 leading-relaxed mb-4 sm:mb-6 max-w-4xl">
                        "{current.quote}"
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                        <div>
                            <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">{current.author}</h4>
                            <p className="text-xs text-slate-500 font-medium">
                                {current.role} • <span className="text-blue-600 font-bold">{current.grade}</span>
                            </p>
                        </div>
                        <span className="text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 self-start sm:self-auto font-semibold">
                            {current.year}
                        </span>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-1.5 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TestimonialsSlider;
