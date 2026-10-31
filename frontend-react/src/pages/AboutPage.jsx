import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Quote, 
    Target, 
    Users, 
    ArrowRight, 
    ShieldCheck, 
    Lightbulb, 
    GraduationCap,
    CheckCircle2
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const AboutPage = () => {
    const { content } = useSiteContent();
    const about = content?.about || {};
    const home = content?.home || {};
    const general = content?.general || {};

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch('/api/teachers')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setTeachers(data);
            })
            .catch(err => console.error("Error fetching teachers:", err));
    }, []);

    const timeline = Array.isArray(about.timeline) && about.timeline.length > 0 ? about.timeline : [
        { year: '2012', title: 'Foundation & Charter', desc: 'The Age School opened its doors with 50 students and a vision for progressive education in Karnataka.' },
        { year: '2016', title: 'Campus Expansion', desc: 'Added modern science laboratories, high-speed computer center, and expanded athletic grounds.' },
        { year: '2024', title: 'Smart Learning & Global Standards', desc: 'Integrated interactive digital classrooms, STEM robotics curriculum, and international student exchange modules.' }
    ];

    return (
        <div className="font-sans text-slate-800 bg-[#fbfbfb] selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            
            {/* ==========================================
                1. INSTITUTIONAL ABOUT HERO
            ========================================== */}
            <section className="bg-[#0b192c] text-white py-24 md:py-32 border-b border-[#c5a880]/20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        <div className="lg:col-span-7">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a880] block mb-3">
                                {about.heroBadge || 'Chartered 2012 • Basavakalyan'}
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                                {about.heroTitle || 'Education for a Changing World.'}
                            </h1>
                            <p className="text-slate-300 text-base leading-relaxed max-w-xl mb-8">
                                {about.heroSubtitle || "At The Age School, we don't merely instruct against a syllabus. We cultivate moral discernment, intellectual daring, and the leadership capacity needed to navigate tomorrow."}
                            </p>
                            <div className="flex items-center gap-8 pt-6 border-t border-slate-800">
                                <div>
                                    <span className="text-3xl font-serif font-bold text-white block">
                                        {home.statsStudents || '500+'}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880]">Enrolled Scholars</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-serif font-bold text-white block">
                                        {home.statsPassRate || '100%'}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880]">Board Distinction</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-serif font-bold text-white block">
                                        {home.statsFaculty || '35+'}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880]">Academic Mentors</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="border-4 border-slate-800 shadow-2xl relative">
                                <img 
                                    src={about.heroImageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                                    alt="School Campus Grounds" 
                                    className="w-full h-[400px] object-cover" 
                                />
                                <div className="p-4 bg-[#07111e] border-t border-slate-800 text-[11px] text-slate-400 font-serif italic text-center">
                                    The Age School Campus, Basavakalyan, Karnataka
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                2. LEADERSHIP STATEMENTS
            ========================================== */}
            <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">
                        Executive Governance
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#0b192c]">
                        Statements from the Leadership
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    
                    {/* President Card */}
                    <div className="bg-white p-8 md:p-10 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="w-16 h-16 rounded-sm overflow-hidden border border-slate-300 shrink-0">
                                    <img 
                                        src={about.presidentImageUrl || "https://images.unsplash.com/photo-1544531327-c820ad9d46dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                                        alt="" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-lg text-[#0b192c]">
                                        {about.presidentName || 'Dr. Sarah Mitchell'}
                                    </h3>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a880]">
                                        {about.presidentRole || 'President & Trustee'}
                                    </span>
                                </div>
                            </div>

                            <p className="font-serif italic text-base text-[#0b192c] mb-4">
                                {about.presidentQuote || '"Lighting the fire of curiosity."'}
                            </p>
                            
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {about.presidentMessage || 'Welcome to The Age School. We believe that education is not merely about academic rigor, but about shaping character. Our mission is to provide stability, values, and the skills needed to navigate the future.'}
                            </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                            Office of the President
                        </div>
                    </div>

                    {/* Vice President Card */}
                    <div className="bg-white p-8 md:p-10 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="w-16 h-16 rounded-sm overflow-hidden border border-slate-300 shrink-0">
                                    <img 
                                        src={about.vpImageUrl || "https://images.unsplash.com/photo-1574023605634-6d9ff7b5a840?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                                        alt="" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-lg text-[#0b192c]">
                                        {about.vpName || 'Mr. Alex Chen'}
                                    </h3>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a880]">
                                        {about.vpRole || 'Vice President & Head of Faculty'}
                                    </span>
                                </div>
                            </div>

                            <p className="font-serif italic text-base text-[#0b192c] mb-4">
                                {about.vpQuote || '"Embracing tomorrow\'s challenges."'}
                            </p>
                            
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {about.vpMessage || 'As Vice President, I emphasize inclusion and innovation. Our campus is a place where every student is known, valued, and challenged to be their best self daily.'}
                            </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                            Academic & Student Affairs
                        </div>
                    </div>

                </div>
            </section>

            {/* ==========================================
                3. CORE VALUES & PHILOSOPHY
            ========================================== */}
            <section className="py-20 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="max-w-2xl mb-14">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Pillars</span>
                        <h2 className="text-3xl font-serif font-bold text-[#0b192c]">The Four Core Commitments</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Intellectual Rigor", desc: "Setting ambitious expectations and fostering independent curiosity with dedicated faculty mentoring." },
                            { title: "Ethical Integrity", desc: "Instilling deep moral responsibility, community civic pride, and uncompromising honesty in every interaction." },
                            { title: "Modern Inquiry", desc: "Integrating laboratory research, digital fluency, and applied mathematics for the 21st century." },
                            { title: "Inclusive Fellowship", desc: "A supportive environment where every background is embraced, supported, and challenged to achieve personal excellence." },
                        ].map((p, i) => (
                            <div key={i} className="p-6 border border-slate-200 bg-[#fdfbf7]">
                                <span className="text-xs font-bold text-[#c5a880] block mb-2 font-mono">0{i+1}.</span>
                                <h3 className="text-base font-serif font-bold text-[#0b192c] mb-2">{p.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. FACULTY DIRECTORY
            ========================================== */}
            {teachers.length > 0 && (
                <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="max-w-2xl mb-14">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Teaching Fellowship</span>
                        <h2 className="text-3xl font-serif font-bold text-[#0b192c]">Our Dedicated Faculty</h2>
                        <p className="text-xs text-slate-500 mt-2">Certified educators guiding scholars across languages, physical sciences, mathematics, and arts.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {teachers.map(t => (
                            <div key={t._id} className="bg-white p-6 border border-slate-200 rounded-sm">
                                <h4 className="font-serif font-bold text-slate-900 text-sm mb-0.5">{t.name}</h4>
                                <p className="text-xs font-bold text-[#c5a880] mb-2 uppercase tracking-wide">{t.subject}</p>
                                {t.qualification && <p className="text-[11px] text-slate-500 mb-2">{t.qualification}</p>}
                                <p className="text-[11px] text-slate-400 font-mono">{t.email}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ==========================================
                5. CHRONOLOGICAL MILESTONES
            ========================================== */}
            <section className="py-24 bg-[#0b192c] text-white">
                <div className="max-w-5xl mx-auto px-6 sm:px-8">
                    <div className="text-center max-w-xl mx-auto mb-16">
                        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Historical Record</span>
                        <h2 className="text-3xl font-serif font-bold text-white">Foundations & Milestones</h2>
                    </div>

                    <div className="space-y-8">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="p-6 md:p-8 bg-[#07111e] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="text-2xl font-serif font-bold text-[#c5a880] md:w-32 shrink-0">
                                    {item.year}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-serif font-bold text-white mb-1.5">{item.title}</h3>
                                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
