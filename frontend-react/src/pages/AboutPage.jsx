import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Quote, 
    Target, 
    Heart, 
    History, 
    Star, 
    Users, 
    ArrowRight, 
    ShieldCheck, 
    Lightbulb, 
    Globe 
} from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="font-sans text-slate-600 bg-white selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* --- CSS Animations --- */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fadeUp 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
            `}</style>

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-violet-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        
                        <div className="lg:w-1/2 animate-fade-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/50 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
                                <Star size={14} /> Est. 2012
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-medium leading-[1.1] mb-8">
                                Education for a <br />
                                <span className="text-indigo-400">changing world.</span>
                            </h1>
                            <p className="text-lg text-slate-300 leading-relaxed font-light max-w-xl mb-10">
                                At The Age School, we don't just teach the curriculum. We cultivate character, creativity, and the courage to lead in a global society.
                            </p>
                            <div className="flex flex-wrap gap-12 border-t border-slate-700 pt-8">
                                <div><span className="block text-4xl font-bold text-white mb-1">500+</span><span className="text-sm text-slate-400 uppercase tracking-wider">Students</span></div>
                                <div><span className="block text-4xl font-bold text-white mb-1">100%</span><span className="text-sm text-slate-400 uppercase tracking-wider">Pass Rate</span></div>
                                <div><span className="block text-4xl font-bold text-white mb-1">30+</span><span className="text-sm text-slate-400 uppercase tracking-wider">Faculty</span></div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative animate-fade-up delay-200">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
                                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="School Building" className="w-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. LEADERSHIP MESSAGES (STACKED)
            ========================================== */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-medium text-slate-900 mb-12 text-center">A Welcome from Our Leadership</h2>

                    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                        
                        {/* CARD 1: PRESIDENT */}
                        <div className="bg-indigo-50/50 rounded-[2.5rem] p-8 md:p-12 relative border border-indigo-100 shadow-lg shadow-indigo-50/20">
                            <Quote className="absolute top-8 left-8 text-indigo-200 w-12 h-12 -z-0 rotate-180 opacity-50" />
                            <div className="relative z-10 text-center">
                                <div className="w-20 h-20 mx-auto bg-white p-1 rounded-full shadow-lg mb-6">
                                    <img src="https://images.unsplash.com/photo-1544531327-c820ad9d46dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="President" className="w-full h-full rounded-full object-cover" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">"Lighting the fire of curiosity."</h3>
                                
                                <div className="text-lg leading-relaxed space-y-5 max-w-md mx-auto">
                                    {/* Italics applied */}
                                    <p className="text-gray-900 font-medium italic">
                                        Welcome to The Age School. We believe that education is not merely about academic rigor, but about shaping character. Our mission is to provide stability, values, and the skills needed to navigate the future.
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-indigo-200">
                                    <p className="font-bold text-slate-900 text-xl">Dr. Sarah Mitchell</p>
                                    <p className="text-indigo-600 text-sm font-bold uppercase tracking-wider mt-1">President</p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: VICE PRESIDENT */}
                        <div className="bg-violet-50/50 rounded-[2.5rem] p-8 md:p-12 relative border border-violet-100 shadow-lg shadow-violet-50/20">
                            <Quote className="absolute top-8 left-8 text-violet-200 w-12 h-12 -z-0 rotate-180 opacity-50" />
                            <div className="relative z-10 text-center">
                                <div className="w-20 h-20 mx-auto bg-white p-1 rounded-full shadow-lg mb-6">
                                    <img src="https://images.unsplash.com/photo-1574023605634-6d9ff7b5a840?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Vice President" className="w-full h-full rounded-full object-cover" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">"Embracing tomorrow's challenges."</h3>
                                
                                <div className="text-lg leading-relaxed space-y-5 max-w-md mx-auto">
                                    {/* Italics applied */}
                                    <p className="text-gray-900 font-medium italic">
                                        As Vice President, I emphasize inclusion and innovation. Our campus is a place where every student is known, valued, and challenged to be their best self daily.
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-violet-200">
                                    <p className="font-bold text-slate-900 text-xl">Mr. Alex Chen</p>
                                    <p className="text-violet-600 text-sm font-bold uppercase tracking-wider mt-1">Vice President</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. OUR VALUES (Bento Grid)
            ========================================== */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">Our Philosophy</span>
                        <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mt-3">What Drives Us</h2>
                        <div className="h-1 w-20 bg-indigo-600 rounded-full mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 max-w-6xl mx-auto h-auto md:h-[600px]">
                        
                        <div className="md:col-span-2 bg-slate-900 rounded-3xl p-10 text-white flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md text-indigo-300 group-hover:scale-110 transition-transform">
                                <Target size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">Academic Excellence</h3>
                                <p className="text-slate-400 font-light leading-relaxed max-w-md">
                                    We set high standards and provide the support needed to reach them. Our curriculum is designed to challenge students to think critically and creatively.
                                </p>
                            </div>
                        </div>

                        <div className="md:row-span-2 bg-indigo-50 rounded-3xl p-10 flex flex-col justify-between border border-indigo-100 hover:border-indigo-200 transition-all duration-300">
                            <div>
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-8">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-indigo-900 mb-3">Inclusive Community</h3>
                                <p className="text-slate-700 leading-relaxed font-medium">
                                    We foster a diverse environment where every student belongs. From peer mentorship to community service, we build bonds that last a lifetime.
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-indigo-200">
                                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Join 500+ students</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 mb-4">
                                <Lightbulb size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Innovation</h3>
                            <p className="text-sm text-slate-600">Integrating technology and modern pedagogy to prepare for the future.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-4">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Integrity</h3>
                            <p className="text-sm text-slate-600">Building character through honesty, responsibility, and ethical leadership.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. HISTORY TIMELINE
            ========================================== */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium text-slate-900">Our History</h2>
                        <p className="text-slate-500 mt-2">A legacy of growth and milestones.</p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-300 transform md:-translate-x-1/2"></div>

                            {/* 2012 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-12 md:mb-20 group">
                                <div className="md:w-1/2 md:pr-12 md:text-right pl-20 md:pl-0 w-full">
                                    <span className="text-violet-600 font-bold text-xl block mb-1">2012</span>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Foundation</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">The Age School opened its doors with just 50 students and a bold vision to change education.</p>
                                </div>
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-violet-600 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform shadow-sm"></div>
                                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                            </div>

                            {/* 2015 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-12 md:mb-20 group">
                                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-indigo-500 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform shadow-sm"></div>
                                <div className="md:w-1/2 md:pl-12 pl-20 md:text-left w-full">
                                    <span className="text-indigo-600 font-bold text-xl block mb-1">2015</span>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Campus Expansion</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">Added the new Science Wing and Sports Complex to support holistic development.</p>
                                </div>
                            </div>

                            {/* 2024 */}
                            <div className="relative flex flex-col md:flex-row items-center group">
                                <div className="md:w-1/2 md:pr-12 md:text-right pl-20 md:pl-0 w-full">
                                    <span className="text-emerald-600 font-bold text-xl block mb-1">2024</span>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Going Global</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">Launching international exchange programs and digital learning initiatives.</p>
                                </div>
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-emerald-500 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform shadow-sm"></div>
                                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                5. FOOTER CTA
            ========================================== */}
            <section className="bg-white py-24 px-6 text-center border-t border-slate-100">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-medium text-slate-900 mb-6">Be a part of our story.</h2>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors shadow-lg hover:shadow-indigo-500/20">
                        Apply for Admission <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;