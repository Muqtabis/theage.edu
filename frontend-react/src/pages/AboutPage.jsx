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
        { year: '2024', title: 'Smart Learning & Global Standards', desc: 'Integrated interactive digital classrooms, STEM robotics curriculum, and enhanced academic modules.' }
    ];

    return (
        <div className="font-sans text-slate-800 bg-white selection:bg-blue-600 selection:text-white">
            
            {/* ==========================================
                1. INSTITUTIONAL ABOUT HERO
            ========================================== */}
            <section className="bg-slate-50 border-b border-slate-200/80 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        
                        <div className="lg:col-span-7">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 inline-flex items-center gap-2 mb-4 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                                <GraduationCap size={15} className="text-blue-600" />
                                <span>{about.heroBadge || 'Chartered 2012 • Basavakalyan'}</span>
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                                {about.heroTitle || 'Education for a Changing World.'}
                            </h1>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                                {about.heroSubtitle || "At The Age School, we don't merely instruct against a syllabus. We cultivate moral discernment, intellectual daring, and the leadership capacity needed to navigate tomorrow."}
                            </p>
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                                <div>
                                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">
                                        {home.statsStudents || '500+'}
                                    </span>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Enrolled Scholars</span>
                                </div>
                                <div>
                                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">
                                        {home.statsPassRate || '100%'}
                                    </span>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Board Record</span>
                                </div>
                                <div>
                                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">
                                        {home.statsFaculty || '35+'}
                                    </span>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Certified Mentors</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="border border-slate-200 shadow-xl relative rounded-2xl overflow-hidden group aspect-4/3 bg-slate-100">
                                <img 
                                    src={about.heroImageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                                    alt="School Campus Grounds" 
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                                />
                                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-lg text-xs font-semibold text-slate-900 text-center border border-slate-200/80">
                                    The Age School Campus, Basavakalyan
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                2. LEADERSHIP STATEMENTS
            ========================================== */}
            <section className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-2xl mx-auto text-center mb-6 sm:mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                        Institutional Governance
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Statements from Leadership
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
                    
                    {/* President Card */}
                    <div className="card-minimal p-7 sm:p-8 flex flex-col justify-between group">
                        <div>
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                                    <img 
                                        src={about.presidentImageUrl || "https://images.unsplash.com/photo-1544531327-c820ad9d46dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                                        alt="" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-slate-900">
                                        {about.presidentName || 'Dr. Sarah Mitchell'}
                                    </h3>
                                    <span className="text-xs text-blue-600 font-medium">
                                        {about.presidentRole || 'President & Trustee'}
                                    </span>
                                </div>
                            </div>

                            <p className="italic text-sm text-slate-800 font-medium mb-3">
                                {about.presidentQuote || '"Lighting the fire of curiosity."'}
                            </p>
                            
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {about.presidentMessage || 'Welcome to The Age School. We believe that education is not merely about academic rigor, but about shaping character. Our mission is to provide stability, values, and the skills needed to navigate the future.'}
                            </p>
                        </div>

                        <div className="pt-5 mt-5 border-t border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Office of the President
                        </div>
                    </div>

                    {/* Vice President Card */}
                    <div className="card-minimal p-7 sm:p-8 flex flex-col justify-between group">
                        <div>
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                                    <img 
                                        src={about.vpImageUrl || "https://images.unsplash.com/photo-1574023605634-6d9ff7b5a840?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                                        alt="" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-slate-900">
                                        {about.vpName || 'Mr. Alex Chen'}
                                    </h3>
                                    <span className="text-xs text-blue-600 font-medium">
                                        {about.vpRole || 'Vice President & Head of Faculty'}
                                    </span>
                                </div>
                            </div>

                            <p className="italic text-sm text-slate-800 font-medium mb-3">
                                {about.vpQuote || '"Embracing tomorrow\'s challenges."'}
                            </p>
                            
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {about.vpMessage || 'As Vice President, I emphasize inclusion and innovation. Our campus is a place where every student is known, valued, and challenged to be their best self daily.'}
                            </p>
                        </div>

                        <div className="pt-5 mt-5 border-t border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Academic & Student Affairs
                        </div>
                    </div>

                </div>
            </section>

            {/* ==========================================
                3. CORE VALUES & PHILOSOPHY
            ========================================== */}
            <section className="py-8 sm:py-14 bg-slate-50/70 border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="max-w-2xl mb-6 sm:mb-8">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">Pillars</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The Four Core Commitments</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { title: "Intellectual Rigor", desc: "Setting ambitious expectations and fostering independent curiosity with dedicated faculty mentoring." },
                            { title: "Ethical Integrity", desc: "Instilling deep moral responsibility, community civic pride, and uncompromising honesty in every interaction." },
                            { title: "Modern Inquiry", desc: "Integrating laboratory research, digital fluency, and applied mathematics for the 21st century." },
                            { title: "Inclusive Fellowship", desc: "A supportive environment where every background is embraced, supported, and challenged to achieve personal excellence." },
                        ].map((p, i) => (
                            <div key={i} className="card-minimal p-6 flex flex-col justify-between group">
                                <div>
                                    <span className="text-xs font-bold text-blue-600 block mb-2 font-mono">0{i+1}.</span>
                                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. FACULTY DIRECTORY
            ========================================== */}
            {teachers.length > 0 && (
                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">Faculty</span>
                        <h2 className="text-3xl font-bold text-slate-900">Our Dedicated Educators</h2>
                        <p className="text-xs text-slate-500 mt-2">Certified mentors guiding scholars across languages, sciences, mathematics, and arts.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {teachers.map(t => (
                            <div key={t._id} className="card-minimal p-5 flex flex-col justify-between group">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">{t.name}</h4>
                                    <p className="text-xs font-semibold text-blue-600 mb-2">{t.subject}</p>
                                    {t.qualification && <p className="text-[11px] text-slate-500 mb-2">{t.qualification}</p>}
                                </div>
                                <p className="text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-100">{t.email}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ==========================================
                5. CHRONOLOGICAL MILESTONES
            ========================================== */}
            <section className="py-20 bg-slate-50 border-t border-slate-200 text-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">Historical Record</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Foundations & Milestones</h2>
                    </div>

                    <div className="space-y-4">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-300 shadow-xs hover:shadow-md transition-all">
                                <div className="text-2xl font-bold text-blue-600 md:w-28 shrink-0">
                                    {item.year}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
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
