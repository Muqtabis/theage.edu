import React, { useState, useEffect } from 'react';
import { 
    FileText, 
    Loader2, 
    GraduationCap, 
    ChevronDown, 
    ExternalLink, 
    Check,
    Download
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

    useEffect(() => {
        fetch(RESULT_API_URL)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setResults(data);
            })
            .catch(err => console.error(err))
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
        <div className="font-sans text-slate-800 bg-[#fbfbfb] w-full overflow-x-hidden selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            
            {/* HERO */}
            <section className="bg-[#0b192c] text-white py-24 md:py-32 border-b border-[#c5a880]/20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a880] block mb-3">
                        {academics.heroBadge || 'Curricular Rigor'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                        {academics.heroTitle || 'Curriculum & Resources'}
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
                        {academics.heroSubtitle || "From foundational kindergarten steps to 10th grade leaps, we structure our learning to empower every student's unique journey."}
                    </p>
                </div>
            </section>

            {/* PATHWAYS ACCORDION */}
            <section className="py-24 max-w-5xl mx-auto px-6 sm:px-8">
                <div className="max-w-2xl mb-14">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-2">Structure</span>
                    <h2 className="text-3xl font-serif font-bold text-[#0b192c]">Curriculum Stages & Focus</h2>
                </div>

                <div className="space-y-4">
                    {levels.map((level) => {
                        const isActive = activeSection === level.id;
                        return (
                            <div 
                                key={level.id} 
                                className={`border transition-all ${
                                    isActive 
                                        ? 'bg-white border-[#0b192c] shadow-xs' 
                                        : 'bg-[#fdfbf7] border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                <button 
                                    onClick={() => toggleSection(level.id)}
                                    className="w-full p-6 md:p-8 flex items-center justify-between text-left cursor-pointer"
                                >
                                    <div>
                                        <h3 className="text-xl font-serif font-bold text-[#0b192c]">{level.title}</h3>
                                        <p className="text-xs text-slate-500 mt-1">Stage Directory & Core Competencies</p>
                                    </div>
                                    <div className={`p-2 transition-transform duration-200 ${isActive ? 'rotate-180 text-[#c5a880]' : 'text-slate-400'}`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>

                                {isActive && (
                                    <div className="px-6 md:px-8 pb-8 pt-0 border-t border-slate-100">
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed py-4">
                                            {level.desc}
                                        </p>
                                        {Array.isArray(level.focus) && level.focus.length > 0 && (
                                            <div className="pt-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Subject Emphases:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {level.focus.map((f, fi) => (
                                                        <span key={fi} className="text-xs font-semibold px-3 py-1 bg-slate-100 text-[#0b192c] rounded-xs border border-slate-200">
                                                            {f}
                                                        </span>
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
            </section>

            {/* RESULTS & REPORTS */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-200 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880] block mb-1">Gazette</span>
                            <h2 className="text-3xl font-serif font-bold text-[#0b192c]">Official Student Records & Results</h2>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">Published by the Controller of Examinations</span>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading records...</div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 text-xs border border-dashed border-slate-200 p-8">
                            No published scorecards currently active.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {results.map((r) => {
                                const isPdf = r.fileUrl && r.fileUrl.toLowerCase().includes('.pdf');
                                return (
                                    <div key={r._id} className="p-6 border border-slate-200 bg-[#fdfbf7] flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                <span>{r.grade}</span>
                                                <span className="bg-slate-200 px-2 py-0.5 text-slate-700">{isPdf ? 'PDF' : 'IMAGE'}</span>
                                            </div>
                                            <h4 className="font-serif font-bold text-base text-[#0b192c] mb-2">{r.title}</h4>
                                            <span className="text-[11px] text-slate-500 block mb-4">{r.date}</span>
                                        </div>
                                        <div className="pt-3 border-t border-slate-200">
                                            <a 
                                                href={r.fileUrl} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="text-xs font-bold text-[#0b192c] hover:text-[#c5a880] inline-flex items-center gap-1.5 transition-colors"
                                            >
                                                <span>Access Document</span>
                                                <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {selectedImage && (
                <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
            )}

        </div>
    );
};

export default AcademicsPage;
