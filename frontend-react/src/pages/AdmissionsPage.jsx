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
            <section className="bg-[#0b192c] text-white py-24 md:py-32 border-b border-[#c5a880]/20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a880] block mb-3">
                        {admissions.heroBadge || general.admissionsBadge || 'Admissions Directory 2025–26'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                        {admissions.heroTitle || 'Begin Your Journey Here'}
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
                        {admissions.heroSubtitle || 'We welcome curious, conscientious learners seeking disciplined scholarship and moral formation.'}
                    </p>
                </div>
            </section>

            {/* ADMISSION ROADMAP */}
            <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="max-w-2xl mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Process</span>
                    <h2 className="text-3xl font-serif font-bold text-[#0b192c]">The Four-Step Enrollment Procedure</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((s, idx) => (
                        <div key={s.id || idx} className="bg-white p-8 border border-slate-200/90 rounded-sm flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-mono font-bold text-[#c5a880] block mb-4">
                                    STEP 0{s.id || idx + 1}
                                </span>
                                <h3 className="text-base font-serif font-bold text-[#0b192c] mb-2">{s.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                                Admissions Office Support
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
                        <h2 className="text-3xl font-serif font-bold text-[#0b192c]">Fee Schedule (Academic Year 2025–26)</h2>
                        <p className="text-xs text-slate-500 mt-2">Transparent institutional rates without hidden surcharges.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {fees.map((f, i) => (
                            <div 
                                key={i} 
                                className={`p-8 border rounded-sm flex flex-col justify-between ${
                                    f.highlight 
                                        ? 'bg-[#0b192c] text-white border-[#0b192c] shadow-lg' 
                                        : 'bg-[#fdfbf7] text-slate-900 border-slate-200'
                                }`}
                            >
                                <div>
                                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block mb-1 ${f.highlight ? 'text-[#c5a880]' : 'text-slate-500'}`}>
                                        {f.range}
                                    </span>
                                    <h3 className="text-2xl font-serif font-bold mb-4">{f.grade}</h3>

                                    <div className={`pb-6 mb-6 border-b ${f.highlight ? 'border-slate-800' : 'border-slate-200'}`}>
                                        <span className="text-4xl font-serif font-bold block">
                                            ₹ {f.annual}
                                        </span>
                                        <span className={`text-xs block mt-1 ${f.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Annual Academic Tuition
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-8 text-xs">
                                        <div className="flex items-center gap-2.5">
                                            <Check size={14} className={f.highlight ? 'text-[#c5a880]' : 'text-slate-700'} />
                                            <span>Curricular Materials & Library: <strong>{f.materials}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={14} className={f.highlight ? 'text-[#c5a880]' : 'text-slate-700'} />
                                            <span>Physical & Science Laboratory Access</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={14} className={f.highlight ? 'text-[#c5a880]' : 'text-slate-700'} />
                                            <span>Digital Classroom & STEM Robotics</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={14} className={f.highlight ? 'text-[#c5a880]' : 'text-slate-700'} />
                                            <span>Physical Education & Games</span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/contact"
                                    className={`w-full py-3 text-center text-xs font-bold uppercase tracking-wider block transition-colors ${
                                        f.highlight 
                                            ? 'bg-[#c5a880] hover:bg-[#b89463] text-[#07111e]' 
                                            : 'bg-[#0b192c] hover:bg-[#1e3e62] text-white'
                                    }`}
                                >
                                    Inquire for Enrollment
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Financial Assistance Note */}
                    <div className="mt-14 p-6 border border-slate-200 bg-[#fbfbfb] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h4 className="font-serif font-bold text-slate-900 text-base mb-1">
                                {admissions.financialAidTitle || 'Scholarships & Need-Based Concessions'}
                            </h4>
                            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                                {admissions.financialAidDesc || 'The Board maintains a dedicated bursary fund for deserving scholars facing economic barriers. Concessions are awarded strictly on merit and demonstrated need.'}
                            </p>
                        </div>
                        <Link 
                            to="/contact" 
                            className="px-5 py-2.5 border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 transition shrink-0"
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
