import React, { useState, useEffect } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    Star, 
    Quote, 
    CheckCircle2 
} from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "The individual attention my daughter received for her Class X board preparations was remarkable. The faculty conducted remedial doubt sessions until every single concept in mathematics and science was crystal clear. She scored 94% in the state board examinations.",
        author: "Mr. Rajshekhar Patil",
        role: "Parent of Ananya Patil",
        grade: "Class X (SSLC Board Topper)",
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

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const current = testimonials[currentIndex];

    return (
        <section 
            className="py-20 bg-slate-50/70 border-b border-slate-200/80"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                            Voices of Our Community
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                            Parent & Scholar Experiences
                        </h2>
                    </div>

                    {/* Nav Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prev}
                            className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={next}
                            className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Card */}
                <div className="card-minimal p-7 sm:p-10 md:p-12 bg-white relative overflow-hidden">
                    <Quote size={48} className="absolute top-6 right-6 text-slate-100 pointer-events-none" />

                    <div className="flex items-center gap-1 mb-6 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                        ))}
                        <span className="text-xs font-semibold text-slate-500 ml-2">5.0 Parent Rating</span>
                    </div>

                    <p className="text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed font-normal mb-8 max-w-4xl">
                        "{current.quote}"
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                        <div>
                            <h4 className="font-bold text-slate-900 text-base">{current.author}</h4>
                            <p className="text-xs text-slate-500 font-medium">
                                {current.role} • <span className="text-blue-600 font-semibold">{current.grade}</span>
                            </p>
                        </div>
                        <span className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-md border border-slate-200 self-start sm:self-auto">
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
                                    idx === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
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
