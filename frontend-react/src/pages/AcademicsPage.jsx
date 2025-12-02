import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Loader2, BookOpen, ChevronDown, TrendingUp, GraduationCap, ArrowRight, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react';

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
    // LOGIC HOOKS ARE PRESERVED
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
        <div className="font-sans text-slate-800 bg-white w-full overflow-x-hidden">
            
            {/* ==========================================
                1. HERO SECTION (Clean Contrast)
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden w-full text-white">
                <div className="absolute inset-0 z-0 opacity-50" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517430332-ac7f3698858a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"}}>
                    <div className="absolute inset-0 bg-slate-900/90"></div>
                </div>

                <div className="relative z-10 w-full text-center"> 
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/50 bg-indigo-500/10 text-indigo-300 text-sm font-bold tracking-wide mb-6 backdrop-blur-sm">
                            <Sparkles size={14} className="text-yellow-300 fill-yellow-300" />
                            <span className="text-indigo-200 text-sm font-medium tracking-wide">Academic Excellence</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Curriculum & Resources
                        </h1>
                        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed">
                            From kindergarten steps to 10th grade leaps, we structure our learning to empower every student's unique journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. EDUCATIONAL LEVELS (Minimalist Accordion Cards)
            ========================================== */}
            <section className="w-full py-20 bg-white"> 
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Learning Pathways</h2>
                    <div className="space-y-4">
                        {schoolLevels.map((level) => {
                            const Icon = level.icon;
                            const isActive = activeSection === level.id;
                            
                            return (
                                <div 
                                    key={level.id} 
                                    className={`rounded-2xl transition-all duration-500 overflow-hidden border border-slate-200 shadow-sm ${
                                        isActive 
                                            ? 'bg-indigo-50 ring-2 ring-indigo-400/50' 
                                            : 'bg-white hover:shadow-md'
                                    }`}
                                >
                                    <button 
                                        onClick={() => toggleSection(level.id)}
                                        className="w-full px-4 md:p-6 flex items-center justify-between cursor-pointer outline-none group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                                                isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                                            }`}>
                                                <Icon size={24} strokeWidth={1.5} />
                                            </div>
                                            
                                            <div className="text-left">
                                                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                                                    isActive ? 'text-indigo-900' : 'text-slate-800'
                                                }`}>
                                                    {level.title}
                                                </h3>
                                                {!isActive && (
                                                    <p className="text-slate-500 text-sm mt-1 hidden md:block">Click to reveal details</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-slate-600'}`}>
                                            <ChevronDown size={18} className={isActive ? 'rotate-180' : ''} />
                                        </div>
                                    </button>
                                    
                                    {/* Accordion Content */}
                                    <div className={`transition-all duration-500 ease-in-out ${
                                        isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                        <div className="p-6 pt-0 pl-20 md:pl-[80px] md:pr-10">
                                            <div className="h-px w-full bg-indigo-200 mb-6"></div>
                                            
                                            <p className="text-base text-slate-700 leading-relaxed font-medium mb-8">
                                                {level.description}
                                            </p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {level.focus.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-indigo-200">
                                                        <CheckCircle2 size={16} className="text-indigo-600 flex-shrink-0" />
                                                        <span className="text-indigo-900 font-medium text-sm">{item}</span>
                                                    </div>
                                                ))}
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
                3. EXAM RESULTS (Minimalist Cards)
            ========================================== */}
            <section className="py-24 bg-slate-50 relative w-full"> 
                <div className="container mx-auto px-6"> 
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Student Resources</h2>
                            <p className="text-slate-600">Download exam results and academic reports.</p>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                            <p className="text-gray-500">Fetching latest results...</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                            <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-gray-500">No published resources found at this time.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((res) => {
                                // LOGIC PRESERVED: CHECK IF FILE IS PDF
                                const isPdf = res.fileUrl && res.fileUrl.toLowerCase().includes('.pdf');

                                return (
                                    <div key={res._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 group">
                                        
                                        {/* Header: Icon & Badge */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-lg transition-colors ${
                                                isPdf 
                                                    ? "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white"
                                                    : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                                            }`}>
                                                {isPdf ? <FileText size={24} /> : <ImageIcon size={24} />}
                                            </div>
                                            <span className="px-2 py-1 bg-gray-100 text-slate-600 text-xs font-medium rounded uppercase">
                                                {isPdf ? "PDF" : "IMAGE"}
                                            </span>
                                        </div>

                                        {/* Preview: Simplified image display */}
                                        {!isPdf && res.fileUrl && (
                                            <div className="mb-4 h-40 w-full overflow-hidden rounded-md border border-gray-200 relative">
                                                <img 
                                                    src={res.fileUrl} 
                                                    alt={res.title} 
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                                />
                                            </div>
                                        )}
                                        
                                        <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-violet-700 transition-colors">
                                            {res.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 mb-6 font-medium">
                                            Grade: <span className="font-bold">{res.grade}</span>
                                        </p>
                                        
                                        {/* Action Link */}
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                            <span className="text-xs text-slate-400">{res.date}</span>
                                            <a 
                                                href={res.fileUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors"
                                            >
                                                {isPdf ? "Download Document" : "View Full"} <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AcademicsPage;