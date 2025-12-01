import React, { useState, useEffect } from 'react';
// Added 'Image as ImageIcon' to imports for the image badge
import { FileText, Download, Loader2, BookOpen, ChevronDown, ChevronUp, TrendingUp, GraduationCap, ArrowRight, CheckCircle2, Image as ImageIcon } from 'lucide-react';

// ==========================================
// CONFIGURATION & LOGIC (UNCHANGED)
// ==========================================
const RESULT_API_URL = '/api/results';

const schoolLevels = [
    { 
        id: 'lower', 
        title: 'Lower School (Grades K-5)', 
        description: 'Focus on foundational literacy, numeracy, and social-emotional skills through hands-on learning and personalized attention.',
        icon: BookOpen,
        focus: ['Foundational Skills', 'Creative Arts', 'Digital Literacy'],
    },
    { 
        id: 'primary', 
        title: 'Primary School (Grades 6-8)', 
        description: 'Transitional phase emphasizing critical thinking, problem-solving, and subject specialization (e.g., introduction to Biology and Algebra).',
        icon: GraduationCap, 
        focus: ['Critical Thinking', 'Integrated STEM', 'Leadership Programs'],
    },
    { 
        id: 'high', 
        title: 'High School (Grades 9-10)', 
        description: 'College preparatory curriculum with advanced coursework, career counseling, and rigorous external examination readiness.',
        icon: TrendingUp, 
        focus: ['Exam Prep', 'Career Counseling', 'Advanced Research'],
    },
];

const AcademicsPage = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('lower'); 

    useEffect(() => {
        fetch(RESULT_API_URL)
            .then(res => res.json())
            .then(data => setResults(data))
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    const toggleSection = (sectionId) => {
        setActiveSection(activeSection === sectionId ? null : sectionId);
    };

    return (
        <div className="font-sans text-slate-800 bg-gray-50 w-full overflow-x-hidden">
            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-indigo-950 overflow-hidden w-full">
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-violet-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                </div>

                <div className="relative z-10 w-full text-center"> 
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-700/50 backdrop-blur-md mb-6">
                            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                            <span className="text-indigo-200 text-sm font-medium tracking-wide">Academic Excellence</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight animate-fade-in-up">
                            Curriculum & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300">Academics</span>
                        </h1>
                        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
                            From kindergarten steps to graduation leaps, we structure our learning to empower every student's unique journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. EDUCATIONAL LEVELS (Accordion)
            ========================================== */}
            <section className="w-full py-20 -mt-10 relative z-20"> 
                <div className="w-full"> 
                    <div className="space-y-4">
                        {schoolLevels.map((level) => {
                            const Icon = level.icon;
                            const isActive = activeSection === level.id;
                            
                            return (
                                <div 
                                    key={level.id} 
                                    className={`rounded-2xl transition-all duration-500 overflow-hidden border ${
                                        isActive 
                                            ? 'bg-white shadow-2xl border-violet-100 scale-[1.02]' 
                                            : 'bg-white/80 hover:bg-white shadow-md border-transparent hover:shadow-lg'
                                    }`}
                                >
                                    <button 
                                        onClick={() => toggleSection(level.id)}
                                        className="w-full px-6 md:p-8 flex items-center justify-between cursor-pointer outline-none group"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                                                isActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                                            }`}>
                                                <Icon size={32} strokeWidth={1.5} />
                                            </div>
                                            
                                            <div className="text-left">
                                                <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                                                    isActive ? 'text-indigo-900' : 'text-slate-700'
                                                }`}>
                                                    {level.title}
                                                </h3>
                                                {!isActive && (
                                                    <p className="text-slate-400 text-sm mt-1 hidden md:block">Click to reveal curriculum details</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-gray-50 text-gray-400`}>
                                            <ChevronDown size={20} className={isActive ? 'rotate-180 text-violet-600' : ''} />
                                        </div>
                                    </button>
                                    
                                    <div className={`transition-all duration-500 ease-in-out ${
                                        isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                        <div className="p-8 pt-0 pl-[104px] md:pr-12">
                                            <div className="h-px w-full bg-gradient-to-r from-gray-200 to-transparent mb-6"></div>
                                            
                                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                                {level.description}
                                            </p>

                                            <div>
                                                <span className="uppercase text-xs font-bold text-violet-600 tracking-wider mb-4 block">Key Focus Areas</span>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {level.focus.map((item, i) => (
                                                        <div key={i} className="flex items-center gap-3 bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-100">
                                                            <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
                                                            <span className="text-indigo-900 font-medium text-sm">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-4"></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. EXAM RESULTS (UPDATED SECTION)
            ========================================== */}
            <section className="py-24 bg-slate-50 relative w-full"> 
                <div className="w-full"> 
                    <div className="w-full px-6"> 
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Student Resources</h2>
                                <p className="text-slate-500">Download exam results, schedules, and academic reports.</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <span className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                                <p className="text-gray-500">Fetching latest results...</p>
                            </div>
                        ) : results.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                                <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                                <p className="text-gray-500">No published results found at this time.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* ==========================================
                                    UPDATED MAP LOGIC STARTS HERE
                                ========================================== */}
                                {results.map((res) => {
                                    // CHECK: Is this file a PDF?
                                    const isPdf = res.fileUrl && res.fileUrl.toLowerCase().includes('.pdf');

                                    return (
                                        <div key={res._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 group">
                                            
                                            {/* Header: Icon & Badge */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-lg transition-colors ${
                                                    isPdf 
                                                    ? "bg-violet-50 text-violet-600 group-hover:bg-violet-500 group-hover:text-white"
                                                    : "bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
                                                }`}>
                                                    {isPdf ? <FileText size={24} /> : <ImageIcon size={24} />}
                                                </div>
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase">
                                                    {isPdf ? "PDF" : "IMAGE"}
                                                </span>
                                            </div>

                                            {/* Preview: Only show if it is NOT a PDF */}
                                            {!isPdf && (
                                                <div className="mb-4 h-40 w-full overflow-hidden rounded-md bg-gray-100 relative">
                                                    <img 
                                                        src={res.fileUrl} 
                                                        alt={res.title} 
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                                    />
                                                </div>
                                            )}
                                            
                                            <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-700 transition-colors">
                                                {res.title}
                                            </h4>
                                            <p className="text-sm text-slate-500 mb-6">
                                                Grade: <span className="font-medium text-slate-700">{res.grade}</span>
                                            </p>
                                            
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                                <span className="text-xs text-gray-400">{res.date}</span>
                                                <a 
                                                    href={res.fileUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors"
                                                >
                                                    {isPdf ? "Download PDF" : "View Image"} <ArrowRight size={16} />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AcademicsPage;