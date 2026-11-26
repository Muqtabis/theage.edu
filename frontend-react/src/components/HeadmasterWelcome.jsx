import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight, Award, CheckCircle2, Sparkles, BookOpen, ShieldCheck, Languages } from 'lucide-react';

const HeadmasterWelcome = () => {
    return (
        <section className="py-8 sm:py-14 bg-gradient-to-b from-white via-amber-50/20 to-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    
                    {/* Portrait Column */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative mx-auto max-w-sm lg:max-w-none">
                            {/* Decorative Background Frame */}
                            <div className="absolute -inset-2.5 border-2 border-amber-200 rounded-3xl transform -rotate-1 pointer-events-none" />
                            
                            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-lg bg-white aspect-[4/4.5] sm:aspect-[4/5] img-zoom-box">
                                <img 
                                    src="https://images.unsplash.com/photo-1544531327-c820ad9d46dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Director of The Age School" 
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                                
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-0.5">
                                        Executive Leadership
                                    </span>
                                    <h4 className="font-serif font-bold text-lg sm:text-xl text-white leading-tight">
                                        Dr. Sarah Mitchell, Ph.D.
                                    </h4>
                                    <p className="text-xs text-slate-200 font-medium">
                                        President & Head of Academics
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editorial Message Column */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold shadow-2xs">
                            <Award size={13} className="text-amber-600" />
                            <span>Directorate Welcome Message</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight leading-snug">
                            “Education is not merely about syllabus mastery. It is the formation of moral character.”
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                            Welcome to <strong>The Age School</strong>. For over a decade in Basavakalyan, we have dedicated ourselves to an uncompromising standard: providing scholars with the intellectual rigor of national benchmarks, the creative freedom of the arts, and the steadfast ethical foundation needed to lead with integrity.
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Whether guiding a child through their first phonics in Nursery or preparing a senior scholar for SSLC Board distinction and Pre-University competitive entrance examinations, every teacher on our campus is a dedicated mentor.
                        </p>

                        {/* Three Pillars Highlight Cards - Filled, rich, zero dead whitespace */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 text-xs">
                            <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3 shadow-2xs">
                                <div className="flex items-center gap-1.5 text-blue-900 font-bold mb-1">
                                    <BookOpen size={14} className="text-blue-600" />
                                    <span>Academic Rigor</span>
                                </div>
                                <span className="text-slate-600 text-[11px] leading-snug block">100% board pass with personalized remedial coaching.</span>
                            </div>
                            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 shadow-2xs">
                                <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-1">
                                    <ShieldCheck size={14} className="text-amber-600" />
                                    <span>Moral Bearing</span>
                                </div>
                                <span className="text-slate-600 text-[11px] leading-snug block">Civic responsibility & integrity woven into daily rhythm.</span>
                            </div>
                            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 shadow-2xs">
                                <div className="flex items-center gap-1.5 text-emerald-900 font-bold mb-1">
                                    <Languages size={14} className="text-emerald-600" />
                                    <span>Trilingual Mastery</span>
                                </div>
                                <span className="text-slate-600 text-[11px] leading-snug block">English, Kannada & Hindi fluency for global opportunities.</span>
                            </div>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center gap-3">
                            <Link 
                                to="/about" 
                                className="btn-primary text-xs py-2 px-4"
                            >
                                <span>Read Institutional Vision</span>
                                <ArrowRight size={13} />
                            </Link>

                            <Link 
                                to="/academics" 
                                className="btn-secondary text-xs py-2 px-4"
                            >
                                <span>Explore All 17 Classes</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeadmasterWelcome;
