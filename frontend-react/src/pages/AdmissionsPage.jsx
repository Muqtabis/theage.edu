import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ClipboardCheck, 
    Calendar, 
    Users, 
    MailOpen, 
    Sparkles, 
    ArrowRight, 
    Check,
    DollarSign,
    HeartHandshake
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const stepIcons = [Calendar, ClipboardCheck, Users, MailOpen];

const AdmissionsPage = () => {
    const { content } = useSiteContent();
    const admissions = content?.admissions || {};
    const general = content?.general || {};

    const fees = Array.isArray(admissions.fees) && admissions.fees.length > 0 ? admissions.fees : [
        { grade: 'Primary School', range: 'Grades 1-5', annual: '15,000', materials: '₹ 3,500', highlight: false },
        { grade: 'Middle School', range: 'Grades 6-8', annual: '18,000', materials: '₹ 4,000', highlight: true },
        { grade: 'High School', range: 'Grades 9-10', annual: '25,000', materials: '₹ 5,000', highlight: false }
    ];

    const steps = Array.isArray(admissions.steps) && admissions.steps.length > 0 ? admissions.steps : [
        { id: 1, title: "Inquire & Visit", desc: "Explore our website and schedule a virtual or in-person tour to see our campus." },
        { id: 2, title: "Submit Application", desc: "Complete our online application form and submit the required documentation." },
        { id: 3, title: "Student Assessment", desc: "Prospective students participate in a friendly assessment and faculty interview." },
        { id: 4, title: "Final Decision & Welcome", desc: "Admissions confirmation letter issued and welcome kit provided for smooth onboarding." }
    ];

    return (
        <div className="font-sans text-slate-800 bg-white min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative py-24 md:py-36 bg-slate-950 overflow-hidden text-white text-center">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container relative z-10 mx-auto px-6 max-w-4xl">
                    <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold tracking-wider mb-6 backdrop-blur-md uppercase">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>{admissions.heroBadge || general.admissionsBadge || 'ADMISSIONS OPEN 2025-26'}</span>
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight text-white">
                        {admissions.heroTitle || 'Begin Your Journey Here'}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
                        {admissions.heroSubtitle || 'We are looking for curious minds and kind hearts. Begin your application process with confidence.'}
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. ADMISSIONS PROCESS (4-Step Road Map)
            ========================================== */}
            <section className="container mx-auto px-6 py-24 max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">How It Works</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                        Our 4-Step Enrollment Roadmap
                    </h2>
                    <p className="text-slate-600 text-sm mt-2">Transparent, supportive, and designed for your family's convenience.</p>
                </div>

                <div className="relative">
                    {/* Horizontal desktop connector line */}
                    <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-200 hidden lg:block -translate-y-12" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => {
                            const IconComponent = stepIcons[idx % stepIcons.length];
                            return (
                                <div key={step.id || idx} className="relative group flex flex-col items-center text-center">
                                    {/* Number Circle Badge */}
                                    <div className="w-14 h-14 bg-white border-4 border-indigo-600 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-md mb-6 z-10 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        {step.id || idx + 1}
                                    </div>
                                    
                                    {/* Content Card */}
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-xs group-hover:shadow-lg group-hover:border-indigo-200 transition-all w-full flex-grow">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                                            <IconComponent size={20} />
                                        </div>
                                        <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">{step.title}</h3>
                                        <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="text-center mt-16">
                    <Link 
                        to="/contact" 
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-full shadow-md transition-all text-sm"
                    >
                        <span>Schedule a School Tour</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* ==========================================
                3. FEE STRUCTURE (Dynamic Pricing Cards)
            ========================================== */}
            <section className="py-24 bg-slate-50 border-t border-slate-200/70">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Affordable Quality</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                            Transparent Fee Structure
                        </h2>
                        <p className="text-slate-600 text-sm mt-2">Comprehensive annual education fee schedule without hidden charges.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                        {fees.map((item, idx) => (
                            <div 
                                key={idx} 
                                className={`relative p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between border ${
                                    item.highlight 
                                        ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-105 z-10' 
                                        : 'bg-white text-slate-800 border-slate-200/80 hover:shadow-xl'
                                }`}
                            >
                                {item.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-slate-950 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                                        Most Popular
                                    </div>
                                )}

                                <div>
                                    <div className="text-center mb-6 pt-2">
                                        <h3 className={`text-2xl font-serif font-bold mb-1 ${item.highlight ? 'text-white' : 'text-slate-900'}`}>
                                            {item.grade}
                                        </h3>
                                        <p className={`text-xs font-medium ${item.highlight ? 'text-amber-300' : 'text-slate-500'}`}>
                                            {item.range}
                                        </p>
                                    </div>

                                    {/* Annual Fee Display */}
                                    <div className={`text-center mb-8 pb-6 border-b ${item.highlight ? 'border-slate-800' : 'border-slate-100'}`}>
                                        <span className={`text-4xl md:text-5xl font-serif font-extrabold ${item.highlight ? 'text-white' : 'text-slate-900'}`}>
                                            ₹ {item.annual}
                                        </span>
                                        <span className={`block text-xs mt-2 ${item.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Annual Tuition Fee
                                        </span>
                                    </div>

                                    <ul className="space-y-3 mb-8 text-sm">
                                        <li className="flex items-center gap-3">
                                            <Check size={16} className={item.highlight ? 'text-amber-300' : 'text-indigo-600'} />
                                            <span>Books & Materials: <strong>{item.materials}</strong></span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check size={16} className={item.highlight ? 'text-amber-300' : 'text-indigo-600'} />
                                            <span>Computer & Science Lab Access</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check size={16} className={item.highlight ? 'text-amber-300' : 'text-indigo-600'} />
                                            <span>Sports & Physical Education</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check size={16} className={item.highlight ? 'text-amber-300' : 'text-indigo-600'} />
                                            <span>Co-Curricular Workshops & Events</span>
                                        </li>
                                    </ul>
                                </div>

                                <Link
                                    to="/contact"
                                    className={`w-full py-3.5 rounded-full font-bold text-xs text-center transition-all ${
                                        item.highlight 
                                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md' 
                                            : 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800'
                                    }`}
                                >
                                    Inquire for Enrollment
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Financial Aid Card */}
                    <div className="mt-16 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-start gap-5">
                            <div className="bg-amber-50 p-3.5 rounded-2xl text-amber-600 shrink-0">
                                <HeartHandshake size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">
                                    {admissions.financialAidTitle || 'Financial Aid & Scholarships'}
                                </h3>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-xl">
                                    {admissions.financialAidDesc || 'We believe financial barriers should not prevent a child from receiving quality education. Need-based scholarships and concessions are available on request.'}
                                </p>
                            </div>
                        </div>
                        <Link 
                            to="/contact" 
                            className="px-6 py-3 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold rounded-full transition-all shrink-0"
                        >
                            Speak to Office
                        </Link>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default AdmissionsPage;
