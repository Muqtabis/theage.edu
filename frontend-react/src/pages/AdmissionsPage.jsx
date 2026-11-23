import React, { useState } from 'react';
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
    ShieldCheck,
    CheckSquare,
    Square
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const initialDocs = [
    { id: 'birth', text: 'Official Birth Certificate issued by Municipal Corporation or Gram Panchayat.' },
    { id: 'tc', text: 'Original Transfer Certificate (TC) counter-signed by BEO/DDPI (for Class 2 onwards).' },
    { id: 'report', text: 'Cumulative Record / Progress Report card of previous academic year.' },
    { id: 'photos', text: '4 Passport-sized colored photographs of scholar and 2 photographs of parents.' },
    { id: 'aadhaar', text: 'Photocopy of Aadhaar Card of scholar and parents / legal guardians.' }
];

const AdmissionsPage = () => {
    const { content } = useSiteContent();
    const admissions = content?.admissions || {};
    const general = content?.general || {};

    const [billingCycle, setBillingCycle] = useState('annual'); // 'annual' | 'quarterly'
    const [checkedDocs, setCheckedDocs] = useState({ birth: true, aadhaar: true });

    const toggleDoc = (id) => {
        setCheckedDocs(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const readyCount = Object.values(checkedDocs).filter(Boolean).length;
    const progressPercent = Math.round((readyCount / initialDocs.length) * 100);

    const baseFees = Array.isArray(admissions.fees) && admissions.fees.length > 0 ? admissions.fees : [
        { grade: 'Primary School Wing', range: 'Classes I to V', annual: '15,000', numericAnnual: 15000, materials: '₹ 3,500', highlight: false },
        { grade: 'Middle School Wing', range: 'Classes VI to VIII', annual: '18,000', numericAnnual: 18000, materials: '₹ 4,000', highlight: true },
        { grade: 'Secondary School (SSLC)', range: 'Classes IX & X', annual: '25,000', numericAnnual: 25000, materials: '₹ 5,000', highlight: false }
    ];

    return (
        <div className="font-sans text-slate-800 bg-white selection:bg-blue-600 selection:text-white">
            
            {/* HERO */}
            <section className="bg-slate-50 border-b border-slate-200/80 py-16 sm:py-24 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 inline-flex items-center gap-2 mb-4 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                        <GraduationCap size={15} className="text-blue-600" />
                        <span>{admissions.heroBadge || general.admissionsBadge || 'Admissions Directory 2026–27'}</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 tracking-tight">
                        {admissions.heroTitle || 'Begin Your Journey Here'}
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        {admissions.heroSubtitle || 'We welcome curious, conscientious learners seeking disciplined scholarship, moral formation, and lifelong character.'}
                    </p>
                </div>
            </section>

            {/* ADMISSION ROADMAP (4 Steps) */}
            <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-2xl mb-12 sm:mb-16">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                        Transparent Protocol
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900">The Four-Step Enrollment Procedure</h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">A structured admission protocol designed to understand and support every learner.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { 
                            id: 1, 
                            title: "Inquire & Consultation", 
                            desc: "Review academic pathways and schedule an in-person or virtual campus consultation with our admissions desk."
                        },
                        { 
                            id: 2, 
                            title: "Application & Records", 
                            desc: "Submit the official student enrollment record with previous academic transcripts and birth credentials."
                        },
                        { 
                            id: 3, 
                            title: "Diagnostic Assessment", 
                            desc: "Prospective learners participate in a diagnostic assessment followed by an informal faculty dialogue."
                        },
                        { 
                            id: 4, 
                            title: "Matriculation & Welcome", 
                            desc: "Admission offer issued, orientation kit delivered, textbook sets assigned, and onboarding finalized."
                        }
                    ].map((s, idx) => (
                        <div 
                            key={s.id || idx} 
                            className="card-minimal p-6 sm:p-7 flex flex-col justify-between group"
                        >
                            <div>
                                <span className="text-xs font-mono font-bold text-blue-600 block mb-3 tracking-wider">
                                    STEP 0{s.id || idx + 1}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {s.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Admissions Desk</span>
                                <ArrowRight size={13} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TUITION & FEE SCHEDULE WITH INTERACTIVE BILLING FREQUENCY TOGGLE */}
            <section className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                                Institutional Value
                            </span>
                            <h2 className="text-3xl font-bold text-slate-900">Fee Schedule (Session 2026–27)</h2>
                            <p className="text-xs sm:text-sm text-slate-600 mt-2">Transparent institutional rates without hidden surcharges or capitation fees.</p>
                        </div>

                        {/* Interactive Billing Frequency Selector */}
                        <div className="inline-flex p-1 bg-white border border-slate-200 rounded-lg shadow-2xs self-start md:self-auto">
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                                    billingCycle === 'annual'
                                        ? 'bg-blue-600 text-white shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Annual Plan (1x)
                            </button>
                            <button
                                onClick={() => setBillingCycle('quarterly')}
                                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                                    billingCycle === 'quarterly'
                                        ? 'bg-blue-600 text-white shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Quarterly Installments (4x)
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {baseFees.map((f, i) => {
                            const rawAmount = f.numericAnnual || parseInt(String(f.annual).replace(/[^0-9]/g, '')) || 15000;
                            const displayAmount = billingCycle === 'annual' 
                                ? rawAmount.toLocaleString('en-IN')
                                : Math.round(rawAmount / 4).toLocaleString('en-IN');
                            const cycleLabel = billingCycle === 'annual' ? 'Per Academic Year' : 'Per Quarter (4 Installments)';

                            return (
                                <div 
                                    key={i} 
                                    className={`card-minimal p-6 sm:p-8 flex flex-col justify-between relative ${
                                        f.highlight 
                                            ? 'border-blue-600 ring-1 ring-blue-600/30 shadow-md' 
                                            : 'border-slate-200'
                                    }`}
                                >
                                    {f.highlight && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-2xs">
                                            Most Popular Tier
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                                            {f.range}
                                        </span>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">{f.grade}</h3>

                                        <div className="pb-6 mb-6 border-b border-slate-100">
                                            <span className="text-3xl sm:text-4xl font-bold text-slate-900 block transition-all">
                                                ₹ {displayAmount}
                                            </span>
                                            <span className="text-xs text-slate-500 block mt-1">
                                                {cycleLabel}
                                            </span>
                                        </div>

                                        <div className="space-y-3 mb-8 text-xs text-slate-600">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <Check size={11} strokeWidth={2.5} />
                                                </span>
                                                <span>Curricular Materials & Library: <strong>{f.materials}</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <Check size={11} strokeWidth={2.5} />
                                                </span>
                                                <span>Composite Science & STEM Lab Access</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <Check size={11} strokeWidth={2.5} />
                                                </span>
                                                <span>Smart Interactive Digital Classroom</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <Check size={11} strokeWidth={2.5} />
                                                </span>
                                                <span>Physical Education, Sports & Games</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/contact"
                                        className={`w-full py-2.5 text-center text-xs font-semibold rounded-lg block transition-colors ${
                                            f.highlight 
                                                ? 'btn-primary justify-center' 
                                                : 'btn-secondary justify-center'
                                        }`}
                                    >
                                        Inquire for Enrollment
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* AGE ELIGIBILITY & INTERACTIVE DOCUMENT CHECKLIST */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Age Eligibility */}
                        <div className="card-minimal p-6 sm:p-8">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                                Statutory Compliance
                            </span>
                            <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-3">
                                Standard Age Eligibility (As of June 1st)
                            </h4>
                            <div className="space-y-2 text-xs text-slate-700 divide-y divide-slate-100">
                                <div className="flex justify-between py-1.5">
                                    <span className="font-medium">Nursery:</span>
                                    <span>3 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="font-medium">Lower Kindergarten (LKG):</span>
                                    <span>4 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="font-medium">Upper Kindergarten (UKG):</span>
                                    <span>5 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="font-medium">Class I (Grade 1):</span>
                                    <span>6 Years completed</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="font-medium">Classes II to X:</span>
                                    <span>Commensurate age with valid Transfer Certificate (TC)</span>
                                </div>
                                <div className="flex justify-between pt-1.5">
                                    <span className="font-medium">Classes XI & XII (PUC):</span>
                                    <span>Successful completion of SSLC / Class 10 Board</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Document Readiness Tracker */}
                        <div className="card-minimal p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 block">
                                    Interactive Checklist
                                </span>
                                <span className="text-xs font-semibold text-slate-700">
                                    {readyCount} of {initialDocs.length} Ready ({progressPercent}%)
                                </span>
                            </div>

                            <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-2">
                                Required Documents for Admission
                            </h4>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                                <div 
                                    className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>

                            <p className="text-[11px] text-slate-500 mb-3">
                                Tap each document below to verify what you currently have ready:
                            </p>

                            <div className="space-y-2">
                                {initialDocs.map((doc) => {
                                    const isDone = !!checkedDocs[doc.id];
                                    return (
                                        <button
                                            key={doc.id}
                                            type="button"
                                            onClick={() => toggleDoc(doc.id)}
                                            className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-colors cursor-pointer ${
                                                isDone
                                                    ? 'bg-blue-50/60 border-blue-200 text-slate-900'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            <span className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                                                isDone 
                                                    ? 'bg-blue-600 border-blue-600 text-white' 
                                                    : 'border-slate-300 bg-white'
                                            }`}>
                                                {isDone && <Check size={11} strokeWidth={3} />}
                                            </span>
                                            <span className={isDone ? 'font-medium' : 'font-normal'}>
                                                {doc.text}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Financial Assistance Note */}
                    <div className="mt-12 p-6 sm:p-8 card-minimal bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                                Equitable Opportunity
                            </span>
                            <h4 className="font-bold text-slate-900 text-lg mb-1">
                                {admissions.financialAidTitle || 'Scholarships & Need-Based Concessions'}
                            </h4>
                            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                                {admissions.financialAidDesc || 'The Board maintains a dedicated bursary fund for deserving scholars facing economic barriers. Concessions are awarded strictly on merit and demonstrated need.'}
                            </p>
                        </div>
                        <Link 
                            to="/contact" 
                            className="btn-primary text-xs shrink-0"
                        >
                            <span>Contact Bursar</span>
                            <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AdmissionsPage;
