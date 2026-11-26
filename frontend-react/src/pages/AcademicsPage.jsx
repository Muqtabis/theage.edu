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
    const [scheduleTab, setScheduleTab] = useState('weekdays'); // 'weekdays' | 'saturdays' | 'kindergarten'
    
    // Expanded classes state: default to expanding the first class
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
        <div className="font-sans text-slate-800 bg-white w-full overflow-x-hidden selection:bg-blue-600 selection:text-white">
            
            {/* HERO SECTION */}
            <section className="bg-slate-50 border-b border-slate-200/80 py-8 sm:py-14 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-medium mb-3 sm:mb-4 shadow-2xs">
                        <GraduationCap size={15} className="text-blue-600" />
                        <span>{academics.heroBadge || 'Comprehensive Academic Framework'}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
                        {academics.heroTitle || 'Curriculum & Class Directory'}
                    </h1>
                    
                    <p className="text-slate-600 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mb-5 sm:mb-6">
                        {academics.heroSubtitle || "From foundational early childhood in Pre-Nursery to secondary board mastery and senior PUC streams, explore every grade's learning outcomes, daily timings, and subjects."}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                        <a 
                            href="#class-directory" 
                            className="btn-primary text-xs py-2 px-4"
                        >
                            Explore All 17 Classes
                        </a>
                        <a 
                            href="#daily-routine" 
                            className="btn-secondary text-xs py-2 px-4"
                        >
                            Daily Schedule
                        </a>
                        <a 
                            href="#board-gazette" 
                            className="btn-secondary text-xs py-2 px-4"
                        >
                            Official Gazette
                        </a>
                    </div>
                </div>
            </section>

            {/* INSTITUTIONAL METRICS STRIP */}
            <section className="bg-white border-b border-slate-200/80 py-5 sm:py-7 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 text-center">
                    <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                        <span className="text-2xl sm:text-3xl font-bold text-slate-900 block mb-0.5">17</span>
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Distinct Grades</span>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                        <span className="text-2xl sm:text-3xl font-bold text-slate-900 block mb-0.5">1:20</span>
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Student Ratio</span>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                        <span className="text-2xl sm:text-3xl font-bold text-slate-900 block mb-0.5">100%</span>
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Board Distinction</span>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                        <span className="text-2xl sm:text-3xl font-bold text-slate-900 block mb-0.5">3-Lang</span>
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Fluency</span>
                    </div>
                </div>
            </section>

            {/* EXPANDING CLASS STRUCTURE DIRECTORY */}
            <section id="class-directory" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-slate-200 gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                            Syllabi & Schedules
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Class-by-Class Curriculum Matrix
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                            Click any grade below to view its syllabus, daily periods, learning milestones, and examination structure.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto">
                        <button
                            onClick={expandAll}
                            className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
                        >
                            Expand All
                        </button>
                        <button
                            onClick={collapseAll}
                            className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
                        >
                            Collapse All
                        </button>
                    </div>
                </div>

                {/* SEARCH AND MOBILE-FRIENDLY WING FILTERS */}
                <div className="mb-8 space-y-4">
                    {/* Search bar */}
                    <div className="relative max-w-md">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search class by name, subject (e.g. Science, Kannada, Math)..."
                            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 transition-colors"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Wing selector pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                        {wings.map(w => {
                            const active = activeWing === w.id;
                            return (
                                <button
                                    key={w.id}
                                    onClick={() => setActiveWing(w.id)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                                        active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    <span>{w.label}</span>
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${active ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                        {w.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* EXPANDABLE CLASSES LIST */}
                {filteredClasses.length === 0 ? (
                    <div className="bg-white p-12 text-center border border-dashed border-slate-200 rounded-xl">
                        <BookOpen size={32} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-sm font-medium text-slate-600">No classes match your current filter.</p>
                        <button 
                            onClick={() => { setActiveWing('all'); setSearchQuery(''); }}
                            className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredClasses.map((item) => {
                            const isExpanded = !!expandedClasses[item.id];
                            
                            return (
                                <div 
                                    key={item.id} 
                                    className={`card-interactive transition-all rounded-xl overflow-hidden ${
                                        isExpanded 
                                            ? 'border-blue-600 shadow-md ring-1 ring-blue-500/20 bg-white' 
                                            : 'hover:border-blue-300 bg-white'
                                    }`}
                                >
                                    {/* CARD HEADER */}
                                    <button 
                                        onClick={() => toggleClassExpand(item.id)}
                                        className="w-full p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between text-left cursor-pointer gap-4 bg-white hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <div className="flex items-start sm:items-center gap-3.5">
                                            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 shrink-0 flex items-center justify-center font-bold text-xs border border-slate-200">
                                                {item.name.includes('Class') ? item.name.split(' ')[1] : item.name.charAt(0)}
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                                        {item.wingName || item.wing}
                                                    </span>
                                                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                                        <Clock size={11} className="text-slate-400" />
                                                        {item.age}
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                    {item.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="hidden md:inline-flex items-center gap-1 text-slate-500">
                                                    Ratio: <strong className="text-slate-800">{item.ratio}</strong>
                                                </span>
                                            </div>

                                            <div className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                                                isExpanded 
                                                    ? 'bg-blue-50 text-blue-700' 
                                                    : 'text-slate-600 group-hover:text-slate-900'
                                            }`}>
                                                <span>{isExpanded ? 'Hide' : 'Details'}</span>
                                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                            </div>
                                        </div>
                                    </button>

                                    {/* EXPANDED CONTENT DRAWER */}
                                    {isExpanded && (
                                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                                            
                                            {/* Overview and Class Metrics */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                                                <div className="md:col-span-2">
                                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                                                        Developmental Focus & Pedagogy
                                                    </span>
                                                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                                        {item.overview}
                                                    </p>
                                                </div>

                                                <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-2 text-xs">
                                                    <div>
                                                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Class Timings</span>
                                                        <span className="font-medium text-slate-800">{item.timings}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Student-Teacher Ratio</span>
                                                        <span className="font-medium text-slate-800">{item.ratio}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Age Eligibility</span>
                                                        <span className="font-medium text-slate-800">{item.age}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* SUBJECTS TAUGHT */}
                                            {Array.isArray(item.subjects) && item.subjects.length > 0 && (
                                                <div className="pt-2 pb-4">
                                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
                                                        <BookOpen size={13} className="text-blue-600" />
                                                        Prescribed Subjects & Modules
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {item.subjects.map((subj, si) => (
                                                            <span 
                                                                key={si} 
                                                                className="text-xs font-medium px-2.5 py-1 bg-white text-slate-700 rounded-md border border-slate-200"
                                                            >
                                                                {subj}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* KEY MILESTONES & ASSESSMENT */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pb-4">
                                                {/* Milestones */}
                                                {Array.isArray(item.milestones) && item.milestones.length > 0 && (
                                                    <div className="bg-white p-4 border border-slate-200 rounded-lg">
                                                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 block mb-2 flex items-center gap-1.5">
                                                            <Sparkles size={13} className="text-blue-600" />
                                                            Key Learning Milestones
                                                        </span>
                                                        <ul className="space-y-1.5 text-xs text-slate-600">
                                                            {item.milestones.map((m, mi) => (
                                                                <li key={mi} className="flex items-start gap-2">
                                                                    <Check size={13} className="text-blue-600 mt-0.5 shrink-0" />
                                                                    <span>{m}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Assessment Scheme */}
                                                <div className="bg-white p-4 border border-slate-200 rounded-lg flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 block mb-2 flex items-center gap-1.5">
                                                            <Award size={13} className="text-blue-600" />
                                                            Assessment & Examination System
                                                        </span>
                                                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                                            {item.assessment}
                                                        </p>
                                                    </div>

                                                    {/* Co-curricular tags */}
                                                    {Array.isArray(item.coCurricular) && item.coCurricular.length > 0 && (
                                                        <div className="pt-2 border-t border-slate-100">
                                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                                                                Co-Curricular & Labs:
                                                            </span>
                                                            <div className="flex flex-wrap gap-1">
                                                                {item.coCurricular.map((co, ci) => (
                                                                    <span 
                                                                        key={ci} 
                                                                        className="text-[10px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded-sm border border-slate-200"
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
                                                    Affiliated to Karnataka State Board
                                                </span>
                                                <Link
                                                    to="/admissions"
                                                    className="btn-primary text-xs"
                                                >
                                                    <span>Apply for {item.name.split('(')[0].trim()}</span>
                                                    <ArrowRight size={13} />
                                                </Link>
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
            <section id="daily-routine" className="py-20 bg-slate-50/70 border-t border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                            Punctuality & Routine
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Campus Bell Schedule
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2">
                            Select a schedule below to view periods, recesses, and specialized timings.
                        </p>
                    </div>

                    {/* Interactive Schedule Tab Switcher */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex p-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                            <button
                                onClick={() => setScheduleTab('weekdays')}
                                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                                    scheduleTab === 'weekdays'
                                        ? 'bg-blue-600 text-white shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Monday – Friday (8 Periods)
                            </button>
                            <button
                                onClick={() => setScheduleTab('saturdays')}
                                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                                    scheduleTab === 'saturdays'
                                        ? 'bg-blue-600 text-white shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Saturday Half-Day & Clubs
                            </button>
                            <button
                                onClick={() => setScheduleTab('kindergarten')}
                                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                                    scheduleTab === 'kindergarten'
                                        ? 'bg-blue-600 text-white shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Pre-Primary Kindergarten
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Schedule View */}
                    <div className="card-minimal p-6 sm:p-8 bg-white max-w-3xl mx-auto">
                        {scheduleTab === 'weekdays' && (
                            <div className="space-y-3 text-xs animate-in fade-in duration-200">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                    <div>
                                        <h3 className="font-bold text-base text-slate-900">Monday to Friday Full-Day Schedule</h3>
                                        <span className="text-xs text-slate-500">Classes I to XII • 8 Periods + Labs</span>
                                    </div>
                                    <Clock size={18} className="text-blue-600" />
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="font-medium text-slate-600">08:30 AM – 08:45 AM</span>
                                    <span className="text-slate-900 font-semibold">Morning Assembly & Daily Prayer</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="font-medium text-slate-600">08:45 AM – 10:45 AM</span>
                                    <span className="text-slate-800">Periods 1, 2 & 3 (Core Mathematics, Science & Languages)</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100 bg-blue-50/50 px-2.5 rounded-md">
                                    <span className="font-medium text-blue-700">10:45 AM – 11:00 AM</span>
                                    <span className="text-blue-900 font-semibold">Short Recess & Nutrition</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="font-medium text-slate-600">11:00 AM – 01:00 PM</span>
                                    <span className="text-slate-800">Periods 4, 5 & Composite Science Laboratory Practical</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100 bg-blue-50/50 px-2.5 rounded-md">
                                    <span className="font-medium text-blue-700">01:00 PM – 01:45 PM</span>
                                    <span className="text-blue-900 font-semibold">Lunch Recess & Supervised Recreation</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="font-medium text-slate-600">01:45 PM – 03:00 PM</span>
                                    <span className="text-slate-800">Periods 6 & 7 (Social Sciences, Computers & Second Language)</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="font-medium text-slate-600">03:00 PM – 03:45 PM</span>
                                    <span className="text-slate-800">Period 8 (Sports, Arts, Clubs & Remedial Doubt Clinics)</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 font-semibold text-slate-900">
                                    <span>03:45 PM</span>
                                    <span className="text-blue-600">National Anthem & Orderly Bus Dispersal</span>
                                </div>
                            </div>
                        )}

                        {scheduleTab === 'saturdays' && (
                            <div className="space-y-3 text-xs animate-in fade-in duration-200">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                    <div>
                                        <h3 className="font-bold text-base text-slate-900">Saturday Mandated Half-Day</h3>
                                        <span className="text-xs text-slate-500">Remedial Clinics, House Tournaments & Clubs</span>
                                    </div>
                                    <Calendar size={18} className="text-blue-600" />
                                </div>
                                <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                                    <span className="font-medium text-slate-600">08:30 AM – 10:30 AM</span>
                                    <span className="text-slate-900 font-semibold">Assembly, Quiz Contests & Board Remedial Coaching</span>
                                </div>
                                <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                                    <span className="font-medium text-slate-600">10:30 AM – 12:30 PM</span>
                                    <span className="text-slate-900 font-semibold">Inter-House Sports, Drama, Debate & Robotics Clubs</span>
                                </div>
                                <div className="flex justify-between items-center pt-2.5 font-semibold text-slate-900">
                                    <span>12:30 PM</span>
                                    <span className="text-blue-600">Weekend Home Dispersal</span>
                                </div>
                            </div>
                        )}

                        {scheduleTab === 'kindergarten' && (
                            <div className="space-y-4 text-xs animate-in fade-in duration-200">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                    <div>
                                        <h3 className="font-bold text-base text-slate-900">Pre-Primary (Nursery, LKG, UKG)</h3>
                                        <span className="text-xs text-slate-500">Child-Centric Early Dismissal Routine</span>
                                    </div>
                                    <Clock size={18} className="text-blue-600" />
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    To protect early childhood biological rhythms, kindergarten operates on a specialized schedule: 
                                    <strong className="text-slate-900"> 08:45 AM – 12:30 PM (Monday to Friday)</strong>. Saturdays are observed as a complete home holiday.
                                </p>
                                <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-lg text-blue-900">
                                    <span className="font-semibold block mb-1">Dedicated Transport:</span>
                                    School vans are routed specifically for 12:30 PM early dismissal with on-board female attendants.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* RESULTS & REPORTS GAZETTE */}
            <section id="board-gazette" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-200 gap-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                                Examination Directorate
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                Official Academic Gazette & Results
                            </h2>
                        </div>
                        <span className="text-xs text-slate-500">
                            Published under the authority of the Board of Examinations
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20 text-slate-400">
                            <Loader2 className="animate-spin mx-auto mb-2 text-blue-600" />
                            Loading official records...
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 text-xs border border-dashed border-slate-200 p-8 bg-slate-50 rounded-xl">
                            No published scorecards or circulars currently active in the gazette.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {results.map((r) => {
                                const isPdf = r.fileUrl && r.fileUrl.toLowerCase().includes('.pdf');
                                return (
                                    <div key={r._id} className="card-minimal p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                                <span className="px-2 py-0.5 bg-slate-100 rounded-md">{r.grade || 'General'}</span>
                                                <span className="bg-slate-900 text-white px-2 py-0.5 rounded-md">{isPdf ? 'PDF' : 'IMAGE'}</span>
                                            </div>
                                            <h4 className="font-bold text-base text-slate-900 mb-2">{r.title}</h4>
                                            <span className="text-[11px] text-slate-500 block mb-4">{r.date}</span>
                                        </div>
                                        <div className="pt-3 border-t border-slate-100">
                                            {isPdf ? (
                                                <a 
                                                    href={r.fileUrl} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 transition-colors"
                                                >
                                                    <span>Download Document</span>
                                                    <Download size={13} />
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => setSelectedImage({ originalUrl: r.fileUrl, title: r.title })}
                                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
