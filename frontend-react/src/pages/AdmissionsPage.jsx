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
    Target
} from 'lucide-react';

// --- DATA (UNCHANGED) ---
const feeData = [
    { 
        grade: 'Primary School', 
        range: 'Grades 1-5',
        annual: '₹ 15,000', 
        materials: '₹ 3,500', 
        highlight: false 
    },
    { 
        grade: 'Middle School', 
        range: 'Grades 6-8',
        annual: '₹ 18,000', 
        materials: '₹ 4,000', 
        highlight: true // Highlight this one for visual variety
    },
    { 
        grade: 'High School', 
        range: 'Grades 9-10',
        annual: '₹ 25,000', 
        materials: '₹ 5,000', 
        highlight: false 
    },
];

const steps = [
    {
        id: 1,
        title: "Inquire & Visit",
        desc: "Explore our website and schedule a virtual or in-person tour to see our campus.",
        icon: Calendar
    },
    {
        id: 2,
        title: "Submit Application",
        desc: "Complete our online application form and submit the required documents.",
        icon: ClipboardCheck
    },
    {
        id: 3,
        title: "Student Assessment",
        desc: "Prospective students will be invited for a friendly assessment and interview.",
        icon: Users
    },
    {
        id: 4,
        title: "Final Decision",
        desc: "Decisions are mailed in early March. We look forward to welcoming you!",
        icon: MailOpen
    }
];

const AdmissionsPage = () => {
    return (
        <div className="font-sans text-slate-800 bg-white min-h-screen">
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
            `}</style>

            {/* ==========================================
                1. HERO SECTION (About Page Style)
            ========================================== */}
            <section className="relative py-24 md:py-36 bg-slate-900 overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-full h-full z-0 opacity-80" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517430332-ac7f3698858a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"}}>
                    <div className="absolute inset-0 bg-slate-900/90"></div>
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-violet-600/30 border border-violet-400/50 text-violet-300 text-sm font-bold tracking-wider mb-6 animate-fade-in-up backdrop-blur-sm">
                        ADMISSIONS OPEN 2025-26
                    </span>
                    <h1 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight animate-fade-in-up delay-100">
                        Begin Your Journey Here
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        We are looking for curious minds and kind hearts. Begin your application process with confidence.
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. ADMISSIONS PROCESS (Timeline Style)
            ========================================== */}
            <section className="container mx-auto px-6 py-24 bg-white">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Simple 4-Step Process</h2>
                    <p className="text-slate-600">From your first inquiry to final enrollment, we guide you every step of the way.</p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Horizontal Connector Line (Desktop) */}
                    <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-indigo-100 hidden lg:block"></div>
                    
                    {/* Vertical Connector Line (Mobile/Tablet) */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-indigo-100 block lg:hidden"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.id} className="relative pl-12 lg:pl-0 pt-10 lg:pt-0 group">
                                    {/* Circle (Marker) - Matching Timeline Dot Style */}
                                    <div className="absolute left-4 lg:left-1/2 top-0 lg:top-1/4 w-10 h-10 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center text-indigo-600 font-bold shadow-md transform -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 z-10">
                                        {step.id}
                                    </div>
                                    
                                    {/* Content Card */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md group-hover:border-indigo-400 transition-all duration-300 lg:mt-24 lg:pt-10">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                                            <Icon size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="text-center mt-20">
                    <Link 
                        to="/contact" 
                        className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 group"
                    >
                        Contact Admissions <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* ==========================================
                3. FEE STRUCTURE (Minimalist Cards - About Page Style)
            ========================================== */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Tuition & Fees</h2>
                        <p className="text-slate-600">Transparent annual fee structure for the academic year 2025-2026.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {feeData.map((item) => (
                            <div 
                                key={item.grade} 
                                className={`relative p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between h-full border border-slate-200 ${
                                    item.highlight 
                                        ? 'bg-slate-900 text-white ring-4 ring-indigo-400/50 shadow-2xl scale-105' 
                                        : 'bg-white text-slate-800 hover:shadow-lg'
                                }`}
                            >
                                {item.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-6 pt-4">
                                    <h3 className={`text-2xl font-bold mb-1 ${item.highlight ? 'text-white' : 'text-slate-900'}`}>{item.grade}</h3>
                                    <p className={`text-sm ${item.highlight ? 'text-indigo-300' : 'text-slate-500'}`}>{item.range}</p>
                                </div>

                                {/* Price - Enhanced visibility */}
                                <div className={`text-center mb-8 pb-8 border-b ${item.highlight ? 'border-indigo-700' : 'border-slate-200'}`}>
                                    <span className={`text-5xl font-extrabold ${item.highlight ? 'text-white' : 'text-slate-900'}`}>
                                        <sup className="text-xl font-semibold">₹</sup>{item.annual.replace(/₹|,| /g, '')}
                                    </span>
                                    <span className={`block text-sm mt-2 ${item.highlight ? 'text-indigo-300' : 'text-slate-500'}`}>Per Annum</span>
                                </div>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    <li className={`flex items-center gap-3 text-base ${item.highlight ? 'text-white' : 'text-slate-700'}`}>
                                        <Check size={16} className={`text-indigo-400 shrink-0`} strokeWidth={3} />
                                        <span>Material Fee: <strong>{item.materials}</strong> (Annual)</span>
                                    </li>
                                    <li className={`flex items-center gap-3 text-base ${item.highlight ? 'text-white' : 'text-slate-700'}`}>
                                        <Check size={16} className={`text-indigo-400 shrink-0`} strokeWidth={3} />
                                        <span>Tuition & Digital Access</span>
                                    </li>
                                    <li className={`flex items-center gap-3 text-base ${item.highlight ? 'text-white' : 'text-slate-700'}`}>
                                        <Check size={16} className={`text-indigo-400 shrink-0`} strokeWidth={3} />
                                        <span>Co-curricular Activities</span>
                                    </li>
                                </ul>

                                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-colors mt-auto ${
                                    item.highlight 
                                        ? 'bg-indigo-400 hover:bg-indigo-300 text-slate-900 shadow-md' 
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                                }`}>
                                    View Breakdown
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Financial Aid Section */}
                    <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                        <div className="flex items-start gap-6">
                            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 hidden md:block">
                                <DollarSign size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Financial Aid & Scholarships</h3>
                                <p className="text-slate-600 leading-relaxed max-w-xl">
                                    We believe financial barriers should not prevent a child from receiving quality education. Need-based scholarships are available.
                                </p>
                            </div>
                        </div>
                        <button className="px-6 py-3 border-2 border-indigo-600 hover:bg-indigo-600 text-indigo-600 hover:text-white font-bold rounded-xl transition-all shadow-md">
                            Contact Administration
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdmissionsPage;