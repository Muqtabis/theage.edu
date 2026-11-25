import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

const HeadmasterWelcome = () => {
    return (
        <section className="py-20 sm:py-28 bg-[#faf8f5] border-b border-[#e8e4dc]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Portrait Column */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative mx-auto max-w-md lg:max-w-none">
                            {/* Decorative Background Frame */}
                            <div className="absolute -inset-4 border-2 border-[#c5a880]/30 rounded-2xl transform -rotate-1 pointer-events-none" />
                            
                            <div className="relative rounded-xl overflow-hidden border-2 border-[#c5a880] shadow-xl bg-white aspect-[4/5] img-zoom-box">
                                <img 
                                    src="https://images.unsplash.com/photo-1544531327-c820ad9d46dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Director of The Age School" 
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/90 via-[#071322]/20 to-transparent" />
                                
                                <div className="absolute bottom-5 left-5 right-5 text-white">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a880] block mb-1">
                                        Executive Leadership
                                    </span>
                                    <h4 className="font-serif font-bold text-xl text-white">
                                        Dr. Sarah Mitchell, Ph.D.
                                    </h4>
                                    <p className="text-xs text-slate-300">
                                        President & Head of Academics
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editorial Message Column */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#c5a880]/40 text-[#8c7355] text-xs font-semibold shadow-2xs">
                            <Award size={14} className="text-[#c5a880]" />
                            <span>Directorate Welcome Message</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#0b192c] tracking-tight leading-[1.15]">
                            “Education is not merely about syllabus mastery. It is the formation of moral character.”
                        </h2>

                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                            Welcome to <strong>The Age School</strong>. For over a decade in Basavakalyan, we have dedicated ourselves to an uncompromising standard: providing scholars with the intellectual rigor of national benchmarks, the creative freedom of the arts, and the steadfast ethical foundation needed to lead with integrity.
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Whether guiding a child through their first phonics in Nursery or preparing a senior scholar for SSLC Board distinction and Pre-University competitive entrance examinations, every teacher on our campus is a dedicated mentor. We welcome you to experience our vibrant community firsthand.
                        </p>

                        {/* Three Pillars Bullet List */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e8e4dc] text-xs">
                            <div>
                                <strong className="text-[#0b192c] block font-bold mb-1">Uncompromising Rigor</strong>
                                <span className="text-slate-600 text-[11px] leading-tight block">100% board distinction with personalized doubt remediation.</span>
                            </div>
                            <div>
                                <strong className="text-[#0b192c] block font-bold mb-1">Moral Conviction</strong>
                                <span className="text-slate-600 text-[11px] leading-tight block">Civic responsibility and social humility woven into daily rhythm.</span>
                            </div>
                            <div>
                                <strong className="text-[#0b192c] block font-bold mb-1">Trilingual Fluency</strong>
                                <span className="text-slate-600 text-[11px] leading-tight block">English, Kannada, and Hindi mastery for global opportunities.</span>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <Link 
                                to="/about" 
                                className="btn-primary text-xs"
                            >
                                <span>Read Institutional Vision</span>
                                <ArrowRight size={13} />
                            </Link>

                            <Link 
                                to="/academics" 
                                className="btn-secondary text-xs"
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
