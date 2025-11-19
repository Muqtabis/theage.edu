import React from 'react';
import { 
    ClipboardCheck, 
    Calendar, 
    Users, 
    MailOpen, 
    Sparkles, 
    ArrowRight, 
    Check 
} from 'lucide-react';

// --- DATA ---
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
        <div className="font-sans text-slate-800 bg-gray-50">
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
                1. HERO SECTION (Lavender & Deep Purple)
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-indigo-950 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute top-10 right-10 w-72 h-72 bg-violet-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-900/30 border border-indigo-700/50 text-violet-300 text-sm font-bold tracking-wider mb-6 animate-fade-in-up backdrop-blur-sm">
                        ADMISSIONS OPEN 2025-26
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight animate-fade-in-up delay-100">
                        Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300">Age School</span> Family
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        We are looking for curious minds and kind hearts. Begin your journey with us today.
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. ADMISSIONS PROCESS (Step Cards)
            ========================================== */}
            <section className="container mx-auto px-6 py-20 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.id} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-violet-500 group">
                                <div className="flex justify-between items-start mb-6">
                                    {/* Icon: Violet Theme */}
                                    <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                                        <Icon size={24} />
                                    </div>
                                    <span className="text-6xl font-black text-gray-100 -mt-4 -mr-4 select-none group-hover:text-gray-50 transition-colors">
                                        0{step.id}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
                
                <div className="text-center mt-12">
                    <a 
                        href="https://your-school-portal.com/apply" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4 bg-violet-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-violet-700 hover:shadow-violet-500/30 transition-all duration-300 group"
                    >
                        Start Application <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>

            {/* ==========================================
                3. FEE STRUCTURE (Pricing Cards)
            ========================================== */}
            <section className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tuition & Fees</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Transparent annual fee structure for the academic year 2025-2026.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                        {feeData.map((item, index) => (
                            <div 
                                key={index} 
                                className={`relative p-8 rounded-3xl transition-all duration-300 ${
                                    item.highlight 
                                        ? 'bg-indigo-900 text-white shadow-2xl scale-105 z-10 ring-4 ring-violet-400/30' 
                                        : 'bg-white text-slate-800 shadow-lg border border-gray-100 hover:shadow-xl'
                                }`}
                            >
                                {item.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className={`text-xl font-bold mb-1 ${item.highlight ? 'text-white' : 'text-slate-900'}`}>{item.grade}</h3>
                                    <p className={`text-sm ${item.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{item.range}</p>
                                </div>

                                <div className="text-center mb-8 pb-8 border-b border-dashed border-opacity-20 border-gray-400">
                                    <span className="text-3xl font-bold">{item.annual}</span>
                                    <span className={`block text-xs mt-2 ${item.highlight ? 'text-indigo-300' : 'text-slate-400'}`}>Per Annum</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className={`p-1 rounded-full ${item.highlight ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-50 text-violet-600'}`}>
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span>Material Fee: <strong>{item.materials}</strong></span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className={`p-1 rounded-full ${item.highlight ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-50 text-violet-600'}`}>
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span>Tuition & Digital Access</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className={`p-1 rounded-full ${item.highlight ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-50 text-violet-600'}`}>
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span>Co-curricular Activities</span>
                                    </li>
                                </ul>

                                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                                    item.highlight 
                                        ? 'bg-violet-500 hover:bg-violet-400 text-white' 
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                                }`}>
                                    View Breakdown
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Financial Aid Section */}
                    <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-indigo-50 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                        <div className="flex items-start gap-6">
                            <div className="bg-purple-50 p-4 rounded-2xl text-purple-600 hidden md:block">
                                <Sparkles size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-indigo-900 mb-2">Financial Aid & Scholarships</h3>
                                <p className="text-slate-600 leading-relaxed max-w-xl">
                                    We believe financial barriers should not prevent a child from receiving quality education. Need-based scholarships are available.
                                </p>
                            </div>
                        </div>
                        <button className="px-6 py-3 border-2 border-indigo-100 hover:border-purple-600 text-purple-600 font-bold rounded-xl transition-all">
                            Contact Administration
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdmissionsPage;