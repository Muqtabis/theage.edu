import React from 'react';
import { Quote, Target, Heart, History, Star, Users } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="font-sans bg-gray-50">
            {/* Animation Styles */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `}</style>

            {/* ==========================================
                1. HERO SECTION 
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-indigo-950 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight animate-fade-in-up">
                        About <span className="text-violet-300">The Age School</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
                        Empowering the next generation through a legacy of excellence, integrity, and innovation.
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. HEADMASTER MESSAGE (Fixed Visibility)
            ========================================== */}
            <section className="container mx-auto px-6 py-20 -mt-10 relative z-20">
                {/* Ensuring background is strictly white */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: '#ffffff' }}>
                    
                    {/* Image Side */}
                    <div className="md:w-2/5 relative min-h-[400px]">
                        <img 
                            src="https://placehold.co/600x800/d5c0e8/4a0e88?text=Headmaster" 
                            alt="Headmaster" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-transparent"></div>
                    </div>

                    {/* Content Side */}
                    <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center relative">
                        <Quote className="absolute top-10 right-10 text-gray-200 w-32 h-32 -z-0 rotate-180" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-1 bg-violet-600 rounded-full"></div>
                                <span className="text-indigo-900 font-bold uppercase tracking-widest text-sm">Headmaster's Welcome</span>
                            </div>

                            {/* Title: Forced Black */}
                            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 leading-tight">
                                "Every child is a unique individual with <span className="text-violet-700">boundless potential.</span>"
                            </h2>
                            
                            {/* 🚨 FIX: Applied text-gray-800 directly to <p> tags */}
                            <div className="text-lg leading-relaxed space-y-6 font-medium">
                                <p className="text-gray-800">
                                    Welcome to The Age School. Our commitment is to foster a love for learning that lasts a lifetime. We believe that education is not just about filling a pail, but the lighting of a fire.
                                </p>
                                <p className="text-gray-800">
                                    
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="font-script text-3xl text-indigo-900 font-bold"></span>
                                    <span className="text-gray-600 text-sm font-bold">Principal & Head of School</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. MISSION & VALUES
            ========================================== */}
            <section className="py-20 bg-white" style={{ backgroundColor: '#ffffff' }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-violet-700 font-bold tracking-wider uppercase text-sm">Core Philosophy</span>
                        <h2 className="text-4xl font-bold text-black mt-2">Our Mission & Vision</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Card 1 */}
                        <div className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <Target size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-indigo-900 mb-3">Our Mission</h3>
                            {/* Forced Dark Text */}
                            <p className="text-gray-800 leading-relaxed font-medium">To provide a rigorous, holistic education that prepares students to be ethical leaders and global citizens.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 rounded-2xl bg-violet-50 border border-violet-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-violet-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <Heart size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-indigo-900 mb-3">Our Values</h3>
                            {/* Forced Dark Text */}
                            <p className="text-gray-800 leading-relaxed font-medium">Integrity, Compassion, Curiosity, and Resilience are the pillars upon which our community stands.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-2xl bg-fuchsia-50 border border-fuchsia-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-fuchsia-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-indigo-900 mb-3">Our Community</h3>
                            {/* Forced Dark Text */}
                            <p className="text-gray-800 leading-relaxed font-medium">A diverse, inclusive family where every student, parent, and teacher feels valued and heard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. HISTORY TIMELINE
            ========================================== */}
            <section className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-4 border border-gray-200">
                            <History size={16} className="text-indigo-600" />
                            <span className="text-sm font-bold text-black uppercase">Our Journey</span>
                        </div>
                        <h2 className="text-4xl font-bold text-black">A Legacy of Growth</h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform md:-translate-x-1/2"></div>

                            {/* Timeline Item 1 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-16 group">
                                <div className="md:w-1/2 md:pr-12 md:text-right pl-20 md:pl-0">
                                    <span className="text-violet-700 font-bold text-lg block mb-1">2012</span>
                                    <h3 className="text-xl font-bold text-black mb-2">Foundation</h3>
                                    <p className="text-gray-700 font-medium">The Age School opened its doors with just 50 students and a vision to change education.</p>
                                </div>
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-violet-600 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-150 transition-transform"></div>
                                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                            </div>

                            {/* Timeline Item 2 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-16 group">
                                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-indigo-500 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-150 transition-transform"></div>
                                <div className="md:w-1/2 md:pl-12 pl-20 md:text-left">
                                    <span className="text-indigo-600 font-bold text-lg block mb-1">2015</span>
                                    <h3 className="text-xl font-bold text-black mb-2">Campus Expansion</h3>
                                    <p className="text-gray-700 font-medium">Added the new Science Wing and Sports Complex to support holistic development.</p>
                                </div>
                            </div>

                            {/* Timeline Item 3 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-16 group">
                                <div className="md:w-1/2 md:pr-12 md:text-right pl-20 md:pl-0">
                                    <span className="text-fuchsia-600 font-bold text-lg block mb-1">2019</span>
                                    <h3 className="text-xl font-bold text-black mb-2">National Recognition</h3>
                                    <p className="text-gray-700 font-medium">Awarded the "Excellence in Education" award for our innovative curriculum.</p>
                                </div>
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-fuchsia-600 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-150 transition-transform"></div>
                                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                            </div>

                            {/* Timeline Item 4 */}
                            <div className="relative flex flex-col md:flex-row items-center group">
                                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-indigo-600 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-150 transition-transform"></div>
                                <div className="md:w-1/2 md:pl-12 pl-20 md:text-left">
                                    <span className="text-indigo-600 font-bold text-lg block mb-1">2024</span>
                                    <h3 className="text-xl font-bold text-black mb-2">Going Global</h3>
                                    <p className="text-gray-700 font-medium">Launching international exchange programs and digital learning initiatives.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                5. TESTIMONIALS (Dark Background)
            ========================================== */}
            <section className="py-24 bg-indigo-950 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-4">
                            {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-yellow-400 fill-yellow-400 mx-1" />)}
                        </div>
                        <h2 className="text-4xl font-bold mb-4 text-white">What Our Families Say</h2>
                        <p className="text-indigo-100">Real stories from our vibrant community.</p> 
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-indigo-900 p-8 rounded-2xl border border-indigo-800 relative hover:border-violet-500 transition-colors duration-300">
                            <Quote className="text-indigo-300 mb-6 w-10 h-10" />
                            <p className="text-indigo-100 italic text-lg mb-6 leading-relaxed">"Enrolling our daughter at The Age School was the best decision we've ever made. The teachers are incredible, and she is truly thriving."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center font-bold text-white">S</div>
                                <div>
                                    <p className="font-bold text-white">Sarah & Tom L.</p>
                                    <p className="text-sm text-violet-300">Current Parents</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-indigo-900 p-8 rounded-2xl border border-indigo-800 relative hover:border-fuchsia-500 transition-colors duration-300">
                            <Quote className="text-indigo-300 mb-6 w-10 h-10" />
                            <p className="text-indigo-100 italic text-lg mb-6 leading-relaxed">"As an alumnus, I felt prepared for college and for life. The lessons I learned here, both academic and personal, are invaluable."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-fuchsia-500 flex items-center justify-center font-bold text-white">M</div>
                                <div>
                                    <p className="font-bold text-white">Michael B.</p>
                                    <p className="text-sm text-fuchsia-300">Class of 2019</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-indigo-900 p-8 rounded-2xl border border-indigo-800 relative hover:border-indigo-400 transition-colors duration-300">
                            <Quote className="text-indigo-300 mb-6 w-10 h-10" />
                            <p className="text-indigo-100 italic text-lg mb-6 leading-relaxed">"The community is so welcoming. We moved here last year, and everyone—from staff to other parents—made us feel right at home."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">D</div>
                                <div>
                                    <p className="font-bold text-white">David K.</p>
                                    <p className="text-sm text-indigo-300">New Parent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;