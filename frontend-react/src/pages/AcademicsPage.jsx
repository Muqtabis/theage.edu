import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    FileText, 
    Loader2, 
    GraduationCap, 
    ChevronDown, 
    ChevronUp,
    ExternalLink, 
    Check,
    Download,
    BookOpen,
    Clock,
    Users,
    Search,
    Calendar,
    Award,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { useSiteContent, defaultClasses } from '../context/ContentContext';
import ImageModal from '../components/ImageModal';

const RESULT_API_URL = '/api/results';

const AcademicsPage = () => {
    const { content } = useSiteContent();
    const academics = content?.academics || {};
    const general = content?.general || {};

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    // Filter and search states
    const [activeWing, setActiveWing] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Expanded classes state: default to expanding the first class or allowing multi-expand
    const [expandedClasses, setExpandedClasses] = useState({
        'playgroup': true,
        'class-1': true,
        'class-10': true,
    });

    useEffect(() => {
        fetch(RESULT_API_URL)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setResults(data);
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    // Get classes list: fallback to defaultClasses if academics.classes is empty
    const rawClasses = (Array.isArray(academics.classes) && academics.classes.length > 0)
        ? academics.classes
        : defaultClasses;

    const toggleClassExpand = (classId) => {
        setExpandedClasses(prev => ({
            ...prev,
            [classId]: !prev[classId]
        }));
    };

    const expandAll = () => {
        const all = {};
        rawClasses.forEach(c => { all[c.id] = true; });
        setExpandedClasses(all);
    };

    const collapseAll = () => {
        setExpandedClasses({});
    };

    // Filter classes based on wing and search term
    const filteredClasses = rawClasses.filter(c => {
        const matchesWing = activeWing === 'all' || c.wing === activeWing;
        const matchesSearch = !searchQuery.trim() || 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.subjects && c.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesWing && matchesSearch;
    });

    const wings = [
        { id: 'all', label: 'All Classes', count: rawClasses.length },
        { id: 'pre-primary', label: 'Pre-Primary (ECCE)', count: rawClasses.filter(c => c.wing === 'pre-primary').length },
        { id: 'primary', label: 'Primary (Classes I–V)', count: rawClasses.filter(c => c.wing === 'primary').length },
        { id: 'middle', label: 'Middle (Classes VI–VIII)', count: rawClasses.filter(c => c.wing === 'middle').length },
        { id: 'secondary', label: 'Secondary (IX & X Board)', count: rawClasses.filter(c => c.wing === 'secondary').length },
        { id: 'senior-secondary', label: 'Senior Sec. / PUC', count: rawClasses.filter(c => c.wing === 'senior-secondary').length },
    ];

    return (
        <div className="font-sans text-slate-800 bg-[#fbfcfe] w-full overflow-x-hidden selection:bg-amber-400/30 selection:text-slate-950">
            
            {/* HERO SECTION */}
            <section className="bg-[#0a192f] text-white py-20 md:py-28 border-b border-slate-800 relative overflow-hidden">
                {/* Subtle ambient lighting */}
                <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c1b33]/90 border border-[#c5a059]/40 text-[#f4ead4] text-xs font-semibold uppercase tracking-[0.22em] mb-5 shadow-xs">
                        <GraduationCap size={15} className="text-[#c5a059]" />
                        <span>{academics.heroBadge || 'Comprehensive Academic Framework'}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-5 tracking-tight">
                        <span className="text-gradient-gold">
                            {academics.heroTitle || 'Curriculum & Class-Wise Directory'}
                        </span>
                    </h1>
                    
                    <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                        {academics.heroSubtitle || "From foundational early childhood in Pre-Nursery to secondary board mastery and senior PUC streams, explore every grade's learning outcomes, daily timings, and subjects."}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs font-semibold">
                        <a 
                            href="#class-directory" 
                            className="shimmer-btn btn-gold px-6 py-3 rounded-sm shadow-md"
                        >
                            Explore Class Structure
                        </a>
                        <a 
                            href="#daily-routine" 
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 hover:border-[#c5a059]/50 rounded-sm transition-all hover:-translate-y-0.5"
                        >
                            School Daily Schedule
                        </a>
                        <a 
                            href="#board-gazette" 
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 hover:border-[#c5a059]/50 rounded-sm transition-all hover:-translate-y-0.5"
                        >
                            Official Board Gazette
                        </a>
                    </div>
                </div>
            </section>

            {/* INSTITUTIONAL PILLARS STRIP */}
            <section className="bg-white border-b border-slate-200 py-6 px-6 sm:px-8 shadow-xs">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                    <div className="p-4 rounded-sm border border-slate-200 hover:border-[#c5a059]/50 hover:bg-slate-50/60 transition-all duration-200 hover-lift group">
                        <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0a192f] group-hover:text-[#c5a059] transition-colors block mb-1">17</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Distinct Grades</span>
                    </div>
                    <div className="p-4 rounded-sm border border-slate-200 hover:border-[#c5a059]/50 hover:bg-slate-50/60 transition-all duration-200 hover-lift group">
                        <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0a192f] group-hover:text-[#c5a059] transition-colors block mb-1">1:20</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Student-Mentor Ratio</span>
                    </div>
                    <div className="p-4 rounded-sm border border-slate-200 hover:border-[#c5a059]/50 hover:bg-slate-50/60 transition-all duration-200 hover-lift group">
                        <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0a192f] group-hover:text-[#c5a059] transition-colors block mb-1">100%</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Board Distinction Record</span>
                    </div>
                    <div className="p-4 rounded-sm border border-slate-200 hover:border-[#c5a059]/50 hover:bg-slate-50/60 transition-all duration-200 hover-lift group">
                        <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0a192f] group-hover:text-[#c5a059] transition-colors block mb-1">3-Lang</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">English, Kannada & Hindi</span>
                    </div>
                </div>
            </section>

            {/* EXPANDING CLASS STRUCTURE DIRECTORY */}
            <section id="class-directory" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-slate-200 gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8c7355] block mb-1">
                            Individual Grade Syllabi & Schedules
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b192c]">
                            Class-by-Class Curriculum Matrix
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                            Click any grade below to expand its full syllabus, daily periods, learning milestones, and examination methodology.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto">
                        <button
                            onClick={expandAll}
                            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xs transition-colors"
                        >
                            Expand All
                        </button>
                        <button
                            onClick={collapseAll}
                            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xs transition-colors"
                        >
                            Collapse All
                        </button>
                    </div>
                </div>

                {/* SEARCH AND WING FILTERS */}
                <div className="mb-8 space-y-4">
                    {/* Search bar */}
                    <div className="relative max-w-md">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search class by name, subject (e.g. Science, Kannada, Math)..."
                            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xs focus:outline-hidden focus:border-[#0b192c] transition-colors"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Wing selector pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {wings.map(w => {
                            const active = activeWing === w.id;
                            return (
                                <button
                                    key={w.id}
                                    onClick={() => setActiveWing(w.id)}
                                    className={`px-4 py-2 rounded-sm text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                        active
                                            ? 'bg-[#0a192f] text-white border border-[#0a192f] shadow-sm -translate-y-0.5'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:border-[#c5a059]/60 hover:text-[#0a192f] hover:-translate-y-0.5 shadow-2xs'
                                    }`}
                                >
                                    <span>{w.label}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans ${active ? 'bg-[#c5a059] text-[#0a192f] font-bold' : 'bg-slate-100 text-slate-600'}`}>
                                        {w.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* EXPANDABLE CLASSES LIST */}
                {filteredClasses.length === 0 ? (
                    <div className="bg-white p-12 text-center border border-dashed border-slate-300 rounded-xs">
                        <BookOpen size={36} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-sm font-semibold text-slate-600">No classes match your current filter.</p>
                        <button 
                            onClick={() => { setActiveWing('all'); setSearchQuery(''); }}
                            className="mt-3 text-xs text-[#0a192f] font-bold hover:underline"
                        >
                            Reset filters to view all classes
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredClasses.map((item) => {
                            const isExpanded = !!expandedClasses[item.id];
                            
                            // Dignified collegiate wing badge styling
                            const wingStyles = {
                                'pre-primary': { badge: 'bg-amber-50 text-amber-900 border-amber-200', bar: 'from-[#0a192f] to-[#c5a059]' },
                                'primary': { badge: 'bg-slate-100 text-slate-800 border-slate-300', bar: 'from-[#0a192f] to-[#c5a059]' },
                                'middle': { badge: 'bg-slate-100 text-slate-800 border-slate-300', bar: 'from-[#0a192f] to-[#c5a059]' },
                                'secondary': { badge: 'bg-blue-50 text-blue-950 border-blue-200', bar: 'from-[#0a192f] to-[#c5a059]' },
                                'senior-secondary': { badge: 'bg-amber-50 text-amber-900 border-amber-200', bar: 'from-[#0a192f] to-[#c5a059]' }
                            }[item.wing] || { badge: 'bg-slate-100 text-slate-800 border-slate-200', bar: 'from-[#0a192f] to-[#c5a059]' };

                            return (
                                <div 
                                    key={item.id} 
                                    className={`hover-lift border transition-all duration-300 rounded-sm overflow-hidden relative ${
                                        isExpanded 
                                            ? 'bg-white border-[#0a192f] shadow-md ring-1 ring-[#c5a059]/30' 
                                            : 'bg-white border-slate-200 hover:border-[#c5a059]/60 shadow-xs hover:shadow-md'
                                    }`}
                                >
                                    {/* Top colored accent line */}
                                    <div className={`h-1.5 w-full bg-gradient-to-r ${wingStyles.bar} ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`} />

                                    {/* CARD HEADER (Always Visible & Clickable) */}
                                    <button 
                                        onClick={() => toggleClassExpand(item.id)}
                                        className="w-full p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between text-left cursor-pointer gap-4 bg-white hover:bg-slate-50/70 transition-colors group"
                                    >
                                        <div className="flex items-start sm:items-center gap-3.5">
                                            <div className={`w-11 h-11 rounded-sm shrink-0 flex items-center justify-center font-serif font-bold text-sm transition-all duration-300 ${
                                                isExpanded 
                                                    ? 'bg-[#0a192f] text-[#c5a059] shadow-sm scale-105' 
                                                    : 'bg-slate-100 text-slate-700 group-hover:bg-[#0a192f] group-hover:text-[#c5a059]'
                                            }`}>
                                                {item.name.includes('Class') ? item.name.split(' ')[1] : item.name.charAt(0)}
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs ${wingStyles.badge}`}>
                                                        {item.wingName || item.wing}
                                                    </span>
                                                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                                                        <Clock size={12} className="text-[#c5a059]" />
                                                        {item.age}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0a192f] group-hover:text-blue-950 transition-colors">
                                                    {item.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                                <span className="hidden md:inline-flex items-center gap-1">
                                                    <Users size={12} className="text-[#0a192f]" />
                                                    Ratio: <strong className="text-slate-700">{item.ratio}</strong>
                                                </span>
                                            </div>

                                            <div className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-sm transition-all duration-200 ${
                                                isExpanded 
                                                    ? 'bg-[#0a192f] text-[#c5a059] shadow-xs' 
                                                    : 'bg-slate-100 text-slate-700 hover:bg-[#0a192f] hover:text-white'
                                            }`}>
                                                <span>{isExpanded ? 'Hide Details' : 'View Full Details'}</span>
                                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                            </div>
                                        </div>
                                    </button>

                                    {/* EXPANDED CONTENT DRAWER */}
                                    {isExpanded && (
                                        <div className="px-5 sm:px-7 pb-7 pt-2 border-t border-slate-100 bg-[#fdfbf7]/70">
                                            
                                            {/* Overview and Class Metrics */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                                                <div className="md:col-span-2">
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c7355] block mb-1.5">
                                                        Developmental Focus & Pedagogy
                                                    </span>
                                                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                                        {item.overview}
                                                    </p>
                                                </div>

                                                <div className="bg-white p-4 border border-slate-200 rounded-xs space-y-2.5 text-xs shadow-2xs">
                                                    <div>
                                                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Class Timings</span>
                                                        <span className="font-semibold text-slate-800">{item.timings}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Student-Teacher Ratio</span>
                                                        <span className="font-semibold text-slate-800">{item.ratio}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Age Eligibility</span>
                                                        <span className="font-semibold text-slate-800">{item.age}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* SUBJECTS TAUGHT WITH HOVER GLOW */}
                                            {Array.isArray(item.subjects) && item.subjects.length > 0 && (
                                                <div className="pt-3 pb-4">
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0b192c] block mb-2 flex items-center gap-1.5">
                                                        <BookOpen size={13} className="text-[#8c7355]" />
                                                        Prescribed Subjects & Modules
                                                    </span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.subjects.map((subj, si) => (
                                                            <span 
                                                                key={si} 
                                                                className="text-xs font-medium px-3 py-1 bg-white text-[#0b192c] rounded-xs border border-slate-200 shadow-2xs hover:bg-[#0b192c] hover:text-[#c5a880] hover:border-[#0b192c] hover:scale-105 hover:shadow-sm transition-all duration-200 cursor-default"
                                                            >
                                                                {subj}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* KEY MILESTONES & ASSESSMENT */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 pb-4">
                                                {/* Milestones */}
                                                {Array.isArray(item.milestones) && item.milestones.length > 0 && (
                                                    <div className="bg-white p-5 border border-slate-200 rounded-xs shadow-2xs">
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0b192c] block mb-2.5 flex items-center gap-1.5">
                                                            <Sparkles size={13} className="text-[#8c7355]" />
                                                            Key Learning Milestones
                                                        </span>
                                                        <ul className="space-y-2 text-xs text-slate-600">
                                                            {item.milestones.map((m, mi) => (
                                                                <li key={mi} className="flex items-start gap-2 group/item">
                                                                    <Check size={13} className="text-emerald-600 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" />
                                                                    <span>{m}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Assessment Scheme */}
                                                <div className="bg-white p-5 border border-slate-200 rounded-xs shadow-2xs flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0b192c] block mb-2 flex items-center gap-1.5">
                                                            <Award size={13} className="text-[#8c7355]" />
                                                            Assessment & Examination System
                                                        </span>
                                                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                                            {item.assessment}
                                                        </p>
                                                    </div>

                                                    {/* Co-curricular tags */}
                                                    {Array.isArray(item.coCurricular) && item.coCurricular.length > 0 && (
                                                        <div className="pt-2 border-t border-slate-100">
                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                                                                Co-Curricular & Labs:
                                                            </span>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {item.coCurricular.map((co, ci) => (
                                                                    <span 
                                                                        key={ci} 
                                                                        className="text-[11px] font-semibold text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-0.5 rounded-xs border border-slate-200 transition-colors"
                                                                    >
                                                                        {co}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* ACTION BUTTONS */}
                                            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                                                <span className="text-xs text-slate-500">
                                                    Affiliated to Karnataka State Board • Textbooks adhere to DSEL / NCERT guidelines
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        to="/admissions"
                                                        className="shimmer-btn btn-gold inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-sm transition-all duration-300 shadow-md text-[#0a192f]"
                                                    >
                                                        <span>Apply for {item.name.split('(')[0].trim()}</span>
                                                        <ArrowRight size={13} className="text-[#0a192f]" />
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* DAILY BELL SCHEDULE & ROUTINE */}
            <section id="daily-routine" className="py-20 bg-white border-t border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8c7355] block mb-2">
                            Discipline & Punctuality
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b192c]">
                            Official Campus Bell Schedule
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            A structured, harmonious academic timetable designed to balance mental rigor with physical recreation and nourishment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Regular Weekdays */}
                        <div className="border border-slate-200 bg-[#fdfbf7] p-6 sm:p-8 rounded-xs">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                                <div>
                                    <h3 className="font-serif font-bold text-lg text-[#0b192c]">Monday to Friday Schedule</h3>
                                    <span className="text-xs text-slate-500">Full Academic Day (8 Periods)</span>
                                </div>
                                <Clock size={20} className="text-[#8c7355]" />
                            </div>

                            <div className="space-y-3.5 text-xs">
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60">
                                    <span className="font-semibold text-slate-700">08:30 AM – 08:45 AM</span>
                                    <span className="text-[#0b192c] font-bold">Morning Assembly & Daily Prayer</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60">
                                    <span className="font-semibold text-slate-700">08:45 AM – 10:45 AM</span>
                                    <span className="text-slate-600">Periods 1, 2 & 3 (Core Academics)</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60 bg-amber-50/50 px-2 rounded-xs">
                                    <span className="font-semibold text-amber-900">10:45 AM – 11:00 AM</span>
                                    <span className="text-amber-900 font-bold">Short Recess & Hydration</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60">
                                    <span className="font-semibold text-slate-700">11:00 AM – 01:00 PM</span>
                                    <span className="text-slate-600">Periods 4, 5 & Laboratory Practical</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60 bg-amber-50/50 px-2 rounded-xs">
                                    <span className="font-semibold text-amber-900">01:00 PM – 01:45 PM</span>
                                    <span className="text-amber-900 font-bold">Lunch Break & Supervised Play</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60">
                                    <span className="font-semibold text-slate-700">01:45 PM – 03:00 PM</span>
                                    <span className="text-slate-600">Periods 6 & 7 (Languages & Social Sciences)</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60">
                                    <span className="font-semibold text-slate-700">03:00 PM – 03:45 PM</span>
                                    <span className="text-slate-600">Period 8 (Sports, Arts & Remedial Clinic)</span>
                                </div>
                                <div className="flex justify-between items-center pt-1.5 font-bold text-[#0b192c]">
                                    <span>03:45 PM</span>
                                    <span>National Anthem & Orderly Dispersal</span>
                                </div>
                            </div>
                        </div>

                        {/* Saturdays & Pre-Primary */}
                        <div className="space-y-6">
                            {/* Saturday Uniform Timing */}
                            <div className="border border-slate-200 bg-[#fdfbf7] p-6 rounded-xs">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                                    <div>
                                        <h3 className="font-serif font-bold text-base text-[#0b192c]">Saturday Uniform Schedule</h3>
                                        <span className="text-[11px] text-slate-500">Government & Board Mandated Half-Day</span>
                                    </div>
                                    <Calendar size={18} className="text-[#8c7355]" />
                                </div>
                                <div className="space-y-2.5 text-xs text-slate-600">
                                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                                        <span className="font-semibold text-slate-700">08:30 AM – 10:30 AM</span>
                                        <span>Assembly & Remedial Teaching / Quizzes</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                                        <span className="font-semibold text-slate-700">10:30 AM – 12:30 PM</span>
                                        <span>House Competitions, Sports & Clubs</span>
                                    </div>
                                    <div className="flex justify-between pt-1 font-bold text-[#0b192c]">
                                        <span>12:30 PM</span>
                                        <span>Weekend Dispersal</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pre-Primary Notice */}
                            <div className="border border-[#c5a880]/40 bg-[#c5a880]/10 p-6 rounded-xs">
                                <h3 className="font-serif font-bold text-sm text-[#0b192c] mb-1.5">
                                    Pre-Primary Section Timings (Nursery to UKG)
                                </h3>
                                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                                    To protect early childhood biological rhythms, Pre-Primary operates on a specialized schedule: 
                                    <strong> 08:45 AM – 12:30 PM (Monday to Friday)</strong>. Saturdays are observed as a complete home holiday for kindergarten scholars.
                                </p>
                                <span className="text-[10px] font-bold text-[#8c7355] uppercase tracking-wider block">
                                    Dedicated school van transport available for early dismissal.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESULTS & REPORTS GAZETTE */}
            <section id="board-gazette" className="py-20 bg-[#fdfbf7]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-200 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8c7355] block mb-1">
                                Examination Directorate
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b192c]">
                                Official Academic Gazette & Results
                            </h2>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                            Published under the authority of the Board of Examinations
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20 text-slate-400">
                            <Loader2 className="animate-spin mx-auto mb-2 text-[#8c7355]" />
                            Loading official records...
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 text-xs border border-dashed border-slate-300 p-8 bg-white rounded-xs">
                            No published scorecards or circulars currently active in the gazette.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {results.map((r) => {
                                const isPdf = r.fileUrl && r.fileUrl.toLowerCase().includes('.pdf');
                                return (
                                    <div key={r._id} className="p-6 border border-slate-200 bg-white rounded-xs flex flex-col justify-between shadow-2xs hover:border-[#0b192c] transition-colors">
                                        <div>
                                            <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                <span className="px-2 py-0.5 bg-slate-100 rounded-xs border border-slate-200">{r.grade || 'General'}</span>
                                                <span className="bg-[#0b192c] text-white px-2 py-0.5 rounded-xs">{isPdf ? 'PDF' : 'IMAGE'}</span>
                                            </div>
                                            <h4 className="font-serif font-bold text-base text-[#0b192c] mb-2">{r.title}</h4>
                                            <span className="text-[11px] text-slate-500 block mb-4">{r.date}</span>
                                        </div>
                                        <div className="pt-3 border-t border-slate-100">
                                            {isPdf ? (
                                                <a 
                                                    href={r.fileUrl} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="text-xs font-bold text-[#0b192c] hover:text-[#8c7355] inline-flex items-center gap-1.5 transition-colors"
                                                >
                                                    <span>Download Document</span>
                                                    <Download size={13} />
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => setSelectedImage({ originalUrl: r.fileUrl, title: r.title })}
                                                    className="text-xs font-bold text-[#0b192c] hover:text-[#8c7355] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                                                >
                                                    <span>View Full Gazette</span>
                                                    <ExternalLink size={13} />
                                                </button>
                                            )}
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
