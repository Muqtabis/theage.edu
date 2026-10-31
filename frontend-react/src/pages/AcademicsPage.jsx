import React, { useState, useEffect } from 'react';
import { 
    FileText, 
    Loader2, 
    BookOpen, 
    ChevronDown, 
    GraduationCap, 
    ArrowRight, 
    CheckCircle2, 
    Image as ImageIcon, 
    Sparkles,
    Download,
    ExternalLink
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import ImageModal from '../components/ImageModal';

const RESULT_API_URL = '/api/results';

const AcademicsPage = () => {
    const { content } = useSiteContent();
    const academics = content?.academics || {};

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('lower');
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch dynamic results
    useEffect(() => {
        fetch(RESULT_API_URL)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setResults(data);
            })
            .catch(err => console.error("Error loading results:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const toggleSection = (sectionId) => {
        setActiveSection(activeSection === sectionId ? null : sectionId);
    };

    const levels = Array.isArray(academics.levels) && academics.levels.length > 0 
        ? academics.levels 
        : [
            {
                id: 'lower',
                title: 'Lower School (Grades K-5)',
                desc: 'Focus on foundational literacy, numeracy, and social-emotional skills through hands-on learning and personalized attention.',
                focus: ['Foundational Skills', 'Creative Arts', 'Digital Literacy'],
            },
            {
                id: 'primary',
                title: 'Primary School (Grades 6-8)',
                desc: 'Transitional phase emphasizing critical thinking, problem-solving, and subject specialization.',
                focus: ['Critical Thinking', 'Integrated STEM', 'Leadership Programs'],
            },
            {
                id: 'high',
                title: 'High School (Grades 9-10)',
                desc: 'College preparatory curriculum with advanced coursework, career counseling, and rigorous external examination readiness.',
                focus: ['Exam Prep', 'Career Counseling', 'Advanced Research'],
            },
        ];

    return (
        <div className="font-sans text-slate-800 bg-white w-full overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-slate-950 overflow-hidden text-white">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 max-w-7xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>{academics.heroBadge || 'Academic Excellence'}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        {academics.heroTitle || 'Curriculum & Resources'}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
                        {academics.heroSubtitle || "From kindergarten steps to 10th grade leaps, we structure our learning to empower every student's unique journey."}
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. EDUCATIONAL LEVELS (Accordion Pathways)
            ========================================== */}
            <section className="w-full py-24 bg-white"> 
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Structure & Pedagogy</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                            Our Learning Pathways
                        </h2>
                        <p className="text-slate-600 text-sm mt-2">Click each stage to explore curriculum focus and objectives.</p>
                    </div>

                    <div className="space-y-4">
                        {levels.map((level) => {
                            const isActive = activeSection === level.id;
                            
                            return (
                                <div 
                                    key={level.id} 
                                    className={`rounded-3xl transition-all duration-300 overflow-hidden border ${
                                        isActive 
                                            ? 'bg-slate-50 border-indigo-500/40 shadow-lg ring-1 ring-indigo-500/20' 
                                            : 'bg-white border-slate-200/80 hover:shadow-md hover:border-slate-300'
                                    }`}
                                >
                                    <button 
                                        onClick={() => toggleSection(level.id)}
                                        className="w-full p-6 md:p-8 flex items-center justify-between cursor-pointer outline-none text-left"
                                        aria-expanded={isActive}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                                                isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-indigo-600'
                                            }`}>
                                                <GraduationCap size={26} />
                                            </div>
                                            
                                            <div>
                                                <h3 className={`text-xl md:text-2xl font-serif font-bold transition-colors ${
                                                    isActive ? 'text-indigo-900' : 'text-slate-900'
                                                }`}>
                                                    {level.title}
                                                </h3>
                                                <p className="text-slate-500 text-xs mt-1">
                                                    {isActive ? 'Currently viewing details' : 'Click to expand stage details'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                            isActive ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>
                                    
                                    {/* Accordion Content */}
                                    {isActive && (
                                        <div className="p-6 md:p-8 pt-0 pl-6 md:pl-26 pr-6 md:pr-12 animate-in fade-in duration-200">
                                            <div className="h-px w-full bg-slate-200 mb-6" />
                                            
                                            <p className="text-base text-slate-700 leading-relaxed mb-6">
                                                {level.desc}
                                            </p>

                                            {Array.isArray(level.focus) && level.focus.length > 0 && (
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Focus Areas:</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        {level.focus.map((item, i) => (
                                                            <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                                                                <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                                                                <span className="text-slate-800 font-semibold text-xs">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. EXAM RESULTS & STUDENT RESOURCES
            ========================================== */}
            <section className="py-24 bg-slate-50 border-t border-slate-200/70"> 
                <div className="container mx-auto px-6 max-w-7xl"> 
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-slate-200 gap-4">
                        <div>
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">Downloads & Reports</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Student Resources & Exam Results</h2>
                            <p className="text-slate-600 text-sm mt-1">Official score sheets, term evaluations, and academic notifications.</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-slate-400 font-medium">Published by Administration</span>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                            <Loader2 className="animate-spin text-indigo-600 mb-4" size={36} />
                            <p className="text-slate-500 text-sm">Fetching published results...</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                            <FileText className="mx-auto text-slate-300 mb-3" size={44} />
                            <h4 className="font-bold text-slate-700">No Published Results Available</h4>
                            <p className="text-slate-500 text-xs mt-1">Results will be posted here as soon as they are declared.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((res) => {
                                const isPdf = res.fileUrl && res.fileUrl.toLowerCase().includes('.pdf');

                                return (
                                    <div 
                                        key={res._id} 
                                        className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-xl border border-slate-200/80 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-xl ${
                                                    isPdf ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'
                                                }`}>
                                                    {isPdf ? <FileText size={24} /> : <ImageIcon size={24} />}
                                                </div>
                                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                    {isPdf ? "PDF Document" : "Image Result"}
                                                </span>
                                            </div>

                                            {/* Preview thumbnail if image */}
                                            {!isPdf && res.fileUrl && (
                                                <div 
                                                    className="mb-4 h-36 w-full overflow-hidden rounded-xl border border-slate-200 cursor-pointer relative"
                                                    onClick={() => setSelectedImage(res.fileUrl)}
                                                >
                                                    <img 
                                                        src={res.fileUrl} 
                                                        alt={res.title} 
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                                    />
                                                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                                                        Click to preview
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <h4 className="text-lg font-serif font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                                {res.title}
                                            </h4>
                                            
                                            <p className="text-xs text-slate-500 font-medium mb-4">
                                                Target Class: <span className="font-bold text-slate-800">{res.grade}</span>
                                            </p>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                                            <span className="text-xs text-slate-400">{res.date}</span>
                                            <a 
                                                href={res.fileUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                                            >
                                                <span>{isPdf ? "Download Document" : "View Fullscreen"}</span>
                                                <ExternalLink size={13} />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal for previewing image results */}
            {selectedImage && (
                <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
            )}

        </div>
    );
};

export default AcademicsPage;
