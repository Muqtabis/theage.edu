import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Calendar, 
    ClipboardCheck, 
    Users, 
    MailOpen, 
    Check, 
    ArrowRight,
    GraduationCap,
    Award,
    Sparkles,
    ShieldCheck
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const AdmissionsPage = () => {
    const { content } = useSiteContent();
    const admissions = content?.admissions || {};
    const general = content?.general || {};

    const fees = Array.isArray(admissions.fees) && admissions.fees.length > 0 ? admissions.fees : [
        { grade: 'Primary School Wing', range: 'Classes I to V', annual: '15,000', materials: '₹ 3,500', highlight: false, color: 'blue' },
        { grade: 'Middle School Wing', range: 'Classes VI to VIII', annual: '18,000', materials: '₹ 4,000', highlight: true, color: 'amber' },
        { grade: 'Secondary School (SSLC)', range: 'Classes IX & X', annual: '25,000', materials: '₹ 5,000', highlight: false, color: 'purple' }
    ];

    return (
        <div className="font-sans text-slate-800 bg-[#f8fafc] selection:bg-amber-400 selection:text-slate-950">
            
            {/* HERO */}
            <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 sm:py-24 md:py-32 border-b border-blue-800/40 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-3xl pointer-events-none animate-float" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-950 inline-flex items-center gap-2 mb-4 bg-amber-400 px-4 py-1.5 rounded-full shadow-lg shadow-amber-400/20">
                        <GraduationCap size={16} />
                        {admissions.heroBadge || general.admissionsBadge || 'Admissions Directory 2026–27'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight">
                        <span>{admissions.heroTitle || 'Begin Your Journey Here'}</span>
                    </h1>
                    <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        {admissions.heroSubtitle || 'We welcome curious, conscientious learners seeking disciplined scholarship, moral formation, and lifelong character.'}
                    </p>
                </div>
            </section>

            {/* ADMISSION ROADMAP (4 Colorful Steps) */}
            <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-2xl mb-12 sm:mb-16">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 block mb-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full w-fit">
                        Clear & Transparent Process
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">The Four-Step Enrollment Procedure</h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">A structured admission protocol designed to understand and support every learner.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { 
                            id: 1, 
                            title: "Inquire & Consultation", 
                            desc: "Review academic pathways and schedule an in-person or virtual campus consultation with our admissions desk.",
                            border: "border-blue-400",
                            badge: "bg-blue-100 text-blue-800",
                            numColor: "text-blue-600",
                            bg: "bg-gradient-to-br from-blue-50/50 to-white"
                        },
                        { 
                            id: 2, 
                            title: "Application & Records", 
                            desc: "Submit the official student enrollment record with previous academic transcripts and birth credentials.",
                            border: "border-amber-400",
                            badge: "bg-amber-100 text-amber-800",
                            numColor: "text-amber-600",
                            bg: "bg-gradient-to-br from-amber-50/50 to-white"
                        },
                        { 
                            id: 3, 
                            title: "Diagnostic Assessment", 
                            desc: "Prospective learners participate in a diagnostic assessment followed by an informal faculty dialogue.",
                            border: "border-emerald-400",
                            badge: "bg-emerald-100 text-emerald-800",
                            numColor: "text-emerald-600",
                            bg: "bg-gradient-to-br from-emerald-50/50 to-white"
                        },
                        { 
                            id: 4, 
                            title: "Matriculation & Welcome", 
                            desc: "Admission offer issued, orientation kit delivered, textbook sets assigned, and onboarding finalized.",
                            border: "border-purple-400",
                            badge: "bg-purple-100 text-purple-800",
                            numColor: "text-purple-600",
                            bg: "bg-gradient-to-br from-purple-50/50 to-white"
                        }
                    ].map((s, idx) => (
                        <div 
                            key={s.id || idx} 
                            className={`p-7 rounded-2xl border-2 ${s.border} ${s.bg} flex flex-col justify-between hover-lift relative group overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300`}
                        >
                            <div>
                                <span className={`text-xs font-mono font-black ${s.numColor} block mb-3 tracking-wider`}>
                                    STEP 0{s.id || idx + 1}
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                                    {s.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-slate-500 flex items-center justify-between">
                                <span className={`px-2.5 py-0.5 rounded-full ${s.badge}`}>Admissions Desk</span>
                                <ArrowRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TUITION & FEE SCHEDULE */}
            <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="max-w-2xl mb-12 sm:mb-14">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block mb-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit">
                            Affordable & Transparent
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-slate-900">Fee Schedule (Session 2026–27)</h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">Transparent institutional rates without hidden surcharges or capitation fees.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {fees.map((f, i) => (
                            <div 
                                key={i} 
                                className={`p-7 sm:p-8 rounded-2xl border-2 flex flex-col justify-between hover-lift transition-all duration-300 relative ${
                                    f.highlight 
                                        ? 'bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white border-amber-400 shadow-xl' 
                                        : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-lg'
                                }`}
                            >
                                {f.highlight && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                                        ⭐ Most Popular Enrollment
                                    </div>
                                )}
                                <div>
                                    <span className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${f.highlight ? 'text-amber-300' : 'text-blue-700'}`}>
                                        {f.range}
                                    </span>
                                    <h3 className="text-xl font-bold mb-4">{f.grade}</h3>

                                    <div className={`pb-6 mb-6 border-b ${f.highlight ? 'border-blue-800' : 'border-slate-100'}`}>
                                        <span className={`text-4xl font-serif font-black block ${f.highlight ? 'text-amber-300' : 'text-blue-950'}`}>
                                            ₹ {f.annual}
                                        </span>
                                        <span className={`text-xs block mt-1 ${f.highlight ? 'text-blue-200' : 'text-slate-500'}`}>
                                            Annual Academic Tuition
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-8 text-xs">
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                                <Check size={12} strokeWidth={3} />
                                            </span>
                                            <span>Curricular Materials & Library: <strong>{f.materials}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                                <Check size={12} strokeWidth={3} />
                                            </span>
                                            <span>Composite Science & STEM Lab Access</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                                <Check size={12} strokeWidth={3} />
                                            </span>
                                            <span>Smart Interactive Digital Classroom</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                                <Check size={12} strokeWidth={3} />
                                            </span>
                                            <span>Physical Education, Sports & Games</span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/contact"
                                    className={`w-full py-3.5 text-center text-xs font-black uppercase tracking-wider block transition-all shimmer-btn rounded-xl shadow-md active:scale-95 ${
                                        f.highlight 
                                            ? 'btn-amber text-slate-950' 
                                            : 'btn-blue text-white'
                                    }`}
                                >
                                    Inquire for Enrollment
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* AGE ELIGIBILITY & DOCUMENTATION REQUIREMENTS */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-7 sm:p-8 border-2 border-blue-200 bg-white rounded-2xl hover-lift relative overflow-hidden group shadow-xs">
                            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                                Statutory Compliance
                            </span>
                            <h4 className="font-bold text-lg text-slate-900 mb-3">
                                Standard Age Eligibility (As of June 1st)
                            </h4>
                            <div className="space-y-2 text-xs text-slate-700 divide-y divide-slate-100">
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-bold">Nursery:</span>
                                    <span>3 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-bold">Lower Kindergarten (LKG):</span>
                                    <span>4 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-bold">Upper Kindergarten (UKG):</span>
                                    <span>5 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-bold">Class I (Grade 1):</span>
                                    <span>6 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-bold">Classes II to X:</span>
                                    <span>Commensurate age with valid Transfer Certificate (TC)</span>
                                </div>
                                <div className="flex justify-between pt-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-bold">Classes XI & XII (PUC):</span>
                                    <span>Successful completion of SSLC / Class 10 Board</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-7 sm:p-8 border-2 border-emerald-200 bg-white rounded-2xl hover-lift relative overflow-hidden group shadow-xs">
                            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                                Verification Checklist
                            </span>
                            <h4 className="font-bold text-lg text-slate-900 mb-3">
                                Required Documents for Admission
                            </h4>
                            <ul className="space-y-2.5 text-xs text-slate-700">
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span>Official Birth Certificate issued by Municipal Corporation or Gram Panchayat.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span>Original Transfer Certificate (TC) counter-signed by BEO/DDPI (for Class 2 onwards).</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span>Cumulative Record / Progress Report card of previous academic year.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span>4 Passport-sized colored photographs of scholar and 2 photographs of parents.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span>Photocopy of Aadhaar Card of scholar and parents / legal guardians.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Financial Assistance Note */}
                    <div className="mt-14 p-8 border-2 border-blue-800 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover-lift shadow-xl">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block mb-1">
                                Equitable Opportunity
                            </span>
                            <h4 className="font-serif font-bold text-white text-xl mb-1">
                                {admissions.financialAidTitle || 'Scholarships & Need-Based Concessions'}
                            </h4>
                            <p className="text-xs text-blue-200 max-w-2xl leading-relaxed">
                                {admissions.financialAidDesc || 'The Board maintains a dedicated bursary fund for deserving scholars facing economic barriers. Concessions are awarded strictly on merit and demonstrated need.'}
                            </p>
                        </div>
                        <Link 
                            to="/contact" 
                            className="px-6 py-3.5 btn-amber text-slate-950 text-xs font-black uppercase tracking-wider shimmer-btn shrink-0 rounded-xl shadow-lg active:scale-95"
                        >
                            Contact Bursar
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AdmissionsPage;
