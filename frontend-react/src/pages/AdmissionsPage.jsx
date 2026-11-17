import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Calendar, 
    ClipboardCheck, 
    Users, 
    MailOpen, 
    Check, 
    ArrowRight,
    HelpCircle
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
        { id: 1, title: "Inquire & Campus Consultation", desc: "Review academic pathways and schedule an in-person or virtual campus consultation with our admissions desk." },
        { id: 2, title: "Application & Documentation", desc: "Submit the official student enrollment record with previous academic transcripts and birth credentials." },
        { id: 3, title: "Scholar Assessment & Dialogue", desc: "Prospective learners participate in a diagnostic assessment followed by an informal faculty dialogue." },
        { id: 4, title: "Offer of Admission & Matriculation", desc: "Admission offer issued, orientation package delivered, and onboarding finalized." }
    ];

    return (
        <div className="font-sans text-slate-800 bg-[#fbfbfb] selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            
            {/* HERO */}
            <section className="bg-[#0b192c] text-white py-24 md:py-32 border-b border-[#c5a880]/20 text-center relative overflow-hidden">
                {/* Ambient glowing mesh orbs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none animate-float" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] inline-flex items-center gap-2 mb-3 bg-[#c5a880]/10 px-3.5 py-1 rounded-full border border-[#c5a880]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
                        {admissions.heroBadge || general.admissionsBadge || 'Admissions Directory 2026–27'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        <span className="text-gradient-gold">{admissions.heroTitle || 'Begin Your Journey Here'}</span>
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
                        {admissions.heroSubtitle || 'We welcome curious, conscientious learners seeking disciplined scholarship, moral formation, and lifelong character.'}
                    </p>
                </div>
            </section>

            {/* ADMISSION ROADMAP */}
            <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="max-w-2xl mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Process</span>
                    <h2 className="text-3xl font-serif font-bold text-[#0b192c]">The Four-Step Enrollment Procedure</h2>
                    <p className="text-xs text-slate-500 mt-2">A transparent, structured admission protocol designed to understand and support every learner.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((s, idx) => (
                        <div 
                            key={s.id || idx} 
                            className="bg-white p-8 border border-slate-200/90 rounded-sm flex flex-col justify-between hover-lift relative group overflow-hidden"
                        >
                            {/* Subtle top indicator on hover */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div>
                                <span className="text-xs font-mono font-bold text-[#c5a880] block mb-4 tracking-wider">
                                    STEP 0{s.id || idx + 1}
                                </span>
                                <h3 className="text-base font-serif font-bold text-[#0b192c] mb-2 group-hover:text-blue-900 transition-colors">
                                    {s.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                                <span>Admissions Desk Support</span>
                                <ArrowRight size={13} className="text-slate-300 group-hover:text-[#c5a880] group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TUITION & FEE SCHEDULE */}
            <section className="py-20 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="max-w-2xl mb-14">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Tuition</span>
                        <h2 className="text-3xl font-serif font-bold text-[#0b192c]">Fee Schedule (Academic Year 2026–27)</h2>
                        <p className="text-xs text-slate-500 mt-2">Transparent institutional rates without hidden surcharges.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {fees.map((f, i) => (
                            <div 
                                key={i} 
                                className={`p-8 border rounded-sm flex flex-col justify-between hover-lift transition-all relative ${
                                    f.highlight 
                                        ? 'bg-[#0b192c] text-white border-[#c5a880]/60 glow-gold' 
                                        : 'bg-[#fdfbf7] text-slate-900 border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                {f.highlight && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c5a880] to-[#b89463] text-[#07111e] text-[10px] font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-sm">
                                        Most Popular Enrollment
                                    </div>
                                )}
                                <div>
                                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block mb-1 ${f.highlight ? 'text-[#c5a880]' : 'text-slate-500'}`}>
                                        {f.range}
                                    </span>
                                    <h3 className="text-xl font-serif font-bold mb-4">{f.grade}</h3>

                                    <div className={`pb-6 mb-6 border-b ${f.highlight ? 'border-slate-800' : 'border-slate-200'}`}>
                                        <span className={`text-4xl font-serif font-bold block ${f.highlight ? 'text-gradient-gold' : 'text-[#0b192c]'}`}>
                                            ₹ {f.annual}
                                        </span>
                                        <span className={`text-xs block mt-1 ${f.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Annual Academic Tuition
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-8 text-xs">
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? 'bg-[#c5a880]/20 text-[#c5a880]' : 'bg-emerald-50 text-emerald-600'}`}>
                                                <Check size={12} />
                                            </span>
                                            <span>Curricular Materials & Library: <strong>{f.materials}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? 'bg-[#c5a880]/20 text-[#c5a880]' : 'bg-emerald-50 text-emerald-600'}`}>
                                                <Check size={12} />
                                            </span>
                                            <span>Physical & Science Laboratory Access</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? 'bg-[#c5a880]/20 text-[#c5a880]' : 'bg-emerald-50 text-emerald-600'}`}>
                                                <Check size={12} />
                                            </span>
                                            <span>Digital Classroom & STEM Robotics</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? 'bg-[#c5a880]/20 text-[#c5a880]' : 'bg-emerald-50 text-emerald-600'}`}>
                                                <Check size={12} />
                                            </span>
                                            <span>Physical Education & Games</span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/contact"
                                    className={`w-full py-3 text-center text-xs font-bold uppercase tracking-wider block transition-all shimmer-btn ${
                                        f.highlight 
                                            ? 'bg-gradient-to-r from-[#c5a880] to-[#b89463] text-[#07111e] hover:shadow-lg hover:brightness-105' 
                                            : 'bg-[#0b192c] hover:bg-[#1e3e62] text-white'
                                    }`}
                                >
                                    Inquire for Enrollment
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* AGE ELIGIBILITY & DOCUMENTATION REQUIREMENTS */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-slate-200 bg-[#fdfbf7] rounded-sm hover-lift relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c7355] block mb-1">
                                Statutory Compliance
                            </span>
                            <h4 className="font-serif font-bold text-lg text-[#0b192c] mb-3">
                                Standard Age Eligibility (As of June 1st)
                            </h4>
                            <div className="space-y-2 text-xs text-slate-700 divide-y divide-slate-200/60">
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-semibold">Nursery:</span>
                                    <span>3 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-semibold">Lower Kindergarten (LKG):</span>
                                    <span>4 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-semibold">Upper Kindergarten (UKG):</span>
                                    <span>5 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-semibold">Class I (Grade 1):</span>
                                    <span>6 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-semibold">Classes II to X:</span>
                                    <span>Commensurate age with valid Transfer Certificate (TC)</span>
                                </div>
                                <div className="flex justify-between pt-1.5 group-hover:text-blue-900 transition-colors">
                                    <span className="font-semibold">Classes XI & XII (PUC):</span>
                                    <span>Successful completion of SSLC / Class 10 Board</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border border-slate-200 bg-[#fdfbf7] rounded-sm hover-lift relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a880]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c7355] block mb-1">
                                Verification Checklist
                            </span>
                            <h4 className="font-serif font-bold text-lg text-[#0b192c] mb-3">
                                Required Documents for Admission
                            </h4>
                            <ul className="space-y-2.5 text-xs text-slate-700">
                                <li className="flex items-start gap-2.5">
                                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={11} />
                                    </span>
                                    <span>Official Birth Certificate issued by Municipal Corporation or Gram Panchayat.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={11} />
                                    </span>
                                    <span>Original Transfer Certificate (TC) counter-signed by BEO/DDPI (for Class 2 onwards).</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={11} />
                                    </span>
                                    <span>Cumulative Record / Progress Report card of previous academic year.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={11} />
                                    </span>
                                    <span>4 Passport-sized colored photographs of scholar and 2 photographs of parents.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={11} />
                                    </span>
                                    <span>Photocopy of Aadhaar Card of scholar and parents / legal guardians.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Financial Assistance Note */}
                    <div className="mt-14 p-8 border border-slate-200 bg-gradient-to-r from-slate-900 to-[#0b192c] text-white rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover-lift">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a880] block mb-1">
                                Equitable Opportunity
                            </span>
                            <h4 className="font-serif font-bold text-white text-lg mb-1">
                                {admissions.financialAidTitle || 'Scholarships & Need-Based Concessions'}
                            </h4>
                            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                                {admissions.financialAidDesc || 'The Board maintains a dedicated bursary fund for deserving scholars facing economic barriers. Concessions are awarded strictly on merit and demonstrated need.'}
                            </p>
                        </div>
                        <Link 
                            to="/contact" 
                            className="px-6 py-3 bg-[#c5a880] hover:bg-[#b89463] text-[#07111e] text-xs font-bold uppercase tracking-wider transition-all shimmer-btn shrink-0"
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
