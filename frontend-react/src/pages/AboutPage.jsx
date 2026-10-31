import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Quote, 
    Target, 
    Star, 
    Users, 
    ArrowRight, 
    ShieldCheck, 
    Lightbulb, 
    GraduationCap,
    CheckCircle2,
    Briefcase
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
        { year: '2012', title: 'Foundation', desc: 'The Age School opened its doors with 50 students and a vision for progressive education in Karnataka.' },
        { year: '2016', title: 'Campus Expansion', desc: 'Added modern science laboratories, high-speed computer center, and expanded athletic grounds.' },
        { year: '2024', title: 'Smart Learning & Global Reach', desc: 'Integrated interactive digital classrooms, STEM robotics curriculum, and international student exchange modules.' }
    ];

    return (
        <div className="font-sans text-slate-700 bg-white selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-slate-950 text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
                        
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
                                <Star size={13} className="text-amber-400" />
                                <span>{about.heroBadge || 'Est. 2012'}</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6 text-white">
                                {about.heroTitle || 'Education for a changing world.'}
                            </h1>

                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl mb-10">
                                {about.heroSubtitle || "At The Age School, we don't just teach the curriculum. We cultivate character, creativity, and the courage to lead in a global society."}
                            </p>

                            <div className="grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
                                <div>
                                    <span className="block text-3xl md:text-4xl font-serif font-bold text-white mb-1">
                                        {home.statsStudents || '500+'}
                                    </span>
                                    <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Students</span>
                                </div>
                                <div>
                                    <span className="block text-3xl md:text-4xl font-serif font-bold text-amber-300 mb-1">
                                        {home.statsPassRate || '100%'}
                                    </span>
                                    <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Pass Rate</span>
                                </div>
                                <div>
                                    <span className="block text-3xl md:text-4xl font-serif font-bold text-white mb-1">
                                        {home.statsFaculty || '35+'}
                                    </span>
                                    <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Faculty</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                                <img 
                                    src={about.heroImageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                                    alt="School Campus" 
                                    className="w-full h-[380px] sm:h-[450px] object-cover transform hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
                                    <div>
                                        <p className="text-white font-serif font-bold text-xl">{general.schoolName || 'The Age School'}</p>
                                        <p className="text-xs text-slate-300">Nurturing holistic excellence in Basavakalyan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                2. LEADERSHIP MESSAGES (Dynamic Executive Cards)
            ========================================== */}
            <section className="py-24 bg-slate-50 border-b border-slate-200/70">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Leadership Vision</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                            A Welcome From Our Leadership
                        </h2>
                        <p className="text-slate-600 mt-3 text-sm md:text-base">
                            Guiding our academic standards, character development, and future vision.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        
                        {/* PRESIDENT CARD */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 relative border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                            <Quote className="absolute top-6 right-6 text-indigo-100 w-16 h-16 pointer-events-none -z-0" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 shadow-md bg-slate-100 shrink-0">
                                        <img 
                                            src={about.presidentImageUrl || "https://images.unsplash.com/photo-1544531327-c820ad9d46dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                                            alt={about.presidentName || 'President'} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-serif font-bold text-slate-900 text-xl">
                                            {about.presidentName || 'Dr. Sarah Mitchell'}
                                        </h3>
                                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                                            {about.presidentRole || 'President'}
                                        </span>
                                    </div>
                                </div>

                                <h4 className="text-lg font-serif font-bold text-slate-800 mb-3 text-indigo-950">
                                    {about.presidentQuote || '"Lighting the fire of curiosity."'}
                                </h4>
                                
                                <p className="text-slate-600 text-sm leading-relaxed italic">
                                    "{about.presidentMessage || 'Welcome to The Age School. We believe that education is not merely about academic rigor, but about shaping character. Our mission is to provide stability, values, and the skills needed to navigate the future.'}"
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                <span>The Age School Board of Trustees</span>
                                <CheckCircle2 size={16} className="text-emerald-500" />
                            </div>
                        </div>

                        {/* VICE PRESIDENT CARD */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 relative border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                            <Quote className="absolute top-6 right-6 text-violet-100 w-16 h-16 pointer-events-none -z-0" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-violet-500 shadow-md bg-slate-100 shrink-0">
                                        <img 
                                            src={about.vpImageUrl || "https://images.unsplash.com/photo-1574023605634-6d9ff7b5a840?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                                            alt={about.vpName || 'Vice President'} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-serif font-bold text-slate-900 text-xl">
                                            {about.vpName || 'Mr. Alex Chen'}
                                        </h3>
                                        <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                                            {about.vpRole || 'Vice President'}
                                        </span>
                                    </div>
                                </div>

                                <h4 className="text-lg font-serif font-bold text-slate-800 mb-3 text-violet-950">
                                    {about.vpQuote || '"Embracing tomorrow\'s challenges."'}
                                </h4>
                                
                                <p className="text-slate-600 text-sm leading-relaxed italic">
                                    "{about.vpMessage || 'As Vice President, I emphasize inclusion and innovation. Our campus is a place where every student is known, valued, and challenged to be their best self daily.'}"
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                <span>Administration & Academic Affairs</span>
                                <CheckCircle2 size={16} className="text-emerald-500" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                3. CORE VALUES
            ========================================== */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Our Philosophy</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                            The Four Pillars of Our Culture
                        </h2>
                        <div className="h-1 w-16 bg-indigo-600 rounded-full mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Target, title: "Academic Excellence", desc: "Setting ambitious standards and fostering independent intellectual curiosity with personalized mentoring.", color: "text-indigo-600", bg: "bg-indigo-50" },
                            { icon: Users, title: "Inclusive Community", desc: "A vibrant home where every background is embraced, celebrated, and supported with kindness.", color: "text-amber-600", bg: "bg-amber-50" },
                            { icon: Lightbulb, title: "Modern Innovation", desc: "Integrating technology, laboratory research, and creative problem solving for the 21st century.", color: "text-violet-600", bg: "bg-violet-50" },
                            { icon: ShieldCheck, title: "Ethical Integrity", desc: "Instilling deep moral responsibility, community civic pride, and honesty in every interaction.", color: "text-emerald-600", bg: "bg-emerald-50" },
                        ].map((pillar, i) => (
                            <div key={i} className="p-8 rounded-3xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-indigo-200 transition-all">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pillar.bg} ${pillar.color} mb-6 shadow-xs`}>
                                    <pillar.icon size={24} />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{pillar.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. FACULTY & TEACHERS SHOWCASE (Dynamic)
            ========================================== */}
            {teachers.length > 0 && (
                <section className="py-20 bg-slate-50 border-t border-slate-200/70">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Our Educators</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                                Meet Our Dedicated Faculty
                            </h2>
                            <p className="text-slate-600 text-sm mt-2">
                                Passionate educators committed to guiding your child's academic and moral growth.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {teachers.map((t) => (
                                <div key={t._id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 font-serif font-bold text-lg">
                                        {t.name.charAt(0)}
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-base">{t.name}</h4>
                                    <p className="text-xs font-semibold text-indigo-600 mb-2">{t.subject}</p>
                                    {t.qualification && (
                                        <p className="text-xs text-slate-500 mb-1">{t.qualification}</p>
                                    )}
                                    <p className="text-xs text-slate-400 truncate">{t.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ==========================================
                5. TIMELINE MILESTONES (Dynamic)
            ========================================== */}
            <section className="py-24 bg-white border-t border-slate-200/70">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Our Journey</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">History & Milestones</h2>
                        <p className="text-slate-500 text-sm mt-2">A legacy of progress, service, and excellence.</p>
                    </div>

                    <div className="relative">
                        {/* Center timeline vertical bar */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

                        <div className="space-y-12">
                            {timeline.map((item, idx) => {
                                const isEven = idx % 2 === 0;
                                return (
                                    <div key={idx} className="relative flex flex-col md:flex-row items-center">
                                        {/* Dot */}
                                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-indigo-600 shadow-sm z-10" />

                                        {/* Content */}
                                        <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:text-left'}`}>
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow inline-block text-left w-full">
                                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                                                    {item.year}
                                                </span>
                                                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-slate-600 text-sm leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                6. CTA BANNER
            ========================================== */}
            <section className="bg-slate-900 text-white py-20 px-6 text-center relative overflow-hidden">
                <div className="max-w-xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Be a part of our story.</h2>
                    <p className="text-slate-300 text-sm md:text-base mb-8">
                        Join our vibrant academic family and give your child the foundation for a lifetime of leadership.
                    </p>
                    <Link 
                        to="/admissions" 
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 text-slate-950 rounded-full text-sm font-bold shadow-lg hover:shadow-amber-400/20 transition-all"
                    >
                        Apply for Admission <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
